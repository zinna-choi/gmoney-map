import React from "react";
import styled from "styled-components";
import RoundButton from "../common/RoundButton";
import Weather from "./Weather";
import { BsArrowRepeat } from "react-icons/bs";

type Props = {};

const Location: React.FC<Props> = (props) => {
  return (
    <LayoutStyled>
      <Current>
        <div className="current-loca">경기도 부천시 오정구 고강동</div>
        <LocaButton title="위치재설정" icon={<BsArrowRepeat />}></LocaButton>
      </Current>
      <Weather />
    </LayoutStyled>
  );
};

const LayoutStyled = styled.div``;
const LocaButton = styled(RoundButton)``;
const Current = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .current-loca {
    font-size: 1.125rem;
    font-weight: bold;
  }
`;

export default Location;
