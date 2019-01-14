import { Router } from "express";
import userRouter from "./user/user.router";

const router = Router();

router.get("/", (req, res) => {
  res.send("Specify API.");
});

router.use("/user", userRouter);

export default router;
