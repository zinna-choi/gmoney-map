import React, { useState } from "react";
import Bedge from "../common/Bedge";
import styled from "styled-components";
import StoreInfo from "./StoreInfo";
import media from "../../lib/styles/media";
import RactangleButton from "../common/RactangleButton";

export type Props = {
  onClick?: () => void;
};

const MobileStoreCard: React.FC<Props> = (props) => {
  const onToggleHandler = () => {
    console.log("ddd");
  };
  return (
    <LayoutStyled onClick={props.onClick}>
      <div className="info">
        <Bedge index={1}></Bedge>
        <Info />
      </div>
      <div className="popBtn">
        <RactangleButton title="전화하기" />
        <RactangleButton title="길찾기" />
      </div>
    </LayoutStyled>
  );
};

const LayoutStyled = styled.div`
  position: absolute;
  width: 90%;
  padding: 1rem;
  background-color: #fff;
  margin-bottom: 1rem;
  z-index: 100;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .info {
    display: flex;
  }
  .popBtn {
    margin-top: 1rem;
    display: flex;
    justify-content: space-around;
  }
`;

const Info = styled(StoreInfo)`
  .use {
    display: none;
  }
`;
export default MobileStoreCard;
