import React from "react";
import styled from "styled-components";
import Location from "../location/Location";
import media from "../../lib/styles/media";
import { IoMdCafe, IoIosMedkit } from "react-icons/io";
import { MdShoppingBasket, MdMovieCreation } from "react-icons/md";
import { FaStore, FaHamburger } from "react-icons/fa";
import { useRouter } from "next/router";
import e from "express";
import Link from "../../lib/utility/ActiveLink";

export type Props = {
  onClick?: () => void;
  e?: any;
};

const MobileSubMenu: React.FC<Props> = (props) => {
  const handleClick = (e: any) => {
    e.currentTarget.style.background =
      "linear-gradient(133.04deg, #005dac 3.19%, #10b592 100%";
  };

  const router = useRouter();
  const onNavigation = (route: string) => {
    router.push(route);
  };
  return (
    <LayoutStyled>
      <div className="loca-info">
        <Location />
      </div>
      <hr></hr>
      <Content>
        <FranLayout>
          <div className="btn_con">
            <CircleButton onClick={handleClick}>
              <FaHamburger size="20" color="#fff" />
              <p>음식점</p>
            </CircleButton>
          </div>

          <div className="btn_con">
            <CircleButton onClick={handleClick}>
              <IoMdCafe size="20" color="#fff" />
              <p>카페</p>
            </CircleButton>
          </div>
          <div className="btn_con">
            <CircleButton onClick={handleClick}>
              <FaStore size="20" color="#fff" />
              <p>생활편의</p>
            </CircleButton>
          </div>
          <div className="btn_con">
            <CircleButton onClick={handleClick}>
              <MdShoppingBasket size="20" color="#fff" /> <p>마트/편의점</p>
            </CircleButton>
          </div>
          <div className="btn_con">
            <CircleButton onClick={handleClick}>
              <IoIosMedkit size="20" color="#fff" /> <p>병원/약국</p>
            </CircleButton>
          </div>
          <div className="btn_con">
            <CircleButton onClick={handleClick}>
              <MdMovieCreation size="20" color="#fff" /> <p>문화/교육</p>
            </CircleButton>
          </div>
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
  &.active{background:
    "linear-gradient(133.04deg, #005dac 3.19%, #10b592 100%";
  }
  .btn_con {
    width: 30%;
    margin-bottom: 0.5rem;e
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
  background: #ccc;
  border: none;
  color: #fff;
  display: flex;
  justify-content: space-evenly;
  margin-right: 5px;
`;

export default MobileSubMenu;
