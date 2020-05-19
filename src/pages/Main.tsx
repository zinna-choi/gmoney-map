import React, { useState } from "react";
import KakaoMapContext from "../components/maps/KakaoMapContext";
import { withRouter } from "next/router";
import MapContainer from "../container/map/MapContainer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../module";
import { setMarkers, setPopStatus } from "../slices/store-slice";

type MainContainProps = {
  onRender?: any;
};
export const Main: React.SFC<MainContainProps> = (props) => {
  /**
   * 지도 객체 입니다. render 가 된 후 context API 로 들어갑니다.
   */
  const [map, setMap] = useState<any>();

  //마커 선택 시, 해당 상점 정보 팝업
  const dispatch = useDispatch();
  const { shopStore, Markers } = useSelector((state: RootState) => state.store);
  dispatch(setMarkers(Markers));

  const handleOnClick = () => {
    console.log("ddd");
    dispatch(setPopStatus(!shopStore));

    // ...TODO click
  };

  return (
    <KakaoMapContext.Provider value={map}>
      <MapContainer onRender={setMap} onClick={handleOnClick} />
    </KakaoMapContext.Provider>
  );
};

export default withRouter(Main);
