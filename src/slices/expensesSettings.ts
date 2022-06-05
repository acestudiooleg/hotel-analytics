import { AnyAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

export type ExpenseSettingsType = {
  ID?: number;
  name: string;
  newName: string;
  isNew?: boolean;
  commentsEnabled: boolean;
};

type ExpensesSettingsState = {
  hasData: boolean;
  loading: boolean;
  list: ExpenseSettingsType[];
  error: Error | null;
};

const initialState: ExpensesSettingsState = {
  hasData: false,
  loading: false,
  list: [],
  error: null,
};

const saveDate = (
  state: ExpensesSettingsState,
  { payload: list }: AnyAction
) => {
  state.list = list;
  state.loading = false;
  state.hasData = true;
};

export const expensesSettingsSlice = createSlice({
  name: "expensesSettings",
  initialState,
  reducers: {
    add: (state, action) => {},
    remove: (state, action) => {},
    save: (state) => {
      state.loading = true;
    },
    addSuccess: saveDate,
    saveSuccess: saveDate,
    initSuccess: saveDate,
    saveFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.hasData = true;
    },
  },
});

export const { actions } = expensesSettingsSlice;
export const { addSuccess, initSuccess, save, saveFailure, saveSuccess } =
  expensesSettingsSlice.actions;

export default expensesSettingsSlice.reducer;

export const getExpensesSettings = ({ expensesSettings }: RootState) =>
  expensesSettings;
