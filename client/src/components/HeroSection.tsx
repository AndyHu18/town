import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      {/* Background Video/Image with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full"
          poster="/assets/hero-aerial-view.png"
        >
          <source src="/assets/resort-ambiance.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" /> {/* Overlay - Darkened for better contrast */}
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white font-sans tracking-[0.3em] text-sm md:text-base uppercase mb-6"
        >
          華友聯健康科技健康園區
        </motion.h2>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-8 leading-tight drop-shadow-2xl"
        >
          擁抱翠綠山水<br />
          <span className="text-primary italic font-serif drop-shadow-md">享受宜蘭富居</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/95 font-serif text-xl md:text-2xl max-w-3xl mb-8 leading-relaxed drop-shadow-lg"
        >
          結合高端醫療、智能科技與自然療癒<br />
          為您打造全方位的健康奢華生活
        </motion.p>

        {/* Decorative Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-primary/60"></div>
          <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_20px_rgba(234,179,8,0.8)]"></div>
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-primary/60"></div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-primary/90 font-sans text-sm md:text-base tracking-[0.4em] uppercase drop-shadow-[0_0_15px_rgba(234,179,8,0.6)]"
        >
          Full Life Villa
        </motion.p>
      </motion.div>



      {/* Enhanced Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center cursor-pointer group"
      >
        <span className="text-white/80 text-xs font-sans tracking-widest mb-3 uppercase group-hover:text-primary transition-colors duration-300">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[2px] h-16 bg-gradient-to-b from-primary via-white/50 to-transparent shadow-[0_0_10px_rgba(234,179,8,0.5)]"
        />
      </motion.div>
    </section>
  );
}
