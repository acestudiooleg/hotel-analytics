import { connectRouter } from "connected-react-router";
import { History } from "history";
import { expensesSlice } from "./slices/expenses";
import { expensesSettingsSlice } from "./slices/expensesSettings";
import { incomeListSlice } from "./slices/incomeList";
import { keyboardSlice } from "./slices/keyboard";
import { providersSlice } from "./slices/providers";
import { settingsSlice } from "./slices/settings";
import { statisticsSlice } from "./slices/statistics";

export const createRootReducer = (history: History) => ({
  router: connectRouter(history),
  keyboard: keyboardSlice.reducer,
  incomeList: incomeListSlice.reducer,
  settings: settingsSlice.reducer,
  expenses: expensesSlice.reducer,
  expensesSettings: expensesSettingsSlice.reducer,
  statistics: statisticsSlice.reducer,
  providers: providersSlice.reducer,
});
