import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, ListMusic, Check } from "lucide-react";
import { useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";
import { useMusic } from "@/contexts/MusicContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TRACKS = [
  { name: "Majestic Theme", url: "/assets/majestic-bgm.mp3" },
  { name: "Luxury Cinematic", url: "/assets/cinematic-luxury.mp3" },
  { name: "Organic Farm", url: "/assets/farm-theme.mp3" },
  { name: "Wellness & Spa", url: "/assets/wellness-theme.mp3" },
  { name: "Lifestyle", url: "/assets/lifestyle-theme.mp3" },
  { name: "Ambient Space", url: "/assets/space-ambient.mp3" },
  { name: "About Theme", url: "/assets/about-theme.mp3" },
];

// 音樂播放組件 - 已修復多重播放問題
export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const {
    currentTrack,
    isPlaying,
    isMuted,
    togglePlay,
    toggleMute,
    pause,
    setTrack,
    userHasInteracted,
    setUserHasInteracted
  } = useMusic();

  const hasShownToast = useRef(false);
  const isInitialized = useRef(false);

  // Initialize audio element once
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.loop = true;
      audio.preload = "auto";
      audioRef.current = audio;
      isInitialized.current = true;

      console.log("[BackgroundMusic] Audio element initialized");
    }

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        console.log("[BackgroundMusic] Cleaning up audio element");
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
        isInitialized.current = false;
      }
    };
  }, []); // Empty dependency array - run once on mount

  // Handle track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isInitialized.current) return;

    console.log("[BackgroundMusic] Track changed to:", currentTrack);

    // Stop current playback before changing track
    audio.pause();
    audio.currentTime = 0;
    audio.src = currentTrack;
    audio.load();

    // Resume playback if it should be playing
    if (isPlaying && userHasInteracted) {
      audio.play().catch((error) => {
        console.log("[BackgroundMusic] Play error after track change:", error);
      });
    }
  }, [currentTrack]); // Only depend on currentTrack

  // Handle play/pause state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isInitialized.current) return;

    console.log("[BackgroundMusic] Play state changed:", isPlaying);

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("[BackgroundMusic] Auto-play prevented:", error);

          // Only pause if user hasn't explicitly interacted yet
          if (!userHasInteracted) {
            pause();
          }

          // Show toast notification for first-time users
          if (!userHasInteracted && !hasShownToast.current) {
            hasShownToast.current = true;
            toast("點擊播放音樂", {
              action: {
                label: "播放",
                onClick: () => {
                  setUserHasInteracted(true);
                  togglePlay();
                },
              },
              duration: 10000,
              classNames: {
                toast: "bg-[#0B1221]/90 backdrop-blur-md border border-primary/30 shadow-[0_0_15px_rgba(234,179,8,0.2)]",
                title: "text-primary font-serif font-bold text-lg tracking-wide drop-shadow-[0_0_5px_rgba(234,179,8,0.4)]",
                actionButton: "bg-primary text-[#0B1221] hover:bg-primary/90 font-bold font-serif tracking-widest px-6",
              },
            });
          }
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, userHasInteracted, pause, setUserHasInteracted, togglePlay]);

  // Handle mute state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isInitialized.current) return;

    console.log("[BackgroundMusic] Mute state changed:", isMuted);
    audio.muted = isMuted;
  }, [isMuted]);

  const handleTogglePlay = useCallback(() => {
    setUserHasInteracted(true);
    togglePlay();
  }, [setUserHasInteracted, togglePlay]);

  const handleTrackSelect = (url: string, name: string) => {
    setUserHasInteracted(true);
    setTrack(url);
    toast.success(`現在播放: ${name}`);
  };

  return (
    <div className="fixed bottom-8 right-6 z-50 flex items-center gap-2">
      <div className={`flex items-center gap-1 bg-black/30 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-lg transition-all hover:bg-black/50 ${!isPlaying && !userHasInteracted ? 'animate-pulse ring-2 ring-primary/50' : ''}`}>

        {/* Playlist Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full text-white/80 hover:text-primary hover:bg-white/10"
              title="選擇音樂"
            >
              <ListMusic className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="top" className="w-56 bg-black/90 backdrop-blur-xl border-white/10">
            <DropdownMenuLabel className="text-white">音樂列表</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            {TRACKS.map((track) => (
              <DropdownMenuItem
                key={track.url}
                className={`text-white/80 focus:bg-primary/20 focus:text-primary cursor-pointer flex justify-between items-center ${currentTrack === track.url ? "text-primary bg-white/5" : ""
                  }`}
                onClick={() => handleTrackSelect(track.url, track.name)}
              >
                <span>{track.name}</span>
                {currentTrack === track.url && <Check className="h-3 w-3" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="w-px h-6 bg-white/10 mx-1" />

        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full text-white hover:text-primary hover:bg-white/10"
          onClick={handleTogglePlay}
          title={isPlaying ? "暫停音樂" : "播放音樂"}
        >
          {isPlaying ? (
            <div className="flex gap-1 h-4 items-center">
              <span className="w-1 h-4 bg-current animate-[music-bar_1s_ease-in-out_infinite]" />
              <span className="w-1 h-4 bg-current animate-[music-bar_1.2s_ease-in-out_infinite_0.1s]" />
              <span className="w-1 h-4 bg-current animate-[music-bar_0.8s_ease-in-out_infinite_0.2s]" />
            </div>
          ) : (
            <VolumeX className="h-5 w-5" />
          )}
        </Button>

        {isPlaying && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-white/80 hover:text-white hover:bg-white/10"
            onClick={toggleMute}
            title={isMuted ? "取消靜音" : "靜音"}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
        )}
      </div>
    </div>
  );
}
