import { User } from "../database/entities/User";
import * as constants from "./constants";

export const getBMI = async (user: User): Promise<number> =>
  user.weightKg / (user.heightCm / 100) ** 2;

export const getAge = async (birthday: string): Promise<number> => {
  const bday = new Date(birthday);
  const age = new Date(Date.now() - bday.getTime());
  return Math.abs(age.getUTCFullYear() - 1970);
};

export const getDBW = async (sex: string, heightCm: number): Promise<number> => {
  let toReturn: number = null;
  switch (Math.round(heightCm)) {
    case 129:
      toReturn = sex === "M" ? 34 : 33;
      break;

    case 130:
      toReturn = sex === "M" ? 34 : 33;
      break;

    case 131:
      toReturn = sex === "M" ? 34 : 33;
      break;

    case 132:
      toReturn = sex === "M" ? 34 : 33;
      break;

    case 133:
      toReturn = sex === "M" ? 34 : 33;
      break;

    case 134:
      toReturn = sex === "M" ? 34 : 33;
      break;

    case 135:
      toReturn = sex === "M" ? 35 : 37;
      break;

    case 136:
      toReturn = sex === "M" ? 35 : 38;
      break;

    case 137:
      toReturn = sex === "M" ? 36 : 38;
      break;

    case 138:
      toReturn = sex === "M" ? 37 : 39;
      break;

    case 139:
      toReturn = sex === "M" ? 38 : 40;
      break;

    case 140:
      toReturn = sex === "M" ? 39 : 40;
      break;

    case 141:
      toReturn = sex === "M" ? 39 : 41;
      break;

    case 142:
      toReturn = sex === "M" ? 40 : 42;
      break;

    case 143:
      toReturn = sex === "M" ? 41 : 42;
      break;

    case 144:
      toReturn = sex === "M" ? 42 : 43;
      break;

    case 145:
      toReturn = sex === "M" ? 43 : 44;
      break;

    case 146:
      toReturn = sex === "M" ? 43 : 44;
      break;

    case 147:
      toReturn = sex === "M" ? 44 : 45;
      break;

    case 148:
      toReturn = sex === "M" ? 45 : 46;
      break;

    case 149:
      toReturn = sex === "M" ? 46 : 46;
      break;

    case 150:
      toReturn = sex === "M" ? 46 : 47;
      break;

    case 151:
      toReturn = sex === "M" ? 47 : 48;
      break;

    case 152:
      toReturn = sex === "M" ? 48 : 48;
      break;

    case 153:
      toReturn = sex === "M" ? 49 : 49;
      break;

    case 154:
      toReturn = sex === "M" ? 50 : 50;
      break;

    case 155:
      toReturn = sex === "M" ? 50 : 50;
      break;

    case 156:
      toReturn = sex === "M" ? 51 : 51;
      break;

    case 157:
      toReturn = sex === "M" ? 52 : 52;
      break;

    case 158:
      toReturn = sex === "M" ? 53 : 52;
      break;

    case 159:
      toReturn = sex === "M" ? 54 : 53;
      break;

    case 160:
      toReturn = sex === "M" ? 54 : 54;
      break;

    case 161:
      toReturn = sex === "M" ? 55 : 54;
      break;

    case 162:
      toReturn = sex === "M" ? 56 : 55;
      break;

    case 163:
      toReturn = sex === "M" ? 57 : 56;
      break;

    case 164:
      toReturn = sex === "M" ? 57 : 56;
      break;

    case 165:
      toReturn = sex === "M" ? 58 : 57;
      break;

    case 166:
      toReturn = sex === "M" ? 59 : 58;
      break;

    case 167:
      toReturn = sex === "M" ? 60 : 58;
      break;

    case 168:
      toReturn = sex === "M" ? 61 : 59;
      break;

    case 169:
      toReturn = sex === "M" ? 61 : 60;
      break;

    case 170:
      toReturn = sex === "M" ? 62 : 60;
      break;

    case 171:
      toReturn = sex === "M" ? 63 : 60;
      break;

    case 172:
      toReturn = sex === "M" ? 64 : 60;
      break;

    case 173:
      toReturn = sex === "M" ? 64 : 60;
      break;

    case 174:
      toReturn = sex === "M" ? 65 : 60;
      break;

    case 175:
      toReturn = sex === "M" ? 66 : 60;
      break;

    case 176:
      toReturn = sex === "M" ? 67 : 60;
      break;

    case 177:
      toReturn = sex === "M" ? 68 : 60;
      break;

    case 178:
      toReturn = sex === "M" ? 68 : 60;
      break;

    case 179:
      toReturn = sex === "M" ? 69 : 60;
      break;

    case 180:
      toReturn = sex === "M" ? 70 : 60;
      break;

    case 181:
      toReturn = sex === "M" ? 71 : 60;
      break;

    case 182:
      toReturn = sex === "M" ? 72 : 60;
      break;
  }

  return toReturn;
};

export const getNutriDist = async (dbw: number, multiplier: number): Promise<any> => {
  const tea = dbw * multiplier;
  const toReturn = {
    choPerDay: ((tea * constants.CHO_DIST) / constants.CHO_DIV).toFixed(2),
    proPerDay: ((tea * constants.PRO_DIST) / constants.PRO_DIV).toFixed(2),
    fatPerDay: ((tea * constants.FAT_DIST) / constants.FAT_DIV).toFixed(2)
  };
  return toReturn;
};

export const convertKgToLBS = async (kg: number): Promise<number> => Math.round(kg * 2.2);
