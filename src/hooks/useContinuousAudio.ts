import { useState, useRef, useCallback, useEffect } from "react";
import { getAudioUrl } from "./useQuranApi";

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
  
  // Keep ONE stable audio element for the whole hook lifetime.
  // Swapping audio elements breaks event listeners (and auto-advance) on mobile.
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const preloadRef = useRef<HTMLAudioElement | null>(null);
  const preloadedVerseRef = useRef<number | null>(null);
  const isAutoPlaying = useRef(false);
  const stateRef = useRef(state);

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

  const safePlay = useCallback(async (audio: HTMLAudioElement) => {
    // Don’t wait for canplaythrough (can be slow/never fire). Try to play immediately.
    try {
      await audio.play();
      return;
    } catch {
      // Retry once the browser has buffered enough.
      const retry = () => {
        audio.play().catch(console.error);
      };
      audio.addEventListener("canplay", retry, { once: true });
      audio.load();
    }
  }, []);

  const play = useCallback(() => {
    const audio = ensureAudio();

    // Ensure we have a source.
    if (!audio.src) {
      loadVerse(stateRef.current.currentVerse);
    }

    isAutoPlaying.current = true;
    setState((prev) => ({ ...prev, isPlaying: true }));
    void safePlay(audio);
  }, [ensureAudio, loadVerse, safePlay]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (audio) audio.pause();
    isAutoPlaying.current = false;
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

      const cv = stateRef.current.currentVerse;
      if (cv >= totalVerses) {
        isAutoPlaying.current = false;
        setState((prev) => ({ ...prev, isPlaying: false }));
        return;
      }

      const nextVerseNum = cv + 1;

      // Move to next verse immediately.
      // (We keep the SAME audio element so ended listeners keep working.)
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

      // Start immediately; if buffering is needed, safePlay will retry on canplay.
      void safePlay(audio);

      // Preload the following verse.
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

    setState({
      isPlaying: false,
      currentVerse: 1,
      progress: 0,
      duration: 0,
    });

    // Load first verse + preload second.
    setAudioSrcForVerse(audio, 1);
    audio.load();
    preloadVerse(2);
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
