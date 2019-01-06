import "reflect-metadata";
import { ConnectionOptions } from "typeorm";
import { User } from "./entities/User";

export const config: ConnectionOptions = {
  type: "mysql",
  username: "root",
  password: "root",
  database: "nutriphi",
  host: "localhost",
  port: 3306,
  synchronize: true,
  logging: false,
  entities: [
    User
  ]
};
