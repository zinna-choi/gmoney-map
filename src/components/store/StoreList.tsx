import React from "react";
import StoreCard from "./StoreCard";

type Props = {};

const StoreList: React.FC<Props> = (props) => {
  return (
    <div>
      <StoreCard />
      <StoreCard />
    </div>
  );
};

export default StoreList;
