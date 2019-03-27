"use strict";
import { Router } from "express";
import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Nutrient } from "../../database/entities/Nutrient";

const router = Router();

router.post("/add", async (req, res) => {
  try {
    const result = await getManager().getRepository(Nutrient).save(req.body);
    if (!result) {
      const data = {
        status: 500,
        message: "Internal server error"
      };
      res.status(data.status).json(data);
    } else {
      const data = {
        status: 200,
        message: "Nutrient added",
        items: result
      };
      res.status(data.status).json(data);
    }
  } catch (err) {
    res.status(err.status).json(err);
  }
});

export default router;
