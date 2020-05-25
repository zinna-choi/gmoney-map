import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useReducer,
  ReactNode,
} from "react";
import styled from "styled-components";
import { withRouter, useRouter } from "next/router";
import KakaoMap, { IMapsBasicInfo } from "../../components/maps/KakaoMap";
import KakaoMapContext from "../../components/maps/KakaoMapContext";
import { WithRouterProps } from "next/dist/client/with-router";
import KakaoMarker from "../../components/maps/KakaoMarker";
import ShopAPI from "../../api/ShopAPI";
import { IShopDocument } from "../../server/shop/shop.interface";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../module";
import { setMarkers, setPopStatus } from "../../slices/store-slice";
import AbMarker from "../../components/maps/AbMarker";

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
  onClick?: () => void;
  children?: React.ReactNode;
  onClose?: () => void;
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
  const [currentMarker, setCurrentMarker] = useState<{
    lat: number;
    lng: number;
    imageSrc: string;
  }>();
  //스토어에 저장된 마커 불러오기
  const dispatch = useDispatch();
  const { Markers } = useSelector((state: RootState) => state.store);

  // const [markers, setMarkers] = useState<IShopDocument[]>([]);

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

        setCurrentMarker({
          lat: lat,
          lng: lon,
          imageSrc: "https://image.flaticon.com/icons/svg/1673/1673188.svg",
        });

        setMapCenter({
          latitude: lat,
          longitude: lon,
        });
      });
    }
  }, []);

  const findByMapNearShop = async (lat: number, lng: number) => {
    // 데이터를 로딩하고 있다는 표시
    const { data } = await ShopAPI.search({ lat, lng, distance: 500 });
    dispatch(setMarkers(data));

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
        {Markers.map((marker) => (
          <AbMarker
            onClick={props.onClick}
            // onClose={() => props.setMap(null)}
            key={marker._id}
            lat={marker.location.coordinates[1]}
            lng={marker.location.coordinates[0]}
            imageSrc="http://www.pngall.com/wp-content/uploads/2017/05/Map-Marker-Free-Download-PNG.png"
            _id={marker._id}
            shopName={marker.CMPNM_NM}
            address={marker.REFINE_LOTNO_ADDR}
            address_R={marker.REFINE_ROADNM_ADDR}
            telNo={marker.TELNO}
          />
        ))}
        {/* 현재 내위치의 마커 */}
        {currentMarker && (
          <AbMarker
            lat={currentMarker.lat}
            lng={currentMarker.lng}
            imageSrc={currentMarker.imageSrc}
          />
        )}
      </KakaoMap>
    </Container>
  );
};

export default withRouter(MapContainer);
