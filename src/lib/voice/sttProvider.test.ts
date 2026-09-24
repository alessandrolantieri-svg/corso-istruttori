import { describe, expect, it } from "vitest";
import { mapError } from "./sttProvider";

describe("mapError", () => {
  it.each([
    ["not-allowed", "not-allowed"],
    ["permission-denied", "not-allowed"],
    ["service-not-allowed", "not-allowed"],
    ["no-speech", "no-speech"],
    ["audio-capture", "other"],
    ["network", "other"],
    ["qualcosa-di-mai-visto", "other"],
  ] as const)("%s → %s", (code, expected) => {
    expect(mapError(code)).toBe(expected);
  });
});
