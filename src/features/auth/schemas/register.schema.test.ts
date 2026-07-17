import { describe, expect, it } from "vitest";
import { registerSchema } from "./register.schema";

describe("registerSchema", () => {
  describe("name", () => {
    it("accepts a valid name", () => {
      const result = registerSchema.safeParse({
        name: "John Smith",
        email: "john@example.com",
        password: "password123",
      });

      expect(result.success).toBe(true);
    });

    it("rejects names shorter than 4 characters", () => {
      const result = registerSchema.safeParse({
        name: "Jon",
        email: "john@example.com",
        password: "password123",
      });

      expect(result.success).toBe(false);

      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Name must contain at least 4 characters."
        );
      }
    });
  });

  describe("email", () => {
    it("accepts a valid email", () => {
      const result = registerSchema.safeParse({
        name: "John Smith",
        email: "john@example.com",
        password: "password123",
      });

      expect(result.success).toBe(true);
    });

    it("rejects an invalid email", () => {
      const result = registerSchema.safeParse({
        name: "John Smith",
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
      const result = registerSchema.safeParse({
        name: "John Smith",
        email: "john@example.com",
        password: "password123",
      });

      expect(result.success).toBe(true);
    });

    it("rejects passwords shorter than 8 characters", () => {
      const result = registerSchema.safeParse({
        name: "John Smith",
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