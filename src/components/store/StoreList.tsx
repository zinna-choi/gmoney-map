import React from "react";
import StoreCard from "./StoreCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../module";
import { setPopStatus } from "../../slice/global-slice";
import styled from "styled-components";
import media from "../../lib/styles/media";

export type StoreListProps = {
  onClick?: () => void;
};

const StoreList: React.FC<StoreListProps> = (props) => {
  const dispatch = useDispatch();
  const { shopStore } = useSelector((state: RootState) => state.global);

  const handleOnClick = () => {
    // ...TODO click
    dispatch(setPopStatus(!shopStore));
  };
  return (
    <LayoutStyled>
      {/* 이벤트 리스너는 StoreCard 에 다 만들고, */}
      {/* 이벤트 핸들러는 StoreCard 를 사용 하는 StoreList 가 제어하는것이 더 독립적이다. */}
      <StoreCard onClick={handleOnClick} />
    </LayoutStyled>
  );
};

const LayoutStyled = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  height: 186px;
  padding: 2%;

  ${media.small} {
    z-index: 200;
  }
`;
export default StoreList;
