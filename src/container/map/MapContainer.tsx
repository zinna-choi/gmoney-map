import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useReducer,
} from "react";
import styled from "styled-components";
import { withRouter, useRouter } from "next/router";
import KakaoMap, { IMapsBasicInfo } from "../../components/maps/KakaoMap";
import KakaoMapContext from "../../components/maps/KakaoMapContext";
import { WithRouterProps } from "next/dist/client/with-router";
import KakaoMarker from "../../components/maps/KakaoMarker";
import ShopAPI from "../../api/ShopAPI";
import { IShopDocument } from "../../server/shop/shop.interface";

export declare const kakao: any;

const Container = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  flex: 1;
`;

type Props = WithRouterProps & {
  onRender?: (map: any) => any;
};

const MapContainer: React.FC<Props> = (props) => {
  const router = useRouter();
  const mapCtx = useContext(KakaoMapContext);

  /**
   * 지도의 중심 좌표를 설정합니다.
   */
  const [mapCenter, setMapCenter] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 37.2750552,
    longitude: 127.0072561,
  });

  const [markers, setMarkers] = useState<IShopDocument[]>([]);

  /**
   * 지도의 zoom level 을 설정합니다.
   */
  const [mapZoom, setMapZoom] = useState<number>(3);

  const handleLocationChange = (map: IMapsBasicInfo) => {
    const lat = Number(map.latitude),
      lng = Number(map.longitude),
      zoom = map.zoom;

    /**
     * 현재 위/경도 좌표 기준으로, 상점 리스틀 받아옵니다.
     */
    findByMapNearShop(lat, lng);
  };

  /**
   * test
   */
  const moveTest = (lat: number, lng: number) => {
    setMapCenter({
      latitude: lat,
      longitude: lng,
    });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function(position) {
        let lat: number = position.coords.latitude, // 위도
          lon: number = position.coords.longitude; // 경도

        let message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

        // setMapCenter({
        //   latitude: lat,
        //   longitude: lon,
        // });

        // 마커와 인포윈도우를 표시합니다
        // displayMarker(locPosition, message);
      });
    }
  }, []);

  const findByMapNearShop = async (lat: number, lng: number) => {
    // 데이터를 로딩하고 있다는 표시
    const { data } = await ShopAPI.search({ lat, lng, distance: 500 });
    setMarkers(data);

    // 데이터를 모두 완료했을때 로딩하고 있다는 표시를 제거
  };

  return (
    <Container>
      <KakaoMap
        render={props.onRender}
        zoom={mapZoom}
        maxLevel={12}
        onIdle={handleLocationChange}
        center={mapCenter}
      >
        {markers.map((marker) => (
          <KakaoMarker
            key={marker._id}
            lat={marker.location.coordinates[1]}
            lng={marker.location.coordinates[0]}
          />
        ))}

        {/* 현재 내위치의 마커 */}
      </KakaoMap>
    </Container>
  );
};

export default withRouter(MapContainer);
