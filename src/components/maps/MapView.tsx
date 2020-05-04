import React, { useEffect } from "react";
import styled from "styled-components";

declare const kakao: any;

const MapView: React.FC = (props) => {
  // component did mount
  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    let map = new kakao.maps.Map(container, options);
  }, []);

  return (
    <Layout>
      <div className="Mapview">
        <div id="map" style={{ width: "100vw", height: "100vh" }} />
      </div>
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
`;
export default MapView;
