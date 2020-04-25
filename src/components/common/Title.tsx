import React from "react";
import styled from "styled-components";

type Props = {};

const Title: React.FC<Props> = () => {
  return (
    <LayoutStyled>
      <div className="logo">
        <img src="/images/gmoney-02.png" alt="logo" />
      </div>
      <div className="name">
        <p className="eng">GMONEYMAP</p>
        <p className="kor">경기도지역화페 가맹점 맵</p>
      </div>
    </LayoutStyled>
  );
};

const LayoutStyled = styled.div`
  display: flex;
  align-items: center;
  .logo {
    width: 58px;
    height: 58px;
    img {
      width: 100%;
    }
  }
  .name {
    color: #fff;
    margin-left: 3%;
    p {
      line-height: 0rem;
    }
    .eng {
      font-size: 24px;
      font-weight: bold;
    }
    .kor {
      font-size: 14px;
      font-weight: 500;
    }
  }
`;

export default Title;
