import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Ingredient } from "./Ingredient";
import { User } from "./User";

@Entity()
export class Meal {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mealName: string;

  @Column("decimal", { precision: 7, scale: 2 })
  mealTotalKcal: number;

  @Column("decimal", { precision: 7, scale: 2 })
  mealChoGrams: number;

  @Column("decimal", { precision: 7, scale: 2 })
  mealProGrams: number;

  @Column("decimal", { precision: 7, scale: 2 })
  mealFatGrams: number;

  @ManyToOne(() => User, (user: User) => user.meal, {
    onDelete: "CASCADE"
  })
  @JoinColumn()
  user: User;

  @OneToMany(() => Ingredient, (ingredient: Ingredient) => ingredient.meal)
  ingredient: Ingredient[];

}
