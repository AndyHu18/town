import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Plus, Trash2, Shield, User } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function AuthorsManagement() {
  const [, setLocation] = useLocation();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"author" | "admin">("author");

  const utils = trpc.useUtils();

  // Fetch allowed authors
  const { data: authors, isLoading } = trpc.articles.allowedAuthors.useQuery();

  // Add author mutation
  const addMutation = trpc.articles.addAllowedAuthor.useMutation({
    onSuccess: () => {
      toast.success("作者已添加");
      setShowAddDialog(false);
      setEmail("");
      setName("");
      setRole("author");
      utils.articles.allowedAuthors.invalidate();
    },
    onError: (error) => {
      toast.error(error.message || "添加失敗");
    },
  });

  // Remove author mutation
  const removeMutation = trpc.articles.removeAllowedAuthor.useMutation({
    onSuccess: () => {
      toast.success("作者已移除");
      utils.articles.allowedAuthors.invalidate();
    },
    onError: (error) => {
      toast.error(error.message || "移除失敗");
    },
  });

  const handleAdd = () => {
    if (!email.trim()) {
      toast.error("請輸入 Email");
      return;
    }

    if (!name.trim()) {
      toast.error("請輸入名稱");
      return;
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("請輸入有效的 Email");
      return;
    }

    addMutation.mutate({ email, name, role });
  };

  const handleRemove = (id: number) => {
    if (confirm("確定要移除此作者嗎？")) {
      removeMutation.mutate({ id });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1221] via-[#0B1221]/95 to-[#0B1221] pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setLocation("/admin")}
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回
            </Button>
            <h1 className="text-3xl font-serif font-bold text-white">
              作者權限管理
            </h1>
          </div>

          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                添加作者
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0B1221] border-white/10 text-white">
              <DialogHeader>
                <DialogTitle className="text-white">添加允許的作者</DialogTitle>
                <DialogDescription className="text-white/70">
                  輸入 Google 帳號的 Email 地址，並選擇權限等級。
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="email" className="text-white mb-2 block">
                    Email 地址
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="name" className="text-white mb-2 block">
                    名稱
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="作者名稱"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="role" className="text-white mb-2 block">
                    權限等級
                  </Label>
                  <Select value={role} onValueChange={(v: any) => setRole(v)}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0B1221] border-white/10">
                      <SelectItem
                        value="author"
                        className="text-white hover:bg-white/10"
                      >
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          作者 - 可新增/編輯自己的文章
                        </div>
                      </SelectItem>
                      <SelectItem
                        value="admin"
                        className="text-white hover:bg-white/10"
                      >
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          管理員 - 可管理所有文章和作者
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowAddDialog(false)}
                  className="border-white/10 text-white hover:bg-white/10"
                >
                  取消
                </Button>
                <Button
                  onClick={handleAdd}
                  disabled={addMutation.isPending}
                  className="bg-primary hover:bg-primary/90"
                >
                  {addMutation.isPending ? "添加中..." : "添加"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Authors List */}
        <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-white/70">載入中...</div>
          ) : authors && authors.length > 0 ? (
            <div className="divide-y divide-white/10">
              {authors.map((author) => (
                <div
                  key={author.id}
                  className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        author.role === "admin"
                          ? "bg-primary/20 text-primary"
                          : "bg-white/10 text-white/70"
                      }`}
                    >
                      {author.role === "admin" ? (
                        <Shield className="w-5 h-5" />
                      ) : (
                        <User className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <p className="text-white font-medium">{author.email}</p>
                      <p className="text-white/50 text-sm">
                        {author.role === "admin" ? "管理員" : "作者"}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(author.id)}
                    disabled={removeMutation.isPending}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    移除
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <User className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/70 mb-2">尚未添加任何作者</p>
              <p className="text-white/50 text-sm">
                點擊上方「添加作者」按鈕開始
              </p>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <h3 className="text-white font-medium mb-2">權限說明</h3>
          <ul className="text-white/70 text-sm space-y-1">
            <li>• 作者：可以創建和編輯自己的文章</li>
            <li>• 管理員：可以管理所有文章、分類和作者權限</li>
            <li>• 只有允許名單中的 Google 帳號才能登入後台</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
