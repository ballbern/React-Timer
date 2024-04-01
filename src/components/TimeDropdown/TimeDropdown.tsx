import styled, { css } from "styled-components";
import { useState, ButtonHTMLAttributes, useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

type StyledDivProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  dropdownOpen: boolean;
  isLastTen?: boolean;
};

type TimeDropdown = {
  unit: string;
  value: string;
  isLastTen: boolean;
  onClick?: (value: number, unit: string) => void;
};

const StyledDropdownContent = styled.div<StyledDivProps>`
  position: absolute;
  display: ${({ dropdownOpen }) => (dropdownOpen ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  background-color: #3b3a3a;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 100vh;
  overflow: auto;
  width: 100%;
  z-index: 1;
`;

const StyledDropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledDropdownButton = styled.button<StyledDivProps>`
  border: none;
  background-color: transparent;
  font-size: var(--time-dropdown-font-size);
  font-weight: 300;
  ${({ isLastTen }) =>
    isLastTen &&
    css`
      color: #d91a1a;
    `};
`;

const StyledDropdownLink = styled.a`
  all: initial;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  font-weight: 700;
  width: 100%;
  padding: 1rem;
  cursor: pointer;
  color: white;

  &:hover {
    background-color: lightgray;
    color: #3b3a3a;
  }
`;

export const TimeDropdown = ({
  unit,
  value,
  isLastTen,
  onClick,
}: TimeDropdown) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const numberOfLinks = unit === "h" ? 12 : 60;
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => {
    if (dropdownOpen) setDropdownOpen(false);
  });

  const getSelection = (value: string) => {
    setDropdownOpen(!dropdownOpen);
    onClick?.(parseInt(value), unit);
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <StyledDropdownContainer ref={dropdownRef}>
      <StyledDropdownButton
        dropdownOpen={dropdownOpen}
        onClick={toggleDropdown}
        isLastTen={isLastTen}
      >
        {value}
        {unit}
      </StyledDropdownButton>
      <StyledDropdownContent dropdownOpen={dropdownOpen}>
        {Array(numberOfLinks)
          .fill(null)
          .map((_, index) => (
            <StyledDropdownLink
              onClick={() => getSelection((index + 1).toString())}
              href='#'
              key={index}
            >
              <span>{index + 1}</span>
            </StyledDropdownLink>
          ))}
      </StyledDropdownContent>
    </StyledDropdownContainer>
  );
};
