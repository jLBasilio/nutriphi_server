"use strict";
import { Router } from "express";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Ingredient } from "../../database/entities/Ingredient";
import { Meal } from "../../database/entities/Meal";
import { User } from "../../database/entities/User";

const router = Router();

router.get("/find/:id", async (req, res) => {
  try {
    const { id: userId } = req.params;
    const { skip, take } = req.query;

    let result: any = await getRepository(Meal)
      .createQueryBuilder("meal")
      .innerJoinAndSelect("meal.ingredient", "ingredient")
      .innerJoinAndSelect("ingredient.food", "food")
      .where(`userId = ${userId}`)
      .orderBy("meal.id", "ASC")
      .getMany();

    if (!result.length) {
      const data = {
        status: 404,
        message: "No meals found"
      };
      res.status(data.status).json(data);
    } else {
      const count = await getRepository(Meal)
        .createQueryBuilder()
        .select("COUNT(*)", "count")
        .where(`userId = ${userId}`)
        .getRawOne();

      result = JSON.parse(JSON.stringify(result));
      result[0].total = count.count;

      const data = {
        status: 200,
        message: "Fetched meal",
        data: result
      };
      res.status(data.status).json(data);
    }
  } catch (err) {
    res.status(err.status).json(err);
  }
});

router.get("/search/:id", async (req, res) => {
  try {
    const { id: userId } = req.params;
    const { q, skip, take } = req.query;

    let result: any = await getRepository(Meal)
      .createQueryBuilder("meal")
      .innerJoinAndSelect("meal.ingredient", "ingredient")
      .innerJoinAndSelect("ingredient.food", "food")
      .where(`
        userId = ${userId}
        AND
        mealName LIKE '%${q}%'
      `)
      .orderBy("meal.id", "ASC")
      .getMany();

    if (!result.length) {
      const data = {
        status: 404,
        message: "No meals found"
      };
      res.status(data.status).json(data);
    } else {
      const count = await getRepository(Meal)
        .createQueryBuilder()
        .select("COUNT(*)", "count")
        .where(`
          userId = ${userId}
          AND
          mealName LIKE '%${q}%'
        `)
        .getRawOne();

      result = JSON.parse(JSON.stringify(result));
      result[0].total = count.count;

      const data = {
        status: 200,
        message: "Fetched meal",
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
    const ingredientPromises: Array<Promise<Ingredient>> = [];

    const meal = new Meal();
    Object.assign(meal, req.body);
    meal.user = user;

    req.body.ingredients.forEach((food: object) => {
      const ingredient = new Ingredient();
      Object.assign(ingredient, food);
      ingredientPromises.push(getRepository(Ingredient).save(ingredient));
    });

    meal.ingredient = await Promise.all(ingredientPromises);
    const result = await getRepository(Meal).save(meal);
    const data = {
      status: 200,
      message: "Successfully added meal",
      data: result
    };
    res.status(data.status).json(data);
  } catch (err) {
    res.status(err.status).json(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id: user } = req.params;
    const { mealId: id } = req.query;

    const result = await getRepository(Meal)
      .createQueryBuilder()
      .delete()
      .from(Meal)
      .where(` id = ${id} AND userId = ${user}`)
      .execute();

    const data = {
      status: 200,
      message: "Successfully deleted meal",
    };
    res.status(data.status).json(data);
  } catch (err) {
    res.status(err.status).json(err);
  }
});

router.put("/edit", async (req, res) => {
  try {
    const { mealId: meal } = req.query;
    const { deleted, ingredient: newIngredient, ...mealInfo  } = req.body;
    const queryPromises: Array<Promise<any>> = [];

    deleted.forEach((id: any) => queryPromises.push(getRepository(Ingredient).delete(id)));
    newIngredient.forEach((ingredient: any) => {
      const { id, ...ingInfo } = ingredient;
      queryPromises.push (
        id
          ? getRepository(Ingredient)
            .createQueryBuilder("ingredient")
            .update(Ingredient)
            .set({ ...ingInfo })
            .where(`mealId = ${meal} and id=${id}`)
            .execute()
          : getRepository(Ingredient).save({ ...ingInfo, meal })
      );
    });

    queryPromises.push(
      getRepository(Meal)
      .createQueryBuilder("meal")
      .update(Meal)
      .set({ ...mealInfo })
      .where(`id = ${meal}`)
      .execute()
    );

    try {
      await Promise.all(queryPromises);
    } catch (err) {
      console.log(err);
    }
    const data = {
      status: 200,
      message: "Successfully updated meal"
    };
    res.status(data.status).json(data);
  } catch (err) {
    res.status(err.status).json(err);
  }
});

export default router;
