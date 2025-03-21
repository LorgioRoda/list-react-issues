import { client } from "../../../../graphql/client";
import { Comment } from "../../domain/Comment";
import { commentsAdapterFromGraphQL } from "../adapter/commentsAdapterFromGraphQL";
import { GET_ISSUE_COMMENTS } from "../GraphqlGetComments";

export const getComments = async (issueId: string): Promise<Comment[]> => {
    try {
      const { data } = await client.query({
        query: GET_ISSUE_COMMENTS,
        variables: { issueId },
      });
  
     const comments = commentsAdapterFromGraphQL(data)
     return comments
    } catch (error) {
      console.error("GraphQL Error:", error);
      return [];
    }
  };