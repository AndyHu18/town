import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { ChevronRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingDialog from "@/components/BookingDialog";
import AuthButton from "@/components/AuthButton";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  // Scroll to top whenever location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "進入園區", href: "/about" },
    { name: "六大面向", href: "/features" },
    { name: "健康醫療", href: "/wellness" },
    { name: "休閒農場", href: "/farm" },
    { name: "生活服務", href: "/lifestyle" },
    { name: "介紹影片", href: "/video-tour" },
    { name: "聯絡我們", href: "/contact" },
  ];

  // Determine button color based on state
  const isHome = location === "/";
  const isTransparent = isHome && !isScrolled;
  const buttonColorClass = isMobileMenuOpen
    ? "text-white"
    : isTransparent
      ? "text-white"
      : "text-primary";

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled || !isHome
            ? "bg-[#0B1221]/90 backdrop-blur-md shadow-sm py-3 border-b border-white/5"
            : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="group flex flex-col items-start relative z-50" title="返回首頁">
            <div className="flex items-center gap-3 px-6 py-3 rounded-lg border-2 border-primary/80 bg-[#0B1221]/80 backdrop-blur-sm transition-all duration-500 hover:border-primary hover:bg-[#0B1221]/95 shadow-[0_0_25px_rgba(234,179,8,0.5)] hover:shadow-[0_0_45px_rgba(234,179,8,0.8)] hover:scale-[1.02] relative overflow-hidden">
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
              <div className="relative overflow-hidden flex flex-col">
                <div className="relative z-10">
                  <span className="text-2xl font-serif font-bold tracking-[0.15em] text-primary transition-all duration-500 block drop-shadow-[0_0_12px_rgba(234,179,8,0.8)] group-hover:drop-shadow-[0_0_25px_rgba(234,179,8,1)] group-hover:text-primary/95">
                    華友聯健康園區
                  </span>
                </div>
                <span className="text-[10px] font-sans tracking-[0.3em] text-primary/60 uppercase mt-1 group-hover:text-primary transition-colors duration-300 relative z-10">
                  Home Page
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative group px-4 py-2"
              >
                <span className={cn(
                  "relative z-10 text-sm font-sans tracking-[0.15em] uppercase transition-colors duration-500",
                  location === link.href
                    ? "text-primary font-semibold"
                    : isScrolled || !isHome
                      ? "text-white/90 group-hover:text-primary"
                      : "text-white/90 group-hover:text-white"
                )}>
                  {link.name}
                </span>
                <span className={cn(
                  "absolute bottom-0 left-1/2 w-0 h-[1px] -translate-x-1/2 transition-all duration-500 ease-out group-hover:w-[60%]",
                  location === link.href ? "w-[60%] bg-primary" : "bg-primary"
                )} />
              </Link>
            ))}

            <div className="pl-4 ml-2 border-l border-white/10 flex items-center gap-3">
              <AuthButton />
              <BookingDialog
                trigger={
                  <Button
                    variant="outline"
                    className={cn(
                      "relative overflow-hidden font-sans tracking-widest border-primary/50 text-primary hover:text-white transition-all duration-500 group",
                      !isScrolled && isHome && "border-white/50 text-white hover:border-primary"
                    )}
                  >
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">預約參觀</span>
                    <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                  </Button>
                }
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "md:hidden relative z-[100] p-2 transition-colors duration-300",
              buttonColorClass
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="w-8 h-8" />
            ) : (
              <Menu className="w-8 h-8" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Right Side Drawer */}
      {createPortal(
        <>
          {/* Backdrop */}
          <div
            className={cn(
              "fixed inset-0 z-[80] bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 md:hidden",
              isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Menu */}
          <div
            className={cn(
              "fixed top-0 right-0 bottom-0 z-[90] w-[85vw] max-w-sm bg-[#0B1221]/95 backdrop-blur-md flex flex-col transition-transform duration-300 md:hidden shadow-2xl border-l border-white/5",
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            )}
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <span className="text-xl font-serif font-bold text-primary drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]">
                華友聯健康園區
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-white/80 hover:text-white transition-colors bg-black/20 rounded-full backdrop-blur-sm border border-white/10"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Links */}
            <div className="flex flex-col gap-2 mt-8 overflow-y-auto pb-20 px-8">
              {/* Return to Home Link */}
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="group flex items-center justify-center py-3 rounded-lg transition-all duration-500 hover:bg-white/5 border border-transparent hover:border-primary/20">
                  <span className="text-lg font-serif tracking-widest text-white/90 group-hover:text-primary transition-colors drop-shadow-[0_0_10px_rgba(234,179,8,0.4)]">
                    返回首頁
                  </span>
                </div>
              </Link>

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className={cn(
                    "group flex items-center justify-center py-4 rounded-sm transition-all duration-500 border-b border-white/5 relative overflow-hidden",
                    location === link.href
                      ? "bg-white/5 border-primary/20"
                      : "hover:bg-white/5 hover:border-primary/10"
                  )}>
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-100%] transition-transform duration-700",
                      location === link.href ? "translate-x-[100%] animate-[shimmer_2s_infinite]" : "group-hover:translate-x-[100%]"
                    )} />
                    <span className={cn(
                      "text-lg font-serif tracking-[0.2em] transition-all duration-500 relative z-10",
                      location === link.href
                        ? "text-primary drop-shadow-[0_0_15px_rgba(234,179,8,0.8)] scale-105"
                        : "text-white/80 group-hover:text-primary group-hover:drop-shadow-[0_0_10px_rgba(234,179,8,0.4)]"
                    )}>
                      {link.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="mt-auto p-8 border-t border-white/10 space-y-4">
              <div className="flex justify-center">
                <AuthButton />
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-4 text-sm font-serif tracking-[0.3em] text-white/60 hover:text-[#0B1221] hover:bg-primary border border-white/20 hover:border-primary rounded-sm transition-all duration-500 uppercase group relative overflow-hidden"
              >
                <span className="relative z-10">關閉選單</span>
                <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
              </button>
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
}
