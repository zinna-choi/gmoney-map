import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Location from "../location/Location";
import SearchBox from "../common/SearchBox";
import { IoMdCafe, IoIosMedkit } from "react-icons/io";
import { MdShoppingBasket, MdMovieCreation } from "react-icons/md";
import { FaStore, FaHamburger } from "react-icons/fa";
import StoreList from "../store/StoreList";

type Props = {};

const Side: React.FC<Props> = (props) => {
  return (
    <LayoutStyled>
      <Header />
      <Content>
        <Location />
        <SearchBox />
      </Content>
      <hr />
      <Content>
        <div className="title">
          <p>주변탐색</p>
        </div>
        <FranLayout>
          <div className="btn_con">
            <CircleButton>
              <FaHamburger size="20" color="white" />
            </CircleButton>
            <p>음식점</p>
          </div>
          <div className="btn_con">
            <CircleButton>
              <IoMdCafe size="20" color="white" />
            </CircleButton>
            <p>카페</p>
          </div>
          <div className="btn_con">
            <CircleButton>
              <FaStore size="20" color="white" />
            </CircleButton>
            <p>생활편의</p>
          </div>
          <div className="btn_con">
            <CircleButton>
              <MdShoppingBasket size="20" color="white" />
            </CircleButton>
            <p>마트/편의점</p>
          </div>
          <div className="btn_con">
            <CircleButton>
              <IoIosMedkit size="20" color="white" />
            </CircleButton>
            <p>병원/약국</p>
          </div>
          <div className="btn_con">
            <CircleButton>
              <MdMovieCreation size="20" color="white" />
            </CircleButton>
            <p>문화/교육</p>
          </div>
        </FranLayout>
      </Content>
      <hr />
      <Content>
        <div className="result">
          <p>
            내 주변 <span>10</span> 개
          </p>
        </div>
        <StoreList />
      </Content>
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
    span {
      color: #10b592;
      font-weight: bold;
    }
  }
`;

const FranLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .btn_con {
    width: 30%;
    margin-bottom: 1rem;
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

export default Side;
