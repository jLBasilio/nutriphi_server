"use strict";
import * as bcrypt from "bcrypt";
import { Router } from "express";
import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../database/entities/User";
import * as userUtil from "../utils/user.util";

const router = Router();

router.get("/find", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getManager().getRepository(User).find();
    if (typeof(result) !== "undefined") {
      const data = {
        status: 200,
        message: "Users found.",
        items: result
      };
      res.status(data.status).json(data);
    } else {
      const data = {
        status: 404,
        message: "No users."
      };
      res.status(data.status).json(data);
    }
  } catch (err) {
    res.status(err.status).json(err);
  }
});

router.get("/find/id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getManager().getRepository(User).findOne(id);
    if (typeof(result) !== "undefined") {
      const data = {
        status: 200,
        message: "User found.",
        items: result
      };
      res.status(data.status).json(data);
    } else {
      const data = {
        status: 404,
        message: "User not found"
      };
      res.status(data.status).json(data);
    }
  } catch (err) {
    res.status(err.status).json(err);
  }
});

router.get("/find/username", async (req, res) => {
  try {
    const { userName } = req.body;
    const result = await getManager().getRepository(User).findOne({ userName });
    if (typeof(result) !== "undefined") {
      const data = {
        status: 200,
        message: "User found.",
        items: result
      };
      res.status(data.status).json(data);
    } else {
      const data = {
        status: 404,
        message: "User not found"
      };
      res.status(data.status).json(data);
    }
  } catch (err) {
    res.status(err.status).json(err);
  }
});

router.post("/add", async (req, res) => {
  try {
    const { userName } = req.body;
    const existing = await getManager().getRepository(User).findOne({ userName });
    if (typeof(existing) === "undefined") {
      [req.body.password, req.body.bmi] = await Promise.all([
        bcrypt.hash(req.body.password, 10),
        userUtil.getBMI(req.body)
      ]);
      const result = await getManager().getRepository(User).save(req.body);
      const data = {
        status: 200,
        message: "Successfully added user.",
        items: result
      };
      res.status(data.status).json(data);
    } else {
      const data = {
        status: 409,
        message: "User already exists"
      };
      res.status(data.status).json(data);
    }
  } catch (err) {
    res.status(err.status).json(err);
  }
});

export default router;
