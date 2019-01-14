"use strict";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as store from "express-mysql-session";
import * as session from "express-session";
import * as logger from "morgan";
import * as path from "path";
import "reflect-metadata";
import { createConnection } from "typeorm";
import * as db from "./database/config";
import router from "./routes";

const app = express();
// const MySQLStore = store(session);
// const sessionStore = new MySQLStore(db.config);

app.use(session({
  secret: "laderlappen",
  // store: sessionStore,
  resave: false,
  saveUninitialized: false
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
