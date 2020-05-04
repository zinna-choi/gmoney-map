import React from "react";
import styled from "styled-components";
import StorePop from "./StorePop";
import media from "../../lib/styles/media";

type Props = {};

const MobileStoreList: React.FC<Props> = (props) => {
  return (
    <LayoutStyled>
      <SubLayout>
        <div className="store">
          주변음식점 <span>4</span> 개
        </div>
        <div>맵으로보기 ></div>
      </SubLayout>
      <List></List>
    </LayoutStyled>
  );
};

const LayoutStyled = styled.div`
  display: none;
  width: 100%;
  position: absolute;
  z-index: 200;
  height: 74%;
  background-color: #fff;
  top: 26%;
  overflow-x: auto;
  overflow-y: hidden;
`;

const SubLayout = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  font-size: 0.8rem;
  border-bottom: 1px solid #eee;
`;

const List = styled(StorePop)`
  padding: 1rem;
  border: none;
  box-shadow: none;
  .btn_con {
    display: none;
  }
  .mobileBtn {
    display: block;
  }
`;

export default MobileStoreList;
