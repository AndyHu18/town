import { useState } from "react";
import { Link } from "wouter";
import { LogIn, LogOut, User, FileText, Shield, LayoutDashboard } from "lucide-react";
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

  const handleLogin = async (e: React.FormEvent) => {
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
        toast.success("登入成功");
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

  // Not logged in - show login button
  if (!user) {
    return (
      <>
        <Button
          onClick={() => setShowLoginDialog(true)}
          variant="outline"
          className="flex items-center gap-2 border-primary/50 hover:bg-primary text-white hover:text-[#0B1221] transition-all duration-300 group"
        >
          <LogIn className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="font-medium">管理登入</span>
        </Button>

        <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>管理員登入</DialogTitle>
              <DialogDescription>
                請輸入管理員密碼以進入後台
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="請輸入密碼"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoggingIn}
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={isLoggingIn}>
                  {isLoggingIn ? "登入中..." : "登入"}
                </Button>
              </div>
            </form>
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
          className="flex items-center gap-2 hover:bg-primary/10"
        >
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <span className="hidden md:inline text-sm font-medium">
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
