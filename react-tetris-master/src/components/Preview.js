import React from "react";
import { StyledPreview } from "./styles/StyledPreview";

//Components
import Cell from "./Cell";

const Stage = ({ stage }) => (
  <StyledPreview width={stage[0].length} height={stage.length}>
    {stage.map((row) => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
  </StyledPreview>
);

export default Stage;
