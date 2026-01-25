import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { surahs } from "@/data/quranData";
import { ChevronLeft, ChevronRight, BookOpen, Play, Bookmark, Settings } from "lucide-react";
import { useParams, Link, useNavigate } from "react-router-dom";

// Sample verses for Al-Fatihah (in production, this would come from an API)
const alFatihahVerses = [
  {
    number: 1,
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
    transliteration: "Bismillahir Rahmanir Raheem"
  },
  {
    number: 2,
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    translation: "All praise is due to Allah, Lord of the worlds.",
    transliteration: "Alhamdu lillahi Rabbil 'aalameen"
  },
  {
    number: 3,
    arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
    translation: "The Entirely Merciful, the Especially Merciful.",
    transliteration: "Ar-Rahmanir-Raheem"
  },
  {
    number: 4,
    arabic: "مَالِكِ يَوْمِ الدِّينِ",
    translation: "Sovereign of the Day of Recompense.",
    transliteration: "Maliki Yawmid-Deen"
  },
  {
    number: 5,
    arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    translation: "It is You we worship and You we ask for help.",
    transliteration: "Iyyaka na'budu wa iyyaka nasta'een"
  },
  {
    number: 6,
    arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
    translation: "Guide us to the straight path.",
    transliteration: "Ihdinas-Siratal-Mustaqeem"
  },
  {
    number: 7,
    arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
    translation: "The path of those upon whom You have bestowed favor, not of those who have earned [Your] anger or of those who are astray.",
    transliteration: "Siratal-ladheena an'amta 'alayhim, ghayril-maghdoobi 'alayhim wa lad-daalleen"
  }
];

const SurahReader = () => {
  const { surahNumber } = useParams();
  const navigate = useNavigate();
  const currentNumber = parseInt(surahNumber || "1");
  
  const currentSurah = surahs.find(s => s.number === currentNumber);
  const prevSurah = surahs.find(s => s.number === currentNumber - 1);
  const nextSurah = surahs.find(s => s.number === currentNumber + 1);

  // Use sample verses for demo (in production, fetch from API)
  const verses = currentNumber === 1 ? alFatihahVerses : alFatihahVerses.map((v, i) => ({
    ...v,
    number: i + 1,
  }));

  if (!currentSurah) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">Surah not found</p>
          <Link to="/quran">
            <Button variant="subtle" className="mt-4">
              Back to Qur'an
            </Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 max-w-3xl">
        {/* Surah Header */}
        <Card variant="spiritual" className="mb-6 overflow-hidden animate-fade-in">
          <CardContent className="p-6 text-center relative">
            <div className="absolute inset-0 islamic-pattern opacity-20" />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-foreground/20 mb-4">
                <span className="text-primary-foreground font-bold">{currentSurah.number}</span>
              </div>
              <h1 className="arabic-xl text-primary-foreground mb-2">{currentSurah.name}</h1>
              <p className="text-lg text-primary-foreground font-medium">{currentSurah.englishName}</p>
              <p className="text-primary-foreground/70 text-sm">{currentSurah.englishNameTranslation}</p>
              <div className="flex items-center justify-center gap-4 mt-4 text-sm text-primary-foreground/60">
                <span>{currentSurah.revelationType}</span>
                <span>•</span>
                <span>{currentSurah.numberOfAyahs} Verses</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reading Controls */}
        <div className="flex items-center justify-between mb-6 animate-slide-up">
          <div className="flex gap-2">
            <Button variant="subtle" size="sm">
              <Play className="w-4 h-4 mr-1" />
              Play
            </Button>
            <Button variant="subtle" size="sm">
              <Bookmark className="w-4 h-4 mr-1" />
              Bookmark
            </Button>
          </div>
          <Button variant="ghost" size="icon-sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        {/* Bismillah */}
        {currentNumber !== 9 && currentNumber !== 1 && (
          <div className="text-center py-6 mb-4 animate-slide-up">
            <p className="arabic-xl text-foreground">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          </div>
        )}

        {/* Verses */}
        <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {verses.map((verse) => (
            <Card key={verse.number} variant="subtle" className="overflow-hidden group">
              <CardContent className="p-6">
                {/* Verse Number */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary text-sm font-medium">{verse.number}</span>
                  </div>
                  <div className="flex-1">
                    {/* Arabic */}
                    <p className="arabic-lg text-foreground text-right leading-loose mb-4">
                      {verse.arabic}
                    </p>
                    
                    {/* Transliteration */}
                    <p className="text-sm text-muted-foreground italic mb-2">
                      {verse.transliteration}
                    </p>
                    
                    {/* Translation */}
                    <p className="text-foreground">
                      {verse.translation}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 py-6 border-t border-border animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {prevSurah ? (
            <Button
              variant="subtle"
              onClick={() => navigate(`/quran/${prevSurah.number}`)}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              {prevSurah.englishName}
            </Button>
          ) : (
            <div />
          )}
          
          <Link to="/quran">
            <Button variant="ghost" size="sm">
              <BookOpen className="w-4 h-4 mr-1" />
              All Surahs
            </Button>
          </Link>

          {nextSurah ? (
            <Button
              variant="subtle"
              onClick={() => navigate(`/quran/${nextSurah.number}`)}
            >
              {nextSurah.englishName}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <div />
          )}
        </div>
      </main>
    </div>
  );
};

export default SurahReader;
