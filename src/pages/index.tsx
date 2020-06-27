import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import Side from "./Side";
import StorePop from "../components/store/StorePop";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../module";
import media from "../lib/styles/media";
import MobileStoreList from "../components/store/MobileStoreList";
import MobileStoreCard from "../components/store/MobileStoreCard";
import KakaoMap from "../components/maps/KakaoMap";
import dynamic from "next/dynamic";

const Main = dynamic(() => import("../container/Main"), { ssr: false });
// const Side = dynamic(() => import("../components/layouts/Side"), {
//   ssr: false,
// });

type Props = {
  className?: string;
};

const Home: React.FC<Props> = (props) => {
  const [state, setState] = useState({ visible: false });
  const handleClick = () => {
    setState({ visible: !state.visible });
    console.log(setState);
  };
  const [map, setMap] = useState(false);
  const { shopStore } = useSelector((state: RootState) => state.store);
  const { Markers } = useSelector((state: RootState) => state.store);

  useEffect(() => {
    console.log(shopStore);
  }, [shopStore]);

  return (
    <LayoutStyeld>
      <Main />
      {/* <Side /> */}
      {shopStore && (
        <div className="pop">
          {Markers.filter((marker) => marker._id === shopStore).map((item) => (
            <StorePop
              key={item._id}
              shopName={item.CMPNM_NM}
              address={item.REFINE_LOTNO_ADDR}
              telNo={item.TELNO}
              latMarker={item.REFINE_WGS84_LAT}
              lngMarker={item.REFINE_WGS84_LOGT}
            />
          ))}
        </div>
      )}
    </LayoutStyeld>
  );
};

const LayoutStyeld = styled.div`
  background-color: #e3e3e3;
`;

export default Home;
