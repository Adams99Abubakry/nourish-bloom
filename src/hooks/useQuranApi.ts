import { useQuery } from "@tanstack/react-query";

export interface Verse {
  number: number;
  numberInSurah: number;
  arabic: string;
  translation: string;
  transliteration?: string;
  audioUrl?: string;
}

export interface SurahData {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  verses: Verse[];
}

export interface Translation {
  id: string;
  name: string;
  language: string;
}

export const TRANSLATIONS: Translation[] = [
  { id: "en.sahih", name: "Sahih International", language: "English" },
  { id: "en.pickthall", name: "Pickthall", language: "English" },
  { id: "en.yusufali", name: "Yusuf Ali", language: "English" },
];

export const RECITERS = [
  { id: "ar.alafasy", name: "Mishary Rashid Alafasy", audioIdentifier: "Alafasy_128kbps" },
  { id: "ar.abdulbasit", name: "Abdul Basit Abdul Samad", audioIdentifier: "Abdul_Basit_Murattal_192kbps" },
  { id: "ar.hudhaify", name: "Ali Al-Hudhaify", audioIdentifier: "Hudhaify_128kbps" },
  { id: "ar.minshawi", name: "Mohamed Siddiq Al-Minshawi", audioIdentifier: "Minshawy_Mujawwad_192kbps" },
];

// Get audio URL for a specific verse
export const getAudioUrl = (surahNumber: number, verseNumber: number, reciterIdentifier: string = "Alafasy_128kbps") => {
  const surahPadded = String(surahNumber).padStart(3, "0");
  const versePadded = String(verseNumber).padStart(3, "0");
  return `https://everyayah.com/data/${reciterIdentifier}/${surahPadded}${versePadded}.mp3`;
};

// Fetch surah with Arabic text
const fetchSurahArabic = async (surahNumber: number) => {
  const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`);
  if (!response.ok) throw new Error("Failed to fetch surah");
  const data = await response.json();
  return data.data;
};

// Fetch translation for a surah
const fetchSurahTranslation = async (surahNumber: number, translationId: string) => {
  const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/${translationId}`);
  if (!response.ok) throw new Error("Failed to fetch translation");
  const data = await response.json();
  return data.data;
};

// Fetch both Arabic and translation together
const fetchSurahWithTranslation = async (
  surahNumber: number,
  translationId: string = "en.sahih"
): Promise<SurahData> => {
  const [arabicData, translationData] = await Promise.all([
    fetchSurahArabic(surahNumber),
    fetchSurahTranslation(surahNumber, translationId),
  ]);

  const verses: Verse[] = arabicData.ayahs.map((ayah: any, index: number) => ({
    number: ayah.number,
    numberInSurah: ayah.numberInSurah,
    arabic: ayah.text,
    translation: translationData.ayahs[index]?.text || "",
    audioUrl: getAudioUrl(surahNumber, ayah.numberInSurah),
  }));

  return {
    number: arabicData.number,
    name: arabicData.name,
    englishName: arabicData.englishName,
    englishNameTranslation: arabicData.englishNameTranslation,
    numberOfAyahs: arabicData.numberOfAyahs,
    revelationType: arabicData.revelationType,
    verses,
  };
};

// React Query hook for fetching surah data
export const useSurah = (surahNumber: number, translationId: string = "en.sahih") => {
  return useQuery({
    queryKey: ["surah", surahNumber, translationId],
    queryFn: () => fetchSurahWithTranslation(surahNumber, translationId),
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
    gcTime: 1000 * 60 * 60 * 24, // Keep in cache for 24 hours
  });
};

// Fetch all surahs list (for navigation)
const fetchSurahsList = async () => {
  const response = await fetch("https://api.alquran.cloud/v1/surah");
  if (!response.ok) throw new Error("Failed to fetch surahs list");
  const data = await response.json();
  return data.data;
};

export const useSurahsList = () => {
  return useQuery({
    queryKey: ["surahs-list"],
    queryFn: fetchSurahsList,
    staleTime: 1000 * 60 * 60 * 24, // Cache for 24 hours
  });
};
