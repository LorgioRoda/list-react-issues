import React from "react";
import styled from "styled-components";
import { CheckComponent } from "../../../../UI/components/atoms/CheckComponent";
import { TextFieldComponent } from "../../../../UI/components/atoms/TextFieldComponent";
import { CheckGroup, Label } from "../../../../UI/components/molecule/CheckGroup/CheckGroup";
import { State } from "../../domain/Issue";


interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  stateFilter: State | null;
  onStateChange: (state: State | null) => void;
}

const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 24px;
`;

const FilterOptions = styled(CheckGroup)`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

export const IssueFilters = ({
  search,
  onSearchChange,
  stateFilter,
  onStateChange,
}: Props) => {
  return (
    <FiltersWrapper>
      <TextFieldComponent
        label="Search Issues"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <FilterOptions legend="Filter Issues">
        <Label role="radio" aria-checked={stateFilter === null}>
          <CheckComponent
            checked={stateFilter === null}
            handleChange={() => onStateChange(null)}
          />
          All
        </Label>
        <Label role="radio" aria-checked={stateFilter === State.open}>
          <CheckComponent
            checked={stateFilter === State.open}
            handleChange={() => onStateChange(State.open)}
          />
          Open
        </Label>
        <Label role="radio" aria-checked={stateFilter === State.close}>
          <CheckComponent
            checked={stateFilter === State.close}
            handleChange={() => onStateChange(State.close)}
          />
          Closed
        </Label>
      </FilterOptions>
    </FiltersWrapper>
  );
};
