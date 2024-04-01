import styled from "styled-components";
import { useTimer } from "../../../context/TimerContext";

const StyledButton = styled.button`
  font-size: 2rem;
  border: none;
  border-radius: 2rem;
  background-color: transparent;
  padding: 1rem;
`;

export const Footer = () => {
  const { setTimeRemaining } = useTimer();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 6rem 6rem 6rem",
      }}
    >
      <div>
        <StyledButton onClick={() => setTimeRemaining(180)}>
          3 minutes
        </StyledButton>
      </div>
      <div>
        <StyledButton onClick={() => setTimeRemaining(300)}>
          5 minutes
        </StyledButton>
      </div>
      <div>
        <StyledButton onClick={() => setTimeRemaining(600)}>
          10 minutes
        </StyledButton>
      </div>
    </div>
  );
};
