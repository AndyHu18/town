import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface BookingDialogProps {
  trigger?: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost";
}

export default function BookingDialog({ trigger, className, variant = "outline" }: BookingDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setOpen(false);
    toast.success("預約申請已提交", {
      description: "我們的專員將盡快與您聯繫安排參觀時間。",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant={variant} className={className}>
            預約參觀
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display text-primary text-center tracking-widest">預約參觀</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground/80">姓名</Label>
            <Input id="name" required placeholder="請輸入您的姓名" className="bg-white border-primary/20 focus:border-primary text-black placeholder:text-gray-500" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground/80">聯絡電話</Label>
            <Input id="phone" required type="tel" placeholder="請輸入您的聯絡電話" className="bg-white border-primary/20 focus:border-primary text-black placeholder:text-gray-500" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground/80">電子郵件</Label>
            <Input id="email" required type="email" placeholder="請輸入您的電子郵件" className="bg-white border-primary/20 focus:border-primary text-black placeholder:text-gray-500" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date" className="text-foreground/80">預計參觀日期</Label>
            <Input id="date" type="date" className="bg-white border-primary/20 focus:border-primary text-black placeholder:text-gray-500" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="text-foreground/80">備註需求</Label>
            <Textarea id="message" placeholder="如有特殊需求請告知我們" className="bg-white border-primary/20 focus:border-primary min-h-[100px] text-black placeholder:text-gray-500" />
          </div>
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={isSubmitting}>
            {isSubmitting ? "提交中..." : "確認預約"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
