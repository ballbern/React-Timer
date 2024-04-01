import { Popover } from "../..";
import { IoSettingsSharp } from "react-icons/io5";
import { FaFont } from "react-icons/fa";
import styled from "styled-components";
import { useState } from "react";
import { useTimer } from "../../../context/TimerContext";

const StyledPopoverContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 1rem;
`;

export const Header = () => {
  const [countDown, setCountdown] = useState<string>("");
  const { setCountdown: timeCountdown } = useTimer();

  const font = (f: string): void => {
    const body = document.body;
    body.className = "";
    body.classList.add(f);
  };

  const getCountDown = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountdown(e.target.value);
    timeCountdown(parseInt(e.target.value));
  };

  return (
    <StyledPopoverContainer>
      <Popover icon={<IoSettingsSharp />}>
        <Popover.Section>
          <label>set count down:</label>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              style={{ padding: "1rem", fontSize: "1.2rem" }}
              value={countDown}
              onChange={getCountDown}
            />
            <span>sec</span>
          </div>
        </Popover.Section>
        <Popover.Section>
          <label>set count in:</label>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              style={{ padding: "1rem", fontSize: "1.2rem" }}
              value={countDown}
              onChange={getCountDown}
            />
            <span>sec</span>
          </div>
        </Popover.Section>
      </Popover>

      <Popover icon={<FaFont />}>
        <Popover.Button
          name='antonregular'
          onClick={() => font("antonregular")}
        >
          antonregular
        </Popover.Button>
        <Popover.Button
          name='orbitronregular'
          onClick={() => font("font-orbitronregular")}
        >
          orbitronregular
        </Popover.Button>
        <Popover.Button
          name='russo_oneregular'
          onClick={() => font("font-russo-oneregular")}
        >
          russo-oneregular
        </Popover.Button>
        <Popover.Button
          name='lilita_oneregular'
          onClick={() => font("font-lilita-oneregular")}
        >
          lilita-oneregular
        </Popover.Button>
      </Popover>
    </StyledPopoverContainer>
  );
};
