import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique
} from "typeorm";
import { Food } from "./Food";
import { User } from "./User";

@Entity()
@Unique(["food", "user"])
export class Favorite {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Food, (food: Food) => food.favorite, {
    onDelete: "CASCADE"
  })
  @JoinColumn()
  food: Food;

  @ManyToOne(() => User, (user: User) => user.favorite, {
    onDelete: "CASCADE"
  })
  @JoinColumn()
  user: User;

}
