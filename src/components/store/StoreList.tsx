import React from "react";
import StoreCard from "./StoreCard";
import { useDispatch, useSelector } from "react-redux";
import { shopPopStore } from "../../module/global";
import { RootState } from "../../module";

type Props = {};

const StoreList: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { shopStore } = useSelector((state: RootState) => state.global);

  const handleOnClick = () => {
    // ...TODO click
    dispatch(shopPopStore(!shopStore));
  };
  return (
    <div>
      {/* 이벤트 리스너는 StoreCard 에 다 만들고, */}
      {/* 이벤트 핸들러는 StoreCard 를 사용 하는 StoreList 가 제어하는것이 더 독립적이다. */}
      <StoreCard onClick={handleOnClick} />
    </div>
  );
};

export default StoreList;
