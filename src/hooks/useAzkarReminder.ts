import { useState, useEffect, useCallback, useRef } from "react";

const STORAGE_KEY = "nur-azkar-reminder";

interface AzkarReminderState {
  enabled: boolean;
  intervalHours: number;
}

const AZKAR_REMINDERS = [
  "سبحان الله وبحمده، سبحان الله العظيم",
  "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير",
  "أستغفر الله العظيم الذي لا إله إلا هو الحي القيوم وأتوب إليه",
  "اللهم صل وسلم على نبينا محمد",
  "سبحان الله، والحمد لله، ولا إله إلا الله، والله أكبر",
  "لا حول ولا قوة إلا بالله العلي العظيم",
  "حسبي الله لا إله إلا هو عليه توكلت وهو رب العرش العظيم",
  "رب اغفر لي وارحمني واهدني وعافني وارزقني",
];

const AZKAR_TRANSLATIONS = [
  "Glory be to Allah and praise Him, Glory be to Allah the Almighty",
  "There is no god but Allah alone with no partner, His is the dominion and praise, and He is over all things competent",
  "I seek forgiveness from Allah the Almighty, there is no god but He, the Living, the Sustainer, and I repent to Him",
  "O Allah, send blessings and peace upon our Prophet Muhammad",
  "Glory be to Allah, praise be to Allah, there is no god but Allah, and Allah is the Greatest",
  "There is no power nor strength except with Allah, the Most High, the Most Great",
  "Allah is sufficient for me, there is no god but He, in Him I put my trust and He is Lord of the Mighty Throne",
  "My Lord, forgive me, have mercy on me, guide me, grant me well-being and provide for me",
];

function getRandomAzkar() {
  const index = Math.floor(Math.random() * AZKAR_REMINDERS.length);
  return { arabic: AZKAR_REMINDERS[index], translation: AZKAR_TRANSLATIONS[index] };
}

function speakAzkar(text: string) {
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ar-SA";
  utterance.rate = 0.85;
  utterance.pitch = 1;

  const voices = window.speechSynthesis.getVoices();
  const arabicVoice = voices.find(
    (v) => v.lang.startsWith("ar") && v.localService
  ) || voices.find((v) => v.lang.startsWith("ar"));
  if (arabicVoice) utterance.voice = arabicVoice;

  window.speechSynthesis.speak(utterance);
}

function sendNotification(arabic: string, translation: string) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("🕌 Azkar Reminder", {
      body: `${arabic}\n\n${translation}`,
      icon: "/favicon.ico",
      tag: "azkar-reminder",
      requireInteraction: true,
    });
  }
}

export function useAzkarReminder() {
  const [state, setState] = useState<AzkarReminderState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : { enabled: false, intervalHours: 1 };
    } catch {
      return { enabled: false, intervalHours: 1 };
    }
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const triggerReminder = useCallback(() => {
    const azkar = getRandomAzkar();
    // Try voice first (works when app is open)
    speakAzkar(azkar.arabic);
    // Also send notification (works in background)
    sendNotification(azkar.arabic, azkar.translation);
  }, []);

  const enable = useCallback(async () => {
    // Request notification permission
    if ("Notification" in window && Notification.permission === "default") {
      await Notification.requestPermission();
    }

    // Load voices
    if ("speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
    }

    const newState = { ...state, enabled: true };
    setState(newState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  }, [state]);

  const disable = useCallback(() => {
    const newState = { ...state, enabled: false };
    setState(newState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [state]);

  const setIntervalHours = useCallback(
    (hours: number) => {
      const newState = { ...state, intervalHours: hours };
      setState(newState);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    },
    [state]
  );

  // Setup interval
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (state.enabled) {
      const ms = state.intervalHours * 60 * 60 * 1000;
      intervalRef.current = setInterval(triggerReminder, ms);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.enabled, state.intervalHours, triggerReminder]);

  return {
    enabled: state.enabled,
    intervalHours: state.intervalHours,
    enable,
    disable,
    setIntervalHours,
    triggerReminder,
  };
}
