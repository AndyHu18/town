import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type MusicContextType = {
  currentTrack: string;
  isPlaying: boolean;
  isMuted: boolean;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  setTrack: (trackUrl: string) => void;
  toggleMute: () => void;
  userHasInteracted: boolean;
  setUserHasInteracted: (hasInteracted: boolean) => void;
};

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};

interface MusicProviderProps {
  children: ReactNode;
}

export const MusicProvider: React.FC<MusicProviderProps> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<string>('/assets/majestic-bgm.mp3');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [userHasInteracted, setUserHasInteracted] = useState(false);

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  
  const togglePlay = () => {
    setIsPlaying(prev => !prev);
    setUserHasInteracted(true);
  };

  const setTrack = (trackUrl: string) => {
    if (currentTrack !== trackUrl) {
      setCurrentTrack(trackUrl);
      // If user has interacted and was playing, ensure we keep playing
      if (userHasInteracted && isPlaying) {
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  return (
    <MusicContext.Provider value={{ 
      currentTrack, 
      isPlaying, 
      isMuted, 
      play, 
      pause, 
      togglePlay, 
      setTrack, 
      toggleMute,
      userHasInteracted,
      setUserHasInteracted
    }}>
      {children}
    </MusicContext.Provider>
  );
};
