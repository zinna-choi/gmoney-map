import React, { useState } from "react";
import KakaoMapContext from "../components/maps/KakaoMapContext";
import { withRouter } from "next/router";
import MapContainer from "../container/map/MapContainer";

type MainContainProps = {
  onRender?: any;
};
export const Main: React.SFC<MainContainProps> = (props) => {
  /**
   * 지도 객체 입니다. render 가 된 후 context API 로 들어갑니다.
   */
  const [map, setMap] = useState<any>();
  return (
    <KakaoMapContext.Provider value={map}>
      <MapContainer onRender={setMap} />
    </KakaoMapContext.Provider>
  );
};

export default withRouter(Main);
