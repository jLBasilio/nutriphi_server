"use strict";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import logger from "morgan";
import path from "path";
import "reflect-metadata";
import { createConnection } from "typeorm";
import * as db from "./database/config";
import router from "./routes";

const app = express();
app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", router);

app.use("*", (req, res, next) => {
  let err: any;
  err = new Error();
  err.status = 404;
  next(err);
});

app.use((err: any, req: any, res: any, next: any) => {
  res.status(err.status || 404);
  res.send(err.status + ". API does not exist.");
});

app.set("port", process.env.PORT || 3001);

const server = app.listen(app.get("port"), () => {
  console.log(
    "Server is running on http://localhost:%d in %s node",
    app.get("port"),
    app.get("env")
  );
});

createConnection(db.config).then(async (connection) => {
  console.log("Successfully connected to database");
}).catch((error) => console.log("Error connecting to database: ", error));

export default app;
