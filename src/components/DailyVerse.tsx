import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Bookmark, RefreshCw, Lightbulb } from "lucide-react";
import { useState, useEffect } from "react";
import { getDailyVerse, DailyVerseData } from "@/data/dailyVerses";

export function DailyVerse() {
  const [verse, setVerse] = useState<DailyVerseData | null>(null);
  const [showLesson, setShowLesson] = useState(false);

  useEffect(() => {
    setVerse(getDailyVerse());
  }, []);

  const refreshVerse = () => {
    // Get a random verse for manual refresh
    const randomIndex = Math.floor(Math.random() * 30);
    const { dailyVerses } = require("@/data/dailyVerses");
    setVerse(dailyVerses[randomIndex]);
    setShowLesson(false);
  };

  if (!verse) return null;

  return (
    <Card variant="spiritual" className="overflow-hidden relative">
      <div className="absolute inset-0 islamic-pattern opacity-30" />
      <CardContent className="p-4 sm:p-6 md:p-8 relative">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 sm:mb-6">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-[10px] sm:text-xs font-medium text-primary-foreground/80 bg-primary-foreground/10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
              Verse of the Day
            </span>
            <span className="text-[10px] sm:text-xs text-primary-foreground/60 bg-primary-foreground/10 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
              {verse.theme}
            </span>
          </div>
          <Button 
            variant="ghost" 
            size="icon-sm" 
            className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 w-8 h-8 sm:w-9 sm:h-9"
            onClick={refreshVerse}
          >
            <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Button>
        </div>
        
        <div className="space-y-3 sm:space-y-4 text-center">
          <p className="arabic-xl text-primary-foreground leading-relaxed px-2">
            {verse.arabic}
          </p>
          <p className="text-sm sm:text-base md:text-lg text-primary-foreground/90 max-w-lg mx-auto leading-relaxed">
            "{verse.translation}"
          </p>
          <p className="text-xs sm:text-sm text-primary-foreground/70">
            — {verse.reference}
          </p>
        </div>

        {/* Moral Lesson Section */}
        <div className="mt-4 sm:mt-6">
          {!showLesson ? (
            <Button
              variant="ghost"
              onClick={() => setShowLesson(true)}
              className="w-full text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 text-sm"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              Show Moral Lesson
            </Button>
          ) : (
            <div className="bg-primary-foreground/10 rounded-lg sm:rounded-xl p-3 sm:p-4 animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold" />
                <span className="text-xs sm:text-sm font-medium text-primary-foreground">Reflection</span>
              </div>
              <p className="text-xs sm:text-sm text-primary-foreground/80 leading-relaxed">
                {verse.moralLesson}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
          <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 text-xs sm:text-sm px-2 sm:px-3">
            <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Save
          </Button>
          <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 text-xs sm:text-sm px-2 sm:px-3">
            <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
