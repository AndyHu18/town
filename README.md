# 華友聯健康科技健康園區 - 奢華行銷網站

## 專案簡介

這是一個為華友聯健康科技健康園區打造的高端奢華品牌行銷網站，展示六大經營面向、智能醫療系統、休閒農場、私人化服務等特色，具備精美視覺設計與互動體驗。

## 技術架構

- **前端框架**: React 19 + Wouter (路由)
- **樣式系統**: Tailwind CSS 4 + 自訂動畫與漸層
- **後端**: Express 4 + tRPC 11 (型別安全 API)
- **資料庫**: MySQL/TiDB + Drizzle ORM
- **認證系統**: Manus OAuth
- **檔案儲存**: AWS S3
- **開發工具**: TypeScript + Vite + TSX

## 主要功能

### 頁面結構
- **首頁**: Hero Section、六大經營面向、健康醫療服務、休閒農場、生活服務、介紹影片、預約表單
- **關於園區**: 園區介紹與願景
- **六大面向**: 智慧生活、醫療美容、預防醫學、專屬照護、國際金融、休閒農場
- **健康醫療**: 智能健康管理、醫美中心、預防醫學、專屬照護
- **休閒農場**: 有機農場、園藝療癒、採摘體驗、生態教育
- **生活服務**: 管家服務、交通接送、文化課程、社交活動
- **介紹影片**: 完整園區導覽影片與精選圖庫
- **聯絡我們**: 聯絡表單與預約系統

### 設計特色
- **奢華暗色主題**: 深色背景搭配金色點綴
- **金色光暈效果**: 品牌名稱、按鈕、標題皆有發光效果
- **流暢動畫**: ScrollReveal 滾動動畫、懸停效果、微互動
- **背景音樂系統**: 全站音樂播放器與頁面專屬配樂
- **台灣在地化**: 所有人物圖片與影片皆為台灣人

### 技術亮點
- **響應式設計**: 完整支援桌面與手機裝置
- **手機選單**: 透明背景、金色文字光暈、Portal 渲染
- **型別安全**: tRPC 端到端型別推導
- **資料庫整合**: Drizzle ORM + MySQL
- **使用者認證**: Manus OAuth 無縫整合

## 開發指令

```bash
# 安裝依賴
pnpm install

# 開發模式
pnpm dev

# 建置生產版本
pnpm build

# 資料庫同步
pnpm db:push

# 執行測試
pnpm test

# 程式碼格式化
pnpm format
```

## 專案結構

```
client/
  src/
    pages/          # 頁面組件
    components/     # 可重用組件
    contexts/       # React Contexts (音樂播放器)
    lib/            # 工具函數與 tRPC 客戶端
server/
  routers.ts        # tRPC API 路由
  db.ts             # 資料庫查詢函數
drizzle/
  schema.ts         # 資料庫 Schema
shared/
  types.ts          # 共用型別定義
```

## 環境變數

系統自動注入以下環境變數：
- `DATABASE_URL`: MySQL/TiDB 連線字串
- `JWT_SECRET`: Session 簽署金鑰
- `VITE_APP_ID`: Manus OAuth 應用 ID
- `OAUTH_SERVER_URL`: OAuth 伺服器 URL
- `BUILT_IN_FORGE_API_URL`: Manus 內建 API
- `BUILT_IN_FORGE_API_KEY`: API 認證金鑰

## 部署說明

1. 確保所有功能已測試完成
2. 執行 `pnpm build` 建置生產版本
3. 使用 Manus 平台的「發布」按鈕進行部署
4. 部署後網站將自動上線至 `*.manus.space` 域名

## 授權

© 2024 華友聯健康科技健康園區. All Rights Reserved.
