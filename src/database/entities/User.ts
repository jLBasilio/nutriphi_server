import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Consumed } from "./Consumed";
import { Favorite } from "./Favorite";
import { Meal } from "./Meal";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  userName: string;

  @Column()
  password: string;

  @Column()
  sex: string;

  @Column()
  age: number;

  @Column()
  birthday: string;

  @Column("decimal", { precision: 7, scale: 2 })
  weightKg: number;

  @Column("decimal", { precision: 7, scale: 2 })
  weightLbs: number;

  @Column("decimal", { precision: 7, scale: 2 })
  goalKg: number;

  @Column("decimal", { precision: 7, scale: 2 })
  goalLbs: number;

  @Column("decimal", { precision: 7, scale: 2 })
  heightCm: number;

  @Column("decimal", { precision: 7, scale: 2 })
  heightFt: number;

  @Column("decimal", { precision: 7, scale: 2 })
  heightInch: number;

  @Column("decimal", { precision: 7, scale: 2 })
  bmi: number;

  @Column()
  bmiClass: string;

  @Column()
  dbwKg: string;

  @Column("decimal", { precision: 7, scale: 2 })
  lifestyleMultiplier: number;

  @Column()
  target: string;

  @Column({ nullable: true })
  endDate: string;

  @Column("decimal", { precision: 7, scale: 2 })
  choPerDay: number;

  @Column("decimal", { precision: 7, scale: 2 })
  proPerDay: number;

  @Column("decimal", { precision: 7, scale: 2 })
  fatPerDay: number;

  @Column({ nullable: true })
  weeksToComplete: number;

  @Column("decimal", { precision: 7, scale: 2, nullable: true })
  kcalAddSubToGoal: number;

  @Column("decimal", { precision: 7, scale: 2 })
  baseTEA: number;

  @Column("decimal", { precision: 7, scale: 2 })
  goalTEA: number;

  @OneToMany(() => Consumed, (consumed: Consumed) => consumed.user)
  consumed: Consumed[];

  @OneToMany(() => Favorite, (favorite: Favorite) => favorite.user)
  favorite: Favorite[];

  @OneToMany(() => Meal, (meal: Meal) => meal.user)
  meal: Meal[];

}
