import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { duas } from "@/data/quranData";
import { HandHelping, Heart, Volume2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

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

  const filteredDuas = duas.filter(
    (dua) => selectedCategory === "all" || dua.category === selectedCategory
  );

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
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
                    <Button variant="icon" size="icon-sm">
                      <Volume2 className="w-4 h-4" />
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
    </div>
  );
};

export default Duas;
