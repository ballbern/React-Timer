import { TimeDropdown } from "../TimeDropdown/TimeDropdown";
import styled from "styled-components";
import { useTimer } from "../../context/TimerContext";
import { useRef } from "react";

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
`;

const StyledNumberLayout = styled.div`
  display: flex;
  gap: 2rem;
`;

const StyledButton = styled.button`
  font-size: 2rem;
  border: none;
  border-radius: 2rem;
  background-color: transparent;
  padding: 1rem;
`;

export const Time = () => {
  const {
    startTimer,
    stopTimer,
    resetTimer,
    setTimeRemaining,
    isRunning,
    hours,
    minutes,
    seconds,
    isLastTen,
  } = useTimer();

  const timeValuesRef = useRef({ h: 0, m: 0, s: 0 });

  const setTimeValue = (totalTimeValue: number) =>
    setTimeRemaining(totalTimeValue);

  const getTimeValue = (value: number, unit: string) => {
    const updatedTimeValues = { ...timeValuesRef.current };

    switch (unit) {
      case "h":
        updatedTimeValues.h = value * 3600;
        break;
      case "m":
        updatedTimeValues.m = value * 60;
        break;
      case "s":
        updatedTimeValues.s = value;
        break;
      default:
        break;
    }

    timeValuesRef.current = updatedTimeValues;

    const totalTimeValue = Object.values(updatedTimeValues).reduce(
      (tot, val) => tot + val
    );
    setTimeValue(totalTimeValue);
  };

  const reset = () => {
    resetTimer();
    timeValuesRef.current = { h: 0, m: 0, s: 0 };
  };

  return (
    <div
      id='cont'
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <StyledButtonContainer>
        <StyledButton onClick={!isRunning ? startTimer : stopTimer}>
          {isRunning ? "Stop" : "Start"}
        </StyledButton>
        <StyledButton onClick={reset}>Reset</StyledButton>
      </StyledButtonContainer>

      <StyledNumberLayout>
        <TimeDropdown
          onClick={getTimeValue}
          unit={"h"}
          value={hours}
          isLastTen={isLastTen}
        />
        <TimeDropdown
          onClick={getTimeValue}
          unit={"m"}
          value={minutes}
          isLastTen={isLastTen}
        />
        <TimeDropdown
          onClick={getTimeValue}
          unit={"s"}
          value={seconds}
          isLastTen={isLastTen}
        />
      </StyledNumberLayout>
    </div>
  );
};
