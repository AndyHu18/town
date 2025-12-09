import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 border-r border-b border-white rounded-br-full" />
        <div className="absolute bottom-0 right-0 w-64 h-64 border-l border-t border-white rounded-tl-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-bold"
            >
              預約您的<br />富居生活
            </motion.h2>
            <p className="font-serif text-lg md:text-xl opacity-90 leading-relaxed">
              誠摯邀請您親臨華友聯健康科技健康園區，體驗高端奢華的健康生活。
              請填寫右側表單，我們的專屬顧問將盡快與您聯繫，安排私人導覽行程。
            </p>
            
            <div className="space-y-4 pt-8 border-t border-white/20">
              <div>
                <h4 className="font-bold text-lg mb-1">接待中心地址</h4>
                <p className="opacity-80 font-sans">宜蘭縣蘇澳鎮 (詳細地址待補)</p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">貴賓專線</h4>
                <p className="opacity-80 font-sans text-xl">+886 3 999 9999</p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">電子信箱</h4>
                <p className="opacity-80 font-sans">info@fufuvilla.com</p>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white text-foreground p-8 md:p-12 rounded-lg shadow-2xl"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wide">姓名</label>
                  <Input placeholder="您的姓名" className="bg-background border-input" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wide">聯絡電話</label>
                  <Input placeholder="您的電話" className="bg-background border-input" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wide">電子信箱</label>
                <Input type="email" placeholder="您的 Email" className="bg-background border-input" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wide">預約參觀日期</label>
                <Input type="date" className="bg-background border-input" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wide">留言或特殊需求</label>
                <Textarea placeholder="請告訴我們您的需求..." className="bg-background border-input min-h-[120px]" />
              </div>

              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg font-sans tracking-widest">
                送出預約
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
