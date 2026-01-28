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
  const isAutoPlaying = useRef(false);

  const loadVerse = useCallback((verseNumber: number) => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    
    const url = getAudioUrl(surahNumber, verseNumber, reciterIdentifier);
    audioRef.current.src = url;
    audioRef.current.load();
    
    setState(prev => ({ ...prev, currentVerse: verseNumber, progress: 0 }));
  }, [surahNumber, reciterIdentifier]);

  const play = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      loadVerse(state.currentVerse);
    }
    
    // Ensure audio is loaded before playing
    const audio = audioRef.current;
    if (audio.readyState >= 2) {
      audio.play().catch(console.error);
      isAutoPlaying.current = true;
      setState(prev => ({ ...prev, isPlaying: true }));
    } else {
      audio.addEventListener('canplaythrough', function onCanPlay() {
        audio.removeEventListener('canplaythrough', onCanPlay);
        audio.play().catch(console.error);
        isAutoPlaying.current = true;
        setState(prev => ({ ...prev, isPlaying: true }));
      }, { once: true });
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
    loadVerse(verseNumber);
    
    if (wasPlaying) {
      // Reduced delay for quicker response
      setTimeout(() => {
        audioRef.current?.play().catch(console.error);
      }, 50);
    }
  }, [state.isPlaying, loadVerse]);

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
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setState(prev => ({
        ...prev,
        progress: audio.currentTime,
        duration: audio.duration || 0,
      }));
    };

    const handleEnded = () => {
      // Auto-play next verse if we were auto-playing
      if (isAutoPlaying.current && state.currentVerse < totalVerses) {
        const nextVerseNum = state.currentVerse + 1;
        loadVerse(nextVerseNum);
        
        // Reduced delay for smoother continuous playback
        setTimeout(() => {
          audio.play().catch(console.error);
        }, 50);
      } else {
        setState(prev => ({ ...prev, isPlaying: false }));
        isAutoPlaying.current = false;
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
  }, [state.currentVerse, totalVerses, loadVerse]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Reset when surah changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setState({
      isPlaying: false,
      currentVerse: 1,
      progress: 0,
      duration: 0,
    });
    loadVerse(1);
  }, [surahNumber, reciterIdentifier, loadVerse]);

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
