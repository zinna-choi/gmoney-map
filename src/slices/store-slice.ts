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
  mapCenter?: {
    latitude: number;
    longitude: number;
  };
  searchInput?: string;
};
const initialState: StoreState = {
  ShopPpoStore: false,
  Markers: [],
  // currentMarker: {
  //   lat: 0,
  //   lng: 0,
  //   imageSrc: "",
  // },
  //geoloaction에서 값이 들어올때까지 location이 렌더링되지 않도록 초기값 삭제
  mapCenter: {
    latitude: 37.2750552,
    longitude: 127.0072561,
  },
  searchInput: "",
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
    setMapCenter(
      state,
      action: PayloadAction<{ latitude: number; longitude: number }>
    ) {
      state.mapCenter = action.payload;
    },
    setSearchInput(state, action: PayloadAction<string>) {
      state.searchInput = action.payload;
    },
  },
});

export const storeReducer = storeSlice.reducer;
export const {
  setPopStatus,
  setMarkers,
  setLocation,
  setMapCenter,
  setSearchInput,
} = storeSlice.actions;
