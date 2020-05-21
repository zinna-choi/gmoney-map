import React, { useEffect, useContext, useRef } from "react";
import KakaoMapContext from "./KakaoMapContext";
import StorePop from "../store/StorePop";

declare const kakao: any;

type Props = {
  lat: number;
  lng: number;
  imageSrc: string;
  onClick?: () => void;
  position?: any;
};

interface AbstractMarkerType {
  _id?: any;
  telNo?: any;
  address?: any;
  shopName?: any;
}

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
  const markerRef = useRef<any>(null);

  function AbstractMarker(position: any, options: AbstractMarkerType) {
    this.position = position;
    this.node = document.createElement("div");
    this.node.style.position = "absolute";
    this.node.style.whiteSpace = "nowrap";
    const html = `
    <div class="__marker_root __marker_data__" onclick="closeOverlay()" data-seq="${options._id}">
        <div class="__marker_label">
            <div class="__marker_left">
                <div class="__marker_left_top act_show_bundong"> <img src="${options.address}" class="__marker_ic bundong_ico"/></div>
                <div class="__marker_left_bottom">${options.shopName}</div>
            </div>
            <div class="__marker_right">
                <div class="__marker_right_top act_driving_history">운행기록</div>
                <div class="__marker_right_bottom act_detail">상세정보</div>
            <div>
        </div>
        <img src="${options.telNo}" class="__marker_ic __car"/>
    </div>
`;
    this.node.innerHTML = html;
  }

  // "AbstractOverlay":#AbstractOverlay 상속. 프로토타입 체인을 연결한다..
  AbstractMarker.prototype = new kakao.maps.AbstractOverlay();

  // 필수 구현 메소드.
  // AbstractOverlay의 getPanels() 메소드로 MapPanel 객체를 가져오고
  // 거기에서 오버레이 레이어를 얻어 생성자에서 만든 엘리먼트를 자식 노드로 넣어준다.
  AbstractMarker.prototype.onAdd = function() {
    var panel = this.getPanels().overlayLayer;
    panel.appendChild(this.node);
  };

  // 필수 구현 메소드.
  // 생성자에서 만든 엘리먼트를 오버레이 레이어에서 제거한다.
  AbstractMarker.prototype.onRemove = function() {
    this.node.parentNode.removeChild(this.node);
  };

  // 필수 구현 메소드.
  // 지도의 속성 값들이 변화할 때마다 호출된다. (zoom, center, mapType)
  // 엘리먼트의 위치를 재조정 해 주어야 한다.
  AbstractMarker.prototype.draw = function() {
    var projection = this.getProjection();
    var point = projection.pointFromCoords(this.position);
    var width = this.node.offsetWidth;
    var height = this.node.offsetHeight;

    this.node.style.left = point.x - width / 2 + "px";
    this.node.style.top = point.y - height / 2 + "px";
  };

  var abMarker: any = new AbstractMarker(
    new kakao.maps.LatLng(props.lat, props.lng),
    { _id, address, shopName, telNo }
  );

  useEffect(() => {
    // 마커 추가
    // console.log("marker: ", props);
    markerRef.current = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(props.lat, props.lng),
      image: markerImage,
    });

    abMarker.setMap(map);
    markerRef.current = abMarker;

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
