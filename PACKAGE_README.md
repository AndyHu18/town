# 華友聯健康園區網站 - 部署套件說明

本套件包含完整的專案原始碼與部署文件，可用於在新環境中部署本網站。

---

## 套件內容

本壓縮檔 (`fufu-villa-website-deployment.tar.gz`) 包含：

- **完整原始碼** - 前端與後端程式碼
- **資料庫 Schema** - Drizzle ORM 定義與遷移檔案
- **部署文件** - 詳細的部署指南與環境設定說明
- **初始化腳本** - 資料庫初始化腳本
- **配置檔案** - TypeScript、Vite、Drizzle 等配置

**不包含：**
- `node_modules/` - 需在部署時重新安裝
- `.env` - 環境變數需根據實際環境設定
- `client/dist/` - 建置產物需重新生成
- `.git/` - Git 版本控制歷史

---

## 快速部署步驟

### 1. 解壓縮套件

```bash
tar -xzf fufu-villa-website-deployment.tar.gz
cd fufu-villa-website
```

### 2. 閱讀部署文件

**必讀文件：**
- `DEPLOYMENT.md` - 完整部署指南
- `ENV_VARIABLES.md` - 環境變數設定說明
- `PAGE_SECTIONS_ANALYSIS.md` - 頁面結構分析
- `SYSTEM_OPTIMIZATION_ANALYSIS.md` - 系統優化建議

### 3. 安裝依賴

```bash
# 安裝 pnpm (如果尚未安裝)
npm install -g pnpm

# 安裝專案依賴
pnpm install
```

### 4. 設定環境變數

根據 `ENV_VARIABLES.md` 文件建立 `.env` 檔案並填入必要資訊。

**最少必要環境變數：**
```env
DATABASE_URL=mysql://username:password@localhost:3306/fufu_villa
JWT_SECRET=your-super-secret-jwt-key
OAUTH_SERVER_URL=https://api.manus.im
OWNER_OPEN_ID=your-manus-open-id
OWNER_NAME=Your Name
```

### 5. 初始化資料庫

```bash
# 建立資料庫
mysql -u root -p -e "CREATE DATABASE fufu_villa CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 執行遷移
pnpm db:push

# 插入預設頁面區域
node seed-sections.mjs
```

### 6. 啟動專案

**開發環境：**
```bash
pnpm dev
```

**生產環境：**
```bash
# 建置
pnpm build

# 啟動 (使用 PM2)
pnpm add -g pm2
pm2 start server/_core/index.ts --name fufu-villa --interpreter tsx
```

---

## 檔案大小

壓縮檔大小約 **668 MB**，主要包含：
- 媒體資源 (影片、音樂、圖片) - 約 650 MB
- 原始碼與配置 - 約 18 MB

**建議：** 若需減小套件大小，可將 `client/public/assets/` 中的大型媒體檔案上傳到 CDN，並在程式碼中更新引用路徑。

---

## 系統需求

- **Node.js:** 22.13.0 或以上
- **pnpm:** 9.x 或以上
- **MySQL:** 8.0 或以上
- **作業系統:** Linux (Ubuntu 22.04 推薦) / macOS / Windows (WSL2)

---

## 重要提醒

1. **環境變數安全**
   - 絕對不要將 `.env` 檔案提交到版本控制系統
   - 使用強隨機密鑰作為 `JWT_SECRET`
   - 定期更換敏感密鑰

2. **資料庫權限**
   - 生產環境使用專用資料庫使用者
   - 僅授予必要權限 (SELECT, INSERT, UPDATE, DELETE)

3. **HTTPS 設定**
   - 生產環境務必使用 HTTPS
   - 可使用 Let's Encrypt 免費 SSL 憑證

4. **防火牆設定**
   - 僅開放必要埠號 (80, 443)
   - 限制資料庫埠號 (3306) 僅本機訪問

---

## 技術支援

如遇到部署問題，請參考：

1. **部署指南** - `DEPLOYMENT.md` 包含詳細步驟與疑難排解
2. **環境變數說明** - `ENV_VARIABLES.md` 說明所有環境變數用途
3. **系統優化** - `SYSTEM_OPTIMIZATION_ANALYSIS.md` 提供效能優化建議

---

## 專案資訊

- **專案名稱：** 華友聯健康科技健康園區 (Full Life Villa)
- **技術棧：** React 19 + Node.js 22 + MySQL + TypeScript + Tailwind CSS 4
- **打包日期：** 2024-12-03
- **版本：** 1.0

---

## 授權

本專案版權歸華友聯健康科技所有。未經授權，禁止複製、修改或分發本專案程式碼。

---

**祝您部署順利！**

如有任何問題，請參閱 `DEPLOYMENT.md` 文件或聯繫專案維護者。
