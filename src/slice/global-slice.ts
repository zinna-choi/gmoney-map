import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";
import { createStandardAction } from "typesafe-actions";
import { createReducer } from "../lib/createReducer";
export type GlobalState = {
  ShopPpoStore: any;
  shopStore: boolean;
};
const initialState: GlobalState = {
  shopStore: false,
  ShopPpoStore: false,
};

const globalSlice = createSlice({
  name: "shopopstore",
  initialState,
  reducers: {
    setPopStatus(state, action: PayloadAction<boolean>) {
      state.shopStore = action.payload;
    },
  },
});

export const golbalReducer = globalSlice.reducer;
export const { setPopStatus } = globalSlice.actions;
