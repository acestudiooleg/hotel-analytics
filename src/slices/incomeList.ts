import { AnyAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

const initialState = {
  hasData: false,
  loading: false,
  list: [],
  error: null,
};

const saveDate = (state: typeof initialState, { payload: list }: AnyAction) => {
  state.list = list;
  state.loading = false;
  state.hasData = true;
};

export const incomeListSlice = createSlice({
  name: "incomeList",
  initialState,
  reducers: {
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

export const { actions } = incomeListSlice;
export const { addSuccess, initSuccess, save, saveFailure, saveSuccess } =
  incomeListSlice.actions;

export default incomeListSlice.reducer;

export const getIncomeList = ({ incomeList }: RootState) => incomeList;
