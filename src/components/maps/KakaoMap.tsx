import React from "react";

const { useEffect, useState, useRef } = React;
declare const kakao: any;

const Loader = <div>지도를 불러오는 중입니다.</div>;

type IMapsBasicInfo = {
  latitude: number;
  longitude: number;
  zoom: number;
  map?: any;
};

type MapProps = {
  render: (map: any) => void;
  center: {
    latitude: number;
    longitude: number;
  };
  zoom: number;
  maxLevel?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
  onIdle?: (mapInfo: IMapsBasicInfo) => void;
};
type MapContainProps = MapProps & {};

const KakaoMap: React.SFC<MapContainProps> = (props) => {
  const [map, fetchMap] = useState(null);
  const mapRef = useRef<any>();

  useEffect(() => {
    mapRef.current = new kakao.maps.Map(document.getElementById("dmap"), {
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: props.zoom,
    });

    props.render && props.render(mapRef.current);
    fetchMap(mapRef.current);

    kakao.maps.event.addListener(mapRef.current, "idle", mapIdleEventHandler);

    return () => {
      kakao.maps.event.removeListener(
        mapRef.current,
        "idle",
        mapIdleEventHandler
      );
    };
  }, []);

  useEffect(() => {
    if (props.maxLevel) {
      mapRef.current.setMaxLevel(props.maxLevel);
    }
  }, [props.maxLevel]);

  useEffect(() => {
    mapRef.current.panTo(
      new kakao.maps.LatLng(props.center.latitude, props.center.longitude)
    );
  }, [props.center.latitude, props.center.longitude]);
  useEffect(() => {}, [props.zoom]);

  const mapIdleEventHandler = () => {
    if (props.onIdle) {
      const iMap = mapRef.current;
      const locations = iMap.getCenter();

      const zoom: number = iMap.getLevel();

      props.onIdle({
        latitude: locations.getLat(),
        longitude: locations.getLng(),
        map: mapRef.current,
        zoom,
      });
    }
  };

  return (
    <div id="dmap" style={{ width: "100%", height: "100%" }}>
      {Loader}
      {map !== null && props.children}
    </div>
  );
};

export default KakaoMap;
