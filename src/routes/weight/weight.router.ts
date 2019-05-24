"use strict";
import { Router } from "express";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../../database/entities/User";
import { Weight } from "../../database/entities/Weight";

const router = Router();

router.get("/find/:id", async (req, res) => {
  try {
    const { id: userId } = req.params;
    const { date } = req.query;

    const result = await getRepository(Weight)
      .createQueryBuilder("weight")
      .select(["weight.weightKg", "weight.dateOfChange"])
      .where(`weight.user = ${userId}`)
      .orderBy("weight.dateOfChange", "ASC")
      .getMany();

    console.log(result);

    const data = {
      status: 200,
      message: "Successfully fetched weight history",
      data: result
    };
    res.status(data.status).json(data);
  } catch (err) {
    res.status(err.status).json(err);
  }
});

export default router;
