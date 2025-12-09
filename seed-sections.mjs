import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

const defaultSections = [
  // Home page sections
  { pageKey: 'home', sectionKey: 'latest_news', sectionName: '最新消息', description: '首頁最新消息區塊', displayOrder: 1 },
  { pageKey: 'home', sectionKey: 'announcements', sectionName: '活動公告', description: '重要活動與公告', displayOrder: 2 },
  { pageKey: 'home', sectionKey: 'health_tips', sectionName: '健康資訊', description: '健康相關文章精選', displayOrder: 3 },
  
  // About page sections
  { pageKey: 'about', sectionKey: 'introduction', sectionName: '園區介紹', description: '關於園區的詳細介紹', displayOrder: 1 },
  { pageKey: 'about', sectionKey: 'history', sectionName: '發展歷程', description: '園區發展故事', displayOrder: 2 },
  { pageKey: 'about', sectionKey: 'team', sectionName: '團隊介紹', description: '團隊成員介紹', displayOrder: 3 },
  
  // Features page sections
  { pageKey: 'features', sectionKey: 'feature_details', sectionName: '六大面向詳解', description: '六大面向的詳細說明', displayOrder: 1 },
  { pageKey: 'features', sectionKey: 'special_services', sectionName: '特色服務', description: '特色服務介紹', displayOrder: 2 },
  
  // Wellness page sections
  { pageKey: 'wellness', sectionKey: 'medical_services', sectionName: '醫療服務', description: '醫療服務介紹', displayOrder: 1 },
  { pageKey: 'wellness', sectionKey: 'health_info', sectionName: '健康資訊', description: '健康知識文章', displayOrder: 2 },
  { pageKey: 'wellness', sectionKey: 'expert_advice', sectionName: '專家建議', description: '專家健康建議', displayOrder: 3 },
  
  // Farm page sections
  { pageKey: 'farm', sectionKey: 'farm_activities', sectionName: '農場活動', description: '農場相關活動', displayOrder: 1 },
  { pageKey: 'farm', sectionKey: 'products', sectionName: '農產品介紹', description: '農產品資訊', displayOrder: 2 },
  { pageKey: 'farm', sectionKey: 'experiences', sectionName: '體驗分享', description: '訪客體驗文章', displayOrder: 3 },
  
  // Lifestyle page sections
  { pageKey: 'lifestyle', sectionKey: 'facilities', sectionName: '生活設施', description: '生活設施介紹', displayOrder: 1 },
  { pageKey: 'lifestyle', sectionKey: 'services', sectionName: '服務項目', description: '各項服務說明', displayOrder: 2 },
  { pageKey: 'lifestyle', sectionKey: 'resident_stories', sectionName: '住戶分享', description: '住戶生活分享', displayOrder: 3 },
  
  // Video Tour page sections
  { pageKey: 'video_tour', sectionKey: 'video_intro', sectionName: '影片介紹', description: '影片相關文字說明', displayOrder: 1 },
  { pageKey: 'video_tour', sectionKey: 'tour_highlights', sectionName: '導覽重點', description: '導覽重點文章', displayOrder: 2 },
  
  // Contact page sections
  { pageKey: 'contact', sectionKey: 'faq', sectionName: '常見問題', description: 'FAQ 文章', displayOrder: 1 },
  { pageKey: 'contact', sectionKey: 'visit_info', sectionName: '參觀須知', description: '參觀注意事項', displayOrder: 2 },
];

console.log('Inserting default page sections...');

for (const section of defaultSections) {
  await connection.execute(`
    INSERT INTO page_sections (pageKey, sectionKey, sectionName, description, displayOrder, isActive)
    VALUES (?, ?, ?, ?, ?, TRUE)
    ON DUPLICATE KEY UPDATE
      sectionName = VALUES(sectionName),
      description = VALUES(description),
      displayOrder = VALUES(displayOrder)
  `, [section.pageKey, section.sectionKey, section.sectionName, section.description, section.displayOrder]);
  
  console.log(`✓ ${section.pageKey}/${section.sectionKey}: ${section.sectionName}`);
}

console.log(`\n✅ Successfully inserted ${defaultSections.length} page sections!`);

await connection.end();
