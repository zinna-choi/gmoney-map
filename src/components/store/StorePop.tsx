import React, { ReactElement } from "react";
import styled from "styled-components";
import { IoMdCafe, IoIosMedkit } from "react-icons/io";
import { MdShoppingBasket, MdMovieCreation } from "react-icons/md";
import { FaStore, FaHamburger } from "react-icons/fa";
import RoundButton from "../common/RoundButton";
import StoreInfo, { StoreInfoProps } from "./StoreInfo";
import media from "../../lib/styles/media";
import { FaPhoneAlt } from "react-icons/fa";
import { MdNavigation } from "react-icons/md";
import CircleButton from "../common/CircleButton";

type Props = StoreInfoProps & {
  className?: string;
  icon?: any;
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
const StorePop: React.FC<Props> = (props) => {
  const btnClick = () => {
    window.open(
      `https://map.kakao.com/link/to/${props.shopName},${props.latMarker},${props.lngMarker}`
    );
  };
  return (
    <LayoutStyled className={`${props.className}`}>
      <div className="btn_con">
        <CateButton>
          <MdMovieCreation size="20" color="white" />
        </CateButton>
      </div>
      <Info {...props} />
      <LoadBtn title="길찾기" {...props} onClick={btnClick}></LoadBtn>
      <div className="mobilebtn">
        <MobileBtn>
          <FaPhoneAlt size="16" />
        </MobileBtn>
        <MobileBtn>
          <MdNavigation size="19" />
        </MobileBtn>
      </div>
    </LayoutStyled>
  );
};

const LayoutStyled = styled.div`
  display: flex;
  background-color: #fff;
  width: 360px;
  height: 140px;
  padding: 5% 6%;
  box-sizing: border-box;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;
  .mobilebtn {
    display: none;
    ${media.small} {
      display: block;
      display: flex;
    }
  }
`;

const CateButton = styled.button`
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
  ${media.small} {
    display: none;
  }
`;
const Info = styled(StoreInfo)`
  .type {
    display: none;
  }
`;

const MobileBtn = styled.button`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: none;
  color: #fff;
  background: #10b592;
  margin-right: 5px;
`;

export default StorePop;
