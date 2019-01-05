import "reflect-metadata";
import { ConnectionOptions } from "typeorm";
import { User } from "./entities/User";

export const config: ConnectionOptions = {
  database: "nutriphi",
  entities: [
    User
  ],
  host: "localhost",
  logging: false,
  password: "root",
  port: 3306,
  synchronize: true,
  type: "mysql",
  username: "root"
};
