import { Issue } from "../../domain/Issue";

export const issuesAdapterFromGraphQL = (data: any): Issue[] => {
  if (!data?.search?.edges) return [];

  return data.search.edges.map((edge: any) => ({
    id: edge.node.id,
    title: edge.node.title,
    state: edge.node.state.toLowerCase(),
  }));
};
