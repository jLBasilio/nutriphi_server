import { Router } from "express";
import consumedRouter from "./consumed/consumed.router";
import userRouter from "./user/user.router";

const router = Router();

router.get("/", (req, res) => {
  res.send("Specify API.");
});

router.use("/user", userRouter);
router.use("/consumed", consumedRouter);

export default router;
