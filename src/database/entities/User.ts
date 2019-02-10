import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Consumed } from "./Consumed";

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
  birthday: Date;

  @Column()
  kgWeight: number;

  @Column()
  cmHeight: number;

  @Column()
  bmi: number;

  @Column()
  lifestyle: number;

  @Column()
  target: number;

  @OneToMany(() => Consumed, (consumed) => consumed.user)
  consumed: Consumed[];

}
