import { describe, it, expect, beforeAll } from "vitest";
import { appRouter } from "./routers";
import { getDb } from "./db";
import { allowedAuthors } from "../drizzle/schema";

describe("Articles API", () => {
  beforeAll(async () => {
    // Ensure database connection
    const db = await getDb();
    if (!db) {
      throw new Error("Database connection required for tests");
    }

    // Add test author to allowed list (if not exists)
    const testEmail = "test@example.com";
    const existing = await db.query.allowedAuthors.findFirst({
      where: (authors, { eq }) => eq(authors.email, testEmail),
    });

    if (!existing) {
      await db.insert(allowedAuthors).values({
        email: testEmail,
        name: "Test Author",
        role: "author",
        addedBy: 1,
      });
    }
  });

  describe("Public endpoints", () => {
    it("should list published articles", async () => {
      const caller = appRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.articles.list({
        page: 1,
        limit: 10,
      });

      expect(result).toHaveProperty("items");
      expect(result).toHaveProperty("total");
      expect(result).toHaveProperty("page");
      expect(result).toHaveProperty("totalPages");
      expect(Array.isArray(result.items)).toBe(true);
    });

    it("should get categories", async () => {
      const caller = appRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.articles.categories();

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("Protected endpoints", () => {
    const mockUser = {
      id: 1,
      openId: "test-open-id",
      name: "Test Author",
      email: "test@example.com",
      role: "admin" as const,
      loginMethod: "google" as const,
      lastSignedIn: new Date(),
    };

    it("should require authentication for admin list", async () => {
      const caller = appRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });

      await expect(
        caller.articles.adminList({ page: 1, limit: 20 })
      ).rejects.toThrow();
    });

    it("should allow authenticated user to list articles", async () => {
      const caller = appRouter.createCaller({
        user: mockUser,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.articles.adminList({
        page: 1,
        limit: 20,
      });

      expect(result).toHaveProperty("items");
      expect(Array.isArray(result.items)).toBe(true);
    });

    it("should validate article creation input", async () => {
      const caller = appRouter.createCaller({
        user: mockUser,
        req: {} as any,
        res: {} as any,
      });

      // Missing required fields should fail
      await expect(
        caller.articles.create({
          title: "",
          slug: "test-slug",
          content: "Test content",
        })
      ).rejects.toThrow();
    });
  });

  describe("Permission checks", () => {
    it("should require admin role for adding allowed authors", async () => {
      const regularUser = {
        id: 2,
        openId: "regular-user",
        name: "Regular User",
        email: "regular@example.com",
        role: "user" as const,
        loginMethod: "google" as const,
        lastSignedIn: new Date(),
      };

      const caller = appRouter.createCaller({
        user: regularUser,
        req: {} as any,
        res: {} as any,
      });

      await expect(
        caller.articles.addAllowedAuthor({
          email: "newauthor@example.com",
          name: "New Author",
          role: "author",
        })
      ).rejects.toThrow();
    });
  });
});
