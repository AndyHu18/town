import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function LifestyleSection() {
  return (
    <section className="py-24 bg-secondary/5">
      <div className="container mx-auto px-6">
        {/* Section 1: Luxury Living */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-primary/50" />
              <img 
                src="/assets/luxury-interior-living.png" 
                alt="Luxury Living Room" 
                className="w-full h-auto shadow-2xl rounded-sm"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-primary/50" />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 space-y-8"
          >
            <h3 className="text-primary font-sans tracking-widest uppercase text-sm font-bold">
              Luxury Living
            </h3>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight">
              全AI智能打造<br />高檔內裝環境
            </h2>
            <p className="text-muted-foreground font-serif text-lg leading-relaxed">
              每一處細節都經過精心雕琢，融合新古典主義的優雅與現代科技的便利。
              配備適老化設計、無障礙設施與緊急呼叫系統，讓奢華不僅是視覺的享受，更是安全的承諾。
            </p>
            <ul className="space-y-4 font-sans text-foreground/80">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                智能家居控制系統
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                全天候環境監測
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                頂級建材與工藝
              </li>
            </ul>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground mt-4">
              查看戶型
            </Button>
          </motion.div>
        </div>

        {/* Section 2: Farm & Nature (Reversed Layout) */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-primary/50" />
              <img 
                src="/assets/elegant-farm-garden.png" 
                alt="Organic Farm Garden" 
                className="w-full h-auto shadow-2xl rounded-sm"
              />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-primary/50" />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 space-y-8"
          >
            <h3 className="text-primary font-sans tracking-widest uppercase text-sm font-bold">
              Back to Nature
            </h3>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight">
              休閒農場<br />回歸自然的生活體驗
            </h2>
            <p className="text-muted-foreground font-serif text-lg leading-relaxed">
              在有機蔬菜種植區體驗播種到收成的樂趣，或在果園採摘季節性水果。
              這裡不僅是農場，更是療癒身心的綠色天堂，讓您與土地重新連結，找回生活的純粹。
            </p>
            <ul className="space-y-4 font-sans text-foreground/80">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                有機蔬菜與果園採摘
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                療癒性動物互動區
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                食農教育與園藝療法
              </li>
            </ul>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground mt-4">
              探索農場
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
