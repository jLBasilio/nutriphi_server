"use strict";
import { Router } from "express";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Favorite } from "../../database/entities/Favorite";
import { Food } from "../../database/entities/Food";

const router = Router();

router.get("/find/id/:id", async (req, res) => {
  try {
    const { id: user } = req.params;
    let result = await getRepository(Favorite)
      .createQueryBuilder("favorite")
      .where(`userId = ${user}`)
      .getRawMany();
    result = JSON.parse(JSON.stringify(result));
    result = result.reduce((acc, curr) => [...acc, curr.favorite_foodId], []);
    if (!result) {
      const data = {
        status: 500,
        message: "Internal server error"
      };
      res.status(data.status).json(data);
    } else {
      const data = {
        status: 200,
        message: "Successfully fetched favorites",
        data: result
      };
      res.status(data.status).json(data);
    }
  } catch (err) {
    res.status(err.status).json(err);
  }
});

router.get("/find/food/:id", async (req, res) => {
  try {
    const { id: user } = req.params;
    const { skip, take } = req.query;

    const result = await getRepository(Favorite)
      .createQueryBuilder("favorite")
      .leftJoinAndSelect("favorite.food", "food")
      .addSelect((subQuery) => (
        subQuery
          .select("COUNT(*)", "count")
          .from(Favorite, "favorite")
          .where(`userId = ${user}`)
       ), "total")
      .where(`userId = ${user}`)
      .orderBy("favorite.id", "DESC")
      .offset(skip)
      .limit(take)
      .getRawMany();

    if (!result.length) {
      const data = {
        status: 500,
        message: "Internal server error"
      };
      res.status(data.status).json(data);
    } else {
      const data = {
        status: 200,
        message: "Successfully fetched favorites",
        data: result
      };
      res.status(data.status).json(data);
    }
  } catch (err) {
    res.status(err.status).json(err);
  }
});

router.post("/add/:id", async (req, res) => {
  try {
    const { id: user } = req.params;
    const { foodId: food } = req.query;
    const result = await getRepository(Favorite).save({ food, user });

    if (!result) {
      const data = {
        status: 500,
        message: "Internal server error"
      };
      res.status(data.status).json(data);
    } else {
      const data = {
        status: 200,
        message: "Added to favorites",
      };
      res.status(data.status).json(data);
    }
  } catch (err) {
    res.status(err.status).json(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id: user } = req.params;
    const { foodId: food } = req.query;
    const result = await getRepository(Favorite).delete({ food, user });
    if (!result) {
      const data = {
        status: 500,
        message: "Internal server error"
      };
      res.status(data.status).json(data);
    } else {
      const data = {
        status: 200,
        message: "Deleted from favorites",
      };
      res.status(data.status).json(data);
    }
  } catch (err) {
    res.status(err.status).json(err);
  }
});

export default router;
