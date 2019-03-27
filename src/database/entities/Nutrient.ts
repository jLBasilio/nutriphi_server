import { Column, Entity, OneToOne, PrimaryGeneratedColumn  } from "typeorm";

@Entity()
export class Nutrient {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  classification: string;

  @Column()
  choPerExchange: number;

  @Column()
  proPerExchange: number;

  @Column()
  fatPerExchange: number;
}
