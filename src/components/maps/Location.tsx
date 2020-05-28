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
import { FiSearch } from "react-icons/fi";
import KakaoMapContext from "./KakaoMapContext";

declare const window: any;
const { kakao, daum } = window;

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

  const GMPostcode = () => {
    new daum.Postcode({
      oncomplete: function(data: any) {
        const addr = data.address; // 최종 주소 변수

        // 주소 정보를 해당 필드에 넣는다.
        document.getElementById("centerAddr").innerHTML = addr;
        // 주소로 상세 정보를 검색
        geocoder.addressSearch(data.address, function(
          results: any,
          status: any
        ) {
          // 정상적으로 검색이 완료됐으면
          if (status === kakao.maps.services.Status.OK) {
            const result = results[0]; //첫번째 결과의 값을 활용

            // 해당 주소에 대한 좌표를 받아서
            const coords = new kakao.maps.LatLng(result.y, result.x);
            console.log(coords);
            console.log("map>", map);
            map.setCenter(coords);
          }
        });
      },
    }).open();
  };
  //현재위치 행정동 표시
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
  //idle 이벤트 발생 시(지동이동, 확대, 축소), 중심좌표 반환 후 행정동 표시
  useEffect(() => {
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

    kakao.maps.event.addListener(map, "idle", function() {
      searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    });

    return () => {
      kakao.maps.event.removeListener(map, "idle", function() {
        searchAddrFromCoords(map.getCenter(), displayCenterInfo);
      });
    };
  }, []);

  return (
    <LayoutStyled>
      <Current>
        <div className="current-loca" id="centerAddr"></div>
        <LocaButton
          title="직접검색"
          icon={<FiSearch size="16" />}
          onClick={GMPostcode}
        ></LocaButton>
      </Current>
    </LayoutStyled>
  );
};

const LayoutStyled = styled.div``;
const LocaButton = styled(RoundButton)`
  vertical-align: middle;
  font-weight: 300;
  svg {
    margin-left: 5px;
    vertical-align: text-top;
  }
`;
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
