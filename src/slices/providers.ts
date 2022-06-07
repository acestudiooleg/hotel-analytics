import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { Action, makeTypes } from "./types";

export type Provider = {
  ID?: string;
  name: string;
  newName?: string;
  isNew: boolean;
  fee: number;
};

type ProvidersState = {
  list: Provider[];
  loading: boolean;
  hasData: boolean;
  error: Error | null;
};

const initialState: ProvidersState = {
  hasData: false,
  loading: false,
  list: [],
  error: null,
};

const saveData = (
  state: ProvidersState,
  { payload: list }: Action<Provider[]>
) => {
  state.list = list;
  state.loading = false;
  state.hasData = true;
};

export const providersSlice = createSlice({
  name: "providers",
  initialState,
  reducers: {
    save: (state) => {
      state.loading = true;
    },
    add: (state, { payload: provider }) => {},
    remove: (state, { payload: provider }) => {},
    addSuccess: saveData,
    saveSuccess: saveData,
    removeSuccess: saveData,
    initSuccess: saveData,
    saveFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.hasData = true;
    },
  },
});

export const { actions, name } = providersSlice;
export const { addSuccess, initSuccess, save, saveFailure, saveSuccess } =
  providersSlice.actions;
  
export const types = makeTypes<keyof typeof actions>(name, actions)

export default providersSlice.reducer;

export const getProviders = ({ providers }: RootState) => providers;
