import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { useMusic } from "@/contexts/MusicContext";

export default function OverviewVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { pause: pauseGlobalMusic, play: playGlobalMusic, isPlaying: isGlobalMusicPlaying } = useMusic();
  const [wasGlobalMusicPlaying, setWasGlobalMusicPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        if (wasGlobalMusicPlaying) {
          playGlobalMusic();
        }
      } else {
        setWasGlobalMusicPlaying(isGlobalMusicPlaying);
        pauseGlobalMusic();
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-wider">
            預見未來 <span className="text-primary/80">尊榮共享</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto font-light">
            華友聯健康科技園區，為您重新定義奢華與健康的完美平衡
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-5xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 group"
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster="/assets/overview-ref-exterior.png"
            onClick={togglePlay}
            playsInline
          >
            <source src="/assets/overview-video-remastered.mp4" type="video/mp4" />
            <track 
              kind="subtitles" 
              src="/assets/overview-subtitles.vtt" 
              srcLang="zh-TW" 
              label="繁體中文" 
              default 
            />
            您的瀏覽器不支援影片播放。
          </video>

          {/* Custom Controls Overlay */}
          <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
            <button 
              onClick={togglePlay}
              className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all transform hover:scale-110"
            >
              {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
            </button>
          </div>

          <div className="absolute bottom-6 right-6 z-10">
            <button 
              onClick={toggleMute}
              className="p-3 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/70 transition-colors"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
