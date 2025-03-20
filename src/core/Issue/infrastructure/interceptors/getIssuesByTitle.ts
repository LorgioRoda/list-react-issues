import { client } from "../../../../graphql/client";
import { GET_REACT_ISSUES } from "../GraphqlGetIssues";
import { Issue } from "../../domain/Issue";
import { issuesAdapterFromGraphQL } from "../adapter/issuesAdapterFromGraphQL";

export const getIssuesByTitle = async (searchQuery: string = ""): Promise<Issue[]> => {
  try {
    const formattedQuery = `repo:facebook/react is:issue in:title ${searchQuery}`;
    const { data } = await client.query({
      query: GET_REACT_ISSUES,
      variables: { query: formattedQuery },
    });

    return issuesAdapterFromGraphQL(data);
  } catch (error) {
    console.error("GraphQL Error:", error);
    return [];
  }
};
