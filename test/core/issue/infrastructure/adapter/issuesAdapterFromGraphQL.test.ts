import { describe, expect, test } from "vitest";
import { Issue } from "../../../../../src/core/Issue/domain/Issue";
import { issuesAdapterFromGraphQL } from "../../../../../src/core/Issue/infrastructure/adapter/issuesAdapterFromGraphQL";


describe("issuesAdapterFromGraphQL", () => {
  test("should return an empty array when data is undefined", () => {
    expect(issuesAdapterFromGraphQL(undefined)).toEqual([]);
  });

  test("should return an empty array when data.search.edges is missing", () => {
    expect(issuesAdapterFromGraphQL({})).toEqual([]);
  });

  test("should correctly map GraphQL data to Issue domain", () => {
    const mockGraphQLData = {
      search: {
        edges: [
          {
            node: {
              id: "1",
              title: "Issue Title 1",
              state: "OPEN",
            },
          },
          {
            node: {
              id: "2",
              title: "Issue Title 2",
              state: "CLOSE",
            },
          },
        ],
      },
    };

    const expectedOutput: Issue[] = [
      { id: "1", title: "Issue Title 1", state: "open" },
      { id: "2", title: "Issue Title 2", state: "close" },
    ];

    expect(issuesAdapterFromGraphQL(mockGraphQLData)).toEqual(expectedOutput);
  });

  test("should handle unexpected data structure gracefully", () => {
    const invalidData = {
      search: {
        edges: [{ node: { id: "3" } }],
      },
    };

    expect(() => issuesAdapterFromGraphQL(invalidData)).toThrow();
  });
});
