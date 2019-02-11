import { User } from "../database/entities/User";

export const getBMI = async (user: User): Promise<number> =>
  user.weightKg / (user.heightCm / 100) ** 2;

export const getAge = async (birthday: string): Promise<number> => {
  const bday = new Date(birthday);
  const age = new Date(Date.now() - bday.getTime());
  return Math.abs(age.getUTCFullYear() - 1970);
};
