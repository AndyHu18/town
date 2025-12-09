import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function PlaceholderPage() {
  const [location] = useLocation();
  
  // Map routes to titles
  const pageTitles: Record<string, string> = {
    "/about": "關於園區",
    "/features": "六大面向",
    "/wellness": "健康醫療",
    "/farm": "休閒農場",
    "/lifestyle": "生活服務",
    "/contact": "聯絡我們"
  };

  const title = pageTitles[location] || "頁面建置中";

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6 pt-32 pb-16">
        <h1 className="text-4xl md:text-6xl font-display font-bold text-primary mb-6">
          {title}
        </h1>
        <p className="text-xl font-serif text-muted-foreground max-w-2xl mb-12">
          此頁面正在精心建置中，我們將盡快為您呈現更完整的內容。
          <br />
          敬請期待華友聯健康科技健康園區帶來的極致體驗。
        </p>
        <Link href="/">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            返回首頁
          </Button>
        </Link>
      </main>
      <Footer />
    </div>
  );
}
