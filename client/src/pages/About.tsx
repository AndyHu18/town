import { motion } from "framer-motion";
import { ArrowRight, MapPin, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import HeroVideo from "@/components/HeroVideo";
import { useMusic } from "@/contexts/MusicContext";
import { useEffect } from "react";

export default function About() {
  const { setTrack } = useMusic();

  useEffect(() => {
    setTrack("/assets/about-theme.mp3");
  }, [setTrack]);

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <HeroVideo 
        videoSrc="/assets/about-header.mp4"
        title="關於園區"
        subtitle="About Us"
      />

      {/* Core Values */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="mx-auto mb-6 h-48 w-full overflow-hidden rounded-lg shadow-md">
                <img src="/assets/aspect-hardware.png" alt="頂級定位" className="h-full w-full object-cover hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="mb-4 font-serif text-2xl font-bold text-primary">頂級定位</h3>
              <p className="text-muted-foreground">
                專為經濟自由的退休人士與注重健康管理的高淨值家庭打造，提供無與倫比的尊榮服務。
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="mx-auto mb-6 h-48 w-full overflow-hidden rounded-lg shadow-md">
                <img src="/assets/about-location.png" alt="絕佳選址" className="h-full w-full object-cover hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="mb-4 font-serif text-2xl font-bold text-primary">絕佳選址</h3>
              <p className="text-muted-foreground">
                坐落於宜蘭蘇澳，擁有世界罕見的冷熱泉共生奇觀，依山傍海，空氣清新，距離台北僅一小時車程。
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="mx-auto mb-6 h-48 w-full overflow-hidden rounded-lg shadow-md">
                <img src="/assets/promise-taiwan.png" alt="安心承諾" className="h-full w-full object-cover hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="mb-4 font-serif text-2xl font-bold text-primary">安心承諾</h3>
              <p className="text-muted-foreground">
                採用會員制運營模式，結合保證金與月費機制，確保服務品質的穩定性與永續經營。
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-muted/30 py-20">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/assets/smart-home-interior.png"
                alt="Luxury Interior"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="mb-6 font-serif text-4xl font-bold text-primary">全樂齡居住環境</h2>
              <p className="mb-6 text-lg text-muted-foreground">
                我們不僅提供一個居住空間，更創造了一種全新的生活方式。從AI智能家居到無障礙設計，每一個細節都為了讓您享受最舒適、最安全的居住體驗。
              </p>
              <p className="mb-8 text-lg text-muted-foreground">
                在這裡，您可以盡情享受大自然的恩賜，同時擁有最先進的醫療照護與最貼心的生活服務。這就是華友聯為您打造的「富居」生活。
              </p>
              <Link href="/contact">
                <Button size="lg" className="group">
                  預約參觀 <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
