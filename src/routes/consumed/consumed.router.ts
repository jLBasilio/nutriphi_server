"use strict";
import { Router } from "express";
import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Consumed } from "../../database/entities/Consumed";
import { User } from "../../database/entities/User";

const router = Router();

router.get("/find", async (req, res) => {
  try {
    const result = await getManager().getRepository(Consumed).find();
    if (!result.length) {
      const data = {
        status: 404,
        message: "No consumed foods"
      };
      res.status(data.status).json(data);
    } else {
      const data = {
        status: 200,
        message: "Consumed foods found",
        items: result
      };
      res.status(data.status).json(data);
    }
  } catch (err) {
    res.status(err.status).json(err);
  }
});

router.get("/find/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getManager().getRepository(Consumed).find({ user: id });
    if (!result.length) {
      const data = {
        status: 404,
        message: "No consumed foods"
      };
      res.status(data.status).json(data);
    } else {
      const data = {
        status: 200,
        message: "Consumed foods found",
        items: result
      };
      res.status(data.status).json(data);
    }
  } catch (err) {
    res.status(err.status).json(err);
  }
});

router.post("/add", async (req, res) => {
  try {
    const {
      foodId,
      dateConsumed,
      user
    } = req.body;
    const result = await getManager().getRepository(Consumed).save(req.body);
    const data = {
      status: 200,
      message: "Successfully added consumed food",
      items: result
    };
    res.status(data.status).json(data);
  } catch (err) {
    res.status(err.status).json(err);
  }
});

export default router;
