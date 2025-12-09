import { TRPCError } from "@trpc/server";
import { eq, desc, and, like, or, count } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "./db";
import { articles, articleCategories, allowedAuthors, tags, articleTags, pageSections, articleSections } from "../drizzle/schema";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";

/**
 * Middleware to check if user is an allowed author
 */
const requireAllowedAuthor = protectedProcedure.use(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "請先登入" });
  }

  const db = await getDb();
  if (!db) {
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "資料庫連線失敗" });
  }

  // Check if user's email is in allowed authors list
  const allowed = await db.query.allowedAuthors.findFirst({
    where: eq(allowedAuthors.email, ctx.user.email || ""),
  });

  if (!allowed) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "您沒有權限管理文章，請聯繫管理員",
    });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
      authorRole: allowed.role,
    },
  });
});

/**
 * Middleware to check if user is admin
 */
const requireAdmin = requireAllowedAuthor.use(async ({ ctx, next }) => {
  if (ctx.authorRole !== "admin") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "此操作需要管理員權限",
    });
  }

  return next({ ctx });
});

/**
 * Articles router - handles all article-related operations
 */
export const articlesRouter = router({
  /**
   * PUBLIC: Get list of published articles
   */
  list: publicProcedure
    .input(
      z.object({
        categoryId: z.number().optional(),
        search: z.string().optional(),
        page: z.number().default(1),
        limit: z.number().default(10),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const offset = (input.page - 1) * input.limit;

      const conditions = [eq(articles.status, "published")];

      if (input.categoryId) {
        conditions.push(eq(articles.categoryId, input.categoryId));
      }

      if (input.search) {
        conditions.push(
          or(
            like(articles.title, `%${input.search}%`),
            like(articles.content, `%${input.search}%`)
          )!
        );
      }

      const [items, [{ value: totalCount }]] = await Promise.all([
        db.query.articles.findMany({
          where: and(...conditions),
          orderBy: [desc(articles.publishedAt)],
          limit: input.limit,
          offset,
        }),
        db
          .select({ value: count() })
          .from(articles)
          .where(and(...conditions)),
      ]);

      return {
        items,
        total: totalCount,
        page: input.page,
        totalPages: Math.ceil(totalCount / input.limit),
      };
    }),

  /**
   * PUBLIC: Get single article by slug
   */
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const article = await db.query.articles.findFirst({
        where: and(
          eq(articles.slug, input.slug),
          eq(articles.status, "published")
        ),
      });

      if (!article) {
        throw new TRPCError({ code: "NOT_FOUND", message: "文章不存在" });
      }

      return article;
    }),

  /**
   * PROTECTED: Get all articles (including drafts) for admin
   */
  adminList: requireAllowedAuthor
    .input(
      z.object({
        status: z.enum(["draft", "published"]).optional(),
        page: z.number().default(1),
        limit: z.number().default(20),
      })
    )
    .query(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const offset = (input.page - 1) * input.limit;

      const conditions = [];

      // If not admin, only show own articles
      if (ctx.authorRole !== "admin") {
        conditions.push(eq(articles.authorEmail, ctx.user.email || ""));
      }

      if (input.status) {
        conditions.push(eq(articles.status, input.status));
      }

      const [items, [{ value: totalCount }]] = await Promise.all([
        db.query.articles.findMany({
          where: conditions.length > 0 ? and(...conditions) : undefined,
          orderBy: [desc(articles.updatedAt)],
          limit: input.limit,
          offset,
        }),
        db
          .select({ value: count() })
          .from(articles)
          .where(conditions.length > 0 ? and(...conditions) : undefined),
      ]);

      return {
        items,
        total: totalCount,
        page: input.page,
        totalPages: Math.ceil(totalCount / input.limit),
      };
    }),

  /**
   * PROTECTED: Get single article by ID (for editing)
   */
  getById: requireAllowedAuthor
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const article = await db.query.articles.findFirst({
        where: eq(articles.id, input.id),
      });

      if (!article) {
        throw new TRPCError({ code: "NOT_FOUND", message: "文章不存在" });
      }

      // Check permission: admin can edit all, author can only edit own
      if (
        ctx.authorRole !== "admin" &&
        article.authorEmail !== ctx.user.email
      ) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "您只能編輯自己的文章",
        });
      }

      return article;
    }),

  /**
   * PROTECTED: Create new article
   */
  create: requireAllowedAuthor
    .input(
      z.object({
        title: z.string().min(1, "標題不能為空"),
        slug: z.string().min(1, "URL slug 不能為空"),
        content: z.string().min(1, "內容不能為空"),
        excerpt: z.string().optional(),
        coverImage: z.string().optional(),
        categoryId: z.number().optional(),
        status: z.enum(["draft", "published"]).default("draft"),
        scheduledPublishAt: z.date().optional(),
        metaDescription: z.string().max(160).optional(),
        metaKeywords: z.string().max(255).optional(),
        ogImage: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      // Check if slug already exists
      const existing = await db.query.articles.findFirst({
        where: eq(articles.slug, input.slug),
      });

      if (existing) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "此 URL slug 已被使用，請使用其他名稱",
        });
      }

      await db.insert(articles).values({
        ...input,
        authorId: ctx.user.id,
        authorName: ctx.user.name || "未知作者",
        authorEmail: ctx.user.email || "",
        publishedAt: input.status === "published" ? new Date() : null,
      });

      return { success: true };
    }),

  /**
   * PROTECTED: Update article
   */
  update: requireAllowedAuthor
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1).optional(),
        slug: z.string().min(1).optional(),
        content: z.string().min(1).optional(),
        excerpt: z.string().optional(),
        coverImage: z.string().optional(),
        categoryId: z.number().optional(),
        status: z.enum(["draft", "published"]).optional(),
        scheduledPublishAt: z.date().optional(),
        metaDescription: z.string().max(160).optional(),
        metaKeywords: z.string().max(255).optional(),
        ogImage: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const { id, ...updateData } = input;

      // Get existing article
      const article = await db.query.articles.findFirst({
        where: eq(articles.id, id),
      });

      if (!article) {
        throw new TRPCError({ code: "NOT_FOUND", message: "文章不存在" });
      }

      // Check permission
      if (
        ctx.authorRole !== "admin" &&
        article.authorEmail !== ctx.user.email
      ) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "您只能編輯自己的文章",
        });
      }

      // If slug is being changed, check for conflicts
      if (updateData.slug && updateData.slug !== article.slug) {
        const existing = await db.query.articles.findFirst({
          where: eq(articles.slug, updateData.slug),
        });

        if (existing) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "此 URL slug 已被使用",
          });
        }
      }

      // If status is changing to published, set publishedAt
      const finalUpdateData: any = { ...updateData };
      if (
        updateData.status === "published" &&
        article.status !== "published"
      ) {
        finalUpdateData.publishedAt = new Date();
      }

      await db.update(articles).set(finalUpdateData).where(eq(articles.id, id));

      return { success: true };
    }),

  /**
   * PROTECTED: Delete article
   */
  delete: requireAllowedAuthor
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const article = await db.query.articles.findFirst({
        where: eq(articles.id, input.id),
      });

      if (!article) {
        throw new TRPCError({ code: "NOT_FOUND", message: "文章不存在" });
      }

      // Check permission
      if (
        ctx.authorRole !== "admin" &&
        article.authorEmail !== ctx.user.email
      ) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "您只能刪除自己的文章",
        });
      }

      await db.delete(articles).where(eq(articles.id, input.id));

      return { success: true };
    }),

  /**
   * PUBLIC: Get all categories
   */
  categories: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    return db.query.articleCategories.findMany({
      orderBy: [articleCategories.name],
    });
  }),

  /**
   * ADMIN: Create category
   */
  createCategory: requireAdmin
    .input(
      z.object({
        name: z.string().min(1),
        slug: z.string().min(1),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      await db.insert(articleCategories).values(input);
      return { success: true };
    }),

  /**
   * ADMIN: Get allowed authors list
   */
  allowedAuthors: requireAdmin.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    return db.query.allowedAuthors.findMany({
      orderBy: [allowedAuthors.createdAt],
    });
  }),

  /**
   * ADMIN: Add author to allowed list
   */
  addAllowedAuthor: requireAdmin
    .input(
      z.object({
        email: z.string().email(),
        name: z.string().min(1),
        role: z.enum(["author", "admin"]).default("author"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      // Check if already exists
      const existing = await db.query.allowedAuthors.findFirst({
        where: eq(allowedAuthors.email, input.email),
      });

      if (existing) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "此 Email 已在允許名單中",
        });
      }

      await db.insert(allowedAuthors).values({
        ...input,
        addedBy: ctx.user.id,
      });

      return { success: true };
    }),

  /**
   * ADMIN: Remove author from allowed list
   */
  removeAllowedAuthor: requireAdmin
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      await db.delete(allowedAuthors).where(eq(allowedAuthors.id, input.id));
      return { success: true };
    }),

  /**
   * PUBLIC: Get all tags
   */
  tags: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    return db.query.tags.findMany({
      orderBy: [tags.name],
    });
  }),

  /**
   * PUBLIC: Get tags for a specific article
   */
  getArticleTags: publicProcedure
    .input(z.object({ articleId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const result = await db
        .select({ tag: tags })
        .from(articleTags)
        .innerJoin(tags, eq(articleTags.tagId, tags.id))
        .where(eq(articleTags.articleId, input.articleId));

      return result.map((r) => r.tag);
    }),

  /**
   * ADMIN: Create tag
   */
  createTag: requireAdmin
    .input(
      z.object({
        name: z.string().min(1).max(50),
        slug: z.string().min(1).max(50),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      // Check if tag already exists
      const existing = await db.query.tags.findFirst({
        where: or(eq(tags.name, input.name), eq(tags.slug, input.slug)),
      });

      if (existing) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "此標籤名稱或 slug 已存在",
        });
      }

      await db.insert(tags).values(input);
      return { success: true };
    }),

  /**
   * ADMIN: Delete tag
   */
  deleteTag: requireAdmin
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      // Delete all article-tag relationships first
      await db.delete(articleTags).where(eq(articleTags.tagId, input.id));
      // Then delete the tag
      await db.delete(tags).where(eq(tags.id, input.id));
      return { success: true };
    }),

  /**
   * PROTECTED: Set tags for an article
   */
  setArticleTags: requireAllowedAuthor
    .input(
      z.object({
        articleId: z.number(),
        tagIds: z.array(z.number()),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      // Check if user has permission to edit this article
      const article = await db.query.articles.findFirst({
        where: eq(articles.id, input.articleId),
      });

      if (!article) {
        throw new TRPCError({ code: "NOT_FOUND", message: "文章不存在" });
      }

      if (
        ctx.authorRole !== "admin" &&
        article.authorEmail !== ctx.user.email
      ) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "您只能編輯自己的文章",
        });
      }

      // Delete existing tags for this article
      await db.delete(articleTags).where(eq(articleTags.articleId, input.articleId));

      // Insert new tags
      if (input.tagIds.length > 0) {
        await db.insert(articleTags).values(
          input.tagIds.map((tagId) => ({
            articleId: input.articleId,
            tagId,
          }))
        );
      }

      return { success: true };
    }),

  // Get all available page sections
  getSections: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "資料庫連線失敗" });
    }
    const sections = await db.query.pageSections.findMany({
      where: eq(pageSections.isActive, true),
      orderBy: [pageSections.pageKey, pageSections.displayOrder],
    });
    return sections;
  }),

  // Get article sections (which sections an article belongs to)
  getArticleSections: publicProcedure
    .input(z.object({ articleId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "資料庫連線失敗" });
      }
      const sections = await db
        .select({
          sectionId: articleSections.sectionId,
          pageKey: pageSections.pageKey,
          sectionKey: pageSections.sectionKey,
          sectionName: pageSections.sectionName,
        })
        .from(articleSections)
        .innerJoin(pageSections, eq(articleSections.sectionId, pageSections.id))
        .where(eq(articleSections.articleId, input.articleId));
      return sections;
    }),

  // Set article sections (assign article to sections)
  setArticleSections: requireAllowedAuthor
    .input(
      z.object({
        articleId: z.number(),
        sectionIds: z.array(z.number()),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "資料庫連線失敗" });
      }
      // Check if article exists and user has permission
      const article = await db.query.articles.findFirst({
        where: eq(articles.id, input.articleId),
      });
      if (!article) {
        throw new TRPCError({ code: "NOT_FOUND", message: "文章不存在" });
      }
      if (article.authorEmail !== ctx.user.email && ctx.authorRole !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "您只能編輯自己的文章",
        });
      }
      // Delete existing sections for this article
      await db.delete(articleSections).where(eq(articleSections.articleId, input.articleId));
      // Insert new sections
      if (input.sectionIds.length > 0) {
        await db.insert(articleSections).values(
          input.sectionIds.map((sectionId, index) => ({
            articleId: input.articleId,
            sectionId,
            displayOrder: index,
          }))
        );
      }
      return { success: true };
    }),
});
