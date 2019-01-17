import { Column, Entity, PrimaryGeneratedColumn  } from "typeorm";

@Entity()
export class Consumed {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  foodId: number;

  @Column()
  userId: number;

  @Column()
  name: string;

  @Column()
  dateConsumed: Date;

}
