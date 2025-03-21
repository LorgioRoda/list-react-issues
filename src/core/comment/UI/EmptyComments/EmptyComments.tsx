import React, { ReactElement } from "react";
import styled from "styled-components";
import { Issue } from "../../../Issue/domain/Issue";


const EmptyStateContainer = styled.ul`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  gap: 16px;
`;

const IssueTitle = styled.h3`
  font-size: 18px;
  color: #24292f;
  margin: 0;
`;

const EmptyBox = styled.li`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border: 1px solid #d0d7de;
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: 0 1px 0 rgba(27, 31, 36, 0.04);
`;

const Message = styled.p`
  margin: 0;
  color: #57606a;
  font-size: 14px;
  line-height: 1.5;
`;

const LinkToIssue = styled.a`
  color: #0969da;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

interface CommentsEmptyStateProps {
  issue: Issue;
}

export const CommentsEmptyState = ({ issue }: CommentsEmptyStateProps):ReactElement => {
  return (
    <EmptyStateContainer>
      <IssueTitle>{issue.title}</IssueTitle>
      <EmptyBox>
        <Message>Oops! It looks like there are no comments yet on this issue.</Message>
        <LinkToIssue href={issue.url} target="_blank" rel="noopener noreferrer">
          Be the first to comment →
        </LinkToIssue>
      </EmptyBox>
    </EmptyStateContainer>
  );
};
