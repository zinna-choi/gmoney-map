import React, { ReactElement } from "react";
import styled from "styled-components";

type Props = {
  className?: string;
  title?: string;
  icon?: any;
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const RoundButton: React.FC<Props> = (props) => {
  return (
    <ButtonStyled className={`${props.className}`} {...props}>
      {props.title}
      {props.icon}
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 100px;
  background-color: #10b592;
  color: #fff;
  text-align: center;
  line-height: 1.8rem;
  font-size: 0.8rem;
  border: none;
`;

export default RoundButton;
