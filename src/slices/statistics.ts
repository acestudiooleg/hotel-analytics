import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

const initialState = {
  currentDate: new Date(),
};

export const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    balanceSetDate: (state, { payload }) => {
      state.currentDate = payload;
    },
  },
});

export const { actions } = statisticsSlice;
export const { balanceSetDate } = statisticsSlice.actions;

export default statisticsSlice.reducer;

export const getStatisticts = ({ statistics }: RootState) => statistics;
