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

router.get("/find/progress/daily/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result: object[] = [];
    const dateList: string[] = [];
    const queryPromises: Array<Promise<any>> = [];
    let toFetch;
    let date;

    for (let i = 13; i > -1; i--) {
      date = new Date();
      date = new Date(date.setDate(date.getDate() - i));
      toFetch = `${date.getFullYear()}-${(date.getMonth() < 10 ? "0" : "")
        + (date.getMonth() + 1)}-${(date.getDate() < 10 ? "0" : "")
        + date.getDate()}`;
      queryPromises.push(
        getRepository(Consumed)
          .createQueryBuilder()
          .where(`userId = ${id}
            AND dateConsumed LIKE '%${toFetch}%'
          `)
          .getMany()
      );
      dateList.push(toFetch);
    }

    const logs = await Promise.all(queryPromises);
    logs.forEach((log, index) => (
      result.push({
        date: dateList[index],
        totalKcal: log.reduce((kcalAcc: any, curr: any) => kcalAcc + parseFloat(curr.totalKcalConsumed), 0)
      })
    ));

    const data = {
      status: 200,
      message: "Successfully fetched progress",
      data: result
    };
    res.status(data.status).json(data);
  } catch (err) {
    res.status(err.status).json(err);
  }
});

router.get("/find/progress/class/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await getRepository(Consumed)
      .createQueryBuilder("consumed")
      .leftJoin("consumed.food", "food")
      .select([
        "food.primaryClassification",
        "food.secondaryClassification",
        "consumed.dateConsumed"
      ])
      .where(`consumed.user = ${id}`)
      .getMany();

    const toSend: any = {};
    let total = 0;

    result.forEach((log) => {
      const [primClass, , ] = log.food.primaryClassification.split("-");
      if (log.food.secondaryClassification) {
        const secClass = log.food.secondaryClassification;
        toSend[primClass] = (toSend[primClass] || 0) + 0.5;
        toSend[secClass] = (toSend[secClass] || 0) + 0.5;
      } else {
        toSend[primClass] = (toSend[primClass] || 0) + 1;
      }
      total += 1;
    });

    const keys = Object.keys(toSend);
    keys.forEach((key) => (
      toSend[key] = parseFloat(((toSend[key] / total) * 100).toFixed(2))
    ));

    const data = {
      status: 200,
      message: "Successfully fetched progress",
      data: toSend
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

router.post("/add/meal", async (req, res) => {
  try {
    const {
      logs
    } = req.body;

    const queryPromises: Array<Promise<Consumed>> = [];
    logs.forEach(async (log: any) => {
      const { foodId: food, gramsmlConsumed, ...logCopy } = log;
      const foodSearched = await getRepository(Food).findOne(food);
      const totalKcal = consumedUtil.getKcal(foodSearched, gramsmlConsumed);
      queryPromises.push(getRepository(Consumed).save(
        Object.assign({ ...totalKcal, food }, logCopy)
      ));
    });

    await Promise.all(queryPromises);
    const data = {
      status: 200,
      message: "Successfully added meal"
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
