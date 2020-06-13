import React, { useEffect, ReactNode, useState, useContext } from "react";
import StoreCard from "./StoreCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../module";
import {
  setPopStatus,
  setMarkers,
  setSearchInput,
} from "../../slices/store-slice";
import GmoneyAPI from "../../api/GmoneyAPI";
import styled from "styled-components";
import media from "../../lib/styles/media";
import { StoreInfoProps } from "./StoreInfo";
import ShopAPI from "../../api/ShopAPI";
import KakaoMapContext from "../maps/KakaoMapContext";

export type StoreListProps = StoreInfoProps & {
  onClick?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) &
    ((_id: string, key: string) => void);
  _id?: string;
  key?: string;
  children?: ReactNode;
  text?: any;
};

const StoreList: React.FC<StoreListProps> = (props: StoreListProps) => {
  const dispatch = useDispatch();
  const { shopStore, Markers, searchInput, mapCenter } = useSelector(
    (state: RootState) => state.store
  );

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
  //검색 api

  useEffect(() => {
    if (searchInput.length > 1) {
      searchHandler(searchInput);
    }
    return;
  }, [searchInput]);

  const searchHandler = async (q: string) => {
    const { data } = await ShopAPI.search({ q: searchInput, distance: 500 });
    dispatch(setMarkers(data));
    console.log(data);
  };

  return (
    <LayoutStyled>
      {/* 이벤트 리스너는 StoreCard 에 다 만들고, */}
      {/* 이벤트 핸들러는 StoreCard 를 사용 하는 StoreList 가 제어하는것이 더 독립적이다. */}
      {Markers === null && searchInput.length === 0 && (
        <div style={{ padding: 20, textAlign: "center" }}>
          검색결과가 없습니다.
        </div>
      )}
      {Markers === null
        ? null
        : Markers.map((item: any) => (
            <StoreCard
              onClick={() => handleOnClick(item._id)}
              key={item._id}
              shopName={item.CMPNM_NM}
              address={item.REFINE_LOTNO_ADDR}
              telNo={item.TELNO}
              latMarker={item.REFINE_WGS84_LAT}
              lngMarker={item.REFINE_WGS84_LOGT}
            />
          ))}
    </LayoutStyled>
  );
};

const LayoutStyled = styled.div`
  position: absolute;
  top: 40px;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  padding: 2%;
  ${media.small} {
    z-index: 200;
  }
`;
export default StoreList;
