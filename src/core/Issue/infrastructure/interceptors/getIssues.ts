import { client } from "../../../../graphql/client";
import { GET_REACT_ISSUES } from "../GraphqlGetIssues";
import { issuesAdapterFromGraphQL } from "../adapter/issuesAdapterFromGraphQL";
import { Issue, State } from "../../domain/Issue";
import { getErrorMapper , Error} from "../../../error/domain/Error";
import { ApolloError } from "@apollo/client";
import { buildQuery } from "../../../../shared/buildQuery";


interface GetIssuesParams {
  search?: string;
  state?: State | null;
}

export const getIssues = async (params: GetIssuesParams = {}): Promise<Issue[]> => {
  try {
    const query = buildQuery(params);

    const { data } = await client.query({
      query: GET_REACT_ISSUES,
      variables: { query },
    });

    return issuesAdapterFromGraphQL(data);
  } catch (error) {
    if (error instanceof ApolloError) {
      const name = error.networkError?.name as Error;
      const customError = getErrorMapper(name || "Unknown");

      throw customError;
    }

    throw getErrorMapper("Unknown");
  }
};
