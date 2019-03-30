"use strict";
import { Router } from "express";
import { Request, Response } from "express";
import { getRepository, Like } from "typeorm";
import { Food } from "../../database/entities/Food";

const router = Router();

router.get("/find", async (req, res) => {
  try {
    let result;
    const { skip, take, foodClass } = req.query;
    if (!foodClass) {
      result = await getRepository(Food).find({ skip, take });
    } else {
      result = await getRepository(Food).find({
        where: [
          { primaryClassification: Like(`%${foodClass}%`) },
          { secondaryClassification: Like(`%${foodClass}%`) }
        ],
        skip,
        take
      });
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

router.get("/find/count", async (req, res) => {
  try {
    const { foodClass } = req.query;

    let result;
    if (!foodClass) {
      result = await getRepository(Food)
        .createQueryBuilder("food")
        .select("COUNT (*)", "count")
        .getRawOne();
    } else {
      result = await getRepository(Food)
        .createQueryBuilder("food")
        .select("COUNT (*)", "count")
        .where(`primaryClassification LIKE '%${foodClass}%'
          OR
          secondaryClassification LIKE '%${foodClass}%'
        `)
        .getRawOne();
    }

    if (result.count) {
      result.count = parseInt(result.count, 10);
    }

    if (!result) {
      const data = {
        status: 404,
        message: "Zero count"
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
