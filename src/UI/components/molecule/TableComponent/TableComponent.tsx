import React, { ReactNode } from "react";
import styled from "styled-components";
import { Issue } from "../../../../core/Issue/domain/Issue";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
`;

const TableHeader = styled.th`
  background-color: #232a32;
  color: white;
  padding: 10px;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  color: white;
  background-color: ${({ status }) =>
    status === ""
      ? "#28a745"
      : status === "open"
      ? "#ffc107"
      : "#dc3545"};
`;

export type Column = {
  id: string;
  label: string;
};

interface StatusTableProps<T> {
  columns: Column[]
  row: T[]
  onRowClick: (issue: Issue) => void,
  children: ReactNode
}

export const StatusTable = <T extends Issue>({ row, columns, onRowClick, children }: StatusTableProps<T>) => {
  return (
    <Table>
      <thead>
        <tr>
          {columns.map((colum) => {
            return (
            <React.Fragment key={colum.id}>
              <TableHeader>{colum.label}</TableHeader>
            </React.Fragment>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {children ? children :  row.map((item) => (
          <TableRow key={item.id} onClick={() => onRowClick?.(item)}>
            <TableCell>{item.title}</TableCell>
            <TableCell>
              <StatusBadge status={item.state}>{item.state}</StatusBadge>
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};