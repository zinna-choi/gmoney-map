import React, { useState } from "react";
import styled from "styled-components";
import StorePop from "./StorePop";
import media from "../../lib/styles/media";

export type Props = {
  visible?: boolean;
  onClick?: () => void;
};

const MobileStoreList: React.FC<Props> = (props) => {
  const [state, setState] = useState({ visible: true });
  const handleClick = () => {
    setState({ visible: !state.visible });
    console.log(setState);
  };
  return (
    <>
      {state.visible ? (
        <LayoutStyled>
          <SubLayout>
            <div className="store">
              주변음식점 <span>4</span> 개
            </div>
            <div onClick={handleClick}>맵으로보기 ></div>
          </SubLayout>
          <List></List>
        </LayoutStyled>
      ) : null}
    </>
  );
};

const LayoutStyled = styled.div`
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
