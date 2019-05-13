import { User } from "../database/entities/User";
import * as constants from "./constants";

export const getBMI = async (weightKg: number, heightCm: number): Promise<number> =>
  parseFloat((weightKg / ((heightCm / 100) ** 2)).toFixed(2));

export const getBMIClass = async (bmi: number): Promise<string> => {
  switch (true) {
    case (bmi >= 30):
      return "Obese";
    case (bmi >= 25):
      return "Overweight";
    case (bmi <= 18.5):
      return "Underweight";
    default:
      return "Normal";
  }
};

export const getAge = async (birthday: string): Promise<number> => {
  const bday = new Date(birthday);
  const age = new Date(Date.now() - bday.getTime());
  return Math.abs(age.getUTCFullYear() - 1970);
};
