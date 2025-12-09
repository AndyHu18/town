import { useEffect } from "react";
import { Link, useRoute } from "wouter";
import { Calendar, User, ArrowLeft, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";

export default function ArticleDetail() {
  const [, params] = useRoute("/articles/:slug");
  const slug = params?.slug || "";

  const { data: article, isLoading, error } = trpc.articles.getBySlug.useQuery(
    { slug },
    { enabled: !!slug }
  );

  // Update meta tags when article loads
  useEffect(() => {
    if (article) {
      // Set page title
      document.title = `${article.title} - 華友聯健康園區`;

      // Set meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', article.metaDescription || article.excerpt || '');
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = article.metaDescription || article.excerpt || '';
        document.head.appendChild(meta);
      }

      // Set meta keywords
      if (article.metaKeywords) {
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
          metaKeywords.setAttribute('content', article.metaKeywords);
        } else {
          const meta = document.createElement('meta');
          meta.name = 'keywords';
          meta.content = article.metaKeywords;
          document.head.appendChild(meta);
        }
      }

      // Set Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', article.title);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:title');
        meta.content = article.title;
        document.head.appendChild(meta);
      }

      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content', article.metaDescription || article.excerpt || '');
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:description');
        meta.content = article.metaDescription || article.excerpt || '';
        document.head.appendChild(meta);
      }

      if (article.ogImage || article.coverImage) {
        const ogImage = document.querySelector('meta[property="og:image"]');
        if (ogImage) {
          ogImage.setAttribute('content', article.ogImage || article.coverImage || '');
        } else {
          const meta = document.createElement('meta');
          meta.setAttribute('property', 'og:image');
          meta.content = article.ogImage || article.coverImage || '';
          document.head.appendChild(meta);
        }
      }
    }

    // Cleanup: reset to default title when component unmounts
    return () => {
      document.title = '華友聯健康園區';
    };
  }, [article]);

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

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0B1221] via-[#0B1221]/95 to-[#0B1221] pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-serif font-bold text-white mb-6">
            文章不存在
          </h1>
          <Link href="/articles">
            <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回文章列表
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1221] via-[#0B1221]/95 to-[#0B1221] pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Back Button */}
        <Link href="/articles">
          <Button
            variant="ghost"
            className="mb-8 text-white/70 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回文章列表
          </Button>
        </Link>

        {/* Cover Image */}
        {article.coverImage && (
          <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1221] via-transparent to-transparent opacity-60" />
          </div>
        )}

        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 drop-shadow-[0_0_30px_rgba(234,179,8,0.3)]">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{article.authorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div
          className="prose prose-invert prose-lg max-w-none
            prose-headings:text-white prose-headings:font-serif
            prose-p:text-white/80 prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white prose-strong:font-semibold
            prose-ul:text-white/80 prose-ol:text-white/80
            prose-blockquote:border-l-primary prose-blockquote:text-white/70
            prose-code:text-primary prose-code:bg-white/5 prose-code:px-1 prose-code:rounded
            prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10
            prose-img:rounded-lg prose-img:shadow-xl"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </div>
  );
}
