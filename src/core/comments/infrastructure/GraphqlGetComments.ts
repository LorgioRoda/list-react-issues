import { gql } from "@apollo/client";

export const GET_ISSUE_COMMENTS = gql`
  query GetIssueComments($issueId: ID!) {
    node(id: $issueId) {
      ... on Issue {
        id
        title
        comments(first: 20) {
          edges {
            node {
              id
              body
              author {
                login
                avatarUrl
              }
              createdAt
            }
          }
        }
      }
    }
  }
`;
