import { ApolloError } from "@apollo/client";
import { client } from "../../../../graphql/client";
import { Error, getErrorMapper } from "../../../error/domain/Error";
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
    if (error instanceof ApolloError) {
      const name = error?.networkError?.name as Error;
      const customError = getErrorMapper(name || "Unknown");

      throw customError;
    }

      throw getErrorMapper("Unknown");
    }
  };