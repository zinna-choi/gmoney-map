import React from "react";
import styled from "styled-components";
import Location from "../location/Location";
import media from "../../lib/styles/media";
import { IoMdCafe, IoIosMedkit } from "react-icons/io";
import { MdShoppingBasket, MdMovieCreation } from "react-icons/md";
import { FaStore, FaHamburger } from "react-icons/fa";
import { withRouter, useRouter } from "next/router";
import e from "express";
import Link from "../../lib/utility/ActiveLink";

export type Props = {
  onClick?: () => void;
  e?: any;
};

const MobileSubMenu: React.FC<Props> = (porps) => {
  const router = useRouter();
  const handleClick = (e: any) => {
    e.currentTarget.style.background =
      "linear-gradient(133.04deg, #005dac 3.19%, #10b592 100%)";
  };

  return (
    <LayoutStyled>
      <div className="loca-info">
        <Location />
      </div>
      <hr></hr>
      <Content>
        <FranLayout>
          <Tab className={router.pathname == "/" ? "active" : ""}>
            <Link activeClassName="active" href={{ query: { cate: "1" } }}>
              <a className="btn_con">
                <CircleButton onClick={handleClick}>
                  <FaHamburger size="20" color="#fff" />
                  <p>음식점</p>
                </CircleButton>
              </a>
            </Link>
          </Tab>
          <Tab className={router.pathname == "/" ? "active" : ""}>
            <Link activeClassName="active" href={{ query: { cate: "2" } }}>
              <a className="btn_con">
                <CircleButton onClick={handleClick}>
                  <IoMdCafe size="20" color="#fff" />
                  <p>카페</p>
                </CircleButton>
              </a>
            </Link>
          </Tab>
          <Tab className={router.pathname == "/" ? "active" : ""}>
            <Link activeClassName="active" href={{ query: { cate: "3" } }}>
              <a className="btn_con">
                <CircleButton onClick={handleClick}>
                  <FaStore size="20" color="#fff" />
                  <p>생활편의</p>
                </CircleButton>
              </a>
            </Link>
          </Tab>
          <Tab className={router.pathname == "/" ? "active" : ""}>
            <Link activeClassName="active" href={{ query: { cate: "4" } }}>
              <a className="btn_con">
                <CircleButton onClick={handleClick}>
                  <MdShoppingBasket size="20" color="#fff" /> <p>마트/편의점</p>
                </CircleButton>
              </a>
            </Link>
          </Tab>
          <Tab className={router.pathname == "/" ? "active" : ""}>
            <Link activeClassName="active" href={{ query: { cate: "5" } }}>
              <a className="btn_con">
                <CircleButton onClick={handleClick}>
                  <IoIosMedkit size="20" color="#fff" /> <p>병원/약국</p>
                </CircleButton>
              </a>
            </Link>
          </Tab>
          <Tab className={router.pathname == "/" ? "active" : ""}>
            <Link activeClassName="active" href={{ query: { cate: "6" } }}>
              <a className="btn_con">
                <CircleButton onClick={handleClick}>
                  <MdMovieCreation size="20" color="#fff" /> <p>문화/교육</p>
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
  top: 80px;
  left: 0;
  ${media.small} {
    display: block;
  }
  .loca-info {
    padding: 3%;
  }
`;
const Content = styled.div`
  box-sizing: border-box;
  padding: 1% 0 1% 1%;
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
  flex-wrap:nowrap;
  justify-content: space-between;
  overflow-x:auto;
  
  .btn_con {
    width: 30%;
    margin-bottom: 0.5rem;
    text-align: center;
  }
  p {
    margin: 0;
    font-size: 0.7rem;
    color: #fff
    font-weight: 600;
  }
`;
const CircleButton = styled.button`
  width: 90px;
  height: 45px;
  border-radius: 30px;
  background: #4e799e;
  border: none;
  color: #fff;
  display: flex;
  justify-content: space-evenly;
  margin-right: 5px;
`;

const Tab = styled.div`
  .active {
    color: red;
    background: "linear-gradient(133.04deg, #005dac 3.19%, #10b592 100%)";
  }
`;

export default withRouter(MobileSubMenu);
