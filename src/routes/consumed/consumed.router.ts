"use strict";
import { Router } from "express";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Consumed } from "../../database/entities/Consumed";
import { Food } from "../../database/entities/Food";
import * as consumedUtil from "../../utils/consumed.util";

const router = Router();

router.post("/add", async (req, res) => {
  try {
    const {
      user,
      period,
      foodId,
      gramsmlConsumed,
      dateConsumed
    } = req.body;
    const food = await getRepository(Food).findOne(foodId);
    const totalKcal = consumedUtil.getKcal(food, gramsmlConsumed);
    const consumed = {
      user,
      period,
      foodId,
      dateConsumed,
      ...totalKcal
    };

    const result = await getRepository(Consumed).save(consumed);
    const data = {
      status: 200,
      message: "Successfully added user",
      data: result
    };
    res.status(data.status).json(data);
  } catch (err) {
    res.status(err.status).json(err);
  }
});

export default router;
