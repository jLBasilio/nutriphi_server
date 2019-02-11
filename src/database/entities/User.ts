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
  weightKg: number;

  @Column()
  weightLbs: number;

  @Column()
  goalKg: number;

  @Column()
  goalLbs: number;

  @Column()
  heightCm: number;

  @Column()
  heightFt: number;

  @Column()
  heightInch: number;

  @Column()
  bmi: number;

  @Column()
  dbw: number;

  @Column()
  lifestyle: number;

  @Column()
  target: number;

  @Column()
  endDate: Date;

  @OneToMany(() => Consumed, (consumed) => consumed.user)
  consumed: Consumed[];

}
