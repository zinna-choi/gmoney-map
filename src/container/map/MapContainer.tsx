import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useReducer,
} from "react";
import styled from "styled-components";
import { withRouter, useRouter } from "next/router";
import KakaoMap from "../../components/maps/KakaoMap";
import KakaoMapContext from "../../components/maps/KakaoMapContext";

const Container = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  flex: 1;
`;

interface IRouteMatchProps {
  latitude?: string;
  longitude?: string;
  zoomLevel?: string;
}

type StateProps = {
  rightNav: boolean;
  historyId: string;
  carItemOver: string;
};

interface MatchParams {}

type Props = {
  onRender?: (map: any) => any;
  router?: any;
};

const MapContainer: React.FC<Props> = (props) => {
  const router = useRouter();
  const mapCtx = useContext(KakaoMapContext);
  const { latitude, longitude, zoomLevel } = props.router.query;

  /**
   * 지도의 중심 좌표를 설정합니다.
   */
  const [mapCenter, setMapCenter] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: Number(latitude) || 33.450701,
    longitude: Number(longitude) || 126.570667,
  });

  /**
   * 지도의 zoom level 을 설정합니다.
   */
  const [mapZoom, setMapZoom] = useState<number>(Number(zoomLevel) || 3);

  return (
    <Container>
      <KakaoMap
        render={props.onRender}
        zoom={mapZoom}
        maxLevel={12}
        center={mapCenter}
      ></KakaoMap>
    </Container>
  );
};

export default withRouter(MapContainer);
