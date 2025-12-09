import { motion } from "framer-motion";
import { Activity, Stethoscope, Sparkles, Brain, Heart, Wifi } from "lucide-react";
import HeroVideo from "@/components/HeroVideo";
import { useMusic } from "@/contexts/MusicContext";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    title: "基礎醫療",
    description: "與知名醫學中心深度合作，提供內科、家醫科及中醫調理服務，讓您在園區內即可享有高品質的日常醫療照護。",
    icon: Stethoscope,
    image: "/assets/wellness-basic.png"
  },
  {
    title: "高端健檢",
    description: "引進高階影像檢查設備，提供當日報告與專家解讀服務，精準掌握身體狀況，落實預防勝於治療的理念。",
    icon: Activity,
    image: "/assets/wellness-checkup.png"
  },
  {
    title: "AI智能監護",
    description: "運用毫米波雷達技術，24小時非接觸式監測生命徵象，異常情況即時通報，為您的安全提供全天候保障。",
    icon: Brain,
    image: "/assets/wellness-ai.png"
  },
  {
    title: "醫美抗衰",
    description: "結合細胞免疫療法與先進皮膚管理技術，由內而外延緩老化，讓您重拾青春活力與自信光采。",
    icon: Sparkles,
    image: "/assets/wellness-beauty.png"
  },
  {
    title: "科技復健",
    description: "引進外骨骼機器人與水療復健設施，針對神經與骨骼肌肉系統提供精準復健訓練，加速身體機能恢復。",
    icon: Heart,
    image: "/assets/wellness-rehab.png"
  },
  {
    title: "遠距照護",
    description: "透過智慧裝置與雲端平台，實現24小時遠距健康監測與諮詢，讓專業照護無所不在。",
    icon: Wifi,
    image: "/assets/wellness-ai.png"
  }
];

export default function Wellness() {
  const { setTrack } = useMusic();

  useEffect(() => {
    setTrack("/assets/wellness-theme.mp3");
  }, [setTrack]);

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <HeroVideo 
        videoSrc="/assets/wellness-header-tw.mp4"
        title="健康醫療"
        subtitle="Health & Medical"
      />

      {/* Services Section */}
      <section className="py-20">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-primary">全方位醫療服務</h2>
            <p className="text-lg text-muted-foreground">
              整合頂尖醫療資源與先進科技，為您提供最專業的健康照護。
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

                  </div>
                  <CardContent className="p-6">
                    <h3 className="mb-3 font-serif text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
