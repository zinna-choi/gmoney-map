import { combineReducers, createStore } from "redux";
import global, { GlobalState } from "./global";

export type RootState = {
  global: GlobalState;
};

const rootReducer = combineReducers({
  global,
});

const store = createStore(rootReducer);

export default store;
