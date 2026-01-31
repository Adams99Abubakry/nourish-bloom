import { useState, useRef, useCallback, useEffect } from "react";
import { getAudioUrl } from "./useQuranApi";

interface ContinuousAudioState {
  isPlaying: boolean;
  currentVerse: number;
  progress: number;
  duration: number;
}

// Bismillah audio URL - verse 1 of Surah 1 (Al-Fatihah)
const getBismillahUrl = (reciterIdentifier: string) => {
  return `https://everyayah.com/data/${reciterIdentifier}/001001.mp3`;
};

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
  
  // Keep ONE stable audio element for the whole hook lifetime.
  // Swapping audio elements breaks event listeners (and auto-advance) on mobile.
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const preloadRef = useRef<HTMLAudioElement | null>(null);
  const preloadedVerseRef = useRef<number | null>(null);
  const isAutoPlaying = useRef(false);
  const stateRef = useRef(state);
  const playingBismillah = useRef(false);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = "auto";
    }
    return audioRef.current;
  }, []);

  const ensurePreload = useCallback(() => {
    if (!preloadRef.current) {
      preloadRef.current = new Audio();
      preloadRef.current.preload = "auto";
    }
    return preloadRef.current;
  }, []);

  const setAudioSrcForVerse = useCallback(
    (audio: HTMLAudioElement, verseNumber: number) => {
      audio.src = getAudioUrl(surahNumber, verseNumber, reciterIdentifier);
      audio.preload = "auto";
    },
    [surahNumber, reciterIdentifier]
  );

  const preloadVerse = useCallback(
    (verseNumber: number) => {
      if (verseNumber < 1 || verseNumber > totalVerses) return;
      const preload = ensurePreload();
      preloadedVerseRef.current = verseNumber;
      setAudioSrcForVerse(preload, verseNumber);
      preload.load();
    },
    [ensurePreload, setAudioSrcForVerse, totalVerses]
  );

  const loadVerse = useCallback(
    (verseNumber: number) => {
      const audio = ensureAudio();
      setAudioSrcForVerse(audio, verseNumber);

      // reset local progress UI
      setState((prev) => ({
        ...prev,
        currentVerse: verseNumber,
        progress: 0,
        duration: 0,
      }));

      audio.currentTime = 0;
      audio.load();
      preloadVerse(verseNumber + 1);
    },
    [ensureAudio, setAudioSrcForVerse, preloadVerse]
  );

  // Immediately start playing - no waiting for canplaythrough
  const safePlay = useCallback(async (audio: HTMLAudioElement) => {
    try {
      await audio.play();
      return;
    } catch {
      // Retry once the browser has buffered enough
      const retry = () => {
        audio.play().catch(console.error);
      };
      audio.addEventListener("canplay", retry, { once: true });
      audio.load();
    }
  }, []);

  // Check if this surah should have Bismillah read
  // Surah 1 (Al-Fatihah) - Bismillah is part of the surah
  // Surah 9 (At-Tawbah) - No Bismillah
  // All other surahs - Bismillah should be read before
  const shouldPlayBismillah = useCallback(() => {
    return surahNumber !== 1 && surahNumber !== 9;
  }, [surahNumber]);

  const play = useCallback(() => {
    const audio = ensureAudio();
    isAutoPlaying.current = true;
    setState((prev) => ({ ...prev, isPlaying: true }));

    // If starting from verse 1 and should play bismillah
    if (stateRef.current.currentVerse === 1 && shouldPlayBismillah() && !playingBismillah.current) {
      playingBismillah.current = true;
      audio.src = getBismillahUrl(reciterIdentifier);
      audio.load();
      void safePlay(audio);
    } else {
      // Ensure we have a source for the current verse
      if (!audio.src || audio.src === "" || playingBismillah.current) {
        playingBismillah.current = false;
        loadVerse(stateRef.current.currentVerse);
      }
      void safePlay(audio);
    }
  }, [ensureAudio, loadVerse, safePlay, shouldPlayBismillah, reciterIdentifier]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (audio) audio.pause();
    isAutoPlaying.current = false;
    playingBismillah.current = false;
    setState((prev) => ({ ...prev, isPlaying: false }));
  }, []);

  const togglePlay = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [state.isPlaying, play, pause]);

  const goToVerse = useCallback((verseNumber: number) => {
    const wasPlaying = stateRef.current.isPlaying;
    playingBismillah.current = false;
    loadVerse(verseNumber);
    if (wasPlaying) {
      isAutoPlaying.current = true;
      const audio = ensureAudio();
      void safePlay(audio);
    }
  }, [ensureAudio, loadVerse, safePlay]);

  const nextVerse = useCallback(() => {
    const cv = stateRef.current.currentVerse;
    if (cv < totalVerses) goToVerse(cv + 1);
  }, [totalVerses, goToVerse]);

  const previousVerse = useCallback(() => {
    const cv = stateRef.current.currentVerse;
    if (cv > 1) goToVerse(cv - 1);
  }, [goToVerse]);

  // Handle audio events
  useEffect(() => {
    const audio = ensureAudio();

    const handleTimeUpdate = () => {
      setState((prev) => ({
        ...prev,
        progress: audio.currentTime,
        duration: audio.duration || 0,
      }));
    };

    const handleLoadedMetadata = () => {
      setState((prev) => ({ ...prev, duration: audio.duration || 0 }));
    };

    const handleEnded = () => {
      if (!isAutoPlaying.current) return;

      // If we just finished playing Bismillah, now play verse 1
      if (playingBismillah.current) {
        playingBismillah.current = false;
        setAudioSrcForVerse(audio, 1);
        audio.currentTime = 0;
        preloadVerse(2);
        void safePlay(audio);
        return;
      }

      const cv = stateRef.current.currentVerse;
      if (cv >= totalVerses) {
        isAutoPlaying.current = false;
        setState((prev) => ({ ...prev, isPlaying: false }));
        return;
      }

      const nextVerseNum = cv + 1;

      // Move to next verse immediately - use preloaded audio if available
      const preload = preloadRef.current;
      if (preloadedVerseRef.current === nextVerseNum && preload?.src) {
        audio.src = preload.src;
      } else {
        setAudioSrcForVerse(audio, nextVerseNum);
      }

      audio.currentTime = 0;
      setState((prev) => ({
        ...prev,
        currentVerse: nextVerseNum,
        progress: 0,
        duration: 0,
      }));

      // Start immediately
      void safePlay(audio);

      // Preload the following verse
      preloadVerse(nextVerseNum + 1);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [ensureAudio, preloadVerse, safePlay, setAudioSrcForVerse, totalVerses]);

  // Reset when surah or reciter changes
  useEffect(() => {
    const audio = ensureAudio();
    audio.pause();
    audio.currentTime = 0;
    isAutoPlaying.current = false;
    preloadedVerseRef.current = null;
    playingBismillah.current = false;

    setState({
      isPlaying: false,
      currentVerse: 1,
      progress: 0,
      duration: 0,
    });

    // Preload first verse (or bismillah)
    if (surahNumber !== 1 && surahNumber !== 9) {
      // Preload bismillah
      audio.src = getBismillahUrl(reciterIdentifier);
      audio.load();
    } else {
      setAudioSrcForVerse(audio, 1);
      audio.load();
    }
    preloadVerse(surahNumber !== 1 && surahNumber !== 9 ? 1 : 2);
  }, [ensureAudio, preloadVerse, reciterIdentifier, setAudioSrcForVerse, surahNumber, totalVerses]);

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
