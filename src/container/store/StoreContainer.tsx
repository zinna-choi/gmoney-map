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
import dynamic from "next/dynamic";
import ShopAPI from "../../api/ShopAPI";
import { IMapsBasicInfo } from "../../components/maps/KakaoMap";

declare const kakao: any;
const Location = dynamic(() => import("../../components/maps/Location"), {
  ssr: false,
});

export type Props = {
  onRender?: any;
  text?: any;
};

const Side: React.FC<Props> = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { Markers, currentMarker, mapCenter, searchInput } = useSelector(
    (state: RootState) => state.store
  );
  const map = useContext(KakaoMapContext);

  useEffect(() => {
    dispatch(setMapCenter(mapCenter));
  }, [mapCenter]);

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
      <Header />
      <Content>
        {mapCenter && (
          <Location lat={mapCenter.latitude} lng={mapCenter.longitude} />
        )}
        <SearchBox
          onChange={handleSearch}
          onSubmit={handleSubmit}
          text={searchInput}
        />
      </Content>
      <hr />
      <Content>
        <div className="title">
          <p>주변탐색</p>
        </div>
        <FranLayout>
          <Tab className={router.pathname == "/" ? "active" : ""}>
            <Link activeClassName="active" href={{ query: { category: "" } }}>
              <a className="btn_con">
                <CircleButton>
                  <FaHamburger size="20" color="#fff" />
                </CircleButton>
                <p>전체</p>
              </a>
            </Link>
          </Tab>
          <Tab className={router.pathname == "/" ? "active" : ""}>
            <Link
              activeClassName="active"
              href={{ query: { category: ["음식", "카페", "음료"].join(",") } }}
            >
              <a className="btn_con">
                <CircleButton>
                  <FaHamburger size="20" color="#fff" />
                </CircleButton>
                <p>음식점/카페</p>
              </a>
            </Link>
          </Tab>
          <Tab className={router.pathname == "/" ? "active" : ""}>
            <Link
              activeClassName="active"
              href={{ query: { category: "etc" } }}
            >
              <a className="btn_con">
                <CircleButton>
                  <FaStore size="20" color="#fff" />
                </CircleButton>
                <p>생활편의</p>
              </a>
            </Link>
          </Tab>
          <Tab className={router.pathname == "/" ? "active" : ""}>
            <Link
              activeClassName="active"
              href={{
                query: {
                  category: [
                    "유통",
                    "도매",
                    "소매",
                    "신변",
                    "잡화",
                    "정육점",
                  ].join(","),
                },
              }}
            >
              <a className="btn_con">
                <CircleButton>
                  <MdShoppingBasket size="20" color="#fff" />
                </CircleButton>
                <p>마트/편의점</p>
              </a>
            </Link>
          </Tab>
          <Tab className={router.pathname == "/" ? "active" : ""}>
            <Link
              activeClassName="active"
              href={{
                query: {
                  category: ["병원", "기타의료기관", "의원", "약국"].join(","),
                },
              }}
            >
              <a className="btn_con">
                <CircleButton>
                  <IoIosMedkit size="20" color="#fff" />
                </CircleButton>
                <p>병원/약국</p>
              </a>
            </Link>
          </Tab>
          <Tab className={router.pathname == "/" ? "active" : ""}>
            <Link
              activeClassName="active"
              href={{
                query: {
                  category: [
                    "레저업소",
                    "레저용품",
                    "문화",
                    "취미",
                    "숙박업",
                    "학원",
                    "여행",
                    "회원제형태",
                  ].join(","),
                },
              }}
            >
              <a className="btn_con">
                <CircleButton>
                  <MdMovieCreation size="20" color="#fff" />
                </CircleButton>
                <p>문화/교육</p>
              </a>
            </Link>
          </Tab>
        </FranLayout>
      </Content>
      <hr />
      <ListContent>
        <div className="result">
          <p>
            내 주변 <span>{Markers.length}</span> 개
          </p>
        </div>
        <StoreList />
      </ListContent>
    </LayoutStyled>
  );
};

const LayoutStyled = styled.div`
  width: 380px;
  height: 100%;
  background-color: #fff;
  position: absolute;
  z-index: 999;
  box-shadow: 1px 1px 22px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  overflow: hidden;
  ${media.small} {
    display: none;
  }
  top: 0;
  left: 0;
`;
const Content = styled.div`
  padding: 3%;
  box-sizing: border-box;
  p {
    margin: 0 0 10px;
  }
  .title {
    margin: 0 0 10px;
    color: #676767;
    font-size: 1rem;
  }
  .result {
    text-align: left;
    font-size: 0.8rem;
    color: #cecece;
    padding-left: 3%;
    span {
      color: #10b592;
      font-weight: bold;
    }
  }
`;

const ListContent = styled(Content)`
  padding: 0;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 531px + 82px);
`;

const FranLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .btn_con {
    width: 30%;
    margin-bottom: 0.5rem;
    text-align: center;
  }
  p {
    margin: 0;
    font-size: 0.7rem;
    color: #10b592;
    font-weight: 600;
  }
`;

const CircleButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(133.04deg, #005dac 3.19%, #10b592 100%);
  border: none;
  color: #fff;
`;
const Tab = styled.div`
  width: 30%;
  text-align: center;
  margin-bottom: 0.5rem;
`;

export default Side;
