import styled from "styled-components";

export const StyledPreview = styled.div`
  display: grid;
  grid-template-rows: repeat(
    ${(props) => props.height},
    calc(10vw / ${(props) => props.width})
  );
  grid-template-columns: repeat(
    ${(props) => props.width},
    calc(10vw / ${(props) => props.width})
  );
  grid-gap: 1px;
  border: 2px solid #333;
  width: 12vw;
  max-width: 50vw;
  background: #111;
  margin-bottom: 30px;
`;
