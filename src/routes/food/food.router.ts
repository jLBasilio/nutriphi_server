"use strict";
import { Router } from "express";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
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
        .offset(skip)
        .limit(take)
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
        .offset(skip)
        .limit(take)
        .getRawMany();
    }

    if (!result.length) {
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

router.get("/search/raw/:foodClass", async (req, res) => {
  try {
    const { q } = req.query;
    const { foodClass } = req.params;
    const result = await getRepository(Food)
      .createQueryBuilder("food")
      .where(`filipinoName LIKE '%${q}%'
        OR
        englishName LIKE '%${q}%'
      `)
      .orderBy("(IF (food.filipinoName IS NULL, 1, 0)), food.filipinoName", "ASC")
      .addOrderBy("(IF (food.englishName IS NULL, 1, 0)), food.englishName", "ASC")
      .getRawMany();

    if (!result.length) {
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
            .where(`filipinoName LIKE '%${q}%'
              OR
              englishName LIKE '%${q}%'
            `)
         ), "total")
        .where(`filipinoName LIKE '%${q}%'
          OR
          englishName LIKE '%${q}%'
        `)
        .orderBy("(IF (food.filipinoName IS NULL, 1, 0)), food.filipinoName", "ASC")
        .addOrderBy("(IF (food.englishName IS NULL, 1, 0)), food.englishName", "ASC")
        .offset(skip)
        .limit(take)
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
        .offset(skip)
        .limit(take)
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

router.post("/rec", async (req, res) => {
  try {
    let {
      choLeft,
      proLeft,
      fatLeft
    } = req.body;

    choLeft = parseFloat(choLeft);
    proLeft = parseFloat(proLeft);
    fatLeft = parseFloat(fatLeft);

    let result;
    let addtl: any = [];

    result = await getRepository(Food)
      .createQueryBuilder()
      .where(`((${choLeft - 12} <= choPerExchange AND choPerExchange <= ${choLeft + 12})
        OR  (${proLeft - 12} <= proPerExchange AND proPerExchange <= ${proLeft + 12})
        OR  (${fatLeft - 5} <= fatPerExchange AND fatPerExchange <= ${fatLeft + 5}))
        AND primaryClassification NOT LIKE '%free%'
      `)
      .orderBy(`rand()`)
      .limit(5)
      .getMany();

    if (result.length < 5) {
      const toGet = 5 - result.length;
      addtl = await getRepository(Food)
        .createQueryBuilder()
        .where("primaryClassification NOT LIKE '%free%'")
        .orderBy(`rand()`)
        .limit(toGet)
        .getMany();
    }

    result = [...result, ...addtl];
    const data = {
      status: 200,
      message: "Successfully fetched recommended",
      data: result
    };
    res.status(data.status).json(data);
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
