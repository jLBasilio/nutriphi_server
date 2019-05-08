import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Consumed } from "./Consumed";
import { Favorite } from "./Favorite";
import { Ingredient } from "./Ingredient";

@Entity()
export class Food {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  filipinoName: string;

  @Column({ nullable: true })
  englishName: string;

  // Main view
  @Column()
  primaryClassification: string;

  // Secondary view
  @Column({ nullable: true })
  secondaryClassification: string;

  @Column()
  servingMeasurement: string;

  @Column("decimal", { precision: 7, scale: 2 })
  choPerExchange: number;

  @Column("decimal", { precision: 7, scale: 2 })
  proPerExchange: number;

  @Column("decimal", { precision: 7, scale: 2 })
  fatPerExchange: number;

  @Column("decimal", { precision: 7, scale: 2, nullable: true })
  gramsEPPerExchange: number;

  @Column("decimal", { precision: 7, scale: 2, nullable: true  })
  mlEPPerExchange: number;

  @Column("decimal", { precision: 7, scale: 2 })
  exchangePerMeasure: number;

  @Column({ nullable: true })
  directKcalPerMeasure: number;

  @Column({ nullable: true })
  unitMeasurement: string;

  @OneToMany(() => Favorite, (favorite: Favorite) => favorite.food)
  favorite: Favorite[];

  @OneToMany(() => Consumed, (consumed: Consumed) => consumed.food)
  consumed: Consumed[];

  @OneToMany(() => Ingredient, (ingredient: Ingredient) => ingredient.food)
  ingredient: Ingredient[];
}
