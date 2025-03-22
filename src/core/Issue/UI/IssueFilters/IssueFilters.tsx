import React from "react";
import styled from "styled-components";
import { TextFieldComponent } from "../../../../UI/components/atoms/TextFieldComponent";
import { ToggleGroupComponent } from "../../../../UI/components/molecule/ToggleGroupComponent";
import { StateFilterUI } from "../../../../App";

interface IssueFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  stateFilter: StateFilterUI;
  onStateChange: (state: StateFilterUI) => void;
}

const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 24px;
  }
`;

export const IssueFilters = ({
  search,
  onSearchChange,
  stateFilter,
  onStateChange,
}: IssueFiltersProps ) => {
  return (
    <FiltersWrapper>
      <TextFieldComponent
        label="Search Issues"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

    <ToggleGroupComponent value={stateFilter} onChange={onStateChange} />
    </FiltersWrapper>
  );
};
