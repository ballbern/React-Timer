import styled from "styled-components";
import { Time } from "../../";

const StyledLayoutMain = styled.main`
  grid-area: main;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Main = () => {
  return (
    <StyledLayoutMain>
      <Time />
    </StyledLayoutMain>
  );
};
