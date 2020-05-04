import React, { Component } from "react";
import styled from "styled-components";
import media from "../../lib/styles/media";
import Header from "./Header";
import Container from "@material-ui/core/Container";
import SearchBox from "../common/SearchBox";

type Props = {};

const MobileHeader: React.FC<Props> = () => {
  return (
    <ContainStyled>
      <LayoutStyled>
        <div className="logo">
          <img src="/images/gmoney-02.png" alt="logo" />
        </div>
        <div className="search">
          <SearchBox />
        </div>
      </LayoutStyled>
    </ContainStyled>
  );
};
const ContainStyled = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  height: auto;
  z-index: 100;
  top: 0;
  left: 0;
  box-shadow: 1px 1px 9px 0px rgba(0, 0, 0, 0.2);
  display: none;
  background-color: #005dac;
  justify-content: space-between;
  ${media.small} {
    display: block;
  }
  .logo {
    width: 50px;
    height: 50px;
    img {
      width: 100%;
    }
  }
`;

const LayoutStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 0 2%;

  .serarch {
    margin: 0;
  }
  .MuiFilledInput-input {
    padding: 20px 32px 10px;
    background-color: #fff;
  }
  .makeStyles-margin-2 {
    margin: 0;
  }
`;
export default MobileHeader;
