import { AnyAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

export type ExpensesType = {
  ID?: number;
  expenseName: string;
  value: number;
  timestamp?: string;
  comment?: string;
};

type ExpensesListState = {
  list: ExpensesType[];
  loading: boolean;
  hasData: boolean;
  error: Error | null;
};

const initialState: ExpensesListState = {
  hasData: false,
  loading: false,
  list: [],
  error: null,
};

const saveDate = (state: ExpensesListState, { payload: list }: AnyAction) => {
  state.list = list;
  state.loading = false;
  state.hasData = true;
};

export const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    save: (state) => {
      state.loading = true;
    },
    add: (state, { payload: expense }) => {},
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

export const { actions } = expensesSlice;
export const { addSuccess, initSuccess, save, saveFailure, saveSuccess } =
  expensesSlice.actions;

export default expensesSlice.reducer;

export const getExpenses = ({ expenses }: RootState) => expenses;
