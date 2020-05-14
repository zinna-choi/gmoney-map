import { combineReducers, createStore } from "redux";
// import global, { GlobalState } from "./global";
import { golbalReducer } from "../slice/global-slice";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  global: golbalReducer,
});

// const store = createStore(rootReducer);

const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default store;
