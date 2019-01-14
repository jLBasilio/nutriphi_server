import { User } from "../database/entities/User";

export const getBMI = async (user: User): Promise<number> =>
  user.kgWeight / (user.cmHeight / 100) ** 2;
