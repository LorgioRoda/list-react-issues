import { describe, it, expect } from "vitest";
import { commentsAdapterFromGraphQL } from "../../../../../src/core/comment/infrastructure/adapter/commentsAdapterFromGraphQL";
import { mockComment } from "../../../../mocks/comments";


describe("commentsAdapterFromGraphQL", () => {
  it("should adapt GraphQL data to Comment[] format", () => {
   

    const result = commentsAdapterFromGraphQL(mockComment);

    expect(result).toEqual([
      {
        id: "c1",
        body: "Nice issue!",
        createdAt: new Date("2024-01-01T10:00:00Z"),
        author: {
          name: "user123",
          avatar: "https://avatars.com/u123",
        },
      },
    ]);
  });

  it("should return empty array if there are no comments", () => {
    const mockData = {
      node: {
        comments: {
          edges: [],
        },
      },
    };

    const result = commentsAdapterFromGraphQL(mockData);
    expect(result).toEqual([]);
  });
});
