import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IShopDocument } from "../server/shop/shop.interface";
export type StoreState = {
  ShopPpoStore: any;
  shopStore?: string;
  Markers: IShopDocument[];
  currentMarker?: {
    lat?: number;
    lng?: number;
    imageSrc?: string;
  };
};
const initialState: StoreState = {
  ShopPpoStore: false,
  Markers: [],
  currentMarker: {
    lat: 0,
    lng: 0,
    imageSrc: "",
  },
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
    setLocation(state, action: PayloadAction<any>) {
      state.currentMarker = action.payload;
    },
  },
});

export const storeReducer = storeSlice.reducer;
export const { setPopStatus, setMarkers, setLocation } = storeSlice.actions;
