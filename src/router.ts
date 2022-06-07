import { AnyAction } from "@reduxjs/toolkit";
import { push } from "connected-react-router";

export const routes = {
  root: "/",
  settings: "/settings",
  balance: "/balance",
  statistics: "/statistics",
  incomeRoom: "/income-room",
  incomeExcursion: "/income-excursion",
  spend: "/spend",
  editRoomIncome: "/edit-room-income",
  editExcursionIncome: '/edit-excursion-income'
};

export const makeGoTo =
  (path: string) =>
  (dispatch: (action: AnyAction) => void) =>
    dispatch(push(path) as any);

export const goToBalance = makeGoTo(routes.balance);
export const goToSettings = makeGoTo(routes.settings);
export const goToStatistics = makeGoTo(routes.statistics);
export const goToIncomeRoom = makeGoTo(routes.incomeRoom);
export const goToIncomeExcursion = makeGoTo(routes.incomeExcursion);
export const goToSpend = makeGoTo(routes.spend);
