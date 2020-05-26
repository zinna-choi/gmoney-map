import React, {
  useEffect,
  useContext,
  useRef,
  useState,
  ReactNode,
  SetStateAction,
} from "react";
import styled from "styled-components";
import RoundButton from "../common/RoundButton";
import { BsArrowRepeat } from "react-icons/bs";
import KakaoMapContext from "./KakaoMapContext";

declare const window: any;
const { kakao } = window;

type Props = {
  children?: ReactNode;
  lat?: number;
  lng?: number;
  latitude?: number;
  longitude?: number;
};

const Location: React.FC<Props> = (props) => {
  const map = useContext(KakaoMapContext);

  const geocoder = new kakao.maps.services.Geocoder();

  useEffect(() => {
    const latlng = new kakao.maps.LatLng(props.lat, props.lng);

    searchAddrFromCoords(latlng, displayCenterInfo);

    function searchAddrFromCoords(coords: any, callback: any) {
      // 좌표로 행정동 주소 정보를 요청합니다
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }

    function displayCenterInfo(result: any, status: any) {
      if (status === kakao.maps.services.Status.OK) {
        var infoDiv = document.getElementById("centerAddr");

        for (var i = 0; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === "H") {
            infoDiv.innerHTML = result[i].address_name;
            break;
          }
        }
      }
    }
  }, []);

  return (
    <LayoutStyled>
      <Current>
        <div className="current-loca" id="centerAddr"></div>
        <LocaButton title="위치재설정" icon={<BsArrowRepeat />}></LocaButton>
      </Current>
    </LayoutStyled>
  );
};

const LayoutStyled = styled.div``;
const LocaButton = styled(RoundButton)``;
const Current = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .current-loca {
    font-size: 1.125rem;
    font-weight: bold;
  }
`;

export default Location;
