import React from "react";
import styled from "styled-components";
import Title from "../common/Title";

type Props = {};

const Header: React.FC<Props> = () => {
  return (
    <LayoutStyled>
      <Title />
    </LayoutStyled>
  );
};

const LayoutStyled = styled.div`
  width: 100%;
  height: auto;
  padding: 1.5%;
  box-sizing: border-box;
  background-color: #005dac;
`;

export default Header;
