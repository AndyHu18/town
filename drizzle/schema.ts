import { boolean, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Article categories for organizing blog posts and news
 */
export const articleCategories = mysqlTable("article_categories", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ArticleCategory = typeof articleCategories.$inferSelect;
export type InsertArticleCategory = typeof articleCategories.$inferInsert;

/**
 * Articles/Blog posts table
 */
export const articles = mysqlTable("articles", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  coverImage: varchar("coverImage", { length: 500 }),
  categoryId: int("categoryId"),
  authorId: int("authorId").notNull(),
  authorName: varchar("authorName", { length: 255 }).notNull(),
  authorEmail: varchar("authorEmail", { length: 320 }).notNull(),
  status: mysqlEnum("status", ["draft", "published"]).default("draft").notNull(),
  publishedAt: timestamp("publishedAt"),
  scheduledPublishAt: timestamp("scheduledPublishAt"),
  metaDescription: varchar("metaDescription", { length: 160 }),
  metaKeywords: varchar("metaKeywords", { length: 255 }),
  ogImage: varchar("ogImage", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Article = typeof articles.$inferSelect;
export type InsertArticle = typeof articles.$inferInsert;

/**
 * Allowed authors list for Google OAuth authentication
 * Only emails in this list can create/edit articles
 */
export const allowedAuthors = mysqlTable("allowed_authors", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  role: mysqlEnum("role", ["author", "admin"]).default("author").notNull(),
  addedBy: int("addedBy"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AllowedAuthor = typeof allowedAuthors.$inferSelect;
export type InsertAllowedAuthor = typeof allowedAuthors.$inferInsert;

/**
 * Tags for categorizing articles (many-to-many relationship)
 */
export const tags = mysqlTable("tags", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  slug: varchar("slug", { length: 50 }).notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Tag = typeof tags.$inferSelect;
export type InsertTag = typeof tags.$inferInsert;

/**
 * Junction table for article-tag many-to-many relationship
 */
export const articleTags = mysqlTable("article_tags", {
  articleId: int("articleId").notNull(),
  tagId: int("tagId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ArticleTag = typeof articleTags.$inferSelect;
export type InsertArticleTag = typeof articleTags.$inferInsert;

/**
 * Page sections for organizing where articles appear on the website
 * Examples: "home_latest_news", "about_introduction", "wellness_health_info"
 */
export const pageSections = mysqlTable("page_sections", {
  id: int("id").autoincrement().primaryKey(),
  pageKey: varchar("pageKey", { length: 50 }).notNull(), // 'home', 'about', 'features', etc.
  sectionKey: varchar("sectionKey", { length: 50 }).notNull(), // 'latest_news', 'announcements', etc.
  sectionName: varchar("sectionName", { length: 100 }).notNull(), // '最新消息', '活動公告', etc.
  description: text("description"),
  displayOrder: int("displayOrder").default(0).notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PageSection = typeof pageSections.$inferSelect;
export type InsertPageSection = typeof pageSections.$inferInsert;

/**
 * Junction table for article-section many-to-many relationship
 * Allows articles to appear in multiple page sections
 */
export const articleSections = mysqlTable("article_sections", {
  id: int("id").autoincrement().primaryKey(),
  articleId: int("articleId").notNull(),
  sectionId: int("sectionId").notNull(),
  displayOrder: int("displayOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ArticleSection = typeof articleSections.$inferSelect;
export type InsertArticleSection = typeof articleSections.$inferInsert;
