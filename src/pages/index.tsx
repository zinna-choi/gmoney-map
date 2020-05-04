import React, { useState } from "react";
import styled from "styled-components";
import Side from "../components/layouts/Side";
import MapView from "../components/maps/MapView";
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

type Props = {
  className?: string;
};

const Home: React.FC<Props> = (props) => {
  const [map, setMap] = useState(false);
  const { shopStore } = useSelector((state: RootState) => state.global);
  return (
    <LayoutStyeld>
      <div className="mobileview">
        <MobileHeader />
        <MobileSubMenu />
        <MobileStoreList />
        <div className="mobilepop">
          <MobileStoreCard />
        </div>
        <FloatContatin>
          <FloatMenu />
        </FloatContatin>
      </div>
      <MapView />
      <div className="view">
        <Side />
      </div>
      <div className="pop">{shopStore && <StorePop />}</div>
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
