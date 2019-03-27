"use strict";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as session from "express-session";
import * as logger from "morgan";
import * as path from "path";
import "reflect-metadata";
import { createConnection, getConnection } from "typeorm";
import { TypeormStore } from "typeorm-store";
import * as db from "./database/config";
import { Session } from "./database/entities/Session";
import router from "./routes";

createConnection(db.config).then(async (connection) => {

  const app = express();
  const repository = connection.getRepository(Session);
  app.use(session({
    secret: "laderlappen",
    resave: false,
    saveUninitialized: false,
    store: new TypeormStore({
      repository,
      ttl: 86400
    })
  }));

  app.use(logger("dev"));
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(express.static(path.join(__dirname, "public")));

  app.use("/api", router);
  app.use("*", (req, res, next) => {
    let err: any;
    err = new Error();
    err.status = 404;
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

  console.log("Successfully connected to database");

}).catch((error) => console.log("Error connecting to database: ", error));
