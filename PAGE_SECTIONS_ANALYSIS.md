# 頁面區域分析與規劃

## 📄 現有頁面列表

### 公開頁面（前台）
1. **首頁 (Home)** - `/`
2. **進入園區 (About)** - `/about`
3. **六大面向 (Features)** - `/features`
4. **健康醫療 (Wellness)** - `/wellness`
5. **休閒農場 (Farm)** - `/farm`
6. **生活服務 (Lifestyle)** - `/lifestyle`
7. **介紹影片 (VideoTour)** - `/video-tour`
8. **聯絡我們 (Contact)** - `/contact`

### 後台頁面
- Dashboard - `/admin/dashboard`
- 文章管理 - `/admin`
- 文章編輯器 - `/admin/article/:id`
- 權限管理 - `/admin/authors`

---

## 🎯 頁面區域規劃

### 1. 首頁 (Home)
**可顯示文章的區域：**
- **最新消息** - 顯示最近 3-5 篇文章（卡片式）
- **活動公告** - 重要活動或公告
- **健康資訊** - 健康相關文章精選

### 2. 進入園區 (About)
**可顯示文章的區域：**
- **園區介紹** - 關於園區的詳細文章
- **發展歷程** - 園區發展故事
- **團隊介紹** - 團隊成員介紹文章

### 3. 六大面向 (Features)
**可顯示文章的區域：**
- **六大面向詳解** - 每個面向的詳細說明文章
- **特色服務** - 特色服務介紹

### 4. 健康醫療 (Wellness)
**可顯示文章的區域：**
- **醫療服務** - 醫療服務介紹
- **健康資訊** - 健康知識文章
- **專家建議** - 專家撰寫的健康建議

### 5. 休閒農場 (Farm)
**可顯示文章的區域：**
- **農場活動** - 農場相關活動
- **農產品介紹** - 農產品資訊
- **體驗分享** - 訪客體驗文章

### 6. 生活服務 (Lifestyle)
**可顯示文章的區域：**
- **生活設施** - 生活設施介紹
- **服務項目** - 各項服務說明
- **住戶分享** - 住戶生活分享

### 7. 介紹影片 (VideoTour)
**可顯示文章的區域：**
- **影片介紹** - 影片相關文字說明
- **導覽重點** - 導覽重點文章

### 8. 聯絡我們 (Contact)
**可顯示文章的區域：**
- **常見問題** - FAQ 文章
- **參觀須知** - 參觀注意事項

---

## 🗂️ 區域系統設計

### 資料結構

#### page_sections 表
```sql
CREATE TABLE page_sections (
  id INT PRIMARY KEY AUTO_INCREMENT,
  page_key VARCHAR(50) NOT NULL,        -- 'home', 'about', 'features', etc.
  section_key VARCHAR(50) NOT NULL,     -- 'latest_news', 'announcements', etc.
  section_name VARCHAR(100) NOT NULL,   -- '最新消息', '活動公告', etc.
  description TEXT,                      -- 區域說明
  display_order INT DEFAULT 0,          -- 顯示順序
  is_active BOOLEAN DEFAULT TRUE,       -- 是否啟用
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_section (page_key, section_key)
);
```

#### article_sections 關聯表
```sql
CREATE TABLE article_sections (
  id INT PRIMARY KEY AUTO_INCREMENT,
  article_id INT NOT NULL,
  section_id INT NOT NULL,
  display_order INT DEFAULT 0,          -- 在該區域的顯示順序
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (section_id) REFERENCES page_sections(id) ON DELETE CASCADE,
  UNIQUE KEY unique_article_section (article_id, section_id)
);
```

### 預設區域列表

| Page Key | Section Key | Section Name | Description |
|----------|-------------|--------------|-------------|
| home | latest_news | 最新消息 | 首頁最新消息區塊 |
| home | announcements | 活動公告 | 重要活動與公告 |
| home | health_tips | 健康資訊 | 健康相關文章精選 |
| about | introduction | 園區介紹 | 關於園區的詳細介紹 |
| about | history | 發展歷程 | 園區發展故事 |
| about | team | 團隊介紹 | 團隊成員介紹 |
| features | feature_details | 六大面向詳解 | 六大面向的詳細說明 |
| features | special_services | 特色服務 | 特色服務介紹 |
| wellness | medical_services | 醫療服務 | 醫療服務介紹 |
| wellness | health_info | 健康資訊 | 健康知識文章 |
| wellness | expert_advice | 專家建議 | 專家健康建議 |
| farm | farm_activities | 農場活動 | 農場相關活動 |
| farm | products | 農產品介紹 | 農產品資訊 |
| farm | experiences | 體驗分享 | 訪客體驗文章 |
| lifestyle | facilities | 生活設施 | 生活設施介紹 |
| lifestyle | services | 服務項目 | 各項服務說明 |
| lifestyle | resident_stories | 住戶分享 | 住戶生活分享 |
| video_tour | video_intro | 影片介紹 | 影片相關文字說明 |
| video_tour | tour_highlights | 導覽重點 | 導覽重點文章 |
| contact | faq | 常見問題 | FAQ 文章 |
| contact | visit_info | 參觀須知 | 參觀注意事項 |

---

## 🎨 前台顯示策略

### 首頁
- 顯示「最新消息」區域的最新 5 篇文章（卡片式）
- 顯示「活動公告」區域的最新 3 篇文章（橫幅式）
- 顯示「健康資訊」區域的最新 3 篇文章（卡片式）

### 其他頁面
- 每個頁面顯示對應區域的文章列表
- 支援分頁或「載入更多」
- 可選擇顯示方式（列表式、卡片式、時間軸式）

---

## 🔧 實作步驟

1. ✅ 建立 page_sections 和 article_sections 資料表
2. ✅ 插入預設區域資料
3. ✅ 建立區域管理 API（CRUD）
4. ✅ 修改文章 API 支援區域篩選
5. ✅ 編輯器新增區域選擇器（多選）
6. ✅ 前台頁面整合區域文章顯示
7. ✅ 建立通用的區域文章列表組件

---

## 💡 進階功能（未來）

- 區域文章數量限制（如最多顯示 10 篇）
- 區域文章自動排序（按發布時間、瀏覽次數等）
- 區域文章置頂功能
- 區域樣式自訂（卡片式、列表式、輪播式等）
- 區域權限控制（某些區域只有特定作者可發布）
