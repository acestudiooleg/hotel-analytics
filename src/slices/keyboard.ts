import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

const initialState = {
  hidden: true,
};

export const keyboardSlice = createSlice({
  name: "keyboard",
  initialState,
  reducers: {
    show: (state) => {
      state.hidden = false;
    },
    hide: (state) => {
      state.hidden = true;
    },
  },
});

export const { actions } = keyboardSlice;
export const { show, hide } = keyboardSlice.actions;

export const getKeyboardState = (state: RootState) => state.keyboard;

export default keyboardSlice.reducer;
