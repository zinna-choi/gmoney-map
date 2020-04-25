import React from "react";
import styled from "styled-components";
type Props = {
  className?: string;
  icon?: any;
};

const CircleButton: React.FC<Props> = (props) => {
  return (
    <ButtonStyled className={`${props.className}`}>{props.icon}</ButtonStyled>
  );
};

const ButtonStyled = styled.button`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(133.04deg, #005dac 3.19%, #10b592 100%);
  border: none;
`;
export default CircleButton;
