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
    const { foodId } = req.body;
    const food = await getRepository(Food).findOne(foodId);
    const totalKcal = consumedUtil.getKcal(food);
    const data = {
      status: 200,
      message: "Successfully added consumed food",
      items: "sad"
    };
    res.status(data.status).json(data);
  } catch (err) {
    res.status(err.status).json(err);
  }
});

export default router;
