import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import Side from "./Side";
import StorePop from "../components/store/StorePop";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../module";
import media from "../lib/styles/media";
import MobileHeader from "../components/layouts/MobileHeader";
import MobileSubMenu from "../components/layouts/MobileSubMenu";
import FloatMenu from "../components/common/FloatMenu";
import MobileStoreList from "../components/store/MobileStoreList";
import MobileStoreCard from "../components/store/MobileStoreCard";
import KakaoMap from "../components/maps/KakaoMap";
import dynamic from "next/dynamic";

const Main = dynamic(() => import("./Main"), { ssr: false });
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
      <div className="mobileview">
        <MobileHeader />
        <MobileSubMenu />
        {state.visible ? <MobileStoreList /> : null}
        {/* <div className="mobilepop">
          <MobileStoreCard />
        </div> */}
        <div onClick={handleClick}>
          <FloatContatin>
            <FloatMenu />
          </FloatContatin>
        </div>
      </div>
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
  .mobileview {
    display: none;
    ${media.small} {
      display: block;
    }
  }
  .mobilepop {
    position: absolute;
    top: 25%;
    width: 100%;
    height: 75%;
  }

  .pop {
    position: absolute;
    top: 20px;
    left: 400px;
    z-index: 100;
    ${media.small} {
      display: none;
    }
  }
`;

const FloatContatin = styled.div`
  position: absolute;
  width: 100%;
  bottom: 5%;
  text-align: center;

  z-index: 100;
  display: none;
  ${media.small} {
    display: block;
  }
`;

export default Home;
