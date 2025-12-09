
import { useState } from "react";
import { Link } from "wouter";
import { LogIn, LogOut, User, FileText, Shield, LayoutDashboard, KeyRound, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AuthButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Get current user
  const { data: user, refetch } = trpc.auth.me.useQuery();

  // Logout mutation
  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      toast.success("已成功登出");
      refetch();
      window.location.href = "/";
    },
    onError: () => {
      toast.error("登出失敗，請重試");
      setIsLoggingOut(false);
    },
  });

  const handleLogout = () => {
    setIsLoggingOut(true);
    logoutMutation.mutate();
    // Also call the API logout endpoint to clear cookie if needed
    fetch("/api/auth/logout", { method: "POST" });
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("管理員登入成功");
        setShowLoginDialog(false);
        setPassword("");
        refetch();
        window.location.reload();
      } else {
        toast.error(data.error || "登入失敗");
      }
    } catch (error) {
      toast.error("登入發生錯誤");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleMemberLoginPlaceholder = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("會員系統即將開放註冊！", {
      description: "目前僅開放管理員登入，敬請期待。",
    });
  };

  // Not logged in - show login button
  if (!user) {
    return (
      <>
        <Button
          onClick={() => setShowLoginDialog(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white shadow-lg shadow-amber-500/20 transition-all duration-300 transform hover:scale-105"
        >
          <UserCircle className="w-5 h-5" />
          <span className="font-bold tracking-wide">會員 / 管理登入</span>
        </Button>

        <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
          <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-xl">
            <DialogHeader>
              <DialogTitle className="text-xl text-center">歡迎回到 Fufu Villa</DialogTitle>
              <DialogDescription className="text-center">
                請選擇您的登入身分
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="member" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="member">會員登入</TabsTrigger>
                <TabsTrigger value="admin">管理員</TabsTrigger>
              </TabsList>

              <TabsContent value="member">
                <form onSubmit={handleMemberLoginPlaceholder} className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder="電子信箱 / 手機號碼"
                      disabled
                    />
                    <Input
                      type="password"
                      placeholder="會員密碼"
                      disabled
                    />
                  </div>
                  <Button type="submit" className="w-full bg-slate-800 hover:bg-slate-700">
                    登入 / 註冊
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    * 會員系統升級維護中，暫停開放註冊
                  </p>
                </form>
              </TabsContent>

              <TabsContent value="admin">
                <form onSubmit={handleAdminLogin} className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Input
                      type="password"
                      placeholder="請輸入管理員密碼"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoggingIn}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700" disabled={isLoggingIn}>
                    {isLoggingIn ? "驗證中..." : "確認登入"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Logged in - show user menu
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 hover:bg-primary/10 border border-primary/20"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white shadow-sm">
            <User className="w-4 h-4" />
          </div>
          <span className="hidden md:inline text-sm font-medium text-primary">
            {user.name || "管理員"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user.name || "管理員"}</p>
            <p className="text-xs text-muted-foreground">{user.email || "admin@local"}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/admin/dashboard" className="flex items-center cursor-pointer">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/admin" className="flex items-center cursor-pointer">
            <FileText className="mr-2 h-4 w-4" />
            <span>文章管理</span>
          </Link>
        </DropdownMenuItem>
        {user.role === "admin" && (
          <DropdownMenuItem asChild>
            <Link href="/admin/authors" className="flex items-center cursor-pointer">
              <Shield className="mr-2 h-4 w-4" />
              <span>權限管理</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isLoggingOut ? "登出中..." : "登出"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
