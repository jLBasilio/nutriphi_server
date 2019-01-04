'use strict';
import express from "express";
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import router from './routes';
import * as db from './database/config';

const app = express();
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', router);

app.use('*', (req, res, next) => {
  let err: any;
  err = new Error();
  err.status = 404;
  next(err);
});

app.use((err: any, req: any, res: any, next: any) => {
  res.status(err.status || 404);
  res.send(err.status + ". API does not exist.")
});

app.set("port", process.env.PORT || 3001);

const server = app.listen(app.get('port'), () => {
  console.log(
    "Server is running on http://localhost:%d in %s node",
    app.get("port"),
    app.get("env")
  )
})

createConnection(db.config).then(async connection => {
  console.log("Successfully connected to database");
}).catch(error => console.log("TypeORM connection error: ", error));

export default app;
