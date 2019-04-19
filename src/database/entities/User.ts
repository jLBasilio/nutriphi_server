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
  birthday: string;

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
  dbwKg: number;

  @Column()
  lifestyleMultiplier: number;

  @Column()
  target: string;

  @Column()
  endDate: string;

  @Column()
  choPerDay: number;

  @Column()
  proPerDay: number;

  @Column()
  fatPerDay: number;

  @OneToMany(() => Consumed, (consumed) => consumed.user)
  consumed: Consumed[];

}
