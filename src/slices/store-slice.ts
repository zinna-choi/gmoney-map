import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IShopDocument } from "../server/shop/shop.interface";
export type StoreState = {
  ShopPpoStore: any;
  shopStore?: string;
  Markers: IShopDocument[];
};
const initialState: StoreState = {
  ShopPpoStore: false,
  Markers: [],
};

const storeSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setPopStatus(state, action: PayloadAction<string>) {
      state.shopStore = action.payload;
    },
    setMarkers(state, action: PayloadAction<IShopDocument[]>) {
      state.Markers = action.payload;
    },
  },
});

export const storeReducer = storeSlice.reducer;
export const { setPopStatus, setMarkers } = storeSlice.actions;
