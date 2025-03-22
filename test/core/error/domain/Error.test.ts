import { describe, it, expect } from "vitest";
import { ErrorContent, getErrorMapper } from "../../../../src/core/error/domain/Error";


describe("getErrorMapper", () => {
  const expected: Record<string, ErrorContent> = {
    ServerError: {
      code: "500",
      message: "Something went wrong on our side. Please try again in a moment.",
    },
    ClientError: {
      code: "400",
      message: "Oops! Something’s not right. Try refreshing the page or checking your input.",
    },
    Unknown: {
      code: "Error",
      message: "An unexpected error occurred. Please try again later.",
    },
  };

  it("returns ServerError content", () => {
    expect(getErrorMapper("ServerError")).toEqual(expected.ServerError);
  });

  it("returns ClientError content", () => {
    expect(getErrorMapper("ClientError")).toEqual(expected.ClientError);
  });

  it("returns Unknown content", () => {
    expect(getErrorMapper("Unknown")).toEqual(expected.Unknown);
  });

});
