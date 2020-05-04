import produce from "immer";
import { createStandardAction } from "typesafe-actions";
import { createReducer } from "../lib/createReducer";
//액션타입

const SHOP_POP_STORE = "global/FETCH_SHOP";

// 액션
export const shopPopStore = createStandardAction(SHOP_POP_STORE)<boolean>();
//액션타입
export type ShopPopStore = ReturnType<typeof shopPopStore>;
// typescript 로 state 타입 참조
export type GlobalState = {
  shopStore: boolean;
};
// 기본적으로 state 에다 저장 할 데이터
const initialState: GlobalState = {
  shopStore: false,
};

export default createReducer(
  {
    // 데이터를 가져왔을때, redux store 로 데이터 저장
    [SHOP_POP_STORE]: (state, action: ShopPopStore) =>
      produce(state, (draft) => {
        draft.shopStore = action.payload;
      }),
  },
  initialState
);
