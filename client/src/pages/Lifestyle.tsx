import { motion } from "framer-motion";
import { Utensils, Shirt, Home, Car, BookOpen, Music } from "lucide-react";
import HeroVideo from "@/components/HeroVideo";
import { useMusic } from "@/contexts/MusicContext";
import { useEffect } from "react";

const services = [
  {
    icon: Utensils,
    title: "食 - 極致饗宴",
    description: "引進米其林等級餐飲團隊，結合蘇澳現撈海鮮與在地特色食材，為您呈現健康與美味兼具的頂級料理。",
    image: "/assets/fine-dining.png"
  },
  {
    icon: Shirt,
    title: "衣 - 貼心管家",
    description: "提供專業洗衣、熨燙與換季收納服務，讓您的衣物始終保持最佳狀態，展現優雅風采。",
    image: "/assets/luxury-interior-living.png"
  },
  {
    icon: Home,
    title: "住 - 尊榮居所",
    description: "每週定期的專業清潔服務，維持居家環境的一塵不染，讓您只需專注於享受生活。",
    image: "/assets/smart-home-interior.png"
  },
  {
    icon: Car,
    title: "行 - 專屬接駁",
    description: "配備社區專屬接駁車與就醫接送服務，無論是外出採買還是定期回診，都能享有安全舒適的交通體驗。",
    image: "/assets/hero-aerial-view.png"
  },
  {
    icon: BookOpen,
    title: "育 - 終身學習",
    description: "開設書法、繪畫、攝影等多元社團與文化講座，讓您在退休後持續學習，豐富精神內涵。",
    image: "/assets/cultural-class.png"
  },
  {
    icon: Music,
    title: "樂 - 多彩生活",
    description: "擁有健身房、恆溫泳池、露天劇院與獨特的水火同源洗浴中心，滿足您對休閒娛樂的所有想像。",
    image: "/assets/social-club-gathering.png"
  }
];

export default function Lifestyle() {
  const { setTrack } = useMusic();

  useEffect(() => {
    setTrack("/assets/lifestyle-music.mp3");
  }, [setTrack]);

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <HeroVideo 
        videoSrc="/assets/lifestyle-header.mp4"
        title="生活服務"
        subtitle="Lifestyle Services"
      />

      {/* Services Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group overflow-hidden rounded-xl bg-card shadow-md transition-all hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-4 left-4 rounded-full bg-white/90 p-3 text-primary shadow-sm">
                    <service.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mb-3 font-serif text-2xl font-bold text-primary">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {service.description}
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
