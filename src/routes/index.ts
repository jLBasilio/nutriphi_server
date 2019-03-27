import { Router } from "express";

import consumedRouter from "./consumed/consumed.router";
import foodRouter from "./food/food.router";
import nutrientRouter from "./nutrient/nutrient.router";
import userRouter from "./user/user.router";

const router = Router();

router.get("/", (req, res) => {
  res.send("Specify API.");
});

router.use("/user", userRouter);
router.use("/consumed", consumedRouter);
router.use("/food", foodRouter);
router.use("/nutrient", nutrientRouter);

export default router;
