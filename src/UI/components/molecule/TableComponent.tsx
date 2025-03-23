import React, { ReactNode } from "react";
import styled from "styled-components";
import { Issue } from "../../../core/Issue/domain/Issue";

const Table = styled.table`
  width: 100%;
  margin-top: 20px;
  border-radius: 4px;
  border: 0.5px solid #ddd;
`;

const TableHeader = styled.th`
  background-color: #232a32;
  color: white;
  padding: 10px;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 0.5px solid #ddd;
  font-size: small;
  cursor: pointer;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 5px 8px;
  border-radius: 4px;
  font-size: x-small;
  font-weight: bold;
  color:${({ status }) =>
    status === "open"
      ? "#006644;"
      : "#42526E"};
  background-color: ${({ status }) =>
    status === "open"
      ? "#E3FCEF"
      : "#DFE1E6"};
`;

export type Column = {
  id: string;
  label: string;
};

interface StatusTableProps<T> {
  columns?: Column[]
  row: T[]
  onRowClick: (issue: Issue) => void,
}

export const StatusTable = <T extends Issue>({ row, columns, onRowClick }: StatusTableProps<T>): ReactNode => {
  return (
    <>
    {!row.length && <h3>!Ups We don't found Issues</h3> }
    <Table>
      {
        columns?.length ?  <thead>
        <tr>
          {columns?.map((colum) => {
            return (
            <React.Fragment key={colum.id}>
              <TableHeader>{colum.label}</TableHeader>
            </React.Fragment>
            )
          })}
        </tr>
      </thead>
      : null }
     
      <tbody>
        {row.map((item) => (
          <tr key={item.id} onClick={() => onRowClick?.(item)}>
            <TableCell>{item.title}</TableCell>
            <TableCell>
              <StatusBadge status={item.state}>{item.state.toUpperCase()}</StatusBadge>
            </TableCell>
          </tr>
        ))}
      </tbody>
    </Table>
    </>
   
  );
};