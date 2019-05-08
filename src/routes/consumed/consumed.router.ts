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
    const { date, period } = req.query;
    let result = [];
    if (period) {
      result = await getRepository(Consumed)
        .createQueryBuilder("consumed")
        .leftJoinAndSelect("consumed.food", "food")
        .addSelect((subQuery) => (
          subQuery
            .select("COUNT(*)", "count")
            .from(Consumed, "")
            .where(`userId = ${userId}`)
         ), "total")
        .where(`userId = ${userId}
          AND dateConsumed LIKE '%${date}%'
          AND period = '${period}'
        `)
        .orderBy("dateConsumed", "DESC")
        .getRawMany();
    } else {
      result = await getRepository(Consumed)
        .createQueryBuilder("consumed")
        .leftJoinAndSelect("consumed.food", "food")
        .addSelect((subQuery) => (
          subQuery
            .select("COUNT(*)", "count")
            .from(Consumed, "")
            .where(`userId = ${userId}`)
         ), "total")
        .where(`userId = ${userId}
          AND dateConsumed LIKE '%${date}%'
        `)
        .orderBy("dateConsumed", "DESC")
        .getRawMany();
    }

    const data = {
      status: 200,
      message: "Successfully fetched consumed",
      data: result
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
      foodId: food,
      gramsmlConsumed,
      dateConsumed
    } = req.body;
    const foodSearched = await getRepository(Food).findOne(food);
    const totalKcal = consumedUtil.getKcal(foodSearched, gramsmlConsumed);
    const consumed = {
      user,
      period,
      food,
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

router.put("/edit/:consumedId", async (req, res) => {
  try {
    const { consumedId } = req.params;
    const { userId, id, ...logInfo } = JSON.parse(JSON.stringify(req.body).replace(/consumed_/g, ""));
    const food = await getRepository(Food).findOne(logInfo.foodId);
    const totalKcal = consumedUtil.getKcal(food, logInfo.gramsmlConsumed);
    const result = await getRepository(Consumed)
      .createQueryBuilder("consumed")
      .update(Consumed)
      .set({ ...logInfo, ...totalKcal })
      .where(`userId = ${userId} AND id = ${id}`)
      .execute();
    const data = {
      status: 200,
      message: "Successfully updated consumed",
    };
    res.status(data.status).json(data);
  } catch (err) {
    res.status(err.status).json(err);
  }
});

router.delete("/delete/:consumedId", async (req, res) => {
  try {
    const { consumedId } = req.params;
    const result = await getRepository(Consumed).delete(consumedId);
    const data = {
      status: 200,
      message: "Successfully deleted consumed",
    };
    res.status(data.status).json(data);
  } catch (err) {
    res.status(err.status).json(err);
  }
});

export default router;
