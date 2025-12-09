
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
          className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-[#0B1221] shadow-lg shadow-amber-500/20 transition-all duration-300 transform hover:scale-105"
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
                  <Button variant="outline" type="button" className="w-full gap-2 bg-white text-black hover:bg-gray-100" onClick={() => window.location.href = "/api/auth/google"}>
                    <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.12c-.22-.66-.35-1.36-.35-2.12s.13-1.46.35-2.12V7.04H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.96l2.66-2.84z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.04l2.66 2.84c.87-2.6 3.3-4.5 6.16-4.5z" fill="#EA4335" /></svg>
                    使用 Google 帳號登入
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-muted" /></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">或使用一般登入</span></div>
                  </div>

                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder="電子信箱 / 手機號碼"
                    />
                    <Input
                      type="password"
                      placeholder="會員密碼"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-slate-800 hover:bg-slate-700">
                    登入 / 註冊
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="admin">
                <form onSubmit={handleAdminLogin} className="space-y-4 py-2">
                  <Button variant="outline" type="button" className="w-full gap-2 bg-white text-black hover:bg-gray-100" onClick={() => window.location.href = "/api/auth/google"}>
                    <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.12c-.22-.66-.35-1.36-.35-2.12s.13-1.46.35-2.12V7.04H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.96l2.66-2.84z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.04l2.66 2.84c.87-2.6 3.3-4.5 6.16-4.5z" fill="#EA4335" /></svg>
                    使用 Google 管理員帳號登入
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-muted" /></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">或是</span></div>
                  </div>

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
