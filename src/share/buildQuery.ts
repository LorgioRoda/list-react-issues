import { State } from "../core/Issue/domain/Issue";

type QueryPart = string | null | undefined;

interface BuildQueryParams {
  search?: string;
  state?: State | null;
}

export const buildQuery = ({ search, state }: BuildQueryParams): string => {
  const parts: QueryPart[] = [
    "repo:facebook/react",
    "is:issue",
    search && `in:title ${search}`,
    state && `is:${state}`,
  ];

  return parts.filter(Boolean).join(" ");
};
