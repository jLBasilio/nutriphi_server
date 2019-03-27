import { Column, Entity, OneToOne, PrimaryGeneratedColumn  } from "typeorm";

@Entity()
export class Food {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  filipinoName: string;

  @Column({ nullable: true })
  englishName: string;

  // Main view
  @Column()
  primaryClassification: string;

  // Secondary view
  @Column({ nullable: true })
  secondaryClassification: string;

  @Column()
  servingMeasurement: string;

  @Column("decimal", { precision: 7, scale: 2 })
  choPerExchange: number;

  @Column("decimal", { precision: 7, scale: 2 })
  proPerExchange: number;

  @Column("decimal", { precision: 7, scale: 2 })
  fatPerExchange: number;

  @Column("decimal", { precision: 7, scale: 2 })
  gramsEPPerExchange: number;

  @Column("decimal", { precision: 7, scale: 2 })
  mlEPPerExchange: number;

  @Column("decimal", { precision: 7, scale: 2 })
  exchangePerServing: number;

  @Column({ nullable: true })
  directKcalPerServing: number;

}
