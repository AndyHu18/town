# 華友聯健康科技健康園區網站 - 部署說明

## 📦 打包內容

此壓縮檔包含完整的網站專案，包括：
- 前端 React 應用程式（client/）
- 後端 Express + tRPC API（server/）
- 資料庫 Schema（drizzle/）
- 完整的 CMS 內容管理系統
- 所有媒體資源（圖片、影片、音訊）

**打包時間：** 2024年12月8日
**檔案大小：** 334 MB（已排除 node_modules、.git、dist）

---

## 🚀 快速部署步驟

### 1. 解壓縮檔案

```bash
tar -xzf fufu-villa-website-20251208-025425.tar.gz
cd fufu-villa-website
```

### 2. 安裝相依套件

```bash
pnpm install
```

如果沒有安裝 pnpm，請先執行：
```bash
npm install -g pnpm
```

### 3. 設定環境變數

複製 `.env.example` 並建立 `.env` 檔案，填入必要的環境變數：

```bash
# 資料庫連線
DATABASE_URL=mysql://user:password@host:port/database

# JWT 密鑰（用於 session）
JWT_SECRET=your-secret-key-here

# Google OAuth（用於 CMS 登入）
OAUTH_SERVER_URL=https://oauth.manus.im
VITE_OAUTH_PORTAL_URL=https://login.manus.im
VITE_APP_ID=your-app-id

# AWS S3（用於圖片上傳）
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=ap-northeast-1
AWS_S3_BUCKET=your-bucket-name

# 網站資訊
VITE_APP_TITLE=華友聯健康科技健康園區
VITE_APP_LOGO=/logo.png

# 擁有者資訊（CMS 管理員）
OWNER_OPEN_ID=your-google-openid
OWNER_NAME=管理員名稱
```

### 4. 初始化資料庫

```bash
pnpm db:push
```

此命令會：
- 生成資料庫遷移檔案
- 執行遷移，建立所有必要的表格

### 5. 啟動開發伺服器

```bash
pnpm dev
```

網站將在 `http://localhost:3000` 啟動

### 6. 建置生產版本

```bash
pnpm build
```

建置完成後，`dist/` 目錄包含可部署的檔案。

---

## 📋 功能清單

### 前台功能
✅ 首頁（Hero、六大面向、生活風格、健康醫療、聯絡表單）
✅ 進入園區頁面
✅ 六大面向詳細介紹
✅ 健康醫療服務
✅ 休閒農場體驗
✅ 生活服務介紹
✅ 介紹影片頁面（含 YouTube 嵌入）
✅ 聯絡我們表單
✅ 響應式設計（RWD）
✅ 背景音樂系統
✅ 動畫效果（ScrollReveal）

### CMS 後台功能
✅ Google OAuth 登入
✅ 權限管理（允許名單）
✅ 文章 CRUD 操作
✅ 富文本編輯器（Tiptap）
  - 表格支援
  - 程式碼高亮
  - YouTube 嵌入
✅ 圖片上傳到 S3
✅ 分類管理
✅ 標籤系統
✅ SEO 欄位（meta description、keywords、OG 圖片）
✅ 排程發布
✅ 草稿自動儲存（每 30 秒）
✅ 文章預覽
✅ 搜尋與篩選
✅ 批量操作
✅ Dashboard 統計儀表板
✅ 文章頁面區域關聯系統（21 個區域）

---

## 🗄️ 資料庫結構

### 主要表格

1. **users** - 使用者資料
2. **allowed_authors** - CMS 允許名單
3. **article_categories** - 文章分類
4. **tags** - 標籤
5. **articles** - 文章主表
6. **article_tags** - 文章-標籤關聯
7. **page_sections** - 頁面區域定義
8. **article_sections** - 文章-區域關聯

---

## 🔐 CMS 管理員設定

### 新增管理員

1. 使用者首次登入後，系統會自動建立 user 記錄
2. 在資料庫中將該使用者加入 `allowed_authors` 表格：

```sql
INSERT INTO allowed_authors (open_id, name, email, role, status)
VALUES ('google-openid', '管理員名稱', 'admin@example.com', 'admin', 'active');
```

或透過後台管理介面（/admin/authors）新增

---

## 📁 目錄結構

```
fufu-villa-website/
├── client/                 # 前端應用
│   ├── public/            # 靜態資源（圖片、影片、音訊）
│   └── src/
│       ├── components/    # React 組件
│       ├── pages/         # 頁面組件
│       ├── contexts/      # React Context
│       └── lib/           # 工具函式
├── server/                # 後端 API
│   ├── routers.ts        # tRPC 路由
│   ├── db.ts             # 資料庫查詢
│   └── _core/            # 核心功能
├── drizzle/              # 資料庫 Schema 與遷移
├── shared/               # 共用類型與常數
└── package.json          # 專案設定
```

---

## 🌐 頁面路由

### 前台路由
- `/` - 首頁
- `/about` - 進入園區
- `/features` - 六大面向
- `/wellness` - 健康醫療
- `/farm` - 休閒農場
- `/lifestyle` - 生活服務
- `/videos` - 介紹影片
- `/contact` - 聯絡我們

### CMS 後台路由
- `/admin` - 管理後台首頁
- `/admin/article/new` - 新增文章
- `/admin/article/:id` - 編輯文章
- `/admin/authors` - 管理作者權限

### API 路由
- `/api/trpc/*` - tRPC API 端點
- `/api/oauth/callback` - OAuth 回調

---

## 🎨 技術棧

- **前端：** React 19 + TypeScript + Vite + TailwindCSS 4
- **後端：** Node.js + Express + tRPC 11
- **資料庫：** PostgreSQL / MySQL（使用 Drizzle ORM）
- **認證：** Google OAuth 2.0
- **檔案儲存：** AWS S3
- **富文本編輯器：** Tiptap
- **包管理器：** pnpm

---

## 🔧 常見問題

### Q: 如何更改網站標題和 Logo？
A: 修改 `.env` 檔案中的 `VITE_APP_TITLE` 和 `VITE_APP_LOGO`

### Q: 如何新增 CMS 管理員？
A: 在 `/admin/authors` 頁面新增，或直接在資料庫的 `allowed_authors` 表格新增記錄

### Q: 圖片上傳失敗怎麼辦？
A: 檢查 AWS S3 設定是否正確，確認 bucket 權限和 CORS 設定

### Q: 如何修改背景音樂？
A: 將音訊檔案放在 `client/public/assets/` 目錄，並在對應頁面的 `useEffect` 中使用 `setTrack()` 設定

### Q: 如何自訂頁面區域？
A: 在資料庫的 `page_sections` 表格新增記錄，系統會自動在編輯器中顯示

---

## 📞 技術支援

如有任何問題，請參考以下文件：
- `DEPLOYMENT.md` - 完整部署指南
- `ENV_VARIABLES.md` - 環境變數說明
- `todo.md` - 功能清單與待辦事項

---

## 📝 更新日誌

### 2024-12-08
- ✅ 在介紹影片頁面新增 YouTube 影片嵌入
- ✅ 完成響應式設計優化
- ✅ 建立完整打包檔案

### 2024-12-03
- ✅ 完成 CMS 系統開發
- ✅ 實作文章管理功能
- ✅ 新增頁面區域關聯系統

### 2024-11-29
- ✅ 完成所有前台頁面
- ✅ 實作背景音樂系統
- ✅ 優化手機版導航

---

**祝您部署順利！** 🎉
