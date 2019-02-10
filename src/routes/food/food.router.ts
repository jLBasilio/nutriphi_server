"use strict";
import { Router } from "express";
import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Food } from "../../database/entities/Food";

const router = Router();

router.get("/find", async (req, res) => {
  try {
    const { id } = req.params;
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

export default router;
