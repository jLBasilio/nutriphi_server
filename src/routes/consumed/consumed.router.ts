"use strict";
import { Router } from "express";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Consumed } from "../../database/entities/Consumed";
import { Food } from "../../database/entities/Food";
import * as consumedUtil from "../../utils/consumed.util";

const router = Router();

router.get("/find/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { skip, take, q } = req.query;
    const toReturn: any[] = [];
    let foodPromises: any[] = [];

    const result = await getRepository(Consumed)
      .createQueryBuilder("consumed")
      .addSelect((subQuery) => (
        subQuery
          .select("COUNT(*)", "count")
          .from(Consumed, "")
          .where(`userId = ${userId}`)
       ), "total")
      .where(`userId = ${userId}`)
      .orderBy("dateConsumed", "DESC")
      .skip(skip)
      .take(take)
      .getRawMany();

    result.forEach((consumed, index) => {
      toReturn.push(JSON.parse(JSON.stringify(consumed)));
      foodPromises.push(getRepository(Food).findOne({ id: consumed.consumed_foodId }));
    });
    foodPromises = await Promise.all(foodPromises);
    toReturn.forEach((consumed, index) => consumed.foodInfo = foodPromises[index]);

    const data = {
      status: 200,
      message: "Successfully fetched consumed",
      data: toReturn
    };
    res.status(data.status).json(data);
  } catch (err) {
    res.status(err.status).json(err);
  }
});

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
      message: "Successfully added consumed",
      data: result
    };
    res.status(data.status).json(data);
  } catch (err) {
    res.status(err.status).json(err);
  }
});

export default router;
