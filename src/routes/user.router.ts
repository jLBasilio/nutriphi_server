import express from "express";
import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../database/entities/User";

const router = express.Router();

router.get("/findall", async (req, res) => {
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

router.get("/findone/id/:id", async (req, res) => {
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

router.get("/findone/username", async (req, res) => {
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
    const newUser = new User();
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.userName = req.body.userName;
    newUser.age = req.body.age;

    const result = await getManager().getRepository(User).save(newUser);
    const data = {
      status: 200,
      message: "Successfully added user.",
      items: result
    };
    res.status(data.status).json(data);
  } catch (err) {
    res.status(err.status).json(err);
  }
});

export default router;
