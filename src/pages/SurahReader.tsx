import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { surahs } from "@/data/quranData";
import { ChevronLeft, ChevronRight, BookOpen, Bookmark, Settings, Loader2 } from "lucide-react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSurah, TRANSLATIONS, RECITERS, getAudioUrl } from "@/hooks/useQuranApi";
import { AudioPlayer } from "@/components/AudioPlayer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

const SurahReader = () => {
  const { surahNumber } = useParams();
  const navigate = useNavigate();
  const currentNumber = parseInt(surahNumber || "1");
  
  const [selectedTranslation, setSelectedTranslation] = useState("en.sahih");
  const [selectedReciter, setSelectedReciter] = useState(RECITERS[0].audioIdentifier);
  const [currentVerseAudio, setCurrentVerseAudio] = useState(1);
  const [showSettings, setShowSettings] = useState(false);

  const { data: surahData, isLoading, error } = useSurah(currentNumber, selectedTranslation);
  
  const currentSurah = surahs.find(s => s.number === currentNumber);
  const prevSurah = surahs.find(s => s.number === currentNumber - 1);
  const nextSurah = surahs.find(s => s.number === currentNumber + 1);

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

  const audioUrl = getAudioUrl(currentNumber, currentVerseAudio, selectedReciter);

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

        {/* Audio Player */}
        <div className="mb-6 animate-slide-up">
          <AudioPlayer
            audioUrl={audioUrl}
            verseNumber={currentVerseAudio}
            totalVerses={currentSurah.numberOfAyahs}
            onNext={() => setCurrentVerseAudio(Math.min(currentVerseAudio + 1, currentSurah.numberOfAyahs))}
            onPrevious={() => setCurrentVerseAudio(Math.max(currentVerseAudio - 1, 1))}
          />
        </div>

        {/* Settings Toggle */}
        <div className="flex items-center justify-between mb-6 animate-slide-up">
          <div className="flex gap-2">
            <Button variant="subtle" size="sm">
              <Bookmark className="w-4 h-4 mr-1" />
              Bookmark
            </Button>
          </div>
          <Button 
            variant={showSettings ? "subtle" : "ghost"} 
            size="icon-sm"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <Card variant="subtle" className="mb-6 animate-fade-in">
            <CardContent className="p-4 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Translation
                  </label>
                  <Select value={selectedTranslation} onValueChange={setSelectedTranslation}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TRANSLATIONS.map((t) => (
                        <SelectItem key={t.id} value={t.id}>
                          {t.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Reciter
                  </label>
                  <Select value={selectedReciter} onValueChange={setSelectedReciter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {RECITERS.map((r) => (
                        <SelectItem key={r.id} value={r.audioIdentifier}>
                          {r.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bismillah */}
        {currentNumber !== 9 && currentNumber !== 1 && (
          <div className="text-center py-6 mb-4 animate-slide-up">
            <p className="arabic-xl text-foreground">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i} variant="subtle">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Skeleton className="w-8 h-8 rounded-full shrink-0" />
                    <div className="flex-1 space-y-3">
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card variant="subtle" className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground mb-4">Failed to load surah. Please try again.</p>
              <Button variant="subtle" onClick={() => window.location.reload()}>
                Retry
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Verses */}
        {surahData && (
          <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            {surahData.verses.map((verse) => (
              <Card 
                key={verse.numberInSurah} 
                variant="subtle" 
                className={`overflow-hidden group cursor-pointer transition-all ${
                  currentVerseAudio === verse.numberInSurah 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => setCurrentVerseAudio(verse.numberInSurah)}
              >
                <CardContent className="p-6">
                  {/* Verse Number */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      currentVerseAudio === verse.numberInSurah 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-primary/10'
                    }`}>
                      <span className={`text-sm font-medium ${
                        currentVerseAudio === verse.numberInSurah 
                          ? 'text-primary-foreground' 
                          : 'text-primary'
                      }`}>
                        {verse.numberInSurah}
                      </span>
                    </div>
                    <div className="flex-1">
                      {/* Arabic */}
                      <p className="arabic-lg text-foreground text-right leading-loose mb-4">
                        {verse.arabic}
                      </p>
                      
                      {/* Translation */}
                      <p className="text-foreground leading-relaxed">
                        {verse.translation}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

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
