import { useState, useEffect, useCallback, useRef } from 'react';
import { PrayerTime } from './usePrayerTimes';

interface AdhanState {
  isPlaying: boolean;
  currentPrayer: string | null;
  notificationsEnabled: boolean;
  audioEnabled: boolean;
}

// Full Makkah Adhan audio - higher quality and more reliable URL
const ADHAN_AUDIO_URL = "https://www.islamcan.com/audio/adhan/azan1.mp3";
// Fajr-specific Adhan (different tune traditionally)
const FAJR_ADHAN_URL = "https://www.islamcan.com/audio/adhan/azan8.mp3";

const PRAYER_ARABIC_NAMES_MAP: Record<string, string> = {
  Fajr: "الفجر", Dhuhr: "الظهر", Asr: "العصر", Maghrib: "المغرب", Isha: "العشاء",
};

export const useAdhan = (prayers: PrayerTime[] | undefined) => {
  const [state, setState] = useState<AdhanState>(() => ({
    isPlaying: false,
    currentPrayer: null,
    notificationsEnabled: localStorage.getItem('nur-adhan-notifications') === 'true',
    audioEnabled: localStorage.getItem('nur-adhan-audio') === 'true',
  }));
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastNotifiedPrayer = useRef<string>('');
  const notificationCheckRef = useRef<boolean>(false);

  // Request notification permission with better handling for mobile/APK
  const requestNotificationPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      console.log('Notifications not supported');
      return false;
    }
    
    // Check current permission state
    if (Notification.permission === 'granted') {
      return true;
    }
    
    if (Notification.permission === 'denied') {
      console.log('Notifications were denied by user');
      return false;
    }
    
    // Request permission
    try {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }, []);

  const enableNotifications = useCallback(async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      setState(prev => ({ ...prev, notificationsEnabled: true }));
      localStorage.setItem('nur-adhan-notifications', 'true');
      
      // Store a marker that we've enabled notifications
      localStorage.setItem('nur-adhan-enabled-timestamp', Date.now().toString());
    }
    return granted;
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

  const playAdhan = useCallback((prayerName: string) => {
    if (state.audioEnabled) {
      // Clean up existing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      
      // Use Fajr-specific adhan for Fajr prayer
      const adhanUrl = prayerName === 'Fajr' ? FAJR_ADHAN_URL : ADHAN_AUDIO_URL;
      
      const audio = new Audio();
      audioRef.current = audio;
      audio.volume = 1.0;
      
      // For Capacitor/mobile apps, we need to set attributes before loading
      audio.setAttribute('playsinline', 'true');
      audio.preload = 'auto';
      
      // Set up event handlers before playing
      audio.onended = () => {
        setState(prev => ({ ...prev, isPlaying: false, currentPrayer: null }));
      };
      
      audio.onerror = (e) => {
        console.error('Adhan audio error:', e);
        setState(prev => ({ ...prev, isPlaying: false, currentPrayer: null }));
      };

      audio.src = adhanUrl;
      
      // Use a more robust play approach for mobile/Capacitor
      const attemptPlay = () => {
        audio.play()
          .then(() => {
            setState(prev => ({ ...prev, isPlaying: true, currentPrayer: prayerName }));
          })
          .catch((error) => {
            console.error('Failed to play adhan:', error);
            // On mobile, autoplay may be blocked — show notification instead
            showNotification(prayerName, PRAYER_ARABIC_NAMES_MAP[prayerName] || '');
            setState(prev => ({ ...prev, isPlaying: false, currentPrayer: null }));
          });
      };

      // Wait for audio to be ready
      if (audio.readyState >= 2) {
        attemptPlay();
      } else {
        audio.oncanplay = attemptPlay;
      }
    }
  }, [state.audioEnabled]);

  const stopAdhan = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setState(prev => ({ ...prev, isPlaying: false, currentPrayer: null }));
  }, []);

  const showNotification = useCallback((prayerName: string, arabicName: string) => {
    if (state.notificationsEnabled && 'Notification' in window && Notification.permission === 'granted') {
      try {
        const notification = new Notification(`🕌 ${prayerName} Prayer Time`, {
          body: `It's time for ${prayerName} (${arabicName}) prayer. May Allah accept your prayers.`,
          icon: '/favicon.ico',
          tag: `adhan-${prayerName}-${Date.now()}`,
          requireInteraction: true,
          silent: false, // Allow sound
        });
        
        notification.onclick = () => {
          window.focus();
          notification.close();
        };
        
        // Auto-close after 30 seconds
        setTimeout(() => {
          notification.close();
        }, 30000);
        
      } catch (error) {
        console.error('Error showing notification:', error);
      }
    }
  }, [state.notificationsEnabled]);

  // Check prayer times every second - improved for mobile/APK
  useEffect(() => {
    if (!prayers || prayers.length === 0) return;
    
    const checkPrayerTime = () => {
      const now = new Date();
      const currentHours = now.getHours().toString().padStart(2, '0');
      const currentMinutes = now.getMinutes().toString().padStart(2, '0');
      const currentTimeStr = `${currentHours}:${currentMinutes}`;
      const currentSeconds = now.getSeconds();
      
      // Only check at the start of each minute (first 5 seconds)
      // This prevents multiple triggers
      if (currentSeconds > 5) return;
      
      for (const prayer of prayers) {
        if (prayer.name === 'Sunrise') continue; // Skip sunrise
        
        const prayerKey = `${prayer.name}-${currentTimeStr}`;
        
        if (prayer.time === currentTimeStr && lastNotifiedPrayer.current !== prayerKey) {
          lastNotifiedPrayer.current = prayerKey;
          
          // Show notification first
          showNotification(prayer.name, prayer.arabicName);
          
          // Then play adhan
          playAdhan(prayer.name);
          
          break;
        }
      }
    };

    // Initial check
    checkPrayerTime();
    
    // Check every second
    const interval = setInterval(checkPrayerTime, 1000);
    return () => clearInterval(interval);
  }, [prayers, showNotification, playAdhan]);

  // Re-check notification permission on mount (for APK/PWA)
  useEffect(() => {
    if (state.notificationsEnabled && !notificationCheckRef.current) {
      notificationCheckRef.current = true;
      
      // Verify permission is still granted
      if ('Notification' in window && Notification.permission !== 'granted') {
        // Permission was revoked, update state
        setState(prev => ({ ...prev, notificationsEnabled: false }));
        localStorage.setItem('nur-adhan-notifications', 'false');
      }
    }
  }, [state.notificationsEnabled]);

  return {
    isPlaying: state.isPlaying,
    currentPrayer: state.currentPrayer,
    notificationsEnabled: state.notificationsEnabled,
    audioEnabled: state.audioEnabled,
    enableNotifications,
    disableNotifications,
    toggleAudio,
    playAdhan,
    stopAdhan,
  };
};
