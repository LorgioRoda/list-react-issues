import React from "react";
import styled from "styled-components";
import { State } from "../../../core/Issue/domain/Issue";

export type StateFilterUI = State | null;

interface ToggleGroupProps {
  value: StateFilterUI;
  onChange: (value: StateFilterUI) => void;
}

const StyledToggleGroup = styled.div`
  display: flex;
  width: fit-content;
  gap: 8px;
  background-color: #eef1f3;
  border-radius: 4px;
`;

const Toggle = styled.button<{ active?: boolean }>`
  padding: 6px 16px;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: ${({ active }) => (active ? "rgb(35 77 130)" : "transparent")};
  color: ${({ active }) => (active ? "white" : "#1f2328")};
  cursor: pointer;

  &:hover {
    background-color: ${({ active }) => (active ? "rgb(35 77 130)" : "#e4e7eb")};
  }
`;

export const ToggleGroupComponent = ({ value, onChange }: ToggleGroupProps) => {
  const handleClick = (newValue: StateFilterUI) => () => {
    onChange(newValue);
  };

  return (
    <StyledToggleGroup role="group" aria-label="Issue filter">
      <Toggle active={value === null} onClick={handleClick(null)}>All</Toggle>
      <Toggle active={value === State.open} onClick={handleClick(State.open)}>Open</Toggle>
      <Toggle active={value === State.close} onClick={handleClick(State.close)}>Closed</Toggle>
    </StyledToggleGroup>
  );
};
