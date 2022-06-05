import find from "lodash/find";
import { DateTime } from "luxon";

// export const calcProfit = ({
//   services,
//   settings,
//   serviceId,
//   distance: d,
//   money: m,
//   moneyCard: mc,
//   tips: t,
//   rideTime: mn,
//   payType,
// }) => {
//   let profit = 0;
//   const distance = Number(d);
//   const money = Number(m);
//   const tips = Number(t);
//   const minutes = Number(mn);
//   const { rideFee } = find(services, { ID: Number(serviceId) }) || {};

//   const { fuelConsumption, fuelPrice, timePrice, timePriceEnabled } = settings;

//   const fuelCost = calcFuelCost(fuelConsumption, fuelPrice) * distance;
//   const timeCost = timePriceEnabled ? (timePrice / 60) * minutes : 0;

//   profit = money - fuelCost - (rideFee || 0) - timeCost + tips;

//   return Number(profit).toFixed(2);
// };

export const calcPercent = (a: number, b: number) => (a * 100) / b;

export const sortByDate = (array: any[], dir: boolean) =>
  array.sort((a, b) => {
    if (DateTime.fromISO(a.timestamp) < DateTime.fromISO(b.timestamp)) {
      return dir ? 1 : -1;
    }
    if (DateTime.fromISO(a.timestamp) > DateTime.fromISO(b.timestamp)) {
      return dir ? -1 : 1;
    }
    return 0;
  });
