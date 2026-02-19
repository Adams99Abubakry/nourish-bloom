import { useState, useEffect, useCallback, useRef } from 'react';
import { PrayerTime } from './usePrayerTimes';

interface AdhanState {
  isPlaying: boolean;
  currentPrayer: string | null;
  currentPreviewId: string | null;
  notificationsEnabled: boolean;
  audioEnabled: boolean;
  selectedAdhan: string;
}

// Multiple Adhan voice options for user selection
export const ADHAN_OPTIONS = [
  { id: 'makkah', name: 'Makkah', url: 'https://www.islamcan.com/audio/adhan/azan1.mp3', fajrUrl: 'https://www.islamcan.com/audio/adhan/azan8.mp3' },
];

const PRAYER_ARABIC_NAMES_MAP: Record<string, string> = {
  Fajr: "الفجر", Dhuhr: "الظهر", Asr: "العصر", Maghrib: "المغرب", Isha: "العشاء",
};

// Detect if running inside Capacitor (native app)
const isCapacitor = (): boolean => {
  return !!(window as any).Capacitor || !!(window as any).capacitor;
};

export const useAdhan = (prayers: PrayerTime[] | undefined) => {
  const [state, setState] = useState<AdhanState>(() => ({
    isPlaying: false,
    currentPrayer: null,
    currentPreviewId: null,
    notificationsEnabled: localStorage.getItem('nur-adhan-notifications') === 'true',
    audioEnabled: localStorage.getItem('nur-adhan-audio') === 'true',
    selectedAdhan: localStorage.getItem('nur-adhan-voice') || 'makkah',
  }));
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastNotifiedPrayer = useRef<string>('');

  // Enable notifications — skip browser Notification API entirely in Capacitor
  const enableNotifications = useCallback(async () => {
    // In Capacitor, don't check browser notification API at all
    if (!isCapacitor()) {
      if ('Notification' in window && Notification.permission === 'default') {
        try { await Notification.requestPermission(); } catch {}
      }
    }
    setState(prev => ({ ...prev, notificationsEnabled: true, audioEnabled: true }));
    localStorage.setItem('nur-adhan-notifications', 'true');
    localStorage.setItem('nur-adhan-audio', 'true');
    return true;
  }, []);

  const disableNotifications = useCallback(() => {
    setState(prev => ({ ...prev, notificationsEnabled: false }));
    localStorage.setItem('nur-adhan-notifications', 'false');
  }, []);

  const toggleAudio = useCallback(() => {
    setState(prev => {
      const newValue = !prev.audioEnabled;
      localStorage.setItem('nur-adhan-audio', String(newValue));
      return { ...prev, audioEnabled: newValue };
    });
  }, []);

  const setSelectedAdhan = useCallback((id: string) => {
    setState(prev => ({ ...prev, selectedAdhan: id }));
    localStorage.setItem('nur-adhan-voice', id);
  }, []);

  const stopAdhan = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setState(prev => ({ ...prev, isPlaying: false, currentPrayer: null, currentPreviewId: null }));
  }, []);

  // Core audio play function — used for both adhan and preview
  const playAudioUrl = useCallback((url: string, label: string, previewId?: string) => {
    // ALWAYS stop any current audio first
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    const audio = new Audio();
    audioRef.current = audio;
    audio.volume = 1.0;
    audio.setAttribute('playsinline', 'true');
    audio.setAttribute('webkit-playsinline', 'true');
    audio.preload = 'auto';
    audio.src = url;

    audio.onended = () => {
      setState(prev => ({ ...prev, isPlaying: false, currentPrayer: null, currentPreviewId: null }));
      audioRef.current = null;
    };

    audio.onerror = () => {
      setState(prev => ({ ...prev, isPlaying: false, currentPrayer: null, currentPreviewId: null }));
      audioRef.current = null;
    };

    const attemptPlay = () => {
      audio.play()
        .then(() => {
          setState(prev => ({ ...prev, isPlaying: true, currentPrayer: label, currentPreviewId: previewId || null }));
        })
        .catch((error) => {
          console.error('Failed to play adhan:', error);
          setState(prev => ({ ...prev, isPlaying: false, currentPrayer: null, currentPreviewId: null }));
        });
    };

    if (audio.readyState >= 2) {
      attemptPlay();
    } else {
      audio.oncanplay = attemptPlay;
    }
  }, []);

  const playAdhan = useCallback((prayerName: string) => {
    const adhanOption = ADHAN_OPTIONS.find(o => o.id === state.selectedAdhan) || ADHAN_OPTIONS[0];
    const url = prayerName === 'Fajr' ? adhanOption.fajrUrl : adhanOption.url;
    playAudioUrl(url, prayerName);
  }, [state.selectedAdhan, playAudioUrl]);

  // Preview a specific adhan voice — only plays that one voice
  const previewAdhan = useCallback((adhanId: string) => {
    // If already previewing this same one, stop it
    if (state.isPlaying && state.currentPreviewId === adhanId) {
      stopAdhan();
      return;
    }
    const option = ADHAN_OPTIONS.find(o => o.id === adhanId) || ADHAN_OPTIONS[0];
    playAudioUrl(option.url, 'Preview', adhanId);
  }, [state.isPlaying, state.currentPreviewId, playAudioUrl, stopAdhan]);

  // Show notification (web only)
  const showNotification = useCallback((prayerName: string, arabicName: string) => {
    if (isCapacitor()) return;
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(`🕌 ${prayerName} Prayer Time`, {
          body: `It's time for ${prayerName} (${arabicName}) prayer.`,
          icon: '/favicon.ico',
          tag: `adhan-${prayerName}-${Date.now()}`,
          requireInteraction: true,
          silent: false,
        });
      } catch {}
    }
  }, []);

  // Check prayer times every second
  useEffect(() => {
    if (!prayers || prayers.length === 0) return;
    if (!state.notificationsEnabled && !state.audioEnabled) return;
    
    const checkPrayerTime = () => {
      const now = new Date();
      const currentHours = now.getHours().toString().padStart(2, '0');
      const currentMinutes = now.getMinutes().toString().padStart(2, '0');
      const currentTimeStr = `${currentHours}:${currentMinutes}`;
      const currentSeconds = now.getSeconds();
      
      if (currentSeconds > 5) return;
      
      for (const prayer of prayers) {
        if (prayer.name === 'Sunrise') continue;
        
        const prayerKey = `${prayer.name}-${currentTimeStr}`;
        
        if (prayer.time === currentTimeStr && lastNotifiedPrayer.current !== prayerKey) {
          lastNotifiedPrayer.current = prayerKey;
          showNotification(prayer.name, prayer.arabicName);
          if (state.audioEnabled) {
            playAdhan(prayer.name);
          }
          break;
        }
      }
    };

    checkPrayerTime();
    const interval = setInterval(checkPrayerTime, 1000);
    return () => clearInterval(interval);
  }, [prayers, state.notificationsEnabled, state.audioEnabled, showNotification, playAdhan]);

  return {
    isPlaying: state.isPlaying,
    currentPrayer: state.currentPrayer,
    currentPreviewId: state.currentPreviewId,
    notificationsEnabled: state.notificationsEnabled,
    audioEnabled: state.audioEnabled,
    selectedAdhan: state.selectedAdhan,
    enableNotifications,
    disableNotifications,
    toggleAudio,
    setSelectedAdhan,
    playAdhan,
    previewAdhan,
    stopAdhan,
  };
};
