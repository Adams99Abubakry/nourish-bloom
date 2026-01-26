import { useQuery } from "@tanstack/react-query";

export interface HijriDateData {
  day: number;
  month: string;
  monthArabic: string;
  year: number;
  weekday: string;
  weekdayArabic: string;
  isRamadan: boolean;
  ramadanDay: number | null;
  formatted: string;
  formattedArabic: string;
}

const HIJRI_MONTHS_ARABIC: Record<string, string> = {
  "Muḥarram": "محرم",
  "Safar": "صفر",
  "Rabīʿ al-Awwal": "ربيع الأول",
  "Rabīʿ al-Thānī": "ربيع الثاني",
  "Jumādá al-Ūlá": "جمادى الأولى",
  "Jumādá al-Ākhirah": "جمادى الآخرة",
  "Rajab": "رجب",
  "Shaʿbān": "شعبان",
  "Ramaḍān": "رمضان",
  "Shawwāl": "شوال",
  "Dhū al-Qaʿdah": "ذو القعدة",
  "Dhū al-Ḥijjah": "ذو الحجة",
};

const WEEKDAYS_ARABIC: Record<string, string> = {
  "Al Ahad": "الأحد",
  "Al Ithnayn": "الإثنين",
  "Al Thulatha": "الثلاثاء",
  "Al Arba'a": "الأربعاء",
  "Al Khamees": "الخميس",
  "Al Jumu'ah": "الجمعة",
  "Al Sabt": "السبت",
};

const fetchHijriDate = async (): Promise<HijriDateData> => {
  const today = new Date();
  const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  
  const response = await fetch(
    `https://api.aladhan.com/v1/gpiHijriFromGregorian/${dateStr}`
  );
  
  if (!response.ok) throw new Error("Failed to fetch Hijri date");
  
  const data = await response.json();
  const hijri = data.data;
  
  const monthEn = hijri.month.en;
  const isRamadan = hijri.month.number === 9;
  
  return {
    day: parseInt(hijri.day),
    month: monthEn,
    monthArabic: HIJRI_MONTHS_ARABIC[monthEn] || hijri.month.ar,
    year: parseInt(hijri.year),
    weekday: hijri.weekday.en,
    weekdayArabic: WEEKDAYS_ARABIC[hijri.weekday.en] || hijri.weekday.ar,
    isRamadan,
    ramadanDay: isRamadan ? parseInt(hijri.day) : null,
    formatted: `${hijri.day} ${monthEn} ${hijri.year} AH`,
    formattedArabic: `${hijri.day} ${HIJRI_MONTHS_ARABIC[monthEn] || hijri.month.ar} ${hijri.year} هـ`,
  };
};

export const useHijriDate = () => {
  return useQuery({
    queryKey: ["hijri-date"],
    queryFn: fetchHijriDate,
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
