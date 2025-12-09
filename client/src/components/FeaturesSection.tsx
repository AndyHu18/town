import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import ScrollReveal from "./ScrollReveal";
// Icons removed

const features = [
  {
    // icon removed
    title: "硬體建設",
    description: "健康宅、商場與高級會員聚落，結合綠建築與雨水循環系統，打造永續共生環境。",
    color: "text-[#B87333]", // Bronze/Gold
    image: "/assets/aspect-hardware.png"
  },
  {
    // icon removed
    title: "運營概念",
    description: "健康智慧頂級住宅，融合永續共生自然環境與健康保健人體宜養理念。",
    color: "text-[#B87333]",
    image: "/assets/aspect-operation.png"
  },
  {
    // icon removed
    title: "醫療整合",
    description: "結合大型醫療院所、AI智能感知與24小時照護，提供全方位健康守護。",
    color: "text-[#B87333]",
    image: "/assets/medical-integration-taiwan.png"
  },
  {
    // icon removed
    title: "財務計畫",
    description: "穩健的財務規劃與投資回報，確保園區永續經營與資產價值。",
    color: "text-[#B87333]",
    image: "/assets/financial-plan-taiwan.png"
  },
  {
    // icon removed
    title: "休閒農場",
    description: "有機種植、果園採摘與動物互動，回歸自然的生活體驗與食農教育。",
    color: "text-[#B87333]",
    image: "/assets/aspect-farm.png"
  },
  {
    // icon removed
    title: "國際金融",
    description: "國際金融商品交易中心，連結全球資本，創造多元價值。",
    color: "text-[#B87333]",
    image: "/assets/international-finance-taiwan.png"
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-12 bg-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <ScrollReveal direction="up">
            <h2 className="text-primary font-sans tracking-widest uppercase text-sm font-bold mb-4">
              Six Dimensions of Operation
            </h2>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.1}>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              經營六大面向
            </h3>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.2}>
            <div className="h-[2px] w-24 bg-primary mx-auto" />
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {features.map((feature, index) => (
            <ScrollReveal 
              key={index} 
              direction="up" 
              delay={index * 0.1}
              className="h-full"
            >
              <Card className="h-full border-0 rounded-none shadow-none hover:shadow-none transition-all duration-500 bg-transparent group overflow-hidden">
                {/* Image Header - Maximized */}
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-6 text-left z-20">
                    <h4 className="text-3xl font-serif font-bold mb-3 text-white group-hover:text-primary-foreground transition-colors drop-shadow-md">
                      {feature.title}
                    </h4>
                    
                    <div className="w-12 h-[2px] bg-primary mb-4 group-hover:w-24 transition-all duration-500" />

                    <p className="text-white/90 font-serif text-lg leading-relaxed drop-shadow-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
