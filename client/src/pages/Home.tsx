import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";

import LifestyleSection from "@/components/LifestyleSection";
import WellnessSection from "@/components/WellnessSection";
import ContactSection from "@/components/ContactSection";
import ScrollReveal from "@/components/ScrollReveal";
import { useMusic } from "@/contexts/MusicContext";
import { useEffect, useState } from "react";

export default function Home() {
  const { setTrack, pause: pauseBgMusic, play: playBgMusic, isPlaying: isBgMusicPlaying } = useMusic();
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [wasBgMusicPlaying, setWasBgMusicPlaying] = useState(false);

  useEffect(() => {
    setTrack("/assets/majestic-bgm.mp3");
  }, [setTrack]);

  // Restore background music when leaving the page
  useEffect(() => {
    return () => {
      if (wasBgMusicPlaying && !isVideoMuted) {
        playBgMusic();
      }
    };
  }, [wasBgMusicPlaying, isVideoMuted, playBgMusic]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <main className="relative overflow-hidden">
        <HeroSection />


        
        <ScrollReveal direction="up" delay={0.2}>
          <FeaturesSection />
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={0.2}>
          <LifestyleSection />
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={0.2}>
          <WellnessSection />
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={0.2}>
          <ContactSection />
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <section className="w-full h-[60vh] relative overflow-hidden group">
            <video
              autoPlay
              loop
              muted
              playsInline
              id="lifestyle-video"
              className="absolute top-0 left-0 w-full h-full object-cover"
              poster="/assets/luxury-lifestyle-poster.jpg"
            >
              <source src="/assets/luxury-lifestyle-family-taiwan-with-audio.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/20" />
            
            {/* Audio Control Button */}
            <button 
              onClick={(e) => {
                const video = document.getElementById('lifestyle-video') as HTMLVideoElement;
                const willBeMuted = !video.muted;
                video.muted = willBeMuted;
                setIsVideoMuted(willBeMuted);
                
                // Manage background music based on video audio state
                if (!willBeMuted) {
                  // Video audio is ON, pause background music
                  setWasBgMusicPlaying(isBgMusicPlaying);
                  pauseBgMusic();
                } else {
                  // Video audio is OFF, restore background music if it was playing
                  if (wasBgMusicPlaying) {
                    playBgMusic();
                  }
                }
                
                e.currentTarget.innerHTML = willBeMuted ? 
                  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>' : 
                  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>';
              }}
              className="absolute bottom-8 right-8 z-20 p-3 rounded-full bg-black/40 hover:bg-primary/80 text-white backdrop-blur-sm transition-all duration-300 border border-white/20 hover:scale-110"
              aria-label="Toggle Audio"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
              </svg>
            </button>
          </section>
        </ScrollReveal>
      </main>
    </div>
  );
}
