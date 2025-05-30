import { gql } from "@apollo/client";

export const GET_REACT_ISSUES = gql`
  query GetIssues($query: String!) {
    search(query: $query, type: ISSUE, first: 20) {
      edges {
        node {
          ... on Issue {
            id
            title
            state
            url
          }
        }
      }
    }
  }
`;