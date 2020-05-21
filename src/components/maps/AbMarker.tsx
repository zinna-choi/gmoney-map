/* tslint:disable */
import React, { useEffect, useContext, useRef, useState } from "react";
import KakaoMapContext from "./KakaoMapContext";
import StorePop from "../store/StorePop";

// marker style

declare const window: any;
const { kakao } = window;

type MarkerProps = {
  lat: number;
  lng: number;
  imageSrc: string;
  onClick?: () => void;
};

interface AbstractMarkerType {
  _id?: any;
  telNo?: any;
  address?: any;
  shopName?: any;
}

class AbstractMarker extends kakao.maps.AbstractOverlay {
  protected node: HTMLElement;
  private position: any;
  constructor(position: any, options: AbstractMarkerType) {
    super();
    this.position = position;
    this.node = document.createElement("div");
    this.node.style.position = "absolute";
    const html = `
            <div class="__marker_root __marker_data__" data-seq="${options._id}">
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

  onAdd() {
    var panel = this.getPanels().overlayLayer;
    panel.appendChild(this.node);
  }

  onRemove() {
    this.node.parentNode.removeChild(this.node);
  }

  draw() {
    this.setPosition(this.position);
  }

  setPosition(position: any) {
    this.position = position;
    var projection = this.getProjection();
    var point = projection.pointFromCoords(this.position);
    var width = this.node.offsetWidth;
    var height = this.node.offsetHeight;

    this.node.style.left = point.x - width / 2 + "px";
    this.node.style.top = point.y - height / 2 - 40 + "px";
  }

  setVisible(visible: boolean) {
    this.node.style.display = visible ? "block" : "none";
  }
}

const Marker: React.FunctionComponent<MarkerProps> = ({
  lat,
  lng,
  imageSrc,
}) => {
  let imageSize = new kakao.maps.Size(25, 25), // 마커이미지의 크기입니다
    imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

  // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
  let markerImage = new kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    imageOption
  );
  const map = useContext(KakaoMapContext);
  const context = useContext(KakaoMapContext);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    const abMarker: any = new AbstractMarker(
      new kakao.maps.LatLng(lat, lng),
      {}
    );

    abMarker.setMap(map);
    markerRef.current = abMarker;

    return () => {
      abMarker.setMap(null);
    };
  }, []);

  return null;
};

export default Marker;
