'use strict';
import express from 'express';
const router = express.Router();
import userRouter from './user.router';

router.get('/', (req, res) => {
  res.send("Specify API.");
})

router.use('/user', userRouter);

export default router;