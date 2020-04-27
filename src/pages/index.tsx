import React, { useState } from "react";
import styled from "styled-components";
import Side from "../components/layouts/Side";
import MapView from "../components/maps/MapView";
import StorePop from "../components/store/StorePop";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../module";

type Props = {
  className?: string;
};

const Home: React.FC<Props> = (props) => {
  const [map, setMap] = useState(false);
  const { shopStore } = useSelector((state: RootState) => state.global);
  return (
    <LayoutStyeld>
      <MapView />
      <div className="view">
        <Side />
      </div>
      <div className="pop">{shopStore && <StorePop />}</div>
    </LayoutStyeld>
  );
};

const LayoutStyeld = styled.div`
  background-color: #e3e3e3;
  .pop {
    position: absolute;
    top: 20px;
    left: 400px;
    z-index: 100;
  }
`;

export default Home;
