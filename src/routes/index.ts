import { Router } from "express";

import consumedRouter from "./consumed/consumed.router";
import favoriteRouter from "./favorite/favorite.router";
import foodRouter from "./food/food.router";
import mealRouter from "./meal/meal.router";
import nutrientRouter from "./nutrient/nutrient.router";
import userRouter from "./user/user.router";
import weightRouter from "./weight/weight.router";

const router = Router();

router.get("/", (req, res) => {
  res.send("Specify API.");
});

router.use("/user", userRouter);
router.use("/consumed", consumedRouter);
router.use("/food", foodRouter);
router.use("/meal", mealRouter);
router.use("/nutrient", nutrientRouter);
router.use("/favorite", favoriteRouter);
router.use("/weight", weightRouter);

export default router;
