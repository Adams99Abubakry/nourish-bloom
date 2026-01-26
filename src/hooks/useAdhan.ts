import { useState, useEffect, useCallback, useRef } from 'react';
import { PrayerTime } from './usePrayerTimes';

interface AdhanState {
  isPlaying: boolean;
  currentPrayer: string | null;
  notificationsEnabled: boolean;
  audioEnabled: boolean;
}

const ADHAN_AUDIO_URL = "https://cdn.aladhan.com/audio/adhans/adhan-makkah.mp3";

export const useAdhan = (prayers: PrayerTime[] | undefined) => {
  const [state, setState] = useState<AdhanState>(() => ({
    isPlaying: false,
    currentPrayer: null,
    notificationsEnabled: localStorage.getItem('nur-adhan-notifications') === 'true',
    audioEnabled: localStorage.getItem('nur-adhan-audio') === 'true',
  }));
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastNotifiedPrayer = useRef<string>('');

  const requestNotificationPermission = useCallback(async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }, []);

  const enableNotifications = useCallback(async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      setState(prev => ({ ...prev, notificationsEnabled: true }));
      localStorage.setItem('nur-adhan-notifications', 'true');
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
      if (!audioRef.current) {
        audioRef.current = new Audio(ADHAN_AUDIO_URL);
      }
      audioRef.current.play().catch(console.error);
      setState(prev => ({ ...prev, isPlaying: true, currentPrayer: prayerName }));
      
      audioRef.current.onended = () => {
        setState(prev => ({ ...prev, isPlaying: false, currentPrayer: null }));
      };
    }
  }, [state.audioEnabled]);

  const stopAdhan = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setState(prev => ({ ...prev, isPlaying: false, currentPrayer: null }));
  }, []);

  const showNotification = useCallback((prayerName: string, arabicName: string) => {
    if (state.notificationsEnabled && 'Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(`🕌 ${prayerName} Prayer Time`, {
        body: `It's time for ${prayerName} (${arabicName}) prayer`,
        icon: '/favicon.ico',
        tag: `adhan-${prayerName}`,
        requireInteraction: true,
      });
      
      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    }
  }, [state.notificationsEnabled]);

  // Check prayer times every second
  useEffect(() => {
    if (!prayers || prayers.length === 0) return;
    
    const checkPrayerTime = () => {
      const now = new Date();
      const currentTimeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      for (const prayer of prayers) {
        if (prayer.name === 'Sunrise') continue; // Skip sunrise
        
        if (prayer.time === currentTimeStr && lastNotifiedPrayer.current !== `${prayer.name}-${currentTimeStr}`) {
          lastNotifiedPrayer.current = `${prayer.name}-${currentTimeStr}`;
          
          showNotification(prayer.name, prayer.arabicName);
          playAdhan(prayer.name);
          break;
        }
      }
    };

    const interval = setInterval(checkPrayerTime, 1000);
    return () => clearInterval(interval);
  }, [prayers, showNotification, playAdhan]);

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
