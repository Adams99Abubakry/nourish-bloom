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

// These are actual working edition identifiers from the Al-Quran Cloud API
// Tafsir/commentary editions are separate from simple translations
export const TAFSIR_SOURCES = [
  { id: "en.sahih", name: "Sahih International (English)", language: "English" },
  { id: "en.pickthall", name: "Pickthall (English)", language: "English" },
  { id: "en.yusufali", name: "Yusuf Ali (English)", language: "English" },
  { id: "ar.muyassar", name: "Tafsir al-Muyassar (Arabic)", language: "Arabic" },
  { id: "ur.jalandhry", name: "Fateh Muhammad Jalandhry (Urdu)", language: "Urdu" },
  { id: "id.indonesian", name: "Indonesian Ministry (Indonesian)", language: "Indonesian" },
  { id: "fr.hamidullah", name: "Muhammad Hamidullah (French)", language: "French" },
  { id: "de.aburida", name: "Abu Rida Muhammad (German)", language: "German" },
  { id: "es.cortes", name: "Julio Cortés (Spanish)", language: "Spanish" },
  { id: "tr.ates", name: "Süleyman Ateş (Turkish)", language: "Turkish" },
  { id: "ru.kuliev", name: "Elmir Kuliev (Russian)", language: "Russian" },
  { id: "bn.bengali", name: "Bengali Translation", language: "Bengali" },
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

export const useTafsir = (surahNumber: number, tafsirId: string = "en.sahih") => {
  return useQuery({
    queryKey: ["tafsir", surahNumber, tafsirId],
    queryFn: () => fetchTafsir(surahNumber, tafsirId),
    staleTime: 1000 * 60 * 60 * 24, // Cache for 24 hours
    gcTime: 1000 * 60 * 60 * 24 * 7, // Keep for 7 days
  });
};
