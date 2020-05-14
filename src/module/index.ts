import { combineReducers, createStore } from "redux";
// import global, { GlobalState } from "./global";
import { storeReducer } from "../slices/store-slice";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  store: storeReducer,
});

// const store = createStore(rootReducer);

const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default store;
