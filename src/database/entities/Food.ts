import { Column, Entity, OneToOne, PrimaryGeneratedColumn  } from "typeorm";

@Entity()
export class Food {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gramPerExchange: number;

  @Column()
  cho: number;

  @Column()
  pro: number;

  @Column()
  fat: number;

  @Column()
  name: string;

  @Column()
  serving: string;

}
