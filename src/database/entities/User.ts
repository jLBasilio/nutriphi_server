import { Column, Entity, PrimaryGeneratedColumn  } from "typeorm";

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
  kgWeight: number;

  @Column()
  cmHeight: number;

  @Column()
  bmi: number;

  @Column()
  lifestyle: number;

  @Column()
  target: number;

}
