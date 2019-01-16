import "reflect-metadata";
import { ConnectionOptions } from "typeorm";
import { Session } from "./entities/Session";
import { User } from "./entities/User";

export const config: ConnectionOptions = {
  type: "mysql",
  username: "nutriphi",
  password: "root",
  database: "nutriphi",
  host: "localhost",
  port: 3306,
  synchronize: true,
  logging: false,
  entities: [
    User,
    Session
  ]
};
