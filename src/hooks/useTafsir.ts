import { useQuery } from "@tanstack/react-query";

export interface TafsirVerse {
  verseNumber: number;
  text: string;
}

export interface TafsirData {
  surahNumber: number;
  surahName: string;
  tafsir: TafsirVerse[];
  source: string;
  language: string;
}

export const TAFSIR_SOURCES = [
  { id: "en.ibn-kathir", name: "Tafsir Ibn Kathir", language: "English" },
  { id: "ar.muyassar", name: "Tafsir al-Muyassar", language: "Arabic" },
  { id: "en.jalalayn", name: "Tafsir al-Jalalayn", language: "English" },
];

// Fetch Tafsir for a surah
const fetchTafsir = async (surahNumber: number, tafsirId: string): Promise<TafsirData> => {
  // Using the quran.com API for tafsir
  const response = await fetch(
    `https://api.alquran.cloud/v1/surah/${surahNumber}/${tafsirId}`
  );
  
  if (!response.ok) throw new Error("Failed to fetch tafsir");
  
  const data = await response.json();
  const surahData = data.data;
  
  const tafsir: TafsirVerse[] = surahData.ayahs.map((ayah: any) => ({
    verseNumber: ayah.numberInSurah,
    text: ayah.text,
  }));

  const source = TAFSIR_SOURCES.find(t => t.id === tafsirId);
  
  return {
    surahNumber,
    surahName: surahData.englishName,
    tafsir,
    source: source?.name || tafsirId,
    language: source?.language || "English",
  };
};

export const useTafsir = (surahNumber: number, tafsirId: string = "en.ibn-kathir") => {
  return useQuery({
    queryKey: ["tafsir", surahNumber, tafsirId],
    queryFn: () => fetchTafsir(surahNumber, tafsirId),
    staleTime: 1000 * 60 * 60 * 24, // Cache for 24 hours
    gcTime: 1000 * 60 * 60 * 24 * 7, // Keep for 7 days
  });
};
