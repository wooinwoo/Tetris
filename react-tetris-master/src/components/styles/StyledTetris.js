import styled from "styled-components";

import bgImage from "../../img/bg.jpg";

export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: gray;
  background-size: cover;
  overflow: hidden;
  ul {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    font-size: 50px;
    list-style: none;
  }
`;

export const StyledTetris = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  padding: 40px;
  margin: 0 auto;
  max-width: 900px;

  aside {
    width: 100%;
    max-width: 200px;
    display: block;
    padding: 0 20px;
  }
`;

export const StyledPreviewArea = styled.div`
  position: absolute;
  // top: 10px;
  right: -40px;
`;
