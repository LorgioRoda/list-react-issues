import React from "react";
import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

const SkeletonWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const TableSkeleton = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const SkeletonRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
`;

const SkeletonHeader = styled.th`
  background-color: #232a32;
  color: white;
  padding: 10px;
  text-align: left;
`;

const SkeletonCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const SkeletonBlock = styled.div`
  height: 14px;
  background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 4px;
`;

export const StatusTableSkeleton = () => {
  return (
    <SkeletonWrapper>
      <TableSkeleton>
        <thead>
          <tr>
            <SkeletonHeader><SkeletonBlock style={{ width: "50px" }} /></SkeletonHeader>
            <SkeletonHeader><SkeletonBlock style={{ width: "50px" }} /></SkeletonHeader>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonRow key={index}>
              <SkeletonCell><SkeletonBlock style={{ width: "100px" }} /></SkeletonCell>
              <SkeletonCell><SkeletonBlock style={{ width: "50px" }} /></SkeletonCell>
            </SkeletonRow>
          ))}
        </tbody>
      </TableSkeleton>
    </SkeletonWrapper>
  );
};
