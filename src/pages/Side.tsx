import React, { useState } from "react";
import KakaoMapContext from "../components/maps/KakaoMapContext";
import { withRouter } from "next/router";
import MapContainer from "../container/map/MapContainer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../module";
import { setMarkers, setPopStatus } from "../slices/store-slice";
import StoreContainer from "../container/store/StoreContainer";
type MainContainProps = {
  onRender?: any;
};
export const Main: React.SFC<MainContainProps> = (props) => {
  /**
   * 지도 객체 입니다. render 가 된 후 context API 로 들어갑니다.
   */
  const [map, setMap] = useState<any>();

  return <KakaoMapContext.Provider value={map}></KakaoMapContext.Provider>;
};

export default withRouter(Main);
