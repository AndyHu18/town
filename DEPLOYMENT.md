# 華友聯健康園區網站部署指南

本文件提供完整的專案部署流程，適用於新環境部署或專案交接。

---

## 專案概述

**專案名稱：** 華友聯健康科技健康園區 (Full Life Villa)  
**技術棧：** React 19 + Node.js 22 + MySQL + TypeScript + Tailwind CSS 4  
**架構類型：** Full-stack Web Application (SSR + API)

本專案為一個完整的健康園區展示網站，包含前台展示頁面、文章管理系統（CMS）、使用者認證、權限管理等功能。

---

## 系統需求

部署本專案需要以下環境：

| 組件 | 版本要求 | 說明 |
|------|---------|------|
| Node.js | 22.13.0 或以上 | JavaScript 運行環境 |
| pnpm | 9.x 或以上 | 套件管理工具 |
| MySQL | 8.0 或以上 | 關聯式資料庫 |
| Git | 2.x 或以上 | 版本控制工具 |

**作業系統：** Linux (Ubuntu 22.04 推薦) / macOS / Windows (需 WSL2)

---

## 快速開始

### 1. 克隆專案

```bash
git clone <repository-url>
cd fufu-villa-website
```

### 2. 安裝依賴

```bash
# 安裝 pnpm (如果尚未安裝)
npm install -g pnpm

# 安裝專案依賴
pnpm install
```

### 3. 設定環境變數

複製環境變數範本並填入實際值：

```bash
cp .env.example .env
```

編輯 `.env` 檔案，填入以下必要資訊：

```env
# 資料庫連線
DATABASE_URL=mysql://username:password@localhost:3306/fufu_villa

# JWT 密鑰 (請使用隨機字串)
JWT_SECRET=your-super-secret-jwt-key-change-this

# OAuth 設定 (Manus OAuth)
OAUTH_SERVER_URL=https://api.manus.im
OWNER_OPEN_ID=your-owner-open-id

# 前端設定
VITE_APP_TITLE=華友聯健康園區
VITE_APP_LOGO=/logo.png
VITE_OAUTH_PORTAL_URL=https://api.manus.im/oauth/authorize
```

詳細的環境變數說明請參考「環境變數設定」章節。

### 4. 初始化資料庫

```bash
# 執行資料庫遷移
pnpm db:push

# 插入預設頁面區域資料
node seed-sections.mjs
```

### 5. 啟動開發伺服器

```bash
pnpm dev
```

專案將在 `http://localhost:3000` 啟動。

---

## 環境變數設定

### 必要環境變數

以下環境變數為專案運行所必需：

#### 資料庫設定

```env
DATABASE_URL=mysql://username:password@host:port/database_name
```

**格式說明：**
- `username`: MySQL 使用者名稱
- `password`: MySQL 密碼
- `host`: 資料庫主機位址 (本地為 `localhost`)
- `port`: 資料庫埠號 (預設 `3306`)
- `database_name`: 資料庫名稱

**範例：**
```env
DATABASE_URL=mysql://root:mypassword@localhost:3306/fufu_villa
```

#### 認證設定

```env
JWT_SECRET=your-jwt-secret-key
OAUTH_SERVER_URL=https://api.manus.im
OWNER_OPEN_ID=your-manus-open-id
```

**JWT_SECRET 生成方式：**
```bash
# 使用 OpenSSL 生成隨機密鑰
openssl rand -base64 32
```

**OWNER_OPEN_ID 取得方式：**
1. 登入 Manus 平台
2. 前往個人設定頁面
3. 複製您的 Open ID

#### 前端設定

```env
VITE_APP_TITLE=華友聯健康園區
VITE_APP_LOGO=/logo.png
VITE_OAUTH_PORTAL_URL=https://api.manus.im/oauth/authorize
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im/forge
VITE_FRONTEND_FORGE_API_KEY=your-frontend-api-key
```

### 可選環境變數

以下環境變數可根據需求設定：

```env
# 分析追蹤
VITE_ANALYTICS_WEBSITE_ID=your-analytics-id
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com

# S3 儲存 (如需使用檔案上傳功能)
S3_BUCKET=your-bucket-name
S3_REGION=ap-northeast-1
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
```

---

## 資料庫設定

### 建立資料庫

登入 MySQL 並建立資料庫：

```sql
CREATE DATABASE fufu_villa CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 執行遷移

專案使用 Drizzle ORM 管理資料庫 Schema。執行以下指令初始化資料庫結構：

```bash
pnpm db:push
```

此指令會：
1. 生成遷移檔案 (`drizzle/migrations/`)
2. 執行遷移，建立所有必要的資料表

### 資料表結構

專案包含以下主要資料表：

| 資料表名稱 | 說明 |
|-----------|------|
| `users` | 使用者資料 |
| `articles` | 文章內容 |
| `article_categories` | 文章分類 |
| `tags` | 標籤 |
| `article_tags` | 文章-標籤關聯 |
| `page_sections` | 頁面區域定義 |
| `article_sections` | 文章-區域關聯 |
| `allowed_authors` | 授權作者清單 |

### 初始化資料

執行以下腳本插入預設資料：

```bash
# 插入 21 個預設頁面區域
node seed-sections.mjs
```

### 新增管理員

首次部署後，需要手動將您的帳號加入授權作者清單：

```sql
INSERT INTO allowed_authors (email, name, role) 
VALUES ('your-email@example.com', 'Your Name', 'admin');
```

---

## 生產環境部署

### 1. 建置專案

```bash
# 建置前端與後端
pnpm build
```

建置產物位於：
- 前端：`client/dist/`
- 後端：`server/` (TypeScript 編譯後)

### 2. 設定環境變數

在生產環境設定所有必要的環境變數。**絕對不要將 `.env` 檔案提交到版本控制系統。**

### 3. 啟動生產伺服器

```bash
# 使用 PM2 管理 Node.js 進程
pnpm add -g pm2

# 啟動伺服器
pm2 start server/_core/index.ts --name fufu-villa --interpreter tsx

# 設定開機自動啟動
pm2 startup
pm2 save
```

### 4. 設定反向代理 (Nginx)

建立 Nginx 配置檔案 `/etc/nginx/sites-available/fufu-villa`：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # 前端靜態檔案
    location / {
        root /path/to/fufu-villa-website/client/dist;
        try_files $uri $uri/ /index.html;
    }

    # API 代理
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

啟用站點並重啟 Nginx：

```bash
sudo ln -s /etc/nginx/sites-available/fufu-villa /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 5. 設定 SSL (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## 專案結構

```
fufu-villa-website/
├── client/                 # 前端程式碼
│   ├── public/            # 靜態資源 (圖片、影片、音樂)
│   ├── src/
│   │   ├── components/    # React 組件
│   │   ├── contexts/      # React Context (狀態管理)
│   │   ├── hooks/         # 自訂 Hooks
│   │   ├── lib/           # 工具函式
│   │   ├── pages/         # 頁面組件
│   │   ├── App.tsx        # 路由配置
│   │   └── main.tsx       # 應用程式入口
│   └── index.html         # HTML 模板
├── server/                # 後端程式碼
│   ├── _core/             # 核心伺服器邏輯
│   ├── routers/           # API 路由 (tRPC)
│   ├── articles.router.ts # 文章管理 API
│   └── db.ts              # 資料庫連線
├── drizzle/               # 資料庫 Schema 與遷移
│   ├── schema.ts          # 資料表定義
│   └── migrations/        # 遷移檔案
├── shared/                # 前後端共用程式碼
│   └── const.ts           # 常數定義
├── seed-sections.mjs      # 初始化頁面區域腳本
├── package.json           # 專案依賴
├── tsconfig.json          # TypeScript 配置
├── vite.config.ts         # Vite 配置
└── drizzle.config.ts      # Drizzle ORM 配置
```

---

## 功能模組說明

### 前台功能

本專案前台包含以下頁面：

| 頁面路徑 | 說明 |
|---------|------|
| `/` | 首頁 (Hero、六大面向、生活服務、健康醫療、聯絡資訊) |
| `/about` | 進入園區 (園區介紹、發展歷程、團隊介紹) |
| `/features` | 六大面向詳解 |
| `/wellness` | 健康醫療服務 |
| `/farm` | 休閒農場 |
| `/lifestyle` | 生活服務 |
| `/video-tour` | 介紹影片 |
| `/contact` | 聯絡我們 |
| `/articles` | 文章列表 (公開) |
| `/articles/:slug` | 文章詳情 |

### 後台功能

後台路徑皆以 `/admin` 開頭，需要登入才能訪問：

| 頁面路徑 | 說明 | 權限要求 |
|---------|------|---------|
| `/admin` | 文章管理列表 | 授權作者 |
| `/admin/dashboard` | 統計儀表板 | 授權作者 |
| `/admin/article/new` | 新增文章 | 授權作者 |
| `/admin/article/:id` | 編輯文章 | 授權作者 |
| `/admin/article/:id/preview` | 文章預覽 | 授權作者 |
| `/admin/authors` | 作者權限管理 | 管理員 |

### CMS 核心功能

#### 1. 富文本編輯器

使用 Tiptap 編輯器，支援：
- **基本格式**：粗體、斜體、底線、刪除線
- **標題**：H1-H6
- **清單**：有序清單、無序清單
- **進階功能**：表格、程式碼區塊 (語法高亮)、YouTube 影片嵌入
- **圖片上傳**：支援拖放上傳

#### 2. 文章分類與標籤

- **分類 (Categories)**：單選，用於主要分類
- **標籤 (Tags)**：多選，用於細分主題

#### 3. 頁面區域系統

文章可以指定顯示在特定頁面的區域，系統預設 21 個區域：

**首頁 (3 個)：**
- 最新消息
- 活動公告
- 健康資訊

**其他頁面 (18 個)：**
- 進入園區：園區介紹、發展歷程、團隊介紹
- 六大面向：六大面向詳解、特色服務
- 健康醫療：醫療服務、健康資訊、專家建議
- 休閒農場：農場活動、農產品介紹、體驗分享
- 生活服務：生活設施、服務項目、住戶分享
- 介紹影片：影片介紹、導覽重點
- 聯絡我們：常見問題、參觀須知

#### 4. SEO 優化

每篇文章可設定：
- Meta Description (最多 160 字元)
- Meta Keywords
- Open Graph 圖片

#### 5. 排程發布

- 設定未來的發布時間
- 後端定時任務每分鐘自動檢查並發布到期文章

#### 6. 草稿自動儲存

- 每 30 秒自動儲存到 localStorage
- 重新載入時提示恢復草稿

---

## 常見問題排除

### 1. 資料庫連線失敗

**錯誤訊息：** `Error: connect ECONNREFUSED`

**解決方法：**
1. 確認 MySQL 服務已啟動：
   ```bash
   sudo systemctl status mysql
   ```
2. 檢查 `DATABASE_URL` 格式是否正確
3. 確認資料庫使用者有足夠權限：
   ```sql
   GRANT ALL PRIVILEGES ON fufu_villa.* TO 'username'@'localhost';
   FLUSH PRIVILEGES;
   ```

### 2. pnpm install 失敗

**錯誤訊息：** `ERR_PNPM_NO_MATCHING_VERSION`

**解決方法：**
1. 更新 pnpm 到最新版本：
   ```bash
   npm install -g pnpm@latest
   ```
2. 清除快取並重新安裝：
   ```bash
   pnpm store prune
   pnpm install
   ```

### 3. OAuth 登入失敗

**錯誤訊息：** `Unauthorized` 或重定向失敗

**解決方法：**
1. 確認 `OAUTH_SERVER_URL` 設定正確
2. 檢查 `OWNER_OPEN_ID` 是否為您的 Manus Open ID
3. 確認回調 URL 已在 Manus 平台註冊

### 4. 圖片上傳失敗

**錯誤訊息：** `Upload failed`

**解決方法：**
1. 檢查 S3 環境變數是否設定正確
2. 確認 S3 Bucket 權限設定允許上傳
3. 檢查檔案大小是否超過限制 (預設 10MB)

### 5. 排程發布不生效

**症狀：** 設定的排程時間已到，文章仍未自動發布

**解決方法：**
1. 確認後端伺服器正在運行
2. 檢查伺服器日誌：
   ```bash
   pm2 logs fufu-villa
   ```
3. 確認 `ScheduledPublisher` 服務已啟動 (日誌中應有 `[ScheduledPublisher] Service started successfully`)

### 6. 前端建置錯誤

**錯誤訊息：** `Failed to resolve import`

**解決方法：**
1. 清除 Vite 快取：
   ```bash
   rm -rf client/.vite
   ```
2. 重新安裝依賴：
   ```bash
   pnpm install
   ```
3. 確認 TypeScript 版本相容性

---

## 維護與更新

### 資料庫備份

定期備份資料庫以防資料遺失：

```bash
# 備份資料庫
mysqldump -u username -p fufu_villa > backup_$(date +%Y%m%d).sql

# 還原資料庫
mysql -u username -p fufu_villa < backup_20240101.sql
```

### 日誌管理

使用 PM2 查看應用程式日誌：

```bash
# 查看即時日誌
pm2 logs fufu-villa

# 清除舊日誌
pm2 flush
```

### 更新專案

```bash
# 拉取最新程式碼
git pull origin main

# 安裝新依賴
pnpm install

# 執行資料庫遷移 (如有)
pnpm db:push

# 重新建置
pnpm build

# 重啟伺服器
pm2 restart fufu-villa
```

---

## 效能優化建議

### 1. 啟用 Gzip 壓縮

在 Nginx 配置中啟用 Gzip：

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
```

### 2. 設定靜態資源快取

```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. 資料庫索引

確保關鍵欄位已建立索引：

```sql
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_category ON articles(categoryId);
CREATE INDEX idx_articles_published ON articles(publishedAt);
```

### 4. 使用 CDN

將 `client/public/assets/` 中的大型媒體檔案 (影片、音樂) 上傳到 CDN，並更新引用路徑。

---

## 安全性注意事項

1. **環境變數保護**：絕對不要將 `.env` 檔案提交到版本控制系統
2. **JWT 密鑰**：使用強隨機密鑰，定期更換
3. **資料庫權限**：生產環境使用專用資料庫使用者，僅授予必要權限
4. **HTTPS**：生產環境務必使用 HTTPS
5. **CORS 設定**：限制允許的來源網域
6. **SQL 注入防護**：使用 Drizzle ORM 的參數化查詢
7. **XSS 防護**：React 預設已防護，但仍需注意 `dangerouslySetInnerHTML` 的使用

---

## 技術支援

如遇到無法解決的問題，請聯繫：

- **專案維護者**：[您的聯絡方式]
- **技術文件**：本 DEPLOYMENT.md 檔案
- **問題追蹤**：[GitHub Issues 連結]

---

## 授權與版權

本專案版權歸華友聯健康科技所有。未經授權，禁止複製、修改或分發本專案程式碼。

---

**文件版本：** 1.0  
**最後更新：** 2024-12-03  
**作者：** Manus AI
