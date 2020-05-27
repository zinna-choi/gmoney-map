import React, { ReactNode } from "react";
import styled from "styled-components";

export type StoreInfoProps = {
  className?: any;
  shopName?: any;
  address?: any;
  telNo?: any;
  children?: ReactNode;
  latMarker?: string;
  lngMarker?: string;
};

const StoreInfo: React.FC<StoreInfoProps> = (props) => {
  return (
    <>
      <LayoutStyled className={`${props.className}`}>
        <div className="detail">
          <div className="name">{props.shopName}</div>
          <div className="adress">{props.address}</div>
          <div className="tel">{props.telNo}</div>
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
    width: 86%;
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
