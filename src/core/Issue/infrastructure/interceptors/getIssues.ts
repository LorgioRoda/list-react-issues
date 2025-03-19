import { CONFIG } from "../../../../graphql/variable";
import { GET_REACT_ISSUES } from "../GraphqlGetIssues";
import { client } from "../../../../graphql/client";
import { Issue } from "../../domain/Issue";
import { issuesAdapterFromGraphQL } from "../adapter/issuesAdapterFromGraphQL";

export const getIssues = async (): Promise<Issue[]> => {
  try {
    const { data } = await client.query({
      query: GET_REACT_ISSUES,
      variables: { query: CONFIG.GITHUB_QUERY },
    });
    const issues = issuesAdapterFromGraphQL(data);
    return issues
  } catch (error) {
    console.error("GraphQL Error:", error);
    return [];
  }
};
