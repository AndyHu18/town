# 華友聯健康科技健康園區網站 - 專案交接文件

## 📋 目錄
- [專案概述](#專案概述)
- [技術架構](#技術架構)
- [目錄結構詳解](#目錄結構詳解)
- [核心檔案說明](#核心檔案說明)
- [前端檔案說明](#前端檔案說明)
- [後端檔案說明](#後端檔案說明)
- [資料庫檔案說明](#資料庫檔案說明)
- [設定檔案說明](#設定檔案說明)
- [文件檔案說明](#文件檔案說明)
- [開發流程](#開發流程)
- [常見修改場景](#常見修改場景)

---

## 專案概述

**專案名稱：** 華友聯健康科技健康園區行銷網站  
**專案類型：** 高端奢侈品牌風格的健康生活園區行銷網站  
**開發時間：** 2024年11月-12月  
**技術棧：** React 19 + TypeScript + TailwindCSS 4 + Express + tRPC 11 + PostgreSQL

### 主要功能
1. **前台展示網站**：高端視覺設計、互動式體驗、RWD 響應式設計
2. **CMS 內容管理系統**：完整的文章管理、富文本編輯、圖片上傳、SEO 優化
3. **背景音樂系統**：全域音樂播放、頁面切換音樂、影片音軌智能切換
4. **Google OAuth 認證**：安全的管理員登入系統

---

## 技術架構

```
┌─────────────────────────────────────────────────────────────┐
│                         前端層 (Client)                        │
│  React 19 + TypeScript + Vite + TailwindCSS 4 + Wouter       │
│  • 頁面組件 (Pages)                                            │
│  • UI 組件 (Components)                                        │
│  • 狀態管理 (Context API)                                      │
│  • tRPC Client (Type-safe API calls)                         │
└─────────────────────────────────────────────────────────────┘
                              ↕ HTTP/tRPC
┌─────────────────────────────────────────────────────────────┐
│                         後端層 (Server)                        │
│  Node.js + Express + tRPC 11                                 │
│  • API 路由 (tRPC Routers)                                    │
│  • 業務邏輯 (DB Queries)                                       │
│  • 認證中介層 (OAuth + JWT)                                    │
│  • 檔案上傳 (S3 Integration)                                  │
└─────────────────────────────────────────────────────────────┘
                              ↕ SQL
┌─────────────────────────────────────────────────────────────┐
│                       資料庫層 (Database)                      │
│  PostgreSQL / MySQL + Drizzle ORM                            │
│  • users, allowed_authors                                    │
│  • articles, article_categories, tags                        │
│  • page_sections, article_sections                           │
└─────────────────────────────────────────────────────────────┘
                              ↕ API
┌─────────────────────────────────────────────────────────────┐
│                       外部服務 (External)                      │
│  • AWS S3 (圖片儲存)                                           │
│  • Google OAuth (登入認證)                                     │
│  • Manus Platform (部署平台)                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 目錄結構詳解

```
fufu-villa-website/
│
├── 📁 client/                          # 前端應用程式目錄
│   ├── 📁 public/                      # 靜態資源（直接複製到根目錄）
│   │   └── 📁 assets/                  # 媒體資源
│   │       ├── 🎵 *.mp3                # 背景音樂檔案
│   │       ├── 🎬 *.mp4                # 影片檔案
│   │       └── 🖼️ *.png, *.jpg         # 圖片檔案
│   │
│   ├── 📁 src/                         # 前端原始碼
│   │   ├── 📁 _core/                   # 核心功能（框架層）
│   │   │   └── 📁 hooks/               # React Hooks
│   │   │       └── useAuth.ts          # 認證 Hook
│   │   │
│   │   ├── 📁 components/              # React 組件
│   │   │   ├── 📁 ui/                  # shadcn/ui 基礎組件
│   │   │   ├── BackgroundMusic.tsx     # 背景音樂組件 ⭐
│   │   │   ├── Navbar.tsx              # 導航欄組件 ⭐
│   │   │   ├── Footer.tsx              # 頁尾組件 ⭐
│   │   │   ├── HeroSection.tsx         # 首頁 Hero 區塊
│   │   │   ├── FeaturesSection.tsx     # 六大面向區塊
│   │   │   ├── ScrollReveal.tsx        # 滾動動畫組件
│   │   │   ├── ArticleEditor.tsx       # 文章編輯器 ⭐
│   │   │   └── ...                     # 其他組件
│   │   │
│   │   ├── 📁 contexts/                # React Context
│   │   │   └── MusicContext.tsx        # 音樂狀態管理 ⭐
│   │   │
│   │   ├── 📁 hooks/                   # 自訂 Hooks
│   │   │   └── useScrollAnimation.ts   # 滾動動畫 Hook
│   │   │
│   │   ├── 📁 lib/                     # 工具函式
│   │   │   ├── trpc.ts                 # tRPC 客戶端設定 ⭐
│   │   │   └── utils.ts                # 通用工具函式
│   │   │
│   │   ├── 📁 pages/                   # 頁面組件 ⭐
│   │   │   ├── Home.tsx                # 首頁
│   │   │   ├── About.tsx               # 進入園區
│   │   │   ├── Features.tsx            # 六大面向
│   │   │   ├── Wellness.tsx            # 健康醫療
│   │   │   ├── Farm.tsx                # 休閒農場
│   │   │   ├── Lifestyle.tsx           # 生活服務
│   │   │   ├── VideoTour.tsx           # 介紹影片 ⭐
│   │   │   ├── Contact.tsx             # 聯絡我們
│   │   │   ├── Articles.tsx            # 文章列表
│   │   │   ├── ArticleDetail.tsx       # 文章詳情
│   │   │   ├── Admin.tsx               # 管理後台首頁 ⭐
│   │   │   ├── ArticleEditorPage.tsx   # 文章編輯頁面 ⭐
│   │   │   └── AuthorManagement.tsx    # 作者管理 ⭐
│   │   │
│   │   ├── App.tsx                     # 應用程式主組件（路由設定）⭐
│   │   ├── main.tsx                    # 應用程式入口點 ⭐
│   │   ├── index.css                   # 全域樣式（TailwindCSS）⭐
│   │   └── const.ts                    # 前端常數
│   │
│   └── index.html                      # HTML 模板

├── 📁 server/                          # 後端應用程式目錄
│   ├── 📁 _core/                       # 核心功能（框架層）
│   │   ├── 📁 types/                   # TypeScript 類型定義
│   │   ├── context.ts                  # tRPC Context 設定
│   │   ├── cookies.ts                  # Cookie 處理
│   │   ├── env.ts                      # 環境變數管理
│   │   ├── index.ts                    # 伺服器入口點 ⭐
│   │   ├── oauth.ts                    # OAuth 認證
│   │   ├── trpc.ts                     # tRPC 伺服器設定
│   │   ├── vite.ts                     # Vite 整合
│   │   ├── llm.ts                      # LLM 整合（未使用）
│   │   ├── imageGeneration.ts          # 圖片生成（未使用）
│   │   ├── notification.ts             # 通知功能（未使用）
│   │   └── ...                         # 其他核心功能
│   │
│   ├── 📁 services/                    # 背景服務
│   │   └── scheduled-publisher.ts      # 排程發布服務 ⭐
│   │
│   ├── routers.ts                      # tRPC 主路由 ⭐
│   ├── articles.router.ts              # 文章相關 API ⭐
│   ├── db.ts                           # 資料庫查詢函式 ⭐
│   ├── storage.ts                      # S3 檔案上傳 ⭐
│   ├── upload.ts                       # 檔案上傳處理
│   ├── articles.test.ts                # 文章 API 測試 ⭐
│   └── auth.logout.test.ts             # 認證測試

├── 📁 drizzle/                         # 資料庫相關檔案
│   ├── 📁 meta/                        # 遷移元資料
│   ├── 📁 migrations/                  # 遷移檔案（自動生成）
│   ├── schema.ts                       # 資料庫 Schema 定義 ⭐
│   ├── relations.ts                    # 資料表關聯定義
│   └── *.sql                           # SQL 遷移檔案

├── 📁 shared/                          # 前後端共用程式碼
│   ├── 📁 _core/                       # 核心共用程式碼
│   ├── const.ts                        # 共用常數
│   └── types.ts                        # 共用類型定義

├── 📁 patches/                         # npm 套件補丁
│   └── wouter@3.7.1.patch              # Wouter 路由補丁

│
├── 📄 設定檔案
├── package.json                        # npm 套件設定 ⭐
├── pnpm-lock.yaml                      # 套件鎖定檔案
├── tsconfig.json                       # TypeScript 設定
├── vite.config.ts                      # Vite 建置設定
├── vitest.config.ts                    # Vitest 測試設定
├── drizzle.config.ts                   # Drizzle ORM 設定
├── components.json                     # shadcn/ui 設定
│
├── 📄 文件檔案
├── README.md                           # 專案說明
├── DEPLOYMENT.md                       # 部署指南 ⭐
├── DEPLOYMENT_README.md                # 部署快速指南 ⭐
├── PROJECT_HANDOVER.md                 # 本檔案 ⭐
├── ENV_VARIABLES.md                    # 環境變數說明
├── todo.md                             # 功能清單與待辦事項 ⭐
├── content_plan.md                     # 內容規劃
├── ideas.md                            # 功能想法
│
├── 📄 技術文件
├── PAGE_SECTIONS_ANALYSIS.md           # 頁面區域系統分析
├── AUDIO_DEBUG_REPORT.md               # 音訊問題除錯報告
├── ROOT_CAUSE_AND_SOLUTION.md          # Git 問題根因分析
├── EXPERT_TEAM_ANALYSIS.md             # 專家團隊分析
├── SYSTEM_OPTIMIZATION_ANALYSIS.md     # 系統優化分析
├── CHECKPOINT_PUBLISHING_DIAGNOSIS.md  # Checkpoint 診斷
│
└── 📄 工具腳本
    └── seed-sections.mjs                # 頁面區域初始化腳本 ⭐
```

**圖例：**
- ⭐ = 核心檔案，修改頻率高或重要性高
- 📁 = 目錄
- 📄 = 檔案

---

## 核心檔案說明

### 1. 應用程式入口點

#### `client/src/main.tsx`
**用途：** 前端應用程式的啟動點  
**功能：**
- 初始化 tRPC 客戶端
- 設定 React Query
- 配置全域錯誤處理
- 掛載 React 應用到 DOM

**關鍵程式碼：**
```typescript
// tRPC 客戶端設定
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,  // 支援 Date 等複雜類型
    }),
  ],
});

// 掛載應用
createRoot(document.getElementById("root")!).render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </trpc.Provider>
);
```

**何時修改：**
- 需要新增全域 Provider（如 Theme Provider）
- 修改 API 端點設定
- 新增全域錯誤處理邏輯

---

#### `client/src/App.tsx`
**用途：** 應用程式主組件，定義路由結構  
**功能：**
- 設定所有頁面路由
- 包含全域組件（Navbar、Footer、BackgroundMusic）
- 提供音樂狀態管理（MusicProvider）

**關鍵程式碼：**
```typescript
<MusicProvider>
  <BackgroundMusic />
  <Navbar />
  <Switch>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/admin" component={Admin} />
    {/* ... 其他路由 */}
  </Switch>
  <Footer />
</MusicProvider>
```

**何時修改：**
- 新增或移除頁面時，需要在這裡新增路由
- 修改全域佈局（如新增側邊欄）
- 調整全域組件的順序或配置

---

#### `server/_core/index.ts`
**用途：** 後端伺服器的啟動點  
**功能：**
- 初始化 Express 伺服器
- 設定 tRPC 中介層
- 配置 OAuth 路由
- 整合 Vite 開發伺服器
- 啟動排程服務

**關鍵程式碼：**
```typescript
// tRPC API 路由
app.use(
  "/api/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// OAuth 回調路由
app.use("/api/oauth", oauthRouter);

// Vite 開發伺服器（開發環境）
if (process.env.NODE_ENV === "development") {
  await setupVite(app);
}

// 啟動排程服務
startScheduledPublisher();
```

**何時修改：**
- 新增 REST API 端點（非 tRPC）
- 修改伺服器埠號或主機設定
- 新增全域中介層（如 CORS、壓縮）
- 新增背景服務或定時任務

---

### 2. 路由與 API

#### `server/routers.ts`
**用途：** tRPC 主路由，整合所有 API 端點  
**功能：**
- 定義所有 tRPC 程序（procedures）
- 整合子路由（如 articles router）
- 提供認證相關 API

**結構：**
```typescript
export const appRouter = router({
  // 認證相關
  auth: router({
    me: publicProcedure.query(...),      // 取得當前使用者
    logout: publicProcedure.mutation(...), // 登出
  }),
  
  // 文章相關（來自 articles.router.ts）
  articles: articlesRouter,
  
  // 系統相關
  system: systemRouter,
});
```

**何時修改：**
- 新增新的 API 功能模組
- 修改現有 API 的輸入/輸出格式
- 調整權限控制邏輯

---

#### `server/articles.router.ts`
**用途：** 文章管理相關的所有 API  
**功能：**
- 文章 CRUD（建立、讀取、更新、刪除）
- 分類與標籤管理
- 頁面區域管理
- 圖片上傳
- 作者權限管理

**主要端點：**
```typescript
export const articlesRouter = router({
  // 文章相關
  list: publicProcedure.query(...),              // 列出文章
  getBySlug: publicProcedure.input(...).query(...), // 取得單篇文章
  create: protectedProcedure.input(...).mutation(...), // 建立文章
  update: protectedProcedure.input(...).mutation(...), // 更新文章
  delete: protectedProcedure.input(...).mutation(...), // 刪除文章
  
  // 分類相關
  categories: {
    list: publicProcedure.query(...),
    create: protectedProcedure.input(...).mutation(...),
    // ...
  },
  
  // 標籤相關
  tags: {
    list: publicProcedure.query(...),
    // ...
  },
  
  // 頁面區域相關
  sections: {
    list: publicProcedure.query(...),
    getArticlesBySection: publicProcedure.input(...).query(...),
  },
  
  // 圖片上傳
  uploadImage: protectedProcedure.input(...).mutation(...),
  
  // 作者管理
  authors: {
    list: protectedProcedure.query(...),
    add: protectedProcedure.input(...).mutation(...),
    // ...
  },
});
```

**何時修改：**
- 新增文章相關功能（如評論、點讚）
- 修改文章欄位（需同步修改 Schema）
- 調整權限控制（如區分作者和管理員）

---

#### `server/db.ts`
**用途：** 資料庫查詢函式庫  
**功能：**
- 提供可重用的資料庫查詢函式
- 封裝複雜的 SQL 邏輯
- 處理資料表關聯

**範例函式：**
```typescript
// 取得文章列表（含分類、標籤、區域）
export async function getArticles(filters: ArticleFilters) {
  return await db
    .select()
    .from(articles)
    .leftJoin(categories, eq(articles.categoryId, categories.id))
    .where(/* 篩選條件 */)
    .orderBy(desc(articles.publishedAt));
}

// 檢查使用者是否為允許的作者
export async function isAllowedAuthor(openId: string) {
  const author = await db
    .select()
    .from(allowedAuthors)
    .where(eq(allowedAuthors.openId, openId))
    .limit(1);
  return author.length > 0 && author[0].status === 'active';
}
```

**何時修改：**
- 新增複雜的資料庫查詢
- 優化查詢效能
- 新增資料表關聯邏輯

---

### 3. 資料庫 Schema

#### `drizzle/schema.ts`
**用途：** 定義資料庫結構  
**功能：**
- 定義所有資料表
- 設定欄位類型、預設值、約束
- 定義索引和外鍵

**主要資料表：**

```typescript
// 使用者表
export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  openId: varchar("open_id", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  role: mysqlEnum("role", ["admin", "user"]).default("user"),
  createdAt: timestamp("created_at").defaultNow(),
});

// 允許的作者表（CMS 權限控制）
export const allowedAuthors = mysqlTable("allowed_authors", {
  id: int("id").primaryKey().autoincrement(),
  openId: varchar("open_id", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  role: mysqlEnum("role", ["admin", "editor"]).default("editor"),
  status: mysqlEnum("status", ["active", "inactive"]).default("active"),
  createdAt: timestamp("created_at").defaultNow(),
});

// 文章分類表
export const articleCategories = mysqlTable("article_categories", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

// 標籤表
export const tags = mysqlTable("tags", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  slug: varchar("slug", { length: 50 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

// 文章表
export const articles = mysqlTable("articles", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  coverImage: varchar("cover_image", { length: 500 }),
  
  // 分類與作者
  categoryId: int("category_id").references(() => articleCategories.id),
  authorId: int("author_id").references(() => users.id),
  authorName: varchar("author_name", { length: 255 }),
  authorEmail: varchar("author_email", { length: 255 }),
  
  // 狀態與發布
  status: mysqlEnum("status", ["draft", "scheduled", "published"]).default("draft"),
  publishedAt: timestamp("published_at"),
  scheduledPublishAt: timestamp("scheduled_publish_at"),
  
  // SEO 欄位
  metaDescription: text("meta_description"),
  metaKeywords: text("meta_keywords"),
  ogImage: varchar("og_image", { length: 500 }),
  
  // 時間戳記
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// 文章-標籤關聯表（多對多）
export const articleTags = mysqlTable("article_tags", {
  articleId: int("article_id").references(() => articles.id, { onDelete: "cascade" }),
  tagId: int("tag_id").references(() => tags.id, { onDelete: "cascade" }),
}, (table) => ({
  pk: primaryKey({ columns: [table.articleId, table.tagId] }),
}));

// 頁面區域表（定義文章可以顯示的區域）
export const pageSections = mysqlTable("page_sections", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  page: varchar("page", { length: 50 }).notNull(), // 'home', 'about', 'features', etc.
  createdAt: timestamp("created_at").defaultNow(),
});

// 文章-區域關聯表（多對多）
export const articleSections = mysqlTable("article_sections", {
  articleId: int("article_id").references(() => articles.id, { onDelete: "cascade" }),
  sectionId: int("section_id").references(() => pageSections.id, { onDelete: "cascade" }),
}, (table) => ({
  pk: primaryKey({ columns: [table.articleId, table.sectionId] }),
}));
```

**何時修改：**
- 新增資料表或欄位
- 修改欄位類型或約束
- 新增索引以優化查詢效能

**修改後必須執行：**
```bash
pnpm db:push  # 生成遷移並套用到資料庫
```

---

### 4. 前端頁面組件

#### `client/src/pages/Home.tsx`
**用途：** 網站首頁  
**功能：**
- Hero 區塊（主視覺）
- 六大面向卡片
- 生活風格區塊
- 健康醫療區塊
- 聯絡表單
- 豪華生活影片區塊

**結構：**
```typescript
export default function Home() {
  const { setTrack } = useMusic();  // 音樂控制
  
  useEffect(() => {
    setTrack("/assets/majestic-bgm.mp3");  // 設定首頁音樂
  }, [setTrack]);
  
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ScrollReveal><FeaturesSection /></ScrollReveal>
      <ScrollReveal><LifestyleSection /></ScrollReveal>
      <ScrollReveal><WellnessSection /></ScrollReveal>
      <ScrollReveal><ContactSection /></ScrollReveal>
      {/* 豪華生活影片 */}
      <ScrollReveal>
        <section className="w-full h-[60vh]">
          <video autoPlay loop muted playsInline>
            <source src="/assets/luxury-lifestyle-family-taiwan-with-audio.mp4" />
          </video>
        </section>
      </ScrollReveal>
    </div>
  );
}
```

**何時修改：**
- 調整首頁佈局
- 新增或移除區塊
- 更換背景音樂

---

#### `client/src/pages/VideoTour.tsx`
**用途：** 介紹影片頁面  
**功能：**
- Hero 區塊
- YouTube 影片嵌入 ⭐ (最新新增)
- 本地影片播放器
- 精選圖片展示

**關鍵程式碼：**
```typescript
{/* YouTube 影片區塊 */}
<ScrollReveal direction="up">
  <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
    <iframe
      className="w-full h-full"
      src="https://www.youtube.com/embed/Oon-NlRMk1M"
      title="華友聯健康科技健康園區介紹"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  </div>
</ScrollReveal>

{/* 本地影片播放器 */}
<motion.div>
  <video controls className="w-full rounded-xl">
    <source src="/assets/Life.mp4" type="video/mp4" />
  </video>
</motion.div>
```

**何時修改：**
- 更換 YouTube 影片連結
- 更換本地影片檔案
- 調整影片播放器樣式

---

#### `client/src/pages/Admin.tsx`
**用途：** CMS 管理後台首頁  
**功能：**
- 文章列表顯示
- 搜尋與篩選
- 批量操作（刪除、發布）
- 統計儀表板
- 快速新增文章

**關鍵功能：**
```typescript
// 取得文章列表
const { data: articles, isLoading } = trpc.articles.list.useQuery({
  status: statusFilter,
  categoryId: categoryFilter,
  search: searchQuery,
});

// 刪除文章
const deleteMutation = trpc.articles.delete.useMutation({
  onSuccess: () => {
    toast.success("文章已刪除");
    utils.articles.list.invalidate();  // 重新載入列表
  },
});

// 批量發布
const publishMutation = trpc.articles.batchPublish.useMutation({
  onSuccess: () => {
    toast.success("已發布選中的文章");
    utils.articles.list.invalidate();
  },
});
```

**何時修改：**
- 新增篩選條件
- 調整列表顯示欄位
- 新增批量操作功能

---

#### `client/src/pages/ArticleEditorPage.tsx`
**用途：** 文章編輯頁面  
**功能：**
- 整合 ArticleEditor 組件
- 處理新增/編輯邏輯
- 自動儲存草稿
- 預覽功能

**關鍵程式碼：**
```typescript
export default function ArticleEditorPage() {
  const { id } = useParams();
  const isEdit = !!id;
  
  // 載入文章資料（編輯模式）
  const { data: article } = trpc.articles.getById.useQuery(
    { id: parseInt(id!) },
    { enabled: isEdit }
  );
  
  return (
    <div className="container mx-auto py-8">
      <ArticleEditor article={article} />
    </div>
  );
}
```

**何時修改：**
- 調整編輯器佈局
- 新增編輯器功能（如版本控制）

---

### 5. 核心組件

#### `client/src/components/BackgroundMusic.tsx`
**用途：** 全域背景音樂播放器  
**功能：**
- 音樂播放控制（播放、暫停、音量）
- 音樂提示通知
- 與影片音軌智能切換

**關鍵程式碼：**
```typescript
export function BackgroundMusic() {
  const { currentTrack, isPlaying, setIsPlaying } = useMusic();
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  
  // 初始化音訊
  useEffect(() => {
    if (currentTrack) {
      const newAudio = new Audio(currentTrack);
      newAudio.loop = true;
      newAudio.volume = 0.3;
      setAudio(newAudio);
      
      // 嘗試自動播放
      newAudio.play().catch(() => {
        // 顯示提示讓使用者手動啟用
        toast.info("點擊音樂按鈕以播放背景音樂");
      });
    }
  }, [currentTrack]);
  
  // 播放/暫停控制
  useEffect(() => {
    if (audio) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, audio]);
  
  return (
    <button onClick={() => setIsPlaying(!isPlaying)}>
      {isPlaying ? <Volume2 /> : <VolumeX />}
    </button>
  );
}
```

**何時修改：**
- 調整預設音量
- 修改音樂提示文字
- 新增淡入淡出效果

---

#### `client/src/components/Navbar.tsx`
**用途：** 網站導航欄  
**功能：**
- 桌面版導航選單
- 手機版漢堡選單
- 登入按鈕（管理員）
- 品牌 Logo 與返回首頁

**關鍵程式碼：**
```typescript
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { name: "進入園區", path: "/about" },
    { name: "六大面向", path: "/features" },
    { name: "健康醫療", path: "/wellness" },
    { name: "休閒農場", path: "/farm" },
    { name: "生活服務", path: "/lifestyle" },
    { name: "介紹影片", path: "/videos" },
    { name: "聯絡我們", path: "/contact" },
  ];
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">
      {/* 桌面版選單 */}
      <div className="hidden lg:flex">
        {navLinks.map(link => (
          <Link to={link.path}>{link.name}</Link>
        ))}
        <Link to="/admin">管理登入</Link>
      </div>
      
      {/* 手機版選單 */}
      <div className="lg:hidden">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            {navLinks.map(link => (
              <Link to={link.path} onClick={() => setIsMobileMenuOpen(false)}>
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
```

**何時修改：**
- 新增或移除導航連結
- 調整導航欄樣式
- 修改手機版選單行為

---

#### `client/src/components/ArticleEditor.tsx`
**用途：** 富文本文章編輯器  
**功能：**
- Tiptap 富文本編輯
- 圖片上傳
- 分類與標籤選擇
- 頁面區域選擇
- SEO 欄位編輯
- 排程發布
- 自動儲存草稿

**關鍵功能：**
```typescript
export function ArticleEditor({ article }: { article?: Article }) {
  // Tiptap 編輯器設定
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link,
      Table,
      CodeBlockLowlight.configure({
        lowlight,
        languageClassPrefix: 'language-',
      }),
      Youtube,
    ],
    content: article?.content || '',
  });
  
  // 圖片上傳
  const uploadImageMutation = trpc.articles.uploadImage.useMutation({
    onSuccess: (data) => {
      editor?.chain().focus().setImage({ src: data.url }).run();
    },
  });
  
  // 自動儲存草稿（每 30 秒）
  useEffect(() => {
    const interval = setInterval(() => {
      if (formData.title && formData.content) {
        saveDraft();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [formData]);
  
  // 儲存文章
  const saveMutation = trpc.articles.create.useMutation({
    onSuccess: () => {
      toast.success("文章已儲存");
      router.push("/admin");
    },
  });
  
  return (
    <form onSubmit={handleSubmit}>
      {/* 標題 */}
      <Input name="title" value={formData.title} onChange={handleChange} />
      
      {/* 富文本編輯器 */}
      <EditorContent editor={editor} />
      
      {/* 分類選擇 */}
      <Select value={formData.categoryId} onValueChange={handleCategoryChange}>
        {categories.map(cat => (
          <SelectItem value={cat.id}>{cat.name}</SelectItem>
        ))}
      </Select>
      
      {/* 標籤選擇（多選） */}
      <TagSelector selected={formData.tags} onChange={handleTagsChange} />
      
      {/* 頁面區域選擇（多選） */}
      <SectionSelector selected={formData.sections} onChange={handleSectionsChange} />
      
      {/* SEO 欄位 */}
      <Textarea name="metaDescription" placeholder="Meta Description" />
      <Input name="metaKeywords" placeholder="關鍵字（逗號分隔）" />
      
      {/* 排程發布 */}
      <DateTimePicker value={formData.scheduledPublishAt} onChange={handleScheduleChange} />
      
      {/* 儲存按鈕 */}
      <Button type="submit">發布文章</Button>
      <Button type="button" onClick={saveDraft}>儲存草稿</Button>
    </form>
  );
}
```

**何時修改：**
- 新增編輯器功能（如表情符號）
- 調整自動儲存間隔
- 新增欄位驗證

---

### 6. 狀態管理

#### `client/src/contexts/MusicContext.tsx`
**用途：** 全域音樂狀態管理  
**功能：**
- 管理當前播放的音軌
- 控制播放/暫停狀態
- 提供音樂控制 API

**程式碼：**
```typescript
interface MusicContextType {
  currentTrack: string | null;
  isPlaying: boolean;
  setTrack: (track: string) => void;
  setIsPlaying: (playing: boolean) => void;
}

export const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const setTrack = (track: string) => {
    if (track !== currentTrack) {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };
  
  return (
    <MusicContext.Provider value={{ currentTrack, isPlaying, setTrack, setIsPlaying }}>
      {children}
    </MusicContext.Provider>
  );
}

// 自訂 Hook
export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) throw new Error("useMusic must be used within MusicProvider");
  return context;
}
```

**使用範例：**
```typescript
// 在頁面中設定音樂
const { setTrack } = useMusic();
useEffect(() => {
  setTrack("/assets/majestic-bgm.mp3");
}, [setTrack]);
```

**何時修改：**
- 新增音樂相關狀態（如音量、播放清單）
- 實作音樂淡入淡出效果

---

### 7. 背景服務

#### `server/services/scheduled-publisher.ts`
**用途：** 排程發布服務  
**功能：**
- 每分鐘檢查是否有文章需要發布
- 自動將 `scheduled` 狀態的文章改為 `published`
- 更新 `publishedAt` 時間戳記

**程式碼：**
```typescript
export function startScheduledPublisher() {
  // 每分鐘執行一次
  setInterval(async () => {
    try {
      await checkAndPublish();
    } catch (error) {
      console.error("[ScheduledPublisher] Error:", error);
    }
  }, 60000); // 60 秒
}

async function checkAndPublish() {
  const now = new Date();
  
  // 查詢需要發布的文章
  const articlesToPublish = await db
    .select()
    .from(articles)
    .where(
      and(
        eq(articles.status, "scheduled"),
        isNotNull(articles.scheduledPublishAt),
        lte(articles.scheduledPublishAt, now)
      )
    );
  
  // 批量更新為已發布
  for (const article of articlesToPublish) {
    await db
      .update(articles)
      .set({
        status: "published",
        publishedAt: now,
      })
      .where(eq(articles.id, article.id));
    
    console.log(`[ScheduledPublisher] Published article: ${article.title}`);
  }
}
```

**何時修改：**
- 調整檢查頻率
- 新增發布通知功能
- 實作發布失敗重試機制

---

## 設定檔案說明

### `package.json`
**用途：** npm 套件管理與腳本設定  

**重要腳本：**
```json
{
  "scripts": {
    "dev": "NODE_ENV=development tsx watch server/_core/index.ts",
    "build": "vite build && esbuild server/_core/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "preview": "NODE_ENV=production node dist/index.js",
    "db:push": "drizzle-kit generate && drizzle-kit migrate",
    "test": "vitest run",
    "format": "prettier --write ."
  }
}
```

**腳本說明：**
- `pnpm dev` - 啟動開發伺服器（前端 + 後端）
- `pnpm build` - 建置生產版本
- `pnpm preview` - 預覽生產版本
- `pnpm db:push` - 生成並執行資料庫遷移
- `pnpm test` - 執行測試

---

### `vite.config.ts`
**用途：** Vite 建置工具設定  

**關鍵設定：**
```typescript
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
  build: {
    outDir: "dist/public",
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
```

**何時修改：**
- 新增路徑別名
- 調整建置輸出目錄
- 修改開發伺服器設定

---

### `drizzle.config.ts`
**用途：** Drizzle ORM 設定  

**程式碼：**
```typescript
export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

**何時修改：**
- 切換資料庫類型（MySQL ↔ PostgreSQL）
- 修改 Schema 檔案路徑

---

## 文件檔案說明

### `DEPLOYMENT.md`
**用途：** 完整的部署指南  
**內容：**
- 環境需求
- 詳細部署步驟
- 環境變數設定
- 資料庫初始化
- 生產環境建置
- 常見問題排除

**何時參考：**
- 首次部署網站
- 遷移到新伺服器
- 設定 CI/CD 流程

---

### `todo.md`
**用途：** 功能清單與待辦事項  
**內容：**
- 已完成功能（標記為 `[x]`）
- 待開發功能（標記為 `[ ]`）
- 已知問題與修復計畫

**何時更新：**
- 完成新功能時標記為已完成
- 發現新需求時新增待辦項目
- 規劃下一階段開發時參考

---

### `seed-sections.mjs`
**用途：** 初始化頁面區域資料  
**功能：**
- 在資料庫中建立 21 個預定義的頁面區域
- 包含首頁、各子頁面的文章顯示區域

**使用方式：**
```bash
node seed-sections.mjs
```

**區域列表：**
```javascript
const sections = [
  // 首頁
  { name: "首頁 - 最新消息", slug: "home-news", page: "home" },
  { name: "首頁 - 精選文章", slug: "home-featured", page: "home" },
  
  // 進入園區
  { name: "進入園區 - 園區介紹", slug: "about-intro", page: "about" },
  { name: "進入園區 - 最新動態", slug: "about-news", page: "about" },
  
  // 六大面向
  { name: "六大面向 - 智能科技", slug: "features-tech", page: "features" },
  { name: "六大面向 - 醫療服務", slug: "features-medical", page: "features" },
  // ... 其他 15 個區域
];
```

**何時執行：**
- 首次部署時初始化資料庫
- 新增頁面區域時更新腳本並重新執行

---

## 開發流程

### 1. 本地開發環境設定

```bash
# 1. 解壓縮專案
tar -xzf fufu-villa-website-final-20251208.tar.gz
cd fufu-villa-website

# 2. 安裝相依套件
pnpm install

# 3. 設定環境變數
cp .env.example .env
# 編輯 .env 填入必要的環境變數

# 4. 初始化資料庫
pnpm db:push

# 5. 初始化頁面區域（首次執行）
node seed-sections.mjs

# 6. 啟動開發伺服器
pnpm dev
```

### 2. 日常開發流程

```bash
# 1. 啟動開發伺服器
pnpm dev

# 2. 修改程式碼（自動熱重載）
# - 前端：client/src/
# - 後端：server/

# 3. 執行測試
pnpm test

# 4. 格式化程式碼
pnpm format

# 5. 提交變更
git add .
git commit -m "描述變更內容"
```

### 3. 資料庫變更流程

```bash
# 1. 修改 Schema
# 編輯 drizzle/schema.ts

# 2. 生成並執行遷移
pnpm db:push

# 3. 驗證變更
# 檢查資料庫是否正確更新

# 4. 更新相關程式碼
# - server/db.ts（查詢函式）
# - server/routers.ts（API）
# - client/src/（前端組件）

# 5. 執行測試
pnpm test
```

### 4. 新增頁面流程

```bash
# 1. 建立頁面組件
# client/src/pages/NewPage.tsx

# 2. 在 App.tsx 新增路由
# <Route path="/new-page" component={NewPage} />

# 3. 在 Navbar.tsx 新增連結
# { name: "新頁面", path: "/new-page" }

# 4. 設定頁面音樂（可選）
# useEffect(() => {
#   setTrack("/assets/new-page-music.mp3");
# }, [setTrack]);

# 5. 測試頁面
# 訪問 http://localhost:3000/new-page
```

### 5. 新增 API 端點流程

```bash
# 1. 在 server/routers.ts 或子路由新增程序
# export const appRouter = router({
#   newFeature: publicProcedure
#     .input(z.object({ ... }))
#     .query(async ({ input }) => {
#       // 實作邏輯
#     }),
# });

# 2. 在 server/db.ts 新增查詢函式（可選）
# export async function getNewData() {
#   return await db.select().from(newTable);
# }

# 3. 在前端呼叫 API
# const { data } = trpc.newFeature.useQuery({ ... });

# 4. 撰寫測試
# 在 server/*.test.ts 新增測試案例

# 5. 執行測試
# pnpm test
```

---

## 常見修改場景

### 場景 1：更換首頁背景音樂

**步驟：**
1. 將新的音樂檔案放到 `client/public/assets/`
2. 修改 `client/src/pages/Home.tsx`：
   ```typescript
   useEffect(() => {
     setTrack("/assets/new-music.mp3");  // 更換為新檔案名稱
   }, [setTrack]);
   ```
3. 重新整理頁面測試

---

### 場景 2：新增文章分類

**步驟：**
1. 在 CMS 後台（`/admin`）點擊「分類管理」
2. 點擊「新增分類」
3. 填入分類名稱和描述
4. 儲存

**或使用 API：**
```typescript
const createCategoryMutation = trpc.articles.categories.create.useMutation();
createCategoryMutation.mutate({
  name: "新分類",
  slug: "new-category",
  description: "分類描述",
});
```

---

### 場景 3：修改導航欄連結

**步驟：**
1. 編輯 `client/src/components/Navbar.tsx`
2. 修改 `navLinks` 陣列：
   ```typescript
   const navLinks = [
     { name: "首頁", path: "/" },
     { name: "新頁面", path: "/new-page" },  // 新增連結
     // ... 其他連結
   ];
   ```
3. 儲存檔案（自動熱重載）

---

### 場景 4：新增頁面區域

**步驟：**
1. 編輯 `seed-sections.mjs`
2. 新增區域定義：
   ```javascript
   {
     name: "新頁面 - 最新消息",
     slug: "new-page-news",
     page: "new-page",
     description: "顯示在新頁面的最新消息"
   }
   ```
3. 執行腳本：`node seed-sections.mjs`
4. 在文章編輯器中即可選擇新區域

---

### 場景 5：修改文章欄位

**步驟：**
1. 編輯 `drizzle/schema.ts`
2. 新增或修改欄位：
   ```typescript
   export const articles = mysqlTable("articles", {
     // ... 現有欄位
     newField: varchar("new_field", { length: 255 }),  // 新欄位
   });
   ```
3. 執行遷移：`pnpm db:push`
4. 更新相關程式碼：
   - `server/db.ts`（查詢函式）
   - `server/articles.router.ts`（API 輸入/輸出）
   - `client/src/components/ArticleEditor.tsx`（編輯器）
5. 執行測試：`pnpm test`

---

### 場景 6：調整圖片上傳大小限制

**步驟：**
1. 編輯 `server/articles.router.ts`
2. 修改 `uploadImage` 程序：
   ```typescript
   uploadImage: protectedProcedure
     .input(z.object({
       base64: z.string().max(10 * 1024 * 1024),  // 10MB 限制
       filename: z.string(),
     }))
     .mutation(async ({ input }) => {
       // ... 上傳邏輯
     }),
   ```
3. 編輯 `client/src/components/ArticleEditor.tsx`
4. 修改前端驗證：
   ```typescript
   if (file.size > 10 * 1024 * 1024) {
     toast.error("圖片大小不能超過 10MB");
     return;
   }
   ```

---

### 場景 7：修改自動儲存間隔

**步驟：**
1. 編輯 `client/src/components/ArticleEditor.tsx`
2. 修改 `useEffect` 中的間隔時間：
   ```typescript
   useEffect(() => {
     const interval = setInterval(() => {
       if (formData.title && formData.content) {
         saveDraft();
       }
     }, 60000);  // 改為 60 秒（原本 30 秒）
     return () => clearInterval(interval);
   }, [formData]);
   ```

---

### 場景 8：新增管理員

**方法 1：使用後台介面**
1. 登入 CMS（`/admin`）
2. 前往「作者管理」（`/admin/authors`）
3. 點擊「新增作者」
4. 填入 Google OpenID、姓名、Email
5. 選擇角色（admin / editor）
6. 儲存

**方法 2：直接修改資料庫**
```sql
INSERT INTO allowed_authors (open_id, name, email, role, status)
VALUES ('google-openid-here', '管理員名稱', 'admin@example.com', 'admin', 'active');
```

---

### 場景 9：更換 YouTube 影片

**步驟：**
1. 編輯 `client/src/pages/VideoTour.tsx`
2. 修改 iframe 的 `src` 屬性：
   ```typescript
   <iframe
     src="https://www.youtube.com/embed/NEW_VIDEO_ID"  // 更換影片 ID
     // ... 其他屬性
   />
   ```
3. 儲存檔案（自動熱重載）

---

### 場景 10：修改網站標題和 Logo

**步驟：**
1. 編輯 `.env` 檔案：
   ```env
   VITE_APP_TITLE=新網站標題
   VITE_APP_LOGO=/new-logo.png
   ```
2. 將新 Logo 放到 `client/public/`
3. 重新啟動開發伺服器：`pnpm dev`

---

## 測試指南

### 執行測試

```bash
# 執行所有測試
pnpm test

# 執行特定測試檔案
pnpm test server/articles.test.ts

# 監聽模式（自動重新執行）
pnpm test --watch
```

### 測試檔案位置

- `server/articles.test.ts` - 文章 API 測試
- `server/auth.logout.test.ts` - 認證測試

### 撰寫新測試

**範例：測試新的 API 端點**

```typescript
// server/new-feature.test.ts
import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";

describe("New Feature API", () => {
  it("should return data", async () => {
    const caller = appRouter.createCaller({
      user: { id: 1, openId: "test", name: "Test User" },
    });
    
    const result = await caller.newFeature({ id: 1 });
    
    expect(result).toBeDefined();
    expect(result.id).toBe(1);
  });
});
```

---

## 部署到生產環境

### 1. 建置生產版本

```bash
# 建置前端和後端
pnpm build

# 輸出目錄：
# - dist/public/  (前端靜態檔案)
# - dist/index.js (後端伺服器)
```

### 2. 設定生產環境變數

```bash
# 編輯 .env 檔案
NODE_ENV=production
DATABASE_URL=mysql://user:password@host:port/database
# ... 其他環境變數
```

### 3. 啟動生產伺服器

```bash
# 方法 1：直接執行
NODE_ENV=production node dist/index.js

# 方法 2：使用 PM2（推薦）
pm2 start dist/index.js --name fufu-villa

# 方法 3：使用 Docker
docker build -t fufu-villa .
docker run -p 3000:3000 fufu-villa
```

### 4. 設定反向代理（Nginx）

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 常見問題排除

### 問題 1：資料庫連線失敗

**症狀：**
```
Error: connect ECONNREFUSED
```

**解決方案：**
1. 檢查 `DATABASE_URL` 是否正確
2. 確認資料庫伺服器是否啟動
3. 檢查防火牆設定
4. 驗證資料庫使用者權限

---

### 問題 2：圖片上傳失敗

**症狀：**
```
Error: Access Denied
```

**解決方案：**
1. 檢查 AWS S3 憑證是否正確
2. 確認 S3 Bucket 權限設定
3. 檢查 CORS 設定
4. 驗證檔案大小是否超過限制

---

### 問題 3：OAuth 登入失敗

**症狀：**
```
Error: Invalid redirect URI
```

**解決方案：**
1. 檢查 `OAUTH_SERVER_URL` 和 `VITE_OAUTH_PORTAL_URL`
2. 確認回調 URL 已在 OAuth 平台註冊
3. 檢查 `VITE_APP_ID` 是否正確

---

### 問題 4：背景音樂無法播放

**症狀：**
音樂按鈕點擊後沒有反應

**解決方案：**
1. 檢查音訊檔案路徑是否正確
2. 確認瀏覽器支援音訊格式（建議使用 MP3）
3. 檢查瀏覽器自動播放政策
4. 查看瀏覽器控制台錯誤訊息

---

### 問題 5：文章排程發布不生效

**症狀：**
已排程的文章沒有自動發布

**解決方案：**
1. 確認排程服務已啟動（檢查伺服器日誌）
2. 檢查 `scheduledPublishAt` 時間是否正確
3. 驗證文章狀態是否為 `scheduled`
4. 檢查伺服器時區設定

---

## 效能優化建議

### 1. 前端優化

- **圖片懶載入**：使用 `loading="lazy"` 屬性
- **程式碼分割**：使用 React.lazy() 動態載入頁面
- **快取策略**：設定適當的 Cache-Control 標頭
- **壓縮資源**：啟用 Gzip 或 Brotli 壓縮

### 2. 後端優化

- **資料庫索引**：為常用查詢欄位建立索引
- **查詢優化**：避免 N+1 查詢問題
- **快取機制**：使用 Redis 快取熱門資料
- **連線池**：設定適當的資料庫連線池大小

### 3. 資料庫優化

```sql
-- 為常用查詢欄位建立索引
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_published_at ON articles(published_at);
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_article_sections_article_id ON article_sections(article_id);
CREATE INDEX idx_article_sections_section_id ON article_sections(section_id);
```

---

## 安全性建議

### 1. 環境變數保護

- 永遠不要將 `.env` 檔案提交到 Git
- 使用環境變數管理敏感資訊
- 定期輪換 API 金鑰和密碼

### 2. 輸入驗證

- 使用 Zod 驗證所有 API 輸入
- 防止 SQL 注入（使用 Drizzle ORM）
- 防止 XSS 攻擊（使用 DOMPurify）

### 3. 認證與授權

- 使用 HTTPS 傳輸敏感資料
- 實作 CSRF 保護
- 定期檢查使用者權限

### 4. 檔案上傳安全

- 限制檔案大小
- 驗證檔案類型
- 掃描惡意軟體
- 使用隨機檔名

---

## 聯絡資訊

**專案維護者：** Manus AI Agent  
**建立日期：** 2024年12月8日  
**最後更新：** 2024年12月8日  

**技術支援：**
- 參考 `DEPLOYMENT.md` 進行部署
- 查看 `todo.md` 了解功能狀態
- 閱讀 `README.md` 快速入門

---

**祝您開發順利！** 🎉
