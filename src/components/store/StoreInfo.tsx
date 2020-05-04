import React from "react";
import styled from "styled-components";

type Props = {
  className?: String;
};

const StoreInfo: React.FC<Props> = (props) => {
  return (
    <>
      <LayoutStyled className={`${props.className}`}>
        <div className="detail">
          <div className="name">스페이스작</div>
          <div className="adress">경기도 부천시 까치로 20번길 13-7</div>
          <div className="tel">03-1234-1264</div>
          <div className="use">지류형/카드형/모바일형</div>
        </div>
        <div className="type">카페</div>
      </LayoutStyled>
    </>
  );
};

const LayoutStyled = styled.div`
  display: flex;
  width: 100%;
  font-size: 0.8rem;
  color: #bababa;
  justify-content: space-between;
  .detail {
    margin: 0% 3%;
    display: inline-block;
    .name {
      font-size: 0.98rem;
      font-weight: bold;
      color: #000;
    }
    .type {
      text-align: right;
    }
  }
`;

export default StoreInfo;
