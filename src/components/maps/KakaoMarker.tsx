import React, { useEffect, useContext, useRef } from "react";
import KakaoMapContext from "./KakaoMapContext";

declare const kakao: any;

type Props = {
  lat: number;
  lng: number;
};

const KakaoMarker: React.FC<Props> = (props) => {
  const map = useContext(KakaoMapContext);
  const markerRef = useRef(null);
  useEffect(() => {
    // 마커 추가
    // console.log("marker: ", props);
    markerRef.current = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(props.lat, props.lng),
    });

    return () => {
      // 현재 마커 삭제
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
    };
  }, []);
  return null;
};

export default KakaoMarker;
