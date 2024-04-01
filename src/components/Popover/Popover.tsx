import { useState, useRef, ReactNode } from "react";
import styled from "styled-components";
import { useClickOutside } from "../../hooks/useClickOutside";

const StyledPopover = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: end;
  z-index: 1;
`;

const StyledPopoverList = styled.ul`
  position: absolute;
  list-style-type: none;
  top: 3.5rem;
  right: 0;
  background-color: #3b3a3a;
  padding: 1rem;

  & > li {
    padding: 0.25rem;
  }
`;

export const StyledPopoverButton = styled.button`
  display: flex;
  margin-top: 1rem;
  padding: 0.5rem;
`;

const StyledFontButton = styled.button<{ name: string }>`
  padding: 1rem;
  font-size: 2rem;
  font-family: ${({ name }) => name}, system-ui, Avenir, Helvetica, Arial,
    sans-serif;
`;

const StyledPopoverSection = styled.div``;

type ButtonProps = {
  children: ReactNode;
  name: string;
  onClick: () => void;
};

type PopoverProps = {
  children: ReactNode;
  icon: ReactNode;
  isOpen?: boolean;
};

const Button = ({ children, name, onClick }: ButtonProps) => {
  return (
    <li>
      <StyledFontButton name={name} onClick={onClick}>
        {children}
      </StyledFontButton>
    </li>
  );
};

const Section = ({ children }: { children: ReactNode }) => {
  return (
    <li>
      <StyledPopoverSection>{children}</StyledPopoverSection>
    </li>
  );
};

export const Popover = ({ children, icon, isOpen }: PopoverProps) => {
  const [isOpenPopover, setIsOpenPopover] = useState(isOpen ?? false);
  const togglePopover = () => setIsOpenPopover(!isOpenPopover);
  const popoverRef = useRef<HTMLDivElement>(null);

  useClickOutside(popoverRef, () => {
    if (isOpenPopover) setIsOpenPopover(false);
  });

  return (
    <StyledPopover ref={popoverRef}>
      <StyledPopoverButton onClick={togglePopover}>{icon}</StyledPopoverButton>
      {isOpenPopover && (
        <StyledPopoverList id='fonts'>{children}</StyledPopoverList>
      )}
    </StyledPopover>
  );
};

Popover.Button = Button;
Popover.Section = Section;
