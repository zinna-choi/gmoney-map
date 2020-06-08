import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../module";
import { setMapCenter } from "../../slices/store-slice";

const { useEffect, useState, useRef } = React;
declare const kakao: any;

const Loader = <div>지도를 불러오는 중입니다.</div>;

export type IMapsBasicInfo = {
  latitude: number;
  longitude: number;
  zoom: number;
  map?: any;
};

export type MapProps = {
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
  const dispatch = useDispatch();
  const { Markers, currentMarker, mapCenter } = useSelector(
    (state: RootState) => state.store
  );
  const mapRef = useRef<any>();

  useEffect(() => {
    mapRef.current = new kakao.maps.Map(document.getElementById("dmap"), {
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: props.zoom,
    });

    if (typeof props.render === "function") {
      props.render(mapRef.current);
    }

    // if (navigator.geolocation) {
    //   // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    //   navigator.geolocation.getCurrentPosition(function(position) {
    //     let lat = position.coords.latitude, // 위도
    //       lon = position.coords.longitude; // 경도

    //     let locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
    //       message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

    //     // 마커와 인포윈도우를 표시합니다
    //     displayMarker(locPosition, message);
    //   });
    // } else {
    //   // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

    //   let locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
    //     message = "geolocation을 사용할수 없어요..";

    //   displayMarker(locPosition, message);
    // }
    function displayMarker(locPosition: any, message: any) {
      // 마커를 생성합니다

      let marker = new kakao.maps.Marker({
        map: mapRef.current,
        position: locPosition,
      });

      //오버레이 상점팝업 추가

      let content =
        '<div class ="label"><span class="left"></span><span class="center">카카오!</span><span class="right"></span></div>';

      // 마커 위에 커스텀오버레이를 표시합니다
      // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
      let overlay = new kakao.maps.CustomOverlay({
        content: content,
        map: mapRef.current,
        position: locPosition,
      });

      // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
      kakao.maps.event.addListener(marker, "click", function() {
        overlay.setMap(mapRef.current);
      });

      // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
      function closeOverlay() {
        overlay.setMap(null);
      }

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

    kakao.maps.event.addListener(mapRef.current, "idle", mapIdleEventHandler);

    return () => {
      kakao.maps.event.removeListener(
        mapRef.current,
        "idle",
        mapIdleEventHandler
      );
    };
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
    if (typeof props.onIdle === "function") {
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
      <div id="dmap" style={{ width: "100%", height: "100vh" }}>
        {Loader}
      </div>

      {!!mapRef.current && props.children}
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
  top: 0;
`;
export default KakaoMap;
