"use strict";
import { Router } from "express";
import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Food } from "../../database/entities/Food";

const router = Router();

router.get("/find", async (req, res) => {
  try {
    const result = await getManager().getRepository(Food).find();
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
        items: result
      };
      res.status(data.status).json(data);
    }
  } catch (err) {
    res.status(err.status).json(err);
  }
});

export default router;
