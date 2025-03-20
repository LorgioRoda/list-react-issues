import React from "react";
import styled from "styled-components";
import { getComments } from "../../infrastructure/interceptors/getComments";
import { useService } from "../../../../share/useService";
import { Comment } from "../../domain/Comment";

const CommentListContainer = styled.div`
  margin-top: 10px;
  padding: 10px;
  border-top: 1px solid #ddd;
`;

const CommentItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 10px;
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
`;

interface CommentsListProps {
  issueId: string;
}

export const CommentsList = ({ issueId }: CommentsListProps) => {
  const { data: comments, loading } = useService(() => getComments(issueId), { dependencies: [issueId] });

  if (loading) return <p>Loading comments...</p>;
  if (!comments || comments.length === 0) return <p>No comments found.</p>;

  return (
    <CommentListContainer>
      {comments.map((comment: Comment) => (
        <CommentItem key={comment.id}>
          <Avatar src={comment.author.avatar} alt={comment.author.name} />
          <CommentContent>
            <strong>{comment.author.name}</strong>
            <p>{comment.body}</p>
            <small>{new Date(comment.createdAt).toLocaleDateString()}</small>
          </CommentContent>
        </CommentItem>
      ))}
    </CommentListContainer>
  );
};
