import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { azkarCategories, type Azkar as AzkarType } from "@/data/hisnulMuslimData";
import { Sun, Moon, BookOpen, Play, Pause, Check, Volume2 } from "lucide-react";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

const Azkar = () => {
  const [selectedCategory, setSelectedCategory] = useState("morning");
  const [completedAzkar, setCompletedAzkar] = useState<Record<string, number>>({});
  const [playingId, setPlayingId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "morning":
        return <Sun className="w-5 h-5" />;
      case "evening":
        return <Moon className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const currentCategory = azkarCategories.find(c => c.id === selectedCategory);

  const handleCount = (azkarId: number, maxCount: number) => {
    const key = `${selectedCategory}-${azkarId}`;
    const current = completedAzkar[key] || 0;
    if (current < maxCount) {
      setCompletedAzkar(prev => ({
        ...prev,
        [key]: current + 1
      }));
    }
  };

  const resetCount = (azkarId: number) => {
    const key = `${selectedCategory}-${azkarId}`;
    setCompletedAzkar(prev => ({
      ...prev,
      [key]: 0
    }));
  };

  const getCount = (azkarId: number) => {
    const key = `${selectedCategory}-${azkarId}`;
    return completedAzkar[key] || 0;
  };

  const isComplete = (azkarId: number, maxCount: number) => {
    return getCount(azkarId) >= maxCount;
  };

  const playAudio = async (azkar: AzkarType) => {
    if (!azkar.audioUrl) return;

    if (playingId === azkar.id) {
      // Stop playing
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setPlayingId(null);
    } else {
      // Start playing
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      audioRef.current = new Audio(azkar.audioUrl);
      audioRef.current.onended = () => setPlayingId(null);
      audioRef.current.onerror = () => setPlayingId(null);
      
      try {
        await audioRef.current.play();
        setPlayingId(azkar.id);
      } catch (error) {
        console.error("Failed to play audio:", error);
        setPlayingId(null);
      }
    }
  };

  const getTotalProgress = () => {
    if (!currentCategory) return 0;
    const total = currentCategory.azkar.reduce((sum, a) => sum + a.count, 0);
    const completed = currentCategory.azkar.reduce((sum, a) => sum + Math.min(getCount(a.id), a.count), 0);
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Hisnul Muslim</h1>
          <p className="text-muted-foreground">حصن المسلم - Fortress of the Muslim</p>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="animate-slide-up">
          <TabsList className="w-full justify-start overflow-x-auto mb-6">
            {azkarCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="gap-2">
                {getCategoryIcon(category.id)}
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {azkarCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-4">
              {/* Progress Card */}
              <Card variant="spiritual" className="overflow-hidden">
                <CardContent className="p-6 relative">
                  <div className="absolute inset-0 islamic-pattern opacity-20" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-xl font-semibold text-primary-foreground">
                          {category.arabicName}
                        </h2>
                        <p className="text-primary-foreground/70 text-sm">
                          {category.azkar.length} adhkar in this section
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-primary-foreground">
                          {getTotalProgress()}%
                        </p>
                        <p className="text-xs text-primary-foreground/60">Completed</p>
                      </div>
                    </div>
                    <div className="h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary-foreground/80 transition-all duration-300"
                        style={{ width: `${getTotalProgress()}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Azkar List */}
              <div className="space-y-4">
                {category.azkar.map((azkar) => (
                  <Card 
                    key={azkar.id} 
                    variant={isComplete(azkar.id, azkar.count) ? "subtle" : "elevated"}
                    className={cn(
                      "overflow-hidden transition-all",
                      isComplete(azkar.id, azkar.count) && "opacity-75"
                    )}
                  >
                    <CardContent className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold",
                            isComplete(azkar.id, azkar.count)
                              ? "bg-primary text-primary-foreground"
                              : "bg-primary/10 text-primary"
                          )}>
                            {isComplete(azkar.id, azkar.count) ? (
                              <Check className="w-5 h-5" />
                            ) : (
                              azkar.id
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{azkar.title}</h3>
                            <p className="text-sm text-muted-foreground arabic">
                              {azkar.arabicTitle}
                            </p>
                          </div>
                        </div>
                        {azkar.audioUrl && (
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => playAudio(azkar)}
                            className={cn(
                              playingId === azkar.id && "bg-primary/10 text-primary"
                            )}
                          >
                            {playingId === azkar.id ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Volume2 className="w-4 h-4" />
                            )}
                          </Button>
                        )}
                      </div>

                      {/* Arabic Text */}
                      <div className="bg-secondary/50 rounded-xl p-4 mb-4">
                        <p className="arabic-lg text-foreground text-center leading-loose">
                          {azkar.arabic}
                        </p>
                      </div>

                      {/* Transliteration */}
                      <p className="text-sm text-muted-foreground italic mb-2">
                        {azkar.transliteration}
                      </p>

                      {/* Translation */}
                      <p className="text-foreground mb-4">{azkar.translation}</p>

                      {/* Reference */}
                      <p className="text-xs text-muted-foreground mb-4">
                        Reference: {azkar.reference}
                      </p>

                      {/* Counter */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant={isComplete(azkar.id, azkar.count) ? "subtle" : "default"}
                            onClick={() => handleCount(azkar.id, azkar.count)}
                            disabled={isComplete(azkar.id, azkar.count)}
                            className="min-w-[120px]"
                          >
                            {isComplete(azkar.id, azkar.count) ? (
                              "Completed ✓"
                            ) : (
                              `Count (${getCount(azkar.id)}/${azkar.count})`
                            )}
                          </Button>
                          {getCount(azkar.id) > 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => resetCount(azkar.id)}
                            >
                              Reset
                            </Button>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Repeat {azkar.count}x
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Azkar;
