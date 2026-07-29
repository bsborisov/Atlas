import { describe, expect, it } from "vitest";
import { getClientIp } from "./client-ip";

function createHeaders(values: Record<string, string | null>) {
  return {
    get(name: string) {
      return values[name] ?? null;
    },
  };
}

describe("getClientIp", () => {
  it("uses the first x-forwarded-for address", () => {
    expect(
      getClientIp(
        createHeaders({
          "x-forwarded-for": "203.0.113.10, 127.0.0.1",
        }) as never
      )
    ).toBe("203.0.113.10");
  });

  it("falls back to x-real-ip", () => {
    expect(
      getClientIp(
        createHeaders({
          "x-real-ip": "203.0.113.20",
        }) as never
      )
    ).toBe("203.0.113.20");
  });

  it("returns unknown when no client address exists", () => {
    expect(getClientIp(createHeaders({}) as never)).toBe("unknown");
  });
});
