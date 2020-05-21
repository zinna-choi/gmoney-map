import React, { useEffect, ReactNode } from "react";
import StoreCard from "./StoreCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../module";
import { setPopStatus, setMarkers } from "../../slices/store-slice";
import GmoneyAPI from "../../api/GmoneyAPI";
import styled from "styled-components";
import media from "../../lib/styles/media";
import { StoreInfoProps } from "./StoreInfo";

export type StoreListProps = StoreInfoProps & {
  onClick?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) &
    ((_id: string, key: string) => void);
  _id?: string;
  key?: string;
  children?: ReactNode;
};

const StoreList: React.FC<StoreListProps> = (props: StoreListProps) => {
  const dispatch = useDispatch();
  const { shopStore, Markers } = useSelector((state: RootState) => state.store);

  useEffect(() => {
    dispatch(setMarkers(Markers));
  }, [Markers]);

  const handleOnClick = (_id: string) => {
    if (shopStore === _id) {
      dispatch(setPopStatus(undefined));
    } else {
      dispatch(setPopStatus(_id));
    }

    // ...TODO click
  };

  return (
    <LayoutStyled>
      {/* 이벤트 리스너는 StoreCard 에 다 만들고, */}
      {/* 이벤트 핸들러는 StoreCard 를 사용 하는 StoreList 가 제어하는것이 더 독립적이다. */}
      {Markers.map((item) => (
        <StoreCard
          onClick={() => handleOnClick(item._id)}
          key={item._id}
          shopName={item.CMPNM_NM}
          address={item.REFINE_LOTNO_ADDR}
          telNo={item.TELNO}
        />
      ))}
    </LayoutStyled>
  );
};

const LayoutStyled = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  height: 220px;
  padding: 2%;

  ${media.small} {
    z-index: 200;
  }
`;
export default StoreList;
