import React from "react";
import styled from "styled-components";
type Props = {
  className?: string;
  title?: string;
};

const RactangleButton: React.FC<Props> = (props) => {
  return (
    <ButtonStyled className={`${props.className}`}>{props.title}</ButtonStyled>
  );
};

const ButtonStyled = styled.button`
  width: 200px;
  height: 36px;
  border-radius: 4px;
  background: #005dac;
  color: #fff;
  border: none;
  margin: 2%;
`;
export default RactangleButton;
