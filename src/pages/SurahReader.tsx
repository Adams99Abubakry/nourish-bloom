import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { surahs } from "@/data/quranData";
import { ChevronLeft, ChevronRight, BookOpen, Bookmark, Settings, Play, Pause, SkipBack, SkipForward, Volume2, BookMarked } from "lucide-react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useSurah, TRANSLATIONS, RECITERS, getAudioUrl } from "@/hooks/useQuranApi";
import { useTafsir, TAFSIR_SOURCES } from "@/hooks/useTafsir";
import { useContinuousAudio } from "@/hooks/useContinuousAudio";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const SurahReader = () => {
  const { surahNumber } = useParams();
  const navigate = useNavigate();
  const currentNumber = parseInt(surahNumber || "1");
  
  const [selectedTranslation, setSelectedTranslation] = useState("en.sahih");
  const [selectedReciter, setSelectedReciter] = useState(RECITERS[0].audioIdentifier);
  const [selectedTafsir, setSelectedTafsir] = useState("en.ibn-kathir");
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState<"reading" | "tafsir">("reading");
  
  const verseRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const { data: surahData, isLoading, error } = useSurah(currentNumber, selectedTranslation);
  const { data: tafsirData, isLoading: tafsirLoading } = useTafsir(currentNumber, selectedTafsir);
  
  const currentSurah = surahs.find(s => s.number === currentNumber);
  const prevSurah = surahs.find(s => s.number === currentNumber - 1);
  const nextSurah = surahs.find(s => s.number === currentNumber + 1);

  const {
    isPlaying,
    currentVerse,
    progress,
    duration,
    togglePlay,
    goToVerse,
    nextVerse,
    previousVerse,
  } = useContinuousAudio(currentNumber, currentSurah?.numberOfAyahs || 1, selectedReciter);

  // Auto-scroll to current verse
  useEffect(() => {
    if (isPlaying && verseRefs.current[currentVerse]) {
      verseRefs.current[currentVerse]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentVerse, isPlaying]);

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-4xl">
        {/* Surah Header */}
        <Card variant="spiritual" className="mb-4 sm:mb-6 overflow-hidden animate-fade-in">
          <CardContent className="p-4 sm:p-6 text-center relative">
            <div className="absolute inset-0 islamic-pattern opacity-20" />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary-foreground/20 mb-3 sm:mb-4">
                <span className="text-primary-foreground font-bold text-sm sm:text-base">{currentSurah.number}</span>
              </div>
              <h1 className="arabic-xl text-primary-foreground mb-1 sm:mb-2">{currentSurah.name}</h1>
              <p className="text-base sm:text-lg text-primary-foreground font-medium">{currentSurah.englishName}</p>
              <p className="text-primary-foreground/70 text-xs sm:text-sm">{currentSurah.englishNameTranslation}</p>
              <div className="flex items-center justify-center gap-2 sm:gap-4 mt-3 sm:mt-4 text-xs sm:text-sm text-primary-foreground/60">
                <span>{currentSurah.revelationType}</span>
                <span>•</span>
                <span>{currentSurah.numberOfAyahs} Verses</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Continuous Audio Player */}
        <Card variant="elevated" className="mb-4 sm:mb-6 animate-slide-up">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Playback Controls */}
              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={previousVerse}
                  disabled={currentVerse <= 1}
                  className="w-8 h-8 sm:w-9 sm:h-9"
                >
                  <SkipBack className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Button>
                
                <Button
                  variant="spiritual"
                  size="icon"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" />
                  )}
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextVerse}
                  disabled={currentVerse >= currentSurah.numberOfAyahs}
                  className="w-8 h-8 sm:w-9 sm:h-9"
                >
                  <SkipForward className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Button>
              </div>

              {/* Progress Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-xs sm:text-sm mb-1 gap-2">
                  <span className="text-foreground font-medium truncate">
                    Verse {currentVerse}/{currentSurah.numberOfAyahs}
                  </span>
                  <span className="text-muted-foreground shrink-0">
                    {formatTime(progress)}/{formatTime(duration || 0)}
                  </span>
                </div>
                <div className="h-1 sm:h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }}
                  />
                </div>
              </div>

              {/* Volume Indicator */}
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground hidden md:block" />
            </div>

            {/* Play All Info */}
            <p className="text-[10px] sm:text-xs text-muted-foreground text-center mt-2 sm:mt-3">
              {isPlaying ? "Playing continuously • Click any verse to jump" : "Click play to listen to the entire Surah"}
            </p>
          </CardContent>
        </Card>

        {/* Settings & Tab Toggle */}
        <div className="flex items-center justify-between mb-6 animate-slide-up">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "reading" | "tafsir")}>
            <TabsList>
              <TabsTrigger value="reading" className="gap-2">
                <BookOpen className="w-4 h-4" />
                Reading
              </TabsTrigger>
              <TabsTrigger value="tafsir" className="gap-2">
                <BookMarked className="w-4 h-4" />
                Tafsir
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
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
              <div className="grid gap-4 sm:grid-cols-3">
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
                          {t.name} ({t.language})
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
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Tafsir Source
                  </label>
                  <Select value={selectedTafsir} onValueChange={setSelectedTafsir}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TAFSIR_SOURCES.map((t) => (
                        <SelectItem key={t.id} value={t.id}>
                          {t.name}
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

        {/* Reading Tab - Verses */}
        {activeTab === "reading" && surahData && (
          <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            {surahData.verses.map((verse) => (
              <Card 
                key={verse.numberInSurah}
                ref={(el) => { verseRefs.current[verse.numberInSurah] = el; }}
                variant="subtle" 
                className={cn(
                  "overflow-hidden group cursor-pointer transition-all",
                  currentVerse === verse.numberInSurah && isPlaying
                    ? "ring-2 ring-primary bg-primary/5" 
                    : "hover:bg-muted/50"
                )}
                onClick={() => goToVerse(verse.numberInSurah)}
              >
                <CardContent className="p-6">
                  {/* Verse Number */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors",
                      currentVerse === verse.numberInSurah && isPlaying
                        ? "bg-primary text-primary-foreground" 
                        : "bg-primary/10"
                    )}>
                      <span className={cn(
                        "text-sm font-medium",
                        currentVerse === verse.numberInSurah && isPlaying
                          ? "text-primary-foreground" 
                          : "text-primary"
                      )}>
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

        {/* Tafsir Tab */}
        {activeTab === "tafsir" && (
          <div className="space-y-4 animate-slide-up">
            {tafsirLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} variant="subtle">
                    <CardContent className="p-6">
                      <Skeleton className="h-6 w-24 mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : tafsirData ? (
              <div className="space-y-4">
                <Card variant="elevated" className="mb-4">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Source: <span className="font-medium text-foreground">{tafsirData.source}</span>
                    </p>
                  </CardContent>
                </Card>
                
                {tafsirData.tafsir.map((item) => (
                  <Card key={item.verseNumber} variant="subtle">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                          <span className="text-sm font-medium text-gold">
                            {item.verseNumber}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card variant="subtle" className="text-center py-12">
                <CardContent>
                  <p className="text-muted-foreground">Tafsir not available for this surah.</p>
                </CardContent>
              </Card>
            )}
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
