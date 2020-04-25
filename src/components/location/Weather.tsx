import React from "react";
import styled from "styled-components";

type Props = {};
const Weather: React.FC<Props> = (props) => {
  return (
    <LayoutStyled>
      <div>날씨상태</div>
      <div>현재기온</div>
      <div>강수량</div>
      <div>미세먼지</div>
    </LayoutStyled>
  );
};

const LayoutStyled = styled.div`
  display: flex;
  font-size: 0.8rem;
  color: #9c9494;
  div {
    margin-right: 3.5%;
    margin-top: 5px;
  }
`;

export default Weather;
