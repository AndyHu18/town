import { useState } from "react";
import { Link } from "wouter";
import { Search, Calendar, User, ChevronRight } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Articles() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const [selectedTag, setSelectedTag] = useState<number | undefined>();
  const [page, setPage] = useState(1);

  // Fetch categories
  const { data: categories } = trpc.articles.categories.useQuery();

  // Fetch tags
  const { data: tags } = trpc.articles.tags.useQuery();

  // Fetch articles
  const { data: articlesData, isLoading } = trpc.articles.list.useQuery({
    search: search || undefined,
    categoryId: selectedCategory,
    page,
    limit: 9,
  });

  const formatDate = (date: Date | string | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1221] via-[#0B1221]/95 to-[#0B1221] pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 drop-shadow-[0_0_30px_rgba(234,179,8,0.3)]">
            最新消息
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            探索華友聯健康園區的最新動態與健康資訊
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="搜尋文章..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
            />
          </div>
          <Select
            value={selectedCategory?.toString() || "all"}
            onValueChange={(value) =>
              setSelectedCategory(value === "all" ? undefined : Number(value))
            }
          >
            <SelectTrigger className="w-full md:w-[200px] bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="選擇分類" />
            </SelectTrigger>
            <SelectContent className="bg-[#0B1221] border-white/10">
              <SelectItem value="all" className="text-white hover:bg-white/10">全部分類</SelectItem>
              {categories?.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()} className="text-white hover:bg-white/10">
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tag Cloud */}
        {tags && tags.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-white mb-4">熱門標籤</h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedTag(undefined)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedTag === undefined
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                全部
              </button>
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => setSelectedTag(tag.id)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    selectedTag === tag.id
                      ? "bg-primary text-white shadow-lg shadow-primary/30"
                      : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Articles Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="bg-white/5 border-white/10">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : articlesData && articlesData.items.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articlesData.items.map((article) => (
                <Link key={article.id} href={`/articles/${article.slug}`}>
                  <Card className="group bg-white/5 border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all duration-500 cursor-pointer h-full overflow-hidden">
                    {article.coverImage && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1221] via-transparent to-transparent opacity-60" />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <h3 className="text-xl font-serif font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="text-white/70 text-sm mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-xs text-white/50">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(article.publishedAt)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{article.authorName}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {articlesData.totalPages > 1 && (
              <div className="mt-12 flex justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="border-white/10 text-white hover:bg-white/10"
                >
                  上一頁
                </Button>
                <div className="flex items-center gap-2 px-4 text-white/70">
                  第 {page} / {articlesData.totalPages} 頁
                </div>
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.min(articlesData.totalPages, p + 1))}
                  disabled={page === articlesData.totalPages}
                  className="border-white/10 text-white hover:bg-white/10"
                >
                  下一頁
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-white/50 text-lg">目前沒有文章</p>
          </div>
        )}
      </div>
    </div>
  );
}
