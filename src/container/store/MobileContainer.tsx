import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import Header from "../../components/layouts/Header";
// import Location from "../maps/Location";
import SearchBox from "../../components/common/SearchBox";
import { IoMdCafe, IoIosMedkit } from "react-icons/io";
import { MdShoppingBasket, MdMovieCreation } from "react-icons/md";
import { FaStore, FaHamburger } from "react-icons/fa";
import StoreList from "../../components/store/StoreList";
import media from "../../lib/styles/media";
import { withRouter, useRouter } from "next/router";
import Link from "../../lib/utility/ActiveLink";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../module";
import {
  setLocation,
  setMapCenter,
  setSearchInput,
} from "../../slices/store-slice";
import KakaoMapContext from "../../components/maps/KakaoMapContext";
import MobileHeader from "../../components/layouts/MobileHeader";
import MobileSubMenu from "../../components/layouts/MobileSubMenu";
import MobileStoreList from "../../components/store/MobileStoreList";
import FloatMenu from "../../components/common/FloatMenu";
import dynamic from "next/dynamic";

const MapLocation = dynamic(() => import("../../components/maps/MapLocation"), {
  ssr: false,
});

export type Props = {
  onRender?: any;
  text?: any;
};

const MobileContainer: React.FC<Props> = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { Markers, currentMarker, mapCenter, searchInput } = useSelector(
    (state: RootState) => state.store
  );
  const map = useContext(KakaoMapContext);

  useEffect(() => {
    dispatch(setMapCenter(mapCenter));
  }, [mapCenter]);

  const [state, setState] = useState({ visible: false });
  const handleClick = () => {
    setState({ visible: !state.visible });
    console.log(setState);
  };

  //상호명 검색 기능

  //const [searchInput, setSearchInput] = useState<string>("");

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchInput(e.currentTarget.value));
    console.log("search >", searchInput);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  return (
    <LayoutStyled>
      <div className="mobileview">
        <MobileHeader />
        <SubLayoutStyled>
          <div className="loca-info">
            {mapCenter && (
              <MapLocation lat={mapCenter.latitude} lng={mapCenter.longitude} />
            )}
          </div>
        </SubLayoutStyled>
        <MobileSubMenu />
        {state.visible ? <MobileStoreList /> : null}
        {/* <div className="mobilepop">
          <MobileStoreCard />
        </div> */}
        <div onClick={handleClick}>
          <FloatContatin>
            <FloatMenu count={Markers.length} />
          </FloatContatin>
        </div>
      </div>
    </LayoutStyled>
  );
};

const LayoutStyled = styled.div`
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

const SubLayoutStyled = styled.div`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: none;
  position: absolute;
  z-index: 100;
  top: 80px;
  left: 0;
  ${media.small} {
    display: block;
  }
  .loca-info {
    padding: 3%;
  }
`;
export default MobileContainer;
