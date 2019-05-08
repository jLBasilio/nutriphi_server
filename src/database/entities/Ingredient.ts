import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Food } from "./Food";
import { Meal } from "./Meal";

@Entity()
export class Ingredient {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("decimal", { precision: 7, scale: 2, nullable: true })
  gramsConsumed: number;

  @Column("decimal", { precision: 7, scale: 2, nullable: true })
  mlConsumed: number;

  @Column("decimal", { precision: 7, scale: 2 })
  totalKcalConsumed: number;

  @Column("decimal", { precision: 7, scale: 2 })
  choGrams: number;

  @Column("decimal", { precision: 7, scale: 2 })
  proGrams: number;

  @Column("decimal", { precision: 7, scale: 2 })
  fatGrams: number;

  @ManyToOne(() => Meal, (meal: Meal) => meal.ingredient, {
    onDelete: "CASCADE"
  })
  @JoinColumn()
  meal: Meal;

  @ManyToOne(() => Food, (food: Food) => food.ingredient, {
    onDelete: "CASCADE"
  })
  @JoinColumn()
  food: Food;
}
