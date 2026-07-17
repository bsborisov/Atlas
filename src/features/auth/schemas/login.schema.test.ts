import { describe, expect, it } from "vitest";
import { loginSchema } from "./login.schema";

describe("loginSchema", () => {
  describe("email", () => {
    it("accepts a valid email", () => {
      const result = loginSchema.safeParse({
        email: "john@example.com",
        password: "password123",
      });

      expect(result.success).toBe(true);
    });

    it("rejects an invalid email", () => {
      const result = loginSchema.safeParse({
        email: "invalid-email",
        password: "password123",
      });

      expect(result.success).toBe(false);

      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Please enter a valid email address."
        );
      }
    });
  });

  describe("password", () => {
    it("accepts a password with at least 8 characters", () => {
      const result = loginSchema.safeParse({
        email: "john@example.com",
        password: "password123",
      });

      expect(result.success).toBe(true);
    });

    it("rejects passwords shorter than 8 characters", () => {
      const result = loginSchema.safeParse({
        email: "john@example.com",
        password: "1234567",
      });

      expect(result.success).toBe(false);

      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Password must contain at least 8 characters."
        );
      }
    });
  });
});