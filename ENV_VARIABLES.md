# 環境變數設定說明

本文件詳細說明專案所需的所有環境變數及其用途。

---

## 必要環境變數

以下環境變數為專案運行所必需，缺少任何一項將導致系統無法正常運作。

### 資料庫設定

#### `DATABASE_URL`

**說明：** MySQL 資料庫連線字串

**格式：** `mysql://username:password@host:port/database_name`

**範例：**
```
DATABASE_URL=mysql://root:mypassword@localhost:3306/fufu_villa
```

**取得方式：**
1. 安裝並啟動 MySQL 伺服器
2. 建立資料庫：`CREATE DATABASE fufu_villa CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
3. 建立使用者並授權：
   ```sql
   CREATE USER 'fufu_user'@'localhost' IDENTIFIED BY 'secure_password';
   GRANT ALL PRIVILEGES ON fufu_villa.* TO 'fufu_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

---

### 認證設定

#### `JWT_SECRET`

**說明：** JWT Token 簽署密鑰，用於使用者認證

**格式：** 隨機字串 (建議至少 32 字元)

**範例：**
```
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

**生成方式：**
```bash
# 使用 OpenSSL 生成
openssl rand -base64 32

# 或使用 Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**安全性注意事項：**
- 生產環境務必使用強隨機密鑰
- 定期更換密鑰 (更換後現有 Token 將失效)
- 絕對不要將密鑰提交到版本控制系統

---

#### `OAUTH_SERVER_URL`

**說明：** Manus OAuth 伺服器 URL

**預設值：** `https://api.manus.im`

**用途：** 處理使用者登入認證

---

#### `OWNER_OPEN_ID`

**說明：** 網站擁有者的 Manus Open ID

**取得方式：**
1. 登入 [Manus 平台](https://manus.im)
2. 前往「個人設定」頁面
3. 複製您的 Open ID

**範例：**
```
OWNER_OPEN_ID=abc123def456
```

---

#### `OWNER_NAME`

**說明：** 網站擁有者名稱

**範例：**
```
OWNER_NAME=張三
```

---

### 前端設定

#### `VITE_APP_TITLE`

**說明：** 網站標題，顯示在瀏覽器標籤頁

**預設值：** `華友聯健康園區`

**範例：**
```
VITE_APP_TITLE=華友聯健康園區
```

---

#### `VITE_APP_LOGO`

**說明：** 網站 Logo 路徑 (相對於 `client/public` 目錄)

**預設值：** `/logo.png`

**範例：**
```
VITE_APP_LOGO=/assets/logo.png
```

---

#### `VITE_APP_ID`

**說明：** 應用程式唯一識別碼

**預設值：** `fufu-villa-website`

---

#### `VITE_OAUTH_PORTAL_URL`

**說明：** OAuth 授權頁面 URL

**預設值：** `https://api.manus.im/oauth/authorize`

---

#### `VITE_FRONTEND_FORGE_API_URL`

**說明：** Forge API URL (前端使用)

**預設值：** `https://api.manus.im/forge`

**用途：** 前端呼叫 Forge API 進行檔案處理、圖片生成等操作

---

#### `VITE_FRONTEND_FORGE_API_KEY`

**說明：** Forge API 金鑰 (前端使用)

**取得方式：** 聯繫 Manus 平台取得 API Key

---

### 後端 API 設定

#### `BUILT_IN_FORGE_API_URL`

**說明：** Forge API URL (後端使用)

**預設值：** `https://api.manus.im/forge`

---

#### `BUILT_IN_FORGE_API_KEY`

**說明：** Forge API 金鑰 (後端使用)

**取得方式：** 聯繫 Manus 平台取得 API Key

---

## 可選環境變數

以下環境變數為可選配置，不設定不影響核心功能。

### 分析追蹤

#### `VITE_ANALYTICS_WEBSITE_ID`

**說明：** 網站分析追蹤 ID

**用途：** 整合第三方分析服務 (如 Google Analytics、Umami 等)

**範例：**
```
VITE_ANALYTICS_WEBSITE_ID=UA-123456789-1
```

---

#### `VITE_ANALYTICS_ENDPOINT`

**說明：** 分析服務端點 URL

**範例：**
```
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
```

---

### S3 儲存設定

若需使用檔案上傳功能 (如文章圖片上傳)，需設定 S3 相關環境變數。

#### `S3_BUCKET`

**說明：** S3 Bucket 名稱

**範例：**
```
S3_BUCKET=fufu-villa-uploads
```

---

#### `S3_REGION`

**說明：** S3 區域

**範例：**
```
S3_REGION=ap-northeast-1
```

**常見區域：**
- `us-east-1` - 美國東部 (維吉尼亞)
- `us-west-2` - 美國西部 (俄勒岡)
- `ap-northeast-1` - 亞太 (東京)
- `ap-southeast-1` - 亞太 (新加坡)
- `eu-west-1` - 歐洲 (愛爾蘭)

---

#### `S3_ACCESS_KEY_ID`

**說明：** S3 Access Key ID

**取得方式：**
1. 登入 AWS Console
2. 前往 IAM → 使用者 → 安全憑證
3. 建立存取金鑰

---

#### `S3_SECRET_ACCESS_KEY`

**說明：** S3 Secret Access Key

**安全性注意事項：**
- 絕對不要將此金鑰提交到版本控制系統
- 定期輪換金鑰
- 僅授予必要的 S3 權限 (PutObject, GetObject)

---

#### `S3_ENDPOINT` (可選)

**說明：** S3 端點 URL

**用途：** 使用相容 S3 的服務 (如 MinIO、Wasabi、Cloudflare R2 等)

**範例：**
```
S3_ENDPOINT=https://s3.example.com
```

---

### 其他設定

#### `NODE_ENV`

**說明：** Node.js 執行環境

**可選值：**
- `development` - 開發環境
- `production` - 生產環境

**預設值：** `development`

**影響：**
- 開發環境啟用詳細錯誤訊息、熱重載
- 生產環境啟用效能優化、壓縮

---

#### `PORT`

**說明：** 伺服器監聽埠號

**預設值：** `3000`

**範例：**
```
PORT=8080
```

---

#### `DEBUG`

**說明：** 啟用除錯模式

**可選值：** `true` / `false`

**用途：** 輸出詳細的除錯日誌

**範例：**
```
DEBUG=true
```

---

## 環境變數設定方式

### 開發環境

在專案根目錄建立 `.env` 檔案：

```bash
# 建立 .env 檔案
touch .env

# 編輯檔案
nano .env
```

範例 `.env` 內容：

```env
DATABASE_URL=mysql://root:password@localhost:3306/fufu_villa
JWT_SECRET=your-super-secret-jwt-key
OAUTH_SERVER_URL=https://api.manus.im
OWNER_OPEN_ID=your-open-id
OWNER_NAME=Your Name
VITE_APP_TITLE=華友聯健康園區
VITE_APP_LOGO=/logo.png
```

### 生產環境

#### 方法 1：使用 .env 檔案

與開發環境相同，但務必確保：
- 檔案權限設為 `600` (僅擁有者可讀寫)
- 不要將 `.env` 提交到版本控制系統

```bash
chmod 600 .env
```

#### 方法 2：系統環境變數

在伺服器設定環境變數：

```bash
# 編輯 /etc/environment
sudo nano /etc/environment

# 或在 ~/.bashrc 中設定
export DATABASE_URL="mysql://..."
export JWT_SECRET="..."
```

#### 方法 3：PM2 Ecosystem 檔案

建立 `ecosystem.config.js`：

```javascript
module.exports = {
  apps: [{
    name: 'fufu-villa',
    script: 'server/_core/index.ts',
    interpreter: 'tsx',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      DATABASE_URL: 'mysql://...',
      JWT_SECRET: '...',
      // ... 其他環境變數
    }
  }]
};
```

啟動：

```bash
pm2 start ecosystem.config.js
```

---

## 安全性最佳實踐

1. **絕對不要提交 `.env` 到 Git**
   - 將 `.env` 加入 `.gitignore`
   - 定期檢查是否誤提交敏感資訊

2. **使用強隨機密鑰**
   - `JWT_SECRET` 至少 32 字元
   - 使用密碼學安全的隨機數生成器

3. **定期輪換密鑰**
   - 每 3-6 個月更換一次
   - 發生安全事件時立即更換

4. **最小權限原則**
   - 資料庫使用者僅授予必要權限
   - S3 僅授予必要的操作權限

5. **環境隔離**
   - 開發、測試、生產環境使用不同的密鑰
   - 避免在開發環境使用生產資料

6. **監控與稽核**
   - 記錄環境變數變更
   - 監控異常的 API 呼叫

---

## 疑難排解

### 環境變數未生效

**症狀：** 修改 `.env` 後，應用程式仍使用舊值

**解決方法：**
1. 重啟開發伺服器：
   ```bash
   # 停止伺服器 (Ctrl+C)
   # 重新啟動
   pnpm dev
   ```

2. 清除快取：
   ```bash
   rm -rf client/.vite
   pnpm dev
   ```

### 資料庫連線失敗

**錯誤訊息：** `Error: connect ECONNREFUSED`

**檢查清單：**
- [ ] MySQL 服務是否啟動
- [ ] `DATABASE_URL` 格式是否正確
- [ ] 資料庫使用者名稱/密碼是否正確
- [ ] 資料庫是否已建立
- [ ] 防火牆是否阻擋連線

### OAuth 登入失敗

**錯誤訊息：** `Unauthorized`

**檢查清單：**
- [ ] `OAUTH_SERVER_URL` 是否正確
- [ ] `OWNER_OPEN_ID` 是否為您的 Manus Open ID
- [ ] 網路是否可連線到 Manus 伺服器

---

**文件版本：** 1.0  
**最後更新：** 2024-12-03  
**作者：** Manus AI
