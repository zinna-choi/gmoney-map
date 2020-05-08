import React from "react";
import styled from "styled-components";

const { useEffect, useState, useRef } = React;
declare const kakao: any;

const Loader = <div>지도를 불러오는 중입니다.</div>;

type IMapsBasicInfo = {
  latitude: number;
  longitude: number;
  zoom: number;
  map?: any;
};

type MapProps = {
  render: (map: any) => void;
  center: {
    latitude: number;
    longitude: number;
  };
  zoom: number;
  maxLevel?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
  onIdle?: (mapInfo: IMapsBasicInfo) => void;
};
type MapContainProps = MapProps & {};

const KakaoMap: React.SFC<MapContainProps> = (props) => {
  const [map, fetchMap] = useState(null);
  const mapRef = useRef<any>();

  useEffect(() => {
    mapRef.current = new kakao.maps.Map(document.getElementById("dmap"), {
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: props.zoom,
    });

    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        let locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition, message);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

      let locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
        message = "geolocation을 사용할수 없어요..";

      displayMarker(locPosition, message);
    }
    function displayMarker(locPosition: any, message: any) {
      // 마커를 생성합니다

      let marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
      });

      let iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

      // 인포윈도우를 생성합니다
      let infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      // 인포윈도우를 마커위에 표시합니다
      infowindow.open(mapRef.current, marker);

      // 지도 중심좌표를 접속위치로 변경합니다
      mapRef.current.setCenter(locPosition);
    }
  }, []);

  useEffect(() => {
    if (props.maxLevel) {
      mapRef.current.setMaxLevel(props.maxLevel);
    }
  }, [props.maxLevel]);

  useEffect(() => {
    mapRef.current.panTo(
      new kakao.maps.LatLng(props.center.latitude, props.center.longitude)
    );
  }, [props.center.latitude, props.center.longitude]);
  useEffect(() => {}, [props.zoom]);

  const mapIdleEventHandler = () => {
    if (props.onIdle) {
      const iMap = mapRef.current;
      const locations = iMap.getCenter();

      const zoom: number = iMap.getLevel();

      props.onIdle({
        latitude: locations.getLat(),
        longitude: locations.getLng(),
        map: mapRef.current,
        zoom,
      });
    }
  };

  return (
    <Layout>
      <div id="dmap" style={{ width: "100vw", height: "100vh" }}>
        {Loader}
        {map !== null && props.children}
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
export default KakaoMap;
