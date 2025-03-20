import React, { ReactElement } from "react";
import styled from "styled-components";

const Fieldset = styled.fieldset`
  border: none;
  display: flex;
  gap: 4px;
`;

const Legend = styled.legend`
  font-weight: bold;
  margin-bottom: 4px;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

interface CheckGroupProps {
  legend: string;
  children: React.ReactNode;
}

export const CheckGroup = ({ legend, children }:CheckGroupProps):ReactElement => {
  return (
    <Fieldset>
      <Legend>{legend}</Legend>
      {children}
    </Fieldset>
  );
};
