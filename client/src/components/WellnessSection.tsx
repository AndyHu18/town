import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function WellnessSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-primary font-sans tracking-widest uppercase text-sm font-bold mb-4">
            Wellness & Community
          </h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            全方位健康守護與社群生活
          </h3>
        </div>

        <Tabs defaultValue="medical" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-[#E5E5E5] p-1 rounded-full">
              <TabsTrigger 
                value="medical" 
                className="rounded-full px-8 py-3 font-sans tracking-wide text-[#1A1A1A] data-[state=active]:bg-[#B87333] data-[state=active]:text-white transition-all"
              >
                高端醫療
              </TabsTrigger>
              <TabsTrigger 
                value="social" 
                className="rounded-full px-8 py-3 font-sans tracking-wide text-[#1A1A1A] data-[state=active]:bg-[#B87333] data-[state=active]:text-white transition-all"
              >
                社群生活
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="medical">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-lg overflow-hidden shadow-2xl"
              >
                <img 
                  src="/assets/high-end-medical-center.png" 
                  alt="High End Medical Center" 
                  className="w-full h-auto hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <p className="text-white font-display text-xl">高端健檢中心</p>
                </div>
              </motion.div>
              
              <div className="space-y-8">
                <h4 className="text-3xl font-display font-bold text-foreground">
                  醫療整合系統與 AI 智能守護
                </h4>
                <p className="text-muted-foreground font-serif text-lg leading-relaxed">
                  我們與大型醫療院所合作，結合醫學中心、中醫調理、科技復健等資源。
                  獨家的「健康中樞概念」透過醫療級傳感器，提供24小時生命跡象感知與主動干預能力。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="group relative overflow-hidden rounded-lg border border-primary/10 aspect-video">
                    <img 
                      src="/assets/smart-care-taiwan.png" 
                      alt="智能照護" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
                    <div className="absolute inset-0 p-4 flex flex-col justify-end">
                      <h5 className="font-bold text-white mb-1 text-lg drop-shadow-md">智能照護</h5>
                      <p className="text-xs text-white/90 drop-shadow-md">24小時健康安保監控與機器人照護網絡</p>
                    </div>
                  </div>
                  
                  <div className="group relative overflow-hidden rounded-lg border border-primary/10 aspect-video">
                    <img 
                      src="/assets/medical-beauty-taiwan.png" 
                      alt="醫美抗衰" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
                    <div className="absolute inset-0 p-4 flex flex-col justify-end">
                      <h5 className="font-bold text-white mb-1 text-lg drop-shadow-md">醫美抗衰</h5>
                      <p className="text-xs text-white/90 drop-shadow-md">客製化健康檔案管理、細胞免疫醫療與回春抗衰</p>
                    </div>
                  </div>
                  
                  <div className="group relative overflow-hidden rounded-lg border border-primary/10 aspect-video">
                    <img 
                      src="/assets/preventive-health-taiwan.png" 
                      alt="預防養生" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
                    <div className="absolute inset-0 p-4 flex flex-col justify-end">
                      <h5 className="font-bold text-white mb-1 text-lg drop-shadow-md">預防養生</h5>
                      <p className="text-xs text-white/90 drop-shadow-md">醫療團隊健康顧問與營養膳食定制</p>
                    </div>
                  </div>
                  
                  <div className="group relative overflow-hidden rounded-lg border border-primary/10 aspect-video">
                    <img 
                      src="/assets/exclusive-care-taiwan.png" 
                      alt="專屬守護" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
                    <div className="absolute inset-0 p-4 flex flex-col justify-end">
                      <h5 className="font-bold text-white mb-1 text-lg drop-shadow-md">專屬守護</h5>
                      <p className="text-xs text-white/90 drop-shadow-md">讓健康管理更便捷、更專業、更安心</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="social">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 order-2 lg:order-1">
                <h4 className="text-3xl font-display font-bold text-foreground">
                  私人化定制服務與社群凝聚
                </h4>
                <p className="text-muted-foreground font-serif text-lg leading-relaxed">
                  在這裡，鄰里不僅是居住者，更是志同道合的朋友。透過共同的農場活動與社交聚會，建立深厚友誼。
                  我們提供私人秘書、管家服務與專屬司機，讓您無後顧之憂地享受生活。
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      <span className="font-bold">01</span>
                    </div>
                    <div>
                      <h5 className="font-bold text-foreground">私人秘書與管家</h5>
                      <p className="text-sm text-muted-foreground">行程規劃、預約管理、生活雜務處理</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      <span className="font-bold">02</span>
                    </div>
                    <div>
                      <h5 className="font-bold text-foreground">高端水療 SPA</h5>
                      <p className="text-sm text-muted-foreground">專屬的放鬆空間，提供頂級療程</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      <span className="font-bold">03</span>
                    </div>
                    <div>
                      <h5 className="font-bold text-foreground">社群活動</h5>
                      <p className="text-sm text-muted-foreground">共同勞動創造社交機會，農場成為交流重要場所</p>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-lg overflow-hidden shadow-2xl order-1 lg:order-2"
              >
                <img 
                  src="/assets/social-club-gathering.png" 
                  alt="Social Club Gathering" 
                  className="w-full h-auto hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <p className="text-white font-display text-xl">高端會員聚落</p>
                </div>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
