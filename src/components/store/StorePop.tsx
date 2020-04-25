import React from "react";
import styled from "styled-components";
import { IoMdCafe, IoIosMedkit } from "react-icons/io";
import { MdShoppingBasket, MdMovieCreation } from "react-icons/md";
import { FaStore, FaHamburger } from "react-icons/fa";
import RoundButton from "../common/RoundButton";

type Props = {};

const StorePop: React.FC<Props> = (props) => {
  return (
    <LayoutStyled>
      <div className="btn_con">
        <CircleButton>
          <MdMovieCreation size="20" color="white" />
        </CircleButton>
      </div>
      <StoreInfo>
        <div className="detail">
          <div className="name">스페이스작</div>
          <div className="adress">경기도 부천시 까치로 20번길 13-7</div>
          <div className="tel">03-1234-1264</div>
        </div>
      </StoreInfo>
      <LoadBtn title="길찾기"></LoadBtn>
    </LayoutStyled>
  );
};

const LayoutStyled = styled.div`
  display: flex;
  background-color: #fff;
  padding: 5% 10%;
  box-sizing: border-box;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  align-items: center;
`;
const StoreInfo = styled.div`
  width: 100%;
  font-size: 0.8rem;
  color: #bababa;

  .detail {
    width: 100%;
    margin: 0% 3%;
    .name {
      font-size: 0.98rem;
      font-weight: bold;
      color: #000;
    }
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

const LoadBtn = styled(RoundButton)`
  background-color: #fff;
  border: 1px solid #10b592;
  color: #10b592;
  line-height: 1rem;
`;
export default StorePop;
