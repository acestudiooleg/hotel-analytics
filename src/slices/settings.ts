import { AnyAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

export type SettingsState = {
  loading: boolean;
  hasData: boolean;
  done: boolean;
  activeStep: number;
  error: Error | null;
  initialized: boolean;
}

const initialState: SettingsState = {
  hasData: false,
  initialized: false,
  done: false,
  loading: false,
  activeStep: 0,
  error: null,
};

const saveDate = (state: SettingsState, { payload }: AnyAction) => {
  state.loading = false;
  state.hasData = true;
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    save: (state, action) => {
      state.loading = true;
      state.activeStep = action.payload.activeStep;
      state.done = action.payload.done;
    },
    saveSuccess: saveDate,
    initSuccess: saveDate,
    saveFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.hasData = true;
    },
  },
});

export const { actions } = settingsSlice;
export const { initSuccess, save, saveFailure, saveSuccess } =
  settingsSlice.actions;

export default settingsSlice.reducer;

export const getSettings = ({ settings }: RootState) => settings;
