import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Food } from "./Food";
import { User } from "./User";

@Entity()
export class Consumed {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  gramsConsumed: number;

  @Column({ nullable: true })
  mlConsumed: number;

  @Column()
  totalKcalConsumed: number;

  @Column()
  choGrams: number;

  @Column()
  proGrams: number;

  @Column()
  fatGrams: number;

  @Column()
  period: string;

  @Column()
  dateConsumed: string;

  @ManyToOne(() => User, (user: User) => user.consumed, {
    onDelete: "CASCADE"
  })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Food, (food: Food) => food.consumed, {
    onDelete: "CASCADE"
  })
  @JoinColumn()
  food: Food;

}
