import { describe, it, expect } from "vitest";
import { State } from "../../src/core/Issue/domain/Issue";
import { buildQuery } from "../../src/share/buildQuery";


describe("buildQuery", () => {
  it("should return base query when no filters are given", () => {
    const result = buildQuery({});
    expect(result).toBe("repo:facebook/react is:issue");
  });

  it("should include search term when provided", () => {
    const result = buildQuery({ search: "performance" });
    expect(result).toBe("repo:facebook/react is:issue in:title performance");
  });

  it("should include state when provided", () => {
    const result = buildQuery({ state: State.open });
    expect(result).toBe("repo:facebook/react is:issue is:open");
  });

  it("should include both search and state", () => {
    const result = buildQuery({ search: "bug", state: State.close });
    expect(result).toBe("repo:facebook/react is:issue in:title bug is:closed");
  });
});
