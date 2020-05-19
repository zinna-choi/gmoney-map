import React, { useEffect, useContext, useRef } from "react";
import KakaoMapContext from "./KakaoMapContext";

declare const kakao: any;

type Props = {
  lat: number;
  lng: number;
  imageSrc: string;
  onClick?: () => void;
};

const KakaoMarker: React.FC<Props> = (props) => {
  const map = useContext(KakaoMapContext);
  let imageSize = new kakao.maps.Size(25, 25), // 마커이미지의 크기입니다
    imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

  // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
  let markerImage = new kakao.maps.MarkerImage(
    props.imageSrc,
    imageSize,
    imageOption
  );
  const markerRef = useRef(null);
  useEffect(() => {
    // 마커 추가
    // console.log("marker: ", props);
    markerRef.current = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(props.lat, props.lng),
      image: markerImage,
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
