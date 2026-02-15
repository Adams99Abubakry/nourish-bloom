import { useState, useEffect, useCallback, useRef } from 'react';
import { PrayerTime } from './usePrayerTimes';

interface AdhanState {
  isPlaying: boolean;
  currentPrayer: string | null;
  notificationsEnabled: boolean;
  audioEnabled: boolean;
  selectedAdhan: string;
}

// Multiple Adhan voice options for user selection
export const ADHAN_OPTIONS = [
  { id: 'makkah', name: 'Makkah (Default)', url: 'https://www.islamcan.com/audio/adhan/azan1.mp3', fajrUrl: 'https://www.islamcan.com/audio/adhan/azan8.mp3' },
  { id: 'madinah', name: 'Madinah', url: 'https://www.islamcan.com/audio/adhan/azan2.mp3', fajrUrl: 'https://www.islamcan.com/audio/adhan/azan8.mp3' },
  { id: 'alaqsa', name: 'Al-Aqsa', url: 'https://www.islamcan.com/audio/adhan/azan3.mp3', fajrUrl: 'https://www.islamcan.com/audio/adhan/azan8.mp3' },
  { id: 'mishary', name: 'Mishary Rashid', url: 'https://www.islamcan.com/audio/adhan/azan4.mp3', fajrUrl: 'https://www.islamcan.com/audio/adhan/azan8.mp3' },
  { id: 'abdulbasit', name: 'Abdul Basit', url: 'https://www.islamcan.com/audio/adhan/azan5.mp3', fajrUrl: 'https://www.islamcan.com/audio/adhan/azan8.mp3' },
  { id: 'egypt', name: 'Egypt', url: 'https://www.islamcan.com/audio/adhan/azan6.mp3', fajrUrl: 'https://www.islamcan.com/audio/adhan/azan8.mp3' },
  { id: 'turkish', name: 'Turkish', url: 'https://www.islamcan.com/audio/adhan/azan7.mp3', fajrUrl: 'https://www.islamcan.com/audio/adhan/azan8.mp3' },
];

const PRAYER_ARABIC_NAMES_MAP: Record<string, string> = {
  Fajr: "الفجر", Dhuhr: "الظهر", Asr: "العصر", Maghrib: "المغرب", Isha: "العشاء",
};

// Detect if running inside Capacitor (native app)
const isCapacitor = (): boolean => {
  return !!(window as any).Capacitor || !!(window as any).capacitor;
};

// Check if notifications are available (may not be in Capacitor WebView)
const isNotificationSupported = (): boolean => {
  // In Capacitor, the browser Notification API may not exist
  if (isCapacitor()) return false;
  return 'Notification' in window;
};

export const useAdhan = (prayers: PrayerTime[] | undefined) => {
  const [state, setState] = useState<AdhanState>(() => ({
    isPlaying: false,
    currentPrayer: null,
    notificationsEnabled: localStorage.getItem('nur-adhan-notifications') === 'true',
    audioEnabled: localStorage.getItem('nur-adhan-audio') === 'true',
    selectedAdhan: localStorage.getItem('nur-adhan-voice') || 'makkah',
  }));
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastNotifiedPrayer = useRef<string>('');

  const getSelectedAdhanUrls = useCallback(() => {
    const option = ADHAN_OPTIONS.find(o => o.id === state.selectedAdhan) || ADHAN_OPTIONS[0];
    return option;
  }, [state.selectedAdhan]);

  // For Capacitor apps, we skip browser notification permission
  // and just enable audio-based alerts directly
  const requestNotificationPermission = useCallback(async () => {
    if (isCapacitor()) {
      // In Capacitor, we just enable audio — no browser notification needed
      return true;
    }
    
    if (!isNotificationSupported()) {
      // Still allow enabling — we'll just play audio
      return true;
    }
    
    if (Notification.permission === 'granted') return true;
    if (Notification.permission === 'denied') return true; // Still allow — audio will work
    
    try {
      await Notification.requestPermission();
      return true;
    } catch {
      return true; // Allow anyway — audio is the primary mechanism
    }
  }, []);

  const enableNotifications = useCallback(async () => {
    await requestNotificationPermission();
    setState(prev => ({ ...prev, notificationsEnabled: true, audioEnabled: true }));
    localStorage.setItem('nur-adhan-notifications', 'true');
    localStorage.setItem('nur-adhan-audio', 'true');
    return true;
  }, [requestNotificationPermission]);

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

  const playAdhan = useCallback((prayerName: string) => {
    // Clean up existing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    
    const adhanOption = ADHAN_OPTIONS.find(o => o.id === state.selectedAdhan) || ADHAN_OPTIONS[0];
    const adhanUrl = prayerName === 'Fajr' ? adhanOption.fajrUrl : adhanOption.url;
    
    const audio = new Audio();
    audioRef.current = audio;
    audio.volume = 1.0;
    
    // Critical for Capacitor/mobile
    audio.setAttribute('playsinline', 'true');
    audio.setAttribute('webkit-playsinline', 'true');
    audio.preload = 'auto';
    
    audio.onended = () => {
      setState(prev => ({ ...prev, isPlaying: false, currentPrayer: null }));
    };
    
    audio.onerror = (e) => {
      console.error('Adhan audio error:', e);
      setState(prev => ({ ...prev, isPlaying: false, currentPrayer: null }));
    };

    audio.src = adhanUrl;
    
    const attemptPlay = () => {
      audio.play()
        .then(() => {
          setState(prev => ({ ...prev, isPlaying: true, currentPrayer: prayerName }));
        })
        .catch((error) => {
          console.error('Failed to play adhan:', error);
          // Try showing notification as fallback
          showNotification(prayerName, PRAYER_ARABIC_NAMES_MAP[prayerName] || '');
          setState(prev => ({ ...prev, isPlaying: false, currentPrayer: null }));
        });
    };

    if (audio.readyState >= 2) {
      attemptPlay();
    } else {
      audio.oncanplay = attemptPlay;
    }
  }, [state.selectedAdhan]);

  // Preview/test a specific adhan voice
  const previewAdhan = useCallback((adhanId: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    
    const option = ADHAN_OPTIONS.find(o => o.id === adhanId) || ADHAN_OPTIONS[0];
    const audio = new Audio();
    audioRef.current = audio;
    audio.volume = 1.0;
    audio.setAttribute('playsinline', 'true');
    audio.setAttribute('webkit-playsinline', 'true');
    audio.preload = 'auto';
    audio.src = option.url;
    
    audio.onended = () => {
      setState(prev => ({ ...prev, isPlaying: false, currentPrayer: null }));
    };

    const attemptPlay = () => {
      audio.play()
        .then(() => setState(prev => ({ ...prev, isPlaying: true, currentPrayer: 'Preview' })))
        .catch(err => console.error('Preview failed:', err));
    };

    if (audio.readyState >= 2) attemptPlay();
    else audio.oncanplay = attemptPlay;
  }, []);

  const stopAdhan = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setState(prev => ({ ...prev, isPlaying: false, currentPrayer: null }));
  }, []);

  const showNotification = useCallback((prayerName: string, arabicName: string) => {
    if (isNotificationSupported() && Notification.permission === 'granted') {
      try {
        new Notification(`🕌 ${prayerName} Prayer Time`, {
          body: `It's time for ${prayerName} (${arabicName}) prayer. May Allah accept your prayers.`,
          icon: '/favicon.ico',
          tag: `adhan-${prayerName}-${Date.now()}`,
          requireInteraction: true,
          silent: false,
        });
      } catch (error) {
        console.error('Error showing notification:', error);
      }
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
