import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { duas } from "@/data/quranData";
import { azkarCategories } from "@/data/hisnulMuslimData";
import { HandHelping, Heart, Volume2, Pause, Sun, Moon, BookOpen } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const categories = [
  { id: "all", label: "All" },
  { id: "morning", label: "Morning" },
  { id: "evening", label: "Evening" },
  { id: "fasting", label: "Fasting" },
  { id: "anxiety", label: "Anxiety" },
  { id: "forgiveness", label: "Forgiveness" },
  { id: "daily", label: "Daily" },
];

const Duas = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const playingIdRef = useRef<number | null>(null);

  useEffect(() => {
    playingIdRef.current = playingId;
  }, [playingId]);

  const filteredDuas = duas.filter(
    (dua) => selectedCategory === "all" || dua.category === selectedCategory
  );

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const speakArabic = async (text: string, id: number) => {
    if (!("speechSynthesis" in window)) return false;

    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar";
    utterance.rate = 0.9;

    const pickArabicVoice = () => {
      const voices = synth.getVoices();
      const voice =
        voices.find((v) => v.lang?.toLowerCase().startsWith("ar")) ||
        voices.find((v) => /arabic/i.test(v.name));
      if (voice) utterance.voice = voice;
    };

    // iOS/Safari often needs voices to be loaded asynchronously.
    pickArabicVoice();
    if (!utterance.voice && synth.getVoices().length === 0) {
      await new Promise<void>((resolve) => {
        const handler = () => {
          synth.removeEventListener("voiceschanged", handler);
          pickArabicVoice();
          resolve();
        };
        synth.addEventListener("voiceschanged", handler);
        setTimeout(() => {
          synth.removeEventListener("voiceschanged", handler);
          pickArabicVoice();
          resolve();
        }, 1200);
      });
    }

    utterance.onend = () => {
      if (playingIdRef.current === id) setPlayingId(null);
    };
    utterance.onerror = () => {
      if (playingIdRef.current === id) setPlayingId(null);
    };

    synth.speak(utterance);
    return true;
  };

  // Simple TTS for dua reading
  const playDua = async (dua: typeof duas[0]) => {
    if (playingId === dua.id) {
      window.speechSynthesis?.cancel();
      setPlayingId(null);
      return;
    }

    window.speechSynthesis?.cancel();
    setPlayingId(dua.id);

    const ok = await speakArabic(dua.arabic, dua.id);
    if (!ok) setPlayingId(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <HandHelping className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Duas & Supplications</h1>
          <p className="text-muted-foreground">الأدعية والأذكار</p>
        </div>

        {/* Quick Links to Azkar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 animate-slide-up">
          <Link to="/azkar">
            <Card variant="spiritual" className="overflow-hidden hover:scale-[1.02] transition-transform">
              <CardContent className="p-4 flex items-center gap-3">
                <Sun className="w-6 h-6 text-primary-foreground" />
                <div>
                  <p className="font-medium text-primary-foreground text-sm">Morning Azkar</p>
                  <p className="text-xs text-primary-foreground/70">أذكار الصباح</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/azkar">
            <Card variant="spiritual" className="overflow-hidden hover:scale-[1.02] transition-transform">
              <CardContent className="p-4 flex items-center gap-3">
                <Moon className="w-6 h-6 text-primary-foreground" />
                <div>
                  <p className="font-medium text-primary-foreground text-sm">Evening Azkar</p>
                  <p className="text-xs text-primary-foreground/70">أذكار المساء</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/azkar" className="col-span-2 sm:col-span-1">
            <Card variant="elevated" className="overflow-hidden hover:scale-[1.02] transition-transform">
              <CardContent className="p-4 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-medium text-foreground text-sm">Hisnul Muslim</p>
                  <p className="text-xs text-muted-foreground">Full Collection</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide animate-slide-up">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "subtle"}
              size="sm"
              onClick={() => setSelectedCategory(cat.id)}
              className="shrink-0"
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Duas List */}
        <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {filteredDuas.map((dua) => (
            <Card key={dua.id} variant="elevated" className="overflow-hidden">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-foreground">{dua.title}</h3>
                    <p className="text-sm text-muted-foreground font-arabic">
                      {dua.arabicTitle}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="icon"
                      size="icon-sm"
                      onClick={() => toggleFavorite(dua.id)}
                      className={cn(
                        favorites.includes(dua.id) && "text-destructive"
                      )}
                    >
                      <Heart
                        className={cn(
                          "w-4 h-4",
                          favorites.includes(dua.id) && "fill-current"
                        )}
                      />
                    </Button>
                    <Button 
                      variant="icon" 
                      size="icon-sm"
                      onClick={() => playDua(dua)}
                      className={cn(
                        playingId === dua.id && "bg-primary text-primary-foreground"
                      )}
                    >
                      {playingId === dua.id ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Arabic Text */}
                <div className="bg-secondary/50 rounded-xl p-4 mb-4">
                  <p className="arabic-lg text-foreground text-center">
                    {dua.arabic}
                  </p>
                </div>

                {/* Transliteration */}
                <p className="text-sm text-muted-foreground italic mb-2">
                  {dua.transliteration}
                </p>

                {/* Translation */}
                <p className="text-foreground">{dua.translation}</p>

                {/* Category Badge */}
                <div className="mt-4">
                  <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary capitalize">
                    {dua.category}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDuas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No duas found in this category.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Duas;
