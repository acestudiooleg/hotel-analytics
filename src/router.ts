import { AnyAction } from "@reduxjs/toolkit";
import { push } from "connected-react-router";

export const router = {
  root: "/",
  settings: "/settings",
  balance: "/balance",
  statistics: "/statistics",
  income: "/income",
  spend: "/spend",
  editRide: "/edit-ride",
};

export const makeGoTo =
  (path: string) =>
  (dispatch: (action: AnyAction) => void) =>
    dispatch(push(path) as any);

export const goToBalance = makeGoTo(router.balance);
export const goToSettings = makeGoTo(router.settings);
export const goToStatistics = makeGoTo(router.statistics);
export const goToIncome = makeGoTo(router.income);
export const goToSpend = makeGoTo(router.spend);
