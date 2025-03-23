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
    <SkeletonWrapper data-testid="skeleton-table">
      <TableSkeleton>
        <tbody>
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index}>
              <SkeletonCell><SkeletonBlock style={{ width: "100px" }} /></SkeletonCell>
              <SkeletonCell><SkeletonBlock style={{ width: "50px" }} /></SkeletonCell>
            </tr>
          ))}
        </tbody>
      </TableSkeleton>
    </SkeletonWrapper>
  );
};
