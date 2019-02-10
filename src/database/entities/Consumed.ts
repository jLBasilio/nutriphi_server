import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { User } from "./User";

@Entity()
export class Consumed {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  foodId: number;

  @Column()
  dateConsumed: Date;

  @ManyToOne(() => User, (user: User) => user.consumed, {
    onDelete: "CASCADE"
  })
  @JoinColumn()
  user: User;

}
