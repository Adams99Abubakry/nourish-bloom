import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export interface PrayerTime {
  name: string;
  arabicName: string;
  time: string;
  timestamp?: number;
}

export interface PrayerTimesData {
  prayers: PrayerTime[];
  date: string;
  hijriDate: string;
  location: string;
  nextPrayer: PrayerTime | null;
  timeToNextPrayer: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
}

const PRAYER_ARABIC_NAMES: Record<string, string> = {
  Fajr: "الفجر",
  Sunrise: "الشروق",
  Dhuhr: "الظهر",
  Asr: "العصر",
  Maghrib: "المغرب",
  Isha: "العشاء",
};

// Fetch prayer times from Aladhan API
const fetchPrayerTimes = async (latitude: number, longitude: number): Promise<PrayerTimesData> => {
  const today = new Date();
  const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  
  const response = await fetch(
    `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${latitude}&longitude=${longitude}&method=2`
  );
  
  if (!response.ok) throw new Error("Failed to fetch prayer times");
  
  const data = await response.json();
  const timings = data.data.timings;
  const hijri = data.data.date.hijri;
  
  const prayerNames = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
  
  const prayers: PrayerTime[] = prayerNames.map((name) => {
    const timeStr = timings[name];
    const [hours, minutes] = timeStr.split(":").map(Number);
    const timestamp = hours * 60 + minutes;
    
    return {
      name,
      arabicName: PRAYER_ARABIC_NAMES[name],
      time: timeStr,
      timestamp,
    };
  });

  // Calculate next prayer
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
  let nextPrayer: PrayerTime | null = null;
  for (const prayer of prayers) {
    if (prayer.timestamp && prayer.timestamp > currentMinutes) {
      nextPrayer = prayer;
      break;
    }
  }
  
  // If no prayer found today, next prayer is Fajr tomorrow
  if (!nextPrayer) {
    nextPrayer = prayers[0];
  }

  // Calculate time to next prayer
  let timeToNext = "";
  if (nextPrayer?.timestamp) {
    let minutesUntil = nextPrayer.timestamp - currentMinutes;
    if (minutesUntil < 0) {
      minutesUntil += 24 * 60; // Add 24 hours for tomorrow
    }
    const hours = Math.floor(minutesUntil / 60);
    const mins = minutesUntil % 60;
    timeToNext = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  }

  return {
    prayers,
    date: data.data.date.readable,
    hijriDate: `${hijri.day} ${hijri.month.en} ${hijri.year}`,
    location: "",
    nextPrayer,
    timeToNextPrayer: timeToNext,
  };
};

// Get user's location
const getUserLocation = (): Promise<Location> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      // Default to Mecca if geolocation not available
      resolve({
        latitude: 21.4225,
        longitude: 39.8262,
        city: "Mecca",
        country: "Saudi Arabia",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        // Reverse geocode to get city name
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const data = await response.json();
          
          resolve({
            latitude,
            longitude,
            city: data.city || data.locality || "Unknown",
            country: data.countryName || "",
          });
        } catch {
          resolve({
            latitude,
            longitude,
            city: "Your Location",
            country: "",
          });
        }
      },
      () => {
        // Default to Mecca on error
        resolve({
          latitude: 21.4225,
          longitude: 39.8262,
          city: "Mecca",
          country: "Saudi Arabia",
        });
      },
      { timeout: 10000 }
    );
  });
};

export const useLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserLocation().then((loc) => {
      setLocation(loc);
      setLoading(false);
    });
  }, []);

  return { location, loading };
};

export const usePrayerTimes = (location: Location | null) => {
  return useQuery({
    queryKey: ["prayer-times", location?.latitude, location?.longitude],
    queryFn: () => fetchPrayerTimes(location!.latitude, location!.longitude),
    enabled: !!location,
    staleTime: 1000 * 60 * 5, // Refresh every 5 minutes
    refetchInterval: 1000 * 60, // Re-check every minute for next prayer updates
  });
};

// Combined hook for easy use
export const usePrayerTimesWithLocation = () => {
  const { location, loading: locationLoading } = useLocation();
  const { data, isLoading, error } = usePrayerTimes(location);

  return {
    prayerData: data,
    location,
    isLoading: locationLoading || isLoading,
    error,
  };
};
