import { User } from "../database/entities/User";

export const getBMI = (user: User): number =>
  user.kgWeight / (user.cmHeight / 100) ** 2;
