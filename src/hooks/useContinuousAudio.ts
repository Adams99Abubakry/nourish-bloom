import { useState, useRef, useCallback, useEffect } from 'react';
import { getAudioUrl } from './useQuranApi';

interface ContinuousAudioState {
  isPlaying: boolean;
  currentVerse: number;
  progress: number;
  duration: number;
}

export const useContinuousAudio = (
  surahNumber: number,
  totalVerses: number,
  reciterIdentifier: string
) => {
  const [state, setState] = useState<ContinuousAudioState>({
    isPlaying: false,
    currentVerse: 1,
    progress: 0,
    duration: 0,
  });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const nextAudioRef = useRef<HTMLAudioElement | null>(null);
  const isAutoPlaying = useRef(false);

  // Preload the next verse audio - using refs to avoid dependency issues
  const preloadNextVerse = useCallback((currentVerseNum: number) => {
    if (currentVerseNum < totalVerses) {
      const nextUrl = getAudioUrl(surahNumber, currentVerseNum + 1, reciterIdentifier);
      if (!nextAudioRef.current) {
        nextAudioRef.current = new Audio();
      }
      nextAudioRef.current.src = nextUrl;
      nextAudioRef.current.preload = 'auto';
      nextAudioRef.current.load();
    }
  }, [surahNumber, totalVerses, reciterIdentifier]);

  const loadVerse = useCallback((verseNumber: number, shouldPreload = true) => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    
    const url = getAudioUrl(surahNumber, verseNumber, reciterIdentifier);
    audioRef.current.src = url;
    audioRef.current.preload = 'auto';
    audioRef.current.load();
    
    setState(prev => ({ ...prev, currentVerse: verseNumber, progress: 0 }));
    
    // Preload next verse
    if (shouldPreload && verseNumber < totalVerses) {
      const nextUrl = getAudioUrl(surahNumber, verseNumber + 1, reciterIdentifier);
      if (!nextAudioRef.current) {
        nextAudioRef.current = new Audio();
      }
      nextAudioRef.current.src = nextUrl;
      nextAudioRef.current.preload = 'auto';
      nextAudioRef.current.load();
    }
  }, [surahNumber, reciterIdentifier, totalVerses]);

  const play = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      loadVerse(state.currentVerse);
    }
    
    const audio = audioRef.current;
    
    const startPlayback = () => {
      audio.play().catch(console.error);
      isAutoPlaying.current = true;
      setState(prev => ({ ...prev, isPlaying: true }));
    };
    
    if (audio.readyState >= 2) {
      startPlayback();
    } else {
      audio.addEventListener('canplaythrough', startPlayback, { once: true });
      audio.load();
    }
  }, [state.currentVerse, loadVerse]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    isAutoPlaying.current = false;
    setState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  const togglePlay = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [state.isPlaying, play, pause]);

  const goToVerse = useCallback((verseNumber: number) => {
    const wasPlaying = state.isPlaying;
    
    // Use preloaded audio if available for the next verse
    if (nextAudioRef.current && verseNumber === state.currentVerse + 1) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = nextAudioRef.current;
      nextAudioRef.current = null;
      setState(prev => ({ ...prev, currentVerse: verseNumber, progress: 0 }));
      preloadNextVerse(verseNumber);
      
      if (wasPlaying) {
        audioRef.current.play().catch(console.error);
      }
    } else {
      loadVerse(verseNumber);
      if (wasPlaying) {
        const audio = audioRef.current;
        if (audio) {
          audio.addEventListener('canplaythrough', () => {
            audio.play().catch(console.error);
          }, { once: true });
        }
      }
    }
  }, [state.isPlaying, state.currentVerse, loadVerse, preloadNextVerse]);

  const nextVerse = useCallback(() => {
    if (state.currentVerse < totalVerses) {
      goToVerse(state.currentVerse + 1);
    }
  }, [state.currentVerse, totalVerses, goToVerse]);

  const previousVerse = useCallback(() => {
    if (state.currentVerse > 1) {
      goToVerse(state.currentVerse - 1);
    }
  }, [state.currentVerse, goToVerse]);

  // Handle audio events
  useEffect(() => {
    const setupAudioEvents = () => {
      const audio = audioRef.current;
      if (!audio) return () => {};

      const handleTimeUpdate = () => {
        setState(prev => ({
          ...prev,
          progress: audio.currentTime,
          duration: audio.duration || 0,
        }));
      };

      const handleEnded = () => {
        if (isAutoPlaying.current) {
          setState(prev => {
            if (prev.currentVerse < totalVerses) {
              const nextVerseNum = prev.currentVerse + 1;
              
              // Use preloaded audio for seamless transition
              if (nextAudioRef.current) {
                if (audioRef.current) {
                  audioRef.current.pause();
                }
                audioRef.current = nextAudioRef.current;
                nextAudioRef.current = null;
                
                // Start playing immediately
                audioRef.current.play().catch(console.error);
                
                // Preload the next one
                if (nextVerseNum < totalVerses) {
                  const nextUrl = getAudioUrl(surahNumber, nextVerseNum + 1, reciterIdentifier);
                  nextAudioRef.current = new Audio();
                  nextAudioRef.current.src = nextUrl;
                  nextAudioRef.current.preload = 'auto';
                  nextAudioRef.current.load();
                }
                
                return { ...prev, currentVerse: nextVerseNum, progress: 0 };
              } else {
                // Fallback: load and play
                const url = getAudioUrl(surahNumber, nextVerseNum, reciterIdentifier);
                if (audioRef.current) {
                  audioRef.current.src = url;
                  audioRef.current.load();
                  audioRef.current.play().catch(console.error);
                }
                return { ...prev, currentVerse: nextVerseNum, progress: 0 };
              }
            } else {
              isAutoPlaying.current = false;
              return { ...prev, isPlaying: false };
            }
          });
        }
      };

      const handleLoadedMetadata = () => {
        setState(prev => ({ ...prev, duration: audio.duration }));
      };

      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);

      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    };

    const cleanup = setupAudioEvents();
    return cleanup;
  }, [totalVerses, surahNumber, reciterIdentifier]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (nextAudioRef.current) {
        nextAudioRef.current = null;
      }
    };
  }, []);

  // Reset when surah or reciter changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (nextAudioRef.current) {
      nextAudioRef.current = null;
    }
    setState({
      isPlaying: false,
      currentVerse: 1,
      progress: 0,
      duration: 0,
    });
    
    // Load first verse
    const url = getAudioUrl(surahNumber, 1, reciterIdentifier);
    audioRef.current = new Audio();
    audioRef.current.src = url;
    audioRef.current.preload = 'auto';
    audioRef.current.load();
    
    // Preload second verse
    if (totalVerses > 1) {
      const nextUrl = getAudioUrl(surahNumber, 2, reciterIdentifier);
      nextAudioRef.current = new Audio();
      nextAudioRef.current.src = nextUrl;
      nextAudioRef.current.preload = 'auto';
      nextAudioRef.current.load();
    }
  }, [surahNumber, reciterIdentifier, totalVerses]);

  return {
    ...state,
    play,
    pause,
    togglePlay,
    goToVerse,
    nextVerse,
    previousVerse,
  };
};
