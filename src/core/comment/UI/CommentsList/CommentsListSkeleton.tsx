import React, { ReactElement } from "react";
import styled, { keyframes } from "styled-components";
import { Avatar } from "../../../../UI/components/atoms/Avatar";

const pulse = keyframes`
  0% {
    background-color: #f6f8fa;
  }
  50% {
    background-color: #eaeef2;
  }
  100% {
    background-color: #f6f8fa;
  }
`;

const SkeletonList = styled.ul`
  display: flex;
  min-height: 30vh;
  padding: 1rem;
  flex-direction: column;
  gap: 16px;
`;

const SkeletonItem = styled.li`
  display: flex;
  gap: 8px;
  padding: 16px;
  border: 1px solid #d0d7de;
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: 0 1px 0 rgba(27, 31, 36, 0.04);
`;

const SkeletonAvatar = styled(Avatar)`
  animation: ${pulse} 1.5s infinite ease-in-out;
`;

const SkeletonContent = styled.div`
  display: flex;
  gap: 4px;
  width: 100%;
  flex-direction: column;
`;

const SkeletonLine = styled.div<{ width: string }>`
  height: 12px;
  width: ${({ width }) => width};
  border-radius: 4px;
  animation: ${pulse} 1.5s infinite ease-in-out;
`;

export const CommentsListSkeleton = ():ReactElement => {
  return (
    <SkeletonList >
      <SkeletonLine width="50%"/>
      {Array.from({ length: 2 }).map((_, i) => (
        <SkeletonItem key={i}>
          <SkeletonAvatar />
          <SkeletonContent>
            <SkeletonLine width="30%" />
            <SkeletonLine width="90%" />
            <SkeletonLine width="80%" />
            <SkeletonLine width="50%" />
          </SkeletonContent>
        </SkeletonItem>
      ))}
    </SkeletonList>
  );
};
