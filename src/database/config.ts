import "reflect-metadata";
import { ConnectionOptions } from "typeorm";
import { Consumed } from "./entities/Consumed";
import { Favorite } from "./entities/Favorite";
import { Food } from "./entities/Food";
import { Ingredient } from "./entities/Ingredient";
import { Meal } from "./entities/Meal";
import { Nutrient } from "./entities/Nutrient";
import { Session } from "./entities/Session";
import { User } from "./entities/User";
import { Weight } from "./entities/Weight";

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
    Session,
    Consumed,
    Food,
    Nutrient,
    Favorite,
    Meal,
    Ingredient,
    Weight
  ]
};
