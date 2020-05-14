import React, { useState } from "react";
import styled from "styled-components";
import Side from "../components/layouts/Side";
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
import { Main } from "./Main";

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
