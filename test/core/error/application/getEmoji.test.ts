import { describe, it, expect } from "vitest";
import { getEmoji } from "../../../../src/core/error/application/emojiByCode/emojiByCode";


describe("getEmoji", () => {
  it("returns correct emoji for known error codes", () => {
    expect(getEmoji("400")).toBe("🛑");
    expect(getEmoji("401")).toBe("🔒");
    expect(getEmoji("403")).toBe("⛔");
    expect(getEmoji("404")).toBe("🔍");
    expect(getEmoji("429")).toBe("🐌");
    expect(getEmoji("500")).toBe("💥");
    expect(getEmoji("Error")).toBe("❗");
  });

  it("returns default emoji for unknown code", () => {
    expect(getEmoji("999")).toBe("❗");
    expect(getEmoji("unknown")).toBe("❗");
    expect(getEmoji("")).toBe("❗");
  });
});
