"use strict";
import { Router } from "express";
import { Request, Response } from "express";
import { getManager, Like } from "typeorm";
import { Food } from "../../database/entities/Food";

const router = Router();

router.get("/find", async (req, res) => {
  try {

    let result;
    const { skip, take, foodClass } = req.query;
    if (!foodClass) {
      result = await getManager().getRepository(Food).find();
    } else {
      result = await getManager().getRepository(Food).find({
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

router.post("/add", async (req, res) => {
  try {

    // console.log(req.body);
    const result = await getManager().getRepository(Food).save(req.body);
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
