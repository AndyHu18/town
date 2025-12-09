import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface HeroVideoProps {
  videoSrc: string;
  title: string;
  subtitle?: string;
  height?: string;
  overlayOpacity?: number;
}

export default function HeroVideo({ 
  videoSrc, 
  title, 
  subtitle, 
  height = "h-[60vh]", 
  overlayOpacity = 0.4 
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8; // Slow down slightly for more majestic feel
    }
  }, []);

  return (
    <div className={`relative w-full ${height} overflow-hidden`}>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black z-10"
        style={{ opacity: overlayOpacity }}
      />
      
      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {subtitle && (
            <p className="text-white/90 text-lg md:text-xl tracking-[0.2em] uppercase mb-4 font-light">
              {subtitle}
            </p>
          )}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white font-bold tracking-wide drop-shadow-lg">
            {title}
          </h1>
          <div className="w-24 h-1 bg-primary/80 mx-auto mt-8 rounded-full" />
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/70"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white to-transparent mx-auto" />
      </motion.div>
    </div>
  );
}
