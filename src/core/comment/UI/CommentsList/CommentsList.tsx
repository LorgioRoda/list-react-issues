import { ReactNode } from "react";
import styled from "styled-components";
import { getComments } from "../../infrastructure/interceptors/getComments";
import { useService } from "../../../../share/useService";
import { Comment } from "../../domain/Comment";
import { CommentsListSkeleton } from "./CommentsListSkeleton";
import { Issue } from "../../../Issue/domain/Issue";
import { CommentsEmptyState } from "../EmptyComments/EmptyComments";
import { ErrorPage } from "../../../error/UI/ErrorPage";
import { Author } from "../../../../UI/components/atoms/Author";
import { Avatar } from "../../../../UI/components/atoms/Avatar"

const ListContainer = styled.ul.attrs({ role: "list" })`
  all: unset;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ListItem = styled.li.attrs({ role: "listitem" })`
  display: flex;
  gap: 8px;
  padding: 16px;
  border: 1px solid #d0d7de;
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: 0 1px 0 rgba(27, 31, 36, 0.04);
`;

const Content = styled.div`
  display: flex;
  gap: 4px;
  width: 100%;
  flex-direction: column;
`;

const Body = styled.p`
  margin: 0;
  color: #24292f;
  line-height: 1.5;
`;

const Timestamp = styled.time`
  display: block;
  margin-top: 8px;
  font-size: 12px;
  color: #57606a;
`;

const CommentsWrappers = styled.div`
  display: flex;
  padding: 1rem;
  flex-direction: column;
`;

interface CommentsListProps {
  issue: Issue;
}

export const CommentsList = ({ issue }: CommentsListProps): ReactNode => {
  const { data: comments, loading, error } = useService(() => getComments(issue.id), {
    dependencies: [issue],
  });
  
  if (loading) return <CommentsListSkeleton/>;
  if (comments?.length === 0 ) return <CommentsEmptyState issue={issue} />;

  return (
    <CommentsWrappers>
      <h3>{issue.title}</h3>
        <ListContainer>
        {error ? <ErrorPage code={error.code} message={error.message}/> : comments?.map((comment: Comment) => (
          <ListItem key={comment.id}>
            <Avatar
              src={comment.author.avatar}
              alt={`${comment.author.name}'s avatar`}
              loading="lazy"
              width="40"
              height="40"
            />
            <Content>
              <Author>{comment.author.name}</Author>
              <Body>{comment.body}</Body>
              <Timestamp>
                {comment.createdAt.toLocaleDateString()}
              </Timestamp>
            </Content>
          </ListItem>
        ))}
      </ListContainer>
    </CommentsWrappers>
    
  );
};
