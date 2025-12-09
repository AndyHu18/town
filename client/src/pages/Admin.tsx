import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Plus, Edit, Trash2, Eye, Loader2, FileText, Users, LayoutDashboard } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function Admin() {
  const [, setLocation] = useLocation();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  const utils = trpc.useUtils();

  // Check if user is logged in
  const { data: user, isLoading: userLoading } = trpc.auth.me.useQuery();

  // Fetch articles
  const { data: articlesData, isLoading: articlesLoading } =
    trpc.articles.adminList.useQuery(
      { page, limit: 20 },
      { enabled: !!user }
    );

  // Delete mutation
  const deleteMutation = trpc.articles.delete.useMutation({
    onSuccess: () => {
      toast.success("文章已刪除");
      utils.articles.adminList.invalidate();
      setDeleteId(null);
    },
    onError: (error) => {
      toast.error(error.message || "刪除失敗");
    },
  });

  const formatDate = (date: Date | string | null) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0B1221] via-[#0B1221]/95 to-[#0B1221] pt-32 pb-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0B1221] via-[#0B1221]/95 to-[#0B1221] pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-serif font-bold text-white mb-6">
            請先登入
          </h1>
          <p className="text-white/70 mb-8">您需要登入才能訪問文章管理後台</p>
          <Button
            onClick={() => (window.location.href = "/api/oauth/login")}
            className="bg-primary hover:bg-primary/90"
          >
            前往登入
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1221] via-[#0B1221]/95 to-[#0B1221] pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold text-white mb-2">
              文章管理
            </h1>
            <p className="text-white/60">管理您的文章內容</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <Link href="/admin/dashboard">
              <Button variant="outline" className="border-white/10 text-white hover:bg-white/10">
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <Link href="/articles">
              <Button variant="outline" className="border-white/10 text-white hover:bg-white/10">
                <Eye className="w-4 h-4 mr-2" />
                查看前台
              </Button>
            </Link>
            <Link href="/admin/authors">
              <Button variant="outline" className="border-white/10 text-white hover:bg-white/10">
                <Users className="w-4 h-4 mr-2" />
                管理作者
              </Button>
            </Link>
            <Link href="/admin/article/new">
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                新增文章
              </Button>
            </Link>
          </div>
        </div>

        {/* Articles Table */}
        {articlesLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : articlesData && articlesData.items.length > 0 ? (
          <>
            <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableHead className="text-white/80">標題</TableHead>
                    <TableHead className="text-white/80">狀態</TableHead>
                    <TableHead className="text-white/80">作者</TableHead>
                    <TableHead className="text-white/80">發布日期</TableHead>
                    <TableHead className="text-white/80 text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {articlesData.items.map((article) => (
                    <TableRow
                      key={article.id}
                      className="border-white/10 hover:bg-white/5"
                    >
                      <TableCell className="font-medium text-white">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-white/50" />
                          {article.title}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            article.status === "published"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            article.status === "published"
                              ? "bg-green-500/20 text-green-400 border-green-500/30"
                              : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                          }
                        >
                          {article.status === "published" ? "已發布" : "草稿"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-white/70">
                        {article.authorName}
                      </TableCell>
                      <TableCell className="text-white/70">
                        {formatDate(article.publishedAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/article/${article.id}`}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-white/70 hover:text-white hover:bg-white/10"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeleteId(article.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {articlesData.totalPages > 1 && (
              <div className="mt-6 flex justify-center gap-2">
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
                  onClick={() =>
                    setPage((p) => Math.min(articlesData.totalPages, p + 1))
                  }
                  disabled={page === articlesData.totalPages}
                  className="border-white/10 text-white hover:bg-white/10"
                >
                  下一頁
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-white/5 border border-white/10 rounded-lg">
            <FileText className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <p className="text-white/50 text-lg mb-4">還沒有任何文章</p>
            <Link href="/admin/article/new">
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                創建第一篇文章
              </Button>
            </Link>
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent className="bg-[#0B1221] border-white/10">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">確認刪除</AlertDialogTitle>
              <AlertDialogDescription className="text-white/70">
                此操作無法撤銷。文章將被永久刪除。
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-white/10 text-white hover:bg-white/10">
                取消
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteId && deleteMutation.mutate({ id: deleteId })}
                className="bg-destructive hover:bg-destructive/90"
              >
                刪除
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
