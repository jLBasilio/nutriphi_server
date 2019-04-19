import { Food } from "../database/entities/Food";
import * as unitConst from "../utils/constants";

export const getNutriGrams = (foodInfo: Food, measure: number) => {
  const { choPerExchange, proPerExchange, fatPerExchange } = foodInfo;
  return {
    choGrams: parseFloat((measure * choPerExchange).toFixed(2)),
    proGrams: parseFloat((measure * proPerExchange).toFixed(2)),
    fatGrams: parseFloat((measure * fatPerExchange).toFixed(2))
  };
};

export const getKcal = (foodInfo: Food, gramsmlConsumed: number): object => {
  const {
    directKcalPerMeasure,
    exchangePerMeasure,
    proPerExchange,
    choPerExchange,
    fatPerExchange,
    gramsEPPerExchange,
    mlEPPerExchange
  } = foodInfo;
  let toReturn = {};
  let totalKcalConsumed = 0;
  const consumedDivider = gramsEPPerExchange || mlEPPerExchange;
  const measureQuantity = gramsmlConsumed / consumedDivider / exchangePerMeasure;
  const gramsRaw = gramsmlConsumed / consumedDivider;
  const gramsRem = gramsmlConsumed % consumedDivider;

  if (directKcalPerMeasure) {
    totalKcalConsumed += parseFloat((directKcalPerMeasure * measureQuantity).toFixed(2));
  } else {
    const consumedMultiplier = gramsRem > 0 && directKcalPerMeasure ? gramsRem : gramsRaw;
    totalKcalConsumed += consumedMultiplier * choPerExchange * unitConst.CHO_MUL;
    totalKcalConsumed += consumedMultiplier * proPerExchange * unitConst.PRO_MUL;
    totalKcalConsumed += consumedMultiplier * fatPerExchange * unitConst.FAT_MUL;
  }

  toReturn = {
    ...getNutriGrams(foodInfo, parseFloat(gramsRaw.toFixed(4))),
    totalKcalConsumed: parseFloat(totalKcalConsumed.toFixed(2)),
    gramsConsumed: gramsEPPerExchange ? parseFloat(gramsmlConsumed.toFixed(4)) : null,
    mlConsumed: mlEPPerExchange ? parseFloat(gramsmlConsumed.toFixed(4)) : null
  };

  return toReturn;
};
