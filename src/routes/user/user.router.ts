"use strict";
import * as bcrypt from "bcrypt";
import { Router } from "express";
import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../../database/entities/User";
import * as userUtil from "../../utils/user.util";
import * as middleware from "./user.middleware";

const router = Router();

router.get("/find", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getManager().getRepository(User).find();
    if (typeof(result) !== "undefined") {
      const data = {
        status: 200,
        message: "Users found",
        items: result
      };
      res.status(data.status).json(data);
    } else {
      const data = {
        status: 404,
        message: "No users"
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
        message: "User found",
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
        message: "User found",
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
        message: "Successfully added user",
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

router.post("/login", middleware.isLoggedIn, async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await getManager().getRepository(User).findOne({ userName });
    if (typeof(user) === "undefined") {
      const data = {
        status: 401,
        message: "Invalid credentials",
      };
      return res.status(data.status).json(data);
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const data = {
          status: 200,
          message: "Successfully logged in",
          items: user
        };
        req.session.user = user;
        res.status(data.status).json(data);
      } else {
        const data = {
          status: 401,
          message: "Invalid credentials",
        };
        res.status(data.status).json(data);
      }
    });
  } catch (err) {
    res.status(err.status).json(err);
  }
});

router.post("/logout", async (req, res) => {
  try {
    await req.session.destroy(null);
    const data = {
      status: 200,
      message: "Successfully logged out"
    };
    res.status(data.status).json(data);
  } catch (err) {
    res.status(err.status).json(err);
  }
});

router.post("/session", async (req, res) => {
  try {
    const data = {
      status: 200,
      message: "Successfully fetched current session.",
      data: req.session.user || null
    };
    res.status(data.status).json(data);
  } catch (err) {
    res.status(err.status).json(err);
  }
});

export default router;
