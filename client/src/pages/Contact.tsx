import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import HeroVideo from "@/components/HeroVideo";
import { useMusic } from "@/contexts/MusicContext";
import { useEffect } from "react";

export default function Contact() {
  const { setTrack } = useMusic();

  useEffect(() => {
    setTrack("/assets/contact-theme.mp3");
  }, [setTrack]);

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <HeroVideo 
        videoSrc="/assets/contact-header.mp4"
        title="聯絡我們"
        subtitle="Contact Us"
      />

      {/* Contact Content */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="mb-8 font-serif text-3xl font-bold text-primary">園區資訊</h2>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold">地址</h3>
                    <p className="text-muted-foreground">宜蘭縣蘇澳鎮 (詳細地址待補)</p>
                    <p className="text-sm text-muted-foreground">距離台北約 1 小時車程</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold">電話</h3>
                    <p className="text-muted-foreground">+886 3 999 9999</p>
                    <p className="text-sm text-muted-foreground">服務時間：每日 09:00 - 18:00</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold">Email</h3>
                    <p className="text-muted-foreground">info@fufuvilla.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold">參觀時間</h3>
                    <p className="text-muted-foreground">採預約制，請提前三日預約</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-12 h-64 w-full overflow-hidden rounded-xl bg-muted">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.634636765868!2d121.8404763150036!3d24.59673298417896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3467e43100000001%3A0x0!2z5a6c6Jit5YZn5rOJ!5e0!3m2!1szh-TW!2stw!4v1625000000000!5m2!1szh-TW!2stw"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-xl bg-card p-8 shadow-lg border"
            >
              <h2 className="mb-6 font-serif text-3xl font-bold text-primary">預約參觀</h2>
              <form className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">姓名</Label>
                    <Input id="name" placeholder="您的姓名" className="bg-white border-input/50 focus:bg-white text-black placeholder:text-gray-500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">聯絡電話</Label>
                    <Input id="phone" placeholder="您的電話" className="bg-white border-input/50 focus:bg-white text-black placeholder:text-gray-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">電子郵件</Label>
                  <Input id="email" type="email" placeholder="您的 Email" className="bg-white border-input/50 focus:bg-white text-black placeholder:text-gray-500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">預計參觀日期</Label>
                  <Input id="date" type="date" className="bg-white border-input/50 focus:bg-white text-black" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">留言或特殊需求</Label>
                  <Textarea
                    id="message"
                    placeholder="請告訴我們您的需求..."
                    className="min-h-[120px] bg-white border-input/50 focus:bg-white text-black placeholder:text-gray-500"
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  送出預約申請
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
