import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique
} from "typeorm";
import { User } from "./User";

@Entity()
export class Weight {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dateOfChange: string;

  @Column("decimal", { precision: 7, scale: 2 })
  weightKg: number;

  @Column("decimal", { precision: 7, scale: 2 })
  weightLbs: number;

  @ManyToOne(() => User, (user: User) => user.weight, {
    onDelete: "CASCADE"
  })
  @JoinColumn()
  user: User;
}
