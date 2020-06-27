import React, { useState } from "react";
import KakaoMapContext from "../components/maps/KakaoMapContext";
import { withRouter } from "next/router";
import MapContainer from "./map/MapContainer";
import StoreContainer from "./store/StoreContainer";
import MobileContainer from "./store/MobileContainer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../module";
import { setMarkers, setPopStatus } from "../slices/store-slice";
import MobileSubMenu from "../components/layouts/MobileSubMenu";

type MainContainProps = {
  onRender?: any;
};
declare global {
  namespace NodeJS {
    interface Global {
      document: Document;
      window: Window;
      navigator: Navigator;
    }
  }
}

export const Main: React.SFC<MainContainProps> = (props) => {
  /**
   * 지도 객체 입니다. render 가 된 후 context API 로 들어갑니다.
   */
  const [map, setMap] = useState<any>();

  //마커 선택 시, 해당 상점 정보 팝업
  // const dispatch = useDispatch();
  // const { shopStore, Markers } = useSelector((state: RootState) => state.store);
  // dispatch(setMarkers(Markers));

  // const handleOnClick = () => {
  //   console.log("ddd");
  //   dispatch(setPopStatus(!shopStore));

  //   // ...TODO click
  // };

  return (
    <KakaoMapContext.Provider value={map}>
      <MapContainer onRender={setMap} />
      <StoreContainer />
      <MobileContainer />
    </KakaoMapContext.Provider>
  );
};

export default withRouter(Main);
