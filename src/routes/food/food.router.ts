"use strict";
import { Router } from "express";
import { Request, Response } from "express";
import { getRepository, Like } from "typeorm";
import { Food } from "../../database/entities/Food";

const router = Router();

router.get("/find/:foodClass", async (req, res) => {
  try {
    let result;
    const { skip, take } = req.query;
    const { foodClass } = req.params;

    // Get all with pagination, but count the overall
    if (foodClass === "all") {
      result = await getRepository(Food)
        .createQueryBuilder("food")
        .addSelect((subQuery) => (
          subQuery
            .select("COUNT(*)", "count")
            .from(Food, "")
         ), "total")
        .orderBy("(IF (food.filipinoName IS NULL, 1, 0)), food.filipinoName", "ASC")
        .addOrderBy("(IF (food.englishName IS NULL, 1, 0)), food.englishName", "ASC")
        .skip(skip)
        .take(take)
        .getRawMany();
    } else { // Get specific class with pagination, but count the overall
      result = await getRepository(Food)
        .createQueryBuilder("food")
        .addSelect((subQuery) => (
          subQuery
            .select("COUNT(*)", "count")
            .from(Food, "food")
            .where(`primaryClassification LIKE '%${foodClass}%'
              OR
              secondaryClassification LIKE '%${foodClass}%'
            `)
         ), "total")
        .where(`primaryClassification LIKE '%${foodClass}%'
          OR
          secondaryClassification LIKE '%${foodClass}%'
        `)
        .orderBy("(IF (food.filipinoName IS NULL, 1, 0)), food.filipinoName", "ASC")
        .addOrderBy("(IF (food.englishName IS NULL, 1, 0)), food.englishName", "ASC")
        .skip(skip)
        .take(take)
        .getRawMany();
    }

    if (!result) {
      const data = {
        status: 404,
        message: "No foods"
      };
      res.status(data.status).json(data);
    } else {
      const data = {
        status: 200,
        message: "Foods found",
        data: result
      };
      res.status(data.status).json(data);
    }
  } catch (err) {
    res.status(err.status).json(err);
  }
});

router.get("/search/:foodClass", async (req, res) => {
  try {
    let result;
    const { skip, take, q } = req.query;
    const { foodClass } = req.params;
    if (foodClass === "all") {
      result = await getRepository(Food)
        .createQueryBuilder("food")
        .addSelect((subQuery) => (
          subQuery
            .select("COUNT(*)", "count")
            .from(Food, "food")
            .where(`primaryClassification LIKE '%${q}%'
              OR
              secondaryClassification LIKE '%${q}%'
            `)
         ), "total")
        .where(`filipinoName LIKE '%${q}%'
          OR
          englishName LIKE '%${q}%'
        `)
        .orderBy("(IF (food.filipinoName IS NULL, 1, 0)), food.filipinoName", "ASC")
        .addOrderBy("(IF (food.englishName IS NULL, 1, 0)), food.englishName", "ASC")
        .skip(skip)
        .take(take)
        .getRawMany();
    } else {
      result = await getRepository(Food)
        .createQueryBuilder("food")
        .addSelect((subQuery) => (
          subQuery
            .select("COUNT(*)", "count")
            .from(Food, "food")
            .where(`(primaryClassification LIKE '%${foodClass}%'
              OR
              secondaryClassification LIKE '%${foodClass}%')
              AND
              (filipinoName LIKE '%${q}%'
              OR
              englishName LIKE '%${q}%'
              )
            `)
         ), "total")
        .where(`(primaryClassification LIKE '%${foodClass}%'
          OR
          secondaryClassification LIKE '%${foodClass}%')
          AND
          (filipinoName LIKE '%${q}%'
          OR
          englishName LIKE '%${q}%'
          )
        `)
        .orderBy("(IF (food.filipinoName IS NULL, 1, 0)), food.filipinoName", "ASC")
        .addOrderBy("(IF (food.englishName IS NULL, 1, 0)), food.englishName", "ASC")
        .skip(skip)
        .take(take)
        .getRawMany();
    }

    if (!result) {
      const data = {
        status: 404,
        message: "No foods"
      };
      res.status(data.status).json(data);
    } else {
      const data = {
        status: 200,
        message: "Foods found",
        data: result
      };
      res.status(data.status).json(data);
    }
  } catch (err) {
    res.status(err.status).json(err);
  }
});

router.post("/add", async (req, res) => {
  try {

    const result = await getRepository(Food).save(req.body);
    if (!result) {
      const data = {
        status: 500,
        message: "Internal server error"
      };
      res.status(data.status).json(data);
    } else {
      const data = {
        status: 200,
        message: "Food added",
        data: result
      };
      res.status(data.status).json(data);
    }
  } catch (err) {
    res.status(err.status).json(err);
  }
});

export default router;
