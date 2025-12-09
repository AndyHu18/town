import { motion } from "framer-motion";
import { 
  Building2, 
  HeartPulse, 
  Leaf, 
  Wallet, 
  Users, 
  Globe 
} from "lucide-react";
import HeroVideo from "@/components/HeroVideo";
import { useMusic } from "@/contexts/MusicContext";
import { useEffect } from "react";

const features = [
  {
    icon: Building2,
    title: "硬體建設",
    description: "打造全AI智能內裝的健康宅，結合高級美食區與無障礙設計，提供最舒適的居住環境。",
    image: "/assets/smart-home-interior.png"
  },
  {
    icon: Users,
    title: "運營概念",
    description: "採會員制全包式服務，涵蓋食衣住行育樂醫，讓您無後顧之憂地享受生活。",
    image: "/assets/social-club-gathering.png"
  },
  {
    icon: HeartPulse,
    title: "醫療整合",
    description: "結合AI智能健康守護、高端健檢與醫美抗衰，全方位照護您的身心健康。",
    image: "/assets/wellness-checkup.png"
  },
  {
    icon: Wallet,
    title: "財務計畫",
    description: "透明的保證金機制與月費收益規劃，加上商場租金收益，確保園區永續發展。",
    image: "/assets/high-end-medical-center.png"
  },
  {
    icon: Leaf,
    title: "文化休閒",
    description: "設有高端會所、露天劇院與各類興趣社團，豐富您的精神生活與社交圈。",
    image: "/assets/cultural-class.png"
  },
  {
    icon: Globe,
    title: "國際金融",
    description: "建立金融商品交易中心，提供最新的理財資訊與高端交流環境。",
    image: "/assets/luxury-interior-living.png"
  }
];

export default function Features() {
  const { setTrack } = useMusic();

  useEffect(() => {
    setTrack("/assets/space-ambient.mp3");
  }, [setTrack]);

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <HeroVideo 
        videoSrc="/assets/features-header-tw.mp4"
        title="六大經營面向"
        subtitle="Six Pillars"
      />

      {/* Features Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group overflow-hidden rounded-xl bg-card shadow-lg transition-all hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-4 left-4 rounded-full bg-white/90 p-3 text-primary shadow-sm">
                    <feature.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mb-3 font-serif text-2xl font-bold text-primary">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
