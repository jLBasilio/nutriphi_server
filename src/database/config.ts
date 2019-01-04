import "reflect-metadata";
import { User } from "./entities/User"
import { ConnectionOptions } from "typeorm";

 export const config: ConnectionOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "nutriphi",
  synchronize: true,
  logging: false,
  entities: [
    User
  ]
}