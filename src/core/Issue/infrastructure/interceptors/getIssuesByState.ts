import { client } from "../../../../graphql/client";
import { CONFIG } from "../../../../graphql/variable";
import { Issue, State } from "../../domain/Issue";
import { issuesAdapterFromGraphQL } from "../adapter/issuesAdapterFromGraphQL";
import { GET_REACT_ISSUES } from "../GraphqlGetIssues";

export const getIssuesByState = async (state: State): Promise<Issue[]> => {
    try {
      const { data } = await client.query({
        query: GET_REACT_ISSUES,
        variables: { query: `${CONFIG.GITHUB_QUERY} is:${state}` },
      });
      return issuesAdapterFromGraphQL(data);
    } catch (error) {
      console.error("GraphQL Error:", error);
      return [];
    }
  };