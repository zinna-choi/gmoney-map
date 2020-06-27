import React, { useEffect } from "react";
import styled from "styled-components";
import media from "../../lib/styles/media";
import { IoMdCafe, IoIosMedkit } from "react-icons/io";
import { MdShoppingBasket, MdMovieCreation } from "react-icons/md";
import { FaStore, FaHamburger } from "react-icons/fa";
import { withRouter, useRouter } from "next/router";
import e from "express";
import Link from "../../lib/utility/ActiveLink";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../module";
import { setMapCenter, setSearchInput } from "../../slices/store-slice";

const MapLocation = dynamic(() => import("../maps/MapLocation"), {
  ssr: false,
});

export type Props = {
  onClick?: () => void;
  e?: any;
};

const MobileSubMenu: React.FC<Props> = (porps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { mapCenter } = useSelector((state: RootState) => state.store);
  useEffect(() => {
    dispatch(setMapCenter(mapCenter));
  }, [mapCenter]);

  const { cate } = router.query; // query 에서 a 가 key 인것을 가져옴
  const handleClick = (e: any) => {
    // e.currentTarget.style.background =
    //   "linear-gradient(133.04deg, #005dac 3.19%, #10b592 100%)";
  };

  return (
    <LayoutStyled>
      <Content>
        <FranLayout>
          <Tab className={router.pathname == "/" ? "active" : ""}>
            <Link
              activeClassName="active"
              active={!cate || cate === "1"}
              href={{ query: { category: "" } }}
            >
              <a className="btn_con">
                <CircleButton>
                  <FaHamburger size="15" color="#fff" />
                  <p>전체</p>
                </CircleButton>
              </a>
            </Link>
          </Tab>
          <Tab className={router.pathname == "/" ? "active" : ""}>
            <Link
              activeClassName="active"
              active={cate === "2"}
              href={{ query: { category: ["음식", "카페", "음료"].join(",") } }}
            >
              <a className="btn_con">
                <CircleButton>
                  <FaHamburger size="15" color="#fff" />
                  <p>음식점/카페</p>
                </CircleButton>
              </a>
            </Link>
          </Tab>
          <Tab className={router.pathname == "/" ? "active" : ""}>
            <Link
              activeClassName="active"
              active={cate === "3"}
              href={{ query: { category: "etc" } }}
            >
              <a className="btn_con">
                <CircleButton>
                  <FaStore size="15" color="#fff" />
                  <p>생활편의</p>
                </CircleButton>
              </a>
            </Link>
          </Tab>
          <Tab className={router.pathname == "/" ? "active" : ""}>
            <Link
              activeClassName="active"
              active={cate === "4"}
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
                  <MdShoppingBasket size="15" color="#fff" />
                  <p>마트/편의점</p>
                </CircleButton>
              </a>
            </Link>
          </Tab>
          <Tab className={router.pathname == "/" ? "active" : ""}>
            <Link
              activeClassName="active"
              active={cate === "5"}
              href={{
                query: {
                  category: ["병원", "기타의료기관", "의원", "약국"].join(","),
                },
              }}
            >
              <a className="btn_con">
                <CircleButton>
                  <IoIosMedkit size="15" color="#fff" />
                  <p>병원/약국</p>
                </CircleButton>
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
                  <MdMovieCreation size="15" color="#fff" />
                  <p>문화/교육</p>
                </CircleButton>
              </a>
            </Link>
          </Tab>
        </FranLayout>
      </Content>
    </LayoutStyled>
  );
};

const LayoutStyled = styled.div`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: none;
  position: absolute;
  z-index: 100;
  top: 132px;
  left: 0;
  border-top: 1px solid #ccc;
  ${media.small} {
    display: block;
  }
  .loca-info {
    padding: 3%;
  }
`;
const Content = styled.div`
  box-sizing: border-box;
  padding: 2.5% 0 2.5% 1%;
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
    span {
      color: #10b592;
      font-weight: bold;
    }
  }
`;

const FranLayout = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  overflow-x: auto;

  .btn_con {
    width: 30%;
    margin-bottom: 0.5rem;
    text-align: center;
  }
  p {
    margin: 0;
    font-size: 0.7rem;
    color: #fff;
    line-height: 1.4rem;
  }
`;
const CircleButton = styled.button`
  width: 90px;
  height: 40px;
  border-radius: 30px;
  background: #4e799e;
  border: none;
  color: #fff;
  display: flex;
  justify-content: space-evenly;
  margin-right: 5px;
  padding: 9%;

  svg {
    margin-top: 4%;
  }
`;

const Tab = styled.div`
  .active button {
    background: linear-gradient(133.04deg, #005dac 3.19%, #10b592 100%);
  }
`;

export default withRouter(MobileSubMenu);
