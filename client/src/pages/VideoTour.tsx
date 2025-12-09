import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMusic } from "@/contexts/MusicContext";
import { useEffect } from "react";
import ScrollReveal from "@/components/ScrollReveal";

export default function VideoTour() {
  const { setTrack } = useMusic();

  useEffect(() => {
    setTrack("/assets/video-tour-theme.mp3");
  }, [setTrack]);

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      {/* Luxury Hero Video Section */}
      <div className="relative w-full h-[60vh] mb-16 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/assets/luxury-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <ScrollReveal direction="up">
            <div className="text-center text-white px-6">
              <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 tracking-wide">
                極致奢華 · 尊榮體驗
              </h1>
              <p className="text-xl md:text-2xl font-light tracking-widest uppercase">
                Ultimate Luxury Lifestyle
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">
              園區導覽
            </h2>
            <p className="text-xl text-muted-foreground font-light">
              透過影像，深入了解華友聯健康科技健康園區的每一個角落
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-[90vw] mx-auto space-y-16">
          {/* YouTube Video Section */}
          <ScrollReveal direction="up">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/Oon-NlRMk1M"
                title="華友聯健康科技健康園區介紹"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </ScrollReveal>

          {/* Video Player Section - REMOVED ScrollReveal wrapper to fix timeline controls */}
          {/* Using simple fade-in without transform to avoid stacking context issues */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-video rounded-xl overflow-hidden shadow-2xl bg-black z-10 group"
          >
            <video
              controls
              playsInline
              className="w-full h-full object-contain relative z-20 cursor-pointer"
              poster="/assets/features-header.mp4" // Using existing video as poster fallback
              style={{ pointerEvents: 'auto' }}
            >
              <source src="/assets/Life.mp4" type="video/mp4" />
              您的瀏覽器不支援影片播放。
            </video>
          </motion.div>

          {/* Highlights Gallery */}
          <div className="space-y-8">
            <ScrollReveal direction="up" delay={0.3}>
              <h2 className="font-serif text-3xl font-bold text-primary text-center mb-8">
                園區亮點
              </h2>
            </ScrollReveal>
            
            {/* Changed grid to single column for 90% width requirement, or responsive grid with wider items */}
            <div className="flex flex-col gap-12 items-center">
              {[
                { src: "/assets/highlight-resort.png", title: "水火同源 養生聖地" },
                { src: "/assets/highlight-medical.png", title: "AI 智能健康守護" },
                { src: "/assets/highlight-dining.png", title: "頂級樂齡生活" },
                { src: "/assets/highlight-activities.png", title: "豐盛樂齡新人生" },
                { src: "/assets/highlight-investment.png", title: "穩健投資收益" },
              ].map((item, index) => (
                <ScrollReveal 
                  key={index} 
                  direction="up" 
                  delay={0.1 * index}
                  className="w-full md:w-[90%] lg:w-[90%]" // Enforce 90% width on larger screens
                >
                  <div className="relative group rounded-xl overflow-hidden shadow-lg w-full">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                      <p className="text-white font-bold text-2xl tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        {item.title}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Download Section */}
          <ScrollReveal direction="up" delay={0.4}>
            <div className="bg-secondary/5 rounded-xl p-8 md:p-12 text-center border border-primary/10 max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl font-bold text-primary mb-6">
                下載園區簡介
              </h2>
              <div className="mb-8 rounded-xl overflow-hidden shadow-lg max-w-2xl mx-auto">
                <img 
                  src="/assets/park-intro-taiwan.png" 
                  alt="園區簡介" 
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                獲取完整的園區規劃、服務項目與會員權益說明手冊，隨時隨地詳細閱讀。
              </p>
              
              <a 
                href="/assets/fufu-villa-brochure.pdf" 
                download="華友聯健康科技健康園區簡介.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-[#B87333] hover:bg-[#A0632A] text-white relative overflow-hidden group">
                  <span className="relative z-10 flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    下載 PDF 簡介
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Button>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
