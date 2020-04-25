import React from "react";
import Bedge from "../common/Bedge";
import styled from "styled-components";

type Props = {};

const StoreCard: React.FC<Props> = (props) => {
  return (
    <LayoutStyled>
      <Bedge index={1}></Bedge>
      <StoreInfo>
        <div className="detail">
          <div className="name">스페이스작</div>
          <div className="adress">경기도 부천시 까치로 20번길 13-7</div>
          <div className="tel">03-1234-1264</div>
        </div>
        <div className="type">카페</div>
      </StoreInfo>
    </LayoutStyled>
  );
};

const LayoutStyled = styled.div`
  display: flex;
`;
const StoreInfo = styled.div`
  width: 100%;
  display: flex;
  font-size: 0.8rem;
  justify-content: space-between;
  color: #bababa;

  .detail {
    margin: 0% 3%;
    .name {
      font-size: 0.98rem;
      font-weight: bold;
      color: #000;
    }
  }
  .type {
    width: 20%;
    margin-right: 5%;
    text-align: right;
  }
`;
export default StoreCard;
