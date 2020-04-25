import React from "react";
import styled from "styled-components";

type Props = {
  index?: number;
};

const Bedge: React.FC<Props> = (props) => {
  return <BedgeLayout>{props.index}</BedgeLayout>;
};

const BedgeLayout = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 2px;
  border: 1px solid #10b592;
  color: #10b592;
  font-size: 0.6rem;
  text-align: center;
`;
export default Bedge;
