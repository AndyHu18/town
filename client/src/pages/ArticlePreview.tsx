import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { Calendar, User, Loader2, Tag } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function ArticlePreview() {
  const [, params] = useRoute("/admin/article/:id/preview");
  const articleId = parseInt(params?.id || "0");
  const [articleTags, setArticleTags] = useState<any[]>([]);

  const { data: article, isLoading } = trpc.articles.getById.useQuery(
    { id: articleId },
    { enabled: articleId > 0 }
  );

  const { data: tags } = trpc.articles.getArticleTags.useQuery(
    { articleId },
    { enabled: articleId > 0 }
  );

  useEffect(() => {
    if (tags) {
      setArticleTags(tags);
    }
  }, [tags]);

  const formatDate = (date: Date | string | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0B1221] via-[#0B1221]/95 to-[#0B1221] pt-32 pb-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0B1221] via-[#0B1221]/95 to-[#0B1221] pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-serif font-bold text-white mb-6">
            文章不存在
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1221] via-[#0B1221]/95 to-[#0B1221] pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Preview Banner */}
        <div className="mb-8 bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4 text-center">
          <p className="text-yellow-300 font-semibold">
            📋 預覽模式 - 這是文章發布後的實際樣式
          </p>
        </div>

        {/* Cover Image */}
        {article.coverImage && (
          <div className="mb-8 rounded-xl overflow-hidden">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm mb-6">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{article.authorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {article.status === "published"
                  ? formatDate(article.publishedAt)
                  : article.scheduledPublishAt
                  ? `排程於 ${formatDate(article.scheduledPublishAt)}`
                  : "草稿"}
              </span>
            </div>
          </div>

          {/* Tags */}
          {articleTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <Tag className="w-4 h-4 text-white/60" />
              {articleTags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-sm"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-xl text-white/80 leading-relaxed border-l-4 border-primary pl-6 italic">
              {article.excerpt}
            </p>
          )}
        </div>

        {/* Article Content */}
        <div
          className="prose prose-invert prose-lg max-w-none
            prose-headings:font-serif prose-headings:text-white
            prose-p:text-white/80 prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white prose-strong:font-bold
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic
            prose-code:text-primary prose-code:bg-white/10 prose-code:px-2 prose-code:py-1 prose-code:rounded
            prose-pre:bg-black/30 prose-pre:border prose-pre:border-white/10
            prose-img:rounded-lg prose-img:shadow-2xl
            prose-table:border prose-table:border-white/20
            prose-th:bg-white/10 prose-th:border prose-th:border-white/20 prose-th:px-4 prose-th:py-2
            prose-td:border prose-td:border-white/20 prose-td:px-4 prose-td:py-2"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* SEO Preview (for editors) */}
        {(article.metaDescription || article.metaKeywords) && (
          <div className="mt-12 border-t border-white/10 pt-8">
            <h3 className="text-xl font-serif font-bold text-white mb-4">
              SEO 資訊預覽
            </h3>
            {article.metaDescription && (
              <div className="mb-4">
                <p className="text-white/60 text-sm mb-1">Meta 描述：</p>
                <p className="text-white/80">{article.metaDescription}</p>
              </div>
            )}
            {article.metaKeywords && (
              <div className="mb-4">
                <p className="text-white/60 text-sm mb-1">關鍵字：</p>
                <p className="text-white/80">{article.metaKeywords}</p>
              </div>
            )}
            {article.ogImage && (
              <div>
                <p className="text-white/60 text-sm mb-1">OG 圖片：</p>
                <img
                  src={article.ogImage}
                  alt="OG Preview"
                  className="w-64 h-auto rounded-lg border border-white/10"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
