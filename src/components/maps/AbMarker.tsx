/* tslint:disable */
import React, { useEffect, useContext, useRef, useState } from "react";
import KakaoMapContext from "./KakaoMapContext";
import StorePop from "../store/StorePop";
import { IoMdClose } from "react-icons/io";
import { FaCloudShowersHeavy } from "react-icons/fa";

// marker style
declare const window: any;
const { kakao } = window;

type MarkerProps = {
  lat: number;
  lng: number;
  imageSrc: string;
  onClick?: () => void;
  _id?: any;
  onClose?: () => void;
  shopName?: string;
  address?: string;
  address_R?: string;
  telNo?: string;
  onAbMarkerClose?: () => void;
};

interface AbstractMarkerType {
  _id?: any;
  shopName?: string;
  address?: string;
  address_R?: string;
  telNo?: string;
  closeHandler?: any;
  onClose?: () => void;
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
            <div class="__marker_root __marker_data__"  data-seq="${options._id}">
                <div class="__marker_label">
                  <div class="__title">
                    <div class="__logo"><img src="/images/gmoney-02.png" alt="logo" /></div>
                    <div class="__shop_name">${options.shopName}</div>
                    <div class="__close closeHandler" title="닫기" ><img src="/images/close_btn.png" alt="" /></div>
                  </div>
                  <div class="__info_con">
                    <div class="__store_info">
                      <div class="__info_left">
                        <div class="__address">${options.address}</div>
                        <div class="__address_2">${options.address_R}</div>
                        <div class="__telNo">${options.telNo}</div>
                      </div>
                      <div class="__info_right">
                        <div class="__store_cate">카페</div>
                      </div>  
                    </div>
                  <div class="__use">지류형-모바일형-카드형</div>
                  </div>
                  <div class="__road_btn">
                   길찾기
                  </div>
                </div>
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

    this.node.style.left = point.x - width + -15 + "px";
    this.node.style.top = point.y - height + -70 + "px";
  }

  setVisible(visible: boolean) {
    this.node.style.display = visible ? "block" : "none";
  }
}

const Marker: React.FunctionComponent<MarkerProps> = ({
  lat,
  lng,
  imageSrc,
  _id,
  shopName,
  address,
  address_R,
  telNo,
  onAbMarkerClose,
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
  const markerRef = useRef<any>(null);

  const closeHandlerRef = useRef<HTMLElement>();

  useEffect(() => {
    markerRef.current = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(lat, lng),
      image: markerImage,
    });

    const abMarker: any = new AbstractMarker(new kakao.maps.LatLng(lat, lng), {
      _id,
      shopName,
      address,
      address_R,
      telNo,
    });

    kakao.maps.event.addListener(markerRef.current, "click", function() {
      abMarker.setVisible(true);
      abMarker.setMap(map);
      const uniqueSeqRootSelector = `[data-seq="${_id}"] .closeHandler`;

      closeHandlerRef.current = document.querySelector(
        `${uniqueSeqRootSelector}`
      );

      closeHandlerRef.current?.addEventListener("click", (e) => {
        onAbMarkerClose && onAbMarkerClose();
        abMarker.setVisible(false);
        abMarker.setMap(null);
      });

      console.log(
        uniqueSeqRootSelector,
        document.querySelector(`${uniqueSeqRootSelector}`)
      );
    });

    //오버레이 마커 이벤트 함수

    // const Overlay = function(event: any) {
    //   abMarker.setVisible(true);
    //   abMarker.setMap(map);
    // };

    // kakao.maps.event.addListener(markerRef.current, "click", Overlay);
    // kakao.maps.event.removeListener(markerRef.current, "click", Overlay);

    //오버레이 close 버튼 이벤트 함수

    const closeOverlay = function(e: any) {
      abMarker.setMap(null);
    };

    // function closeOverlay() {
    //   abMarker.setMap(null);
    // }

    markerRef.current = abMarker;

    // closeHandlerRef.current.addEventListener("click", (e) => {
    //   alert("click!");
    // });

    // closeHandlerRef.current.addEventListener("click", closeOverlay);

    return () => {
      if (abMarker) {
        abMarker.setMap(null);
        abMarker.setVisible(null);
      }

      // closeHandlerRef.current.removeEventListener("click", closeOverlay);
    };
  }, []);

  return null;
};

export default Marker;
