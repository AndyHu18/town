import { Link } from "wouter";
import { FileText, FilePlus, Users, Calendar, TrendingUp } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  // Fetch all articles for statistics
  const { data: articlesData, isLoading } = trpc.articles.adminList.useQuery({
    page: 1,
    limit: 100, // Get enough to calculate stats
  });

  const { data: recentArticles, isLoading: recentLoading } =
    trpc.articles.adminList.useQuery({
      page: 1,
      limit: 5,
    });

  const articles = articlesData?.items || [];
  const totalArticles = articlesData?.total || 0;
  const draftCount = articles.filter((a) => a.status === "draft").length;
  const publishedCount = articles.filter((a) => a.status === "published").length;

  // Calculate this month's new articles
  const now = new Date();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const thisMonthCount = articles.filter(
    (a) => new Date(a.createdAt) >= thisMonthStart
  ).length;

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
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            內容管理後台
          </h1>
          <p className="text-xl text-white/70">
            歡迎回來！管理您的文章和內容
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Articles */}
          <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-white/70">
                總文章數
              </CardTitle>
              <FileText className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-20 bg-white/10" />
              ) : (
                <div className="text-3xl font-bold text-white">{totalArticles}</div>
              )}
            </CardContent>
          </Card>

          {/* Draft Articles */}
          <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-white/70">
                草稿
              </CardTitle>
              <FilePlus className="w-4 h-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-20 bg-white/10" />
              ) : (
                <div className="text-3xl font-bold text-white">{draftCount}</div>
              )}
            </CardContent>
          </Card>

          {/* Published Articles */}
          <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-white/70">
                已發布
              </CardTitle>
              <Calendar className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-20 bg-white/10" />
              ) : (
                <div className="text-3xl font-bold text-white">{publishedCount}</div>
              )}
            </CardContent>
          </Card>

          {/* This Month */}
          <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-white/70">
                本月新增
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-20 bg-white/10" />
              ) : (
                <div className="text-3xl font-bold text-white">{thisMonthCount}</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-bold text-white mb-6">快速操作</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/admin/article/new">
              <Card className="bg-primary/10 border-primary/30 hover:bg-primary/20 transition-colors cursor-pointer">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <FilePlus className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">新增文章</h3>
                    <p className="text-sm text-white/70">創建新的文章或草稿</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin">
              <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">管理文章</h3>
                    <p className="text-sm text-white/70">查看和編輯所有文章</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/authors">
              <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">作者管理</h3>
                    <p className="text-sm text-white/70">管理作者權限</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Recent Articles */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-white mb-6">最近編輯</h2>
          {recentLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2 bg-white/10" />
                    <Skeleton className="h-4 w-1/2 bg-white/10" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : recentArticles && recentArticles.items.length > 0 ? (
            <div className="space-y-4">
              {recentArticles.items.map((article) => (
                <Link key={article.id} href={`/admin/article/${article.id}`}>
                  <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2">
                            {article.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-white/60">
                            <span
                              className={`px-2 py-1 rounded-full ${
                                article.status === "published"
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-yellow-500/20 text-yellow-400"
                              }`}
                            >
                              {article.status === "published" ? "已發布" : "草稿"}
                            </span>
                            <span>更新於 {formatDate(article.updatedAt)}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white/70 hover:text-white hover:bg-white/10"
                        >
                          編輯
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-12 text-center">
                <FileText className="w-12 h-12 text-white/30 mx-auto mb-4" />
                <p className="text-white/60">尚無文章，開始創建您的第一篇文章吧！</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
