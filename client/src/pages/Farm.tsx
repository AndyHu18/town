import { motion } from "framer-motion";
import { Sprout, Sun, Rabbit, Users } from "lucide-react";
import HeroVideo from "@/components/HeroVideo";
import { useMusic } from "@/contexts/MusicContext";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function Farm() {
  const { setTrack } = useMusic();

  useEffect(() => {
    setTrack("/assets/farm-theme.mp3");
  }, [setTrack]);

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <HeroVideo 
        videoSrc="/assets/farm-header-new.mp4?v=2"
        title="休閒農場"
        subtitle="Leisure Farm"
      />

      {/* Farm Zones */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center"
            >
              {/* Icon removed */}
              <h2 className="mb-4 font-serif text-3xl font-bold text-primary">有機蔬菜種植區</h2>
              <p className="mb-6 text-lg text-muted-foreground">
                我們提供專屬的認養耕作區，讓您親手種植無毒有機蔬菜。在專業農藝師的指導下，體驗從播種到收成的喜悅，並將最健康的食材端上餐桌。
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="overflow-hidden rounded-xl shadow-lg"
            >
              <img
                src="/assets/farm-localized-1.png"
                alt="Vegetable Garden"
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </div>

          <div className="mt-20 grid gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 overflow-hidden rounded-xl shadow-lg md:order-1"
            >
              <img
                src="/assets/orchard-picking-taiwan.png"
                alt="Fruit Picking"
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 flex flex-col justify-center md:order-2"
            >
              {/* Icon removed */}
              <h2 className="mb-4 font-serif text-3xl font-bold text-primary">果園採摘區</h2>
              <p className="mb-6 text-lg text-muted-foreground">
                依季節種植草莓、藍莓等高經濟價值水果。您可以與家人一同享受採摘的樂趣，品嚐最新鮮、最甜美的時令果實。
              </p>
            </motion.div>
          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full overflow-hidden border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="/assets/farm-localized-3.png" 
                    alt="休閒動物區"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

                </div>
                <CardContent className="p-6">
                  <h3 className="mb-3 font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">休閒動物區</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    飼養溫馴可愛的療癒性動物，提供互動體驗，是孫輩來訪時的最佳遊樂場所。
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="h-full overflow-hidden border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="/assets/farm-localized-2.png" 
                    alt="農事體驗課程"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

                </div>
                <CardContent className="p-6">
                  <h3 className="mb-3 font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">農事體驗課程</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    定期舉辦農事體驗與食農教育課程，增進住戶間的交流，傳承土地的智慧。
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full overflow-hidden border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="/assets/horticulture-therapy-taiwan.png" 
                    alt="園藝療法"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

                </div>
                <CardContent className="p-6">
                  <h3 className="mb-3 font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">園藝療法</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    透過與植物的接觸與照顧，放鬆身心，達到療癒心靈的效果。
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
