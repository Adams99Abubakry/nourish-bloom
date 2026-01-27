import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { dhikrItems } from "@/data/quranData";
import { RotateCcw, Vibrate, Volume2 } from "lucide-react";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

const Dhikr = () => {
  const [selectedDhikr, setSelectedDhikr] = useState(dhikrItems[0]);
  const [currentCount, setCurrentCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCount = useCallback(() => {
    if (currentCount < selectedDhikr.count) {
      setCurrentCount((prev) => prev + 1);
      setIsAnimating(true);
      
      // Vibrate if supported
      if (navigator.vibrate) {
        navigator.vibrate(30);
      }
      
      setTimeout(() => setIsAnimating(false), 150);
    }
  }, [currentCount, selectedDhikr.count]);

  const handleReset = () => {
    setCurrentCount(0);
  };

  const progressPercent = (currentCount / selectedDhikr.count) * 100;
  const isComplete = currentCount >= selectedDhikr.count;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 max-w-lg">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dhikr Counter</h1>
          <p className="text-muted-foreground">سبحان الله والحمد لله</p>
        </div>

        {/* Dhikr Selector */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide animate-slide-up">
          {dhikrItems.map((item) => (
            <Button
              key={item.id}
              variant={selectedDhikr.id === item.id ? "default" : "subtle"}
              size="sm"
              onClick={() => {
                setSelectedDhikr(item);
                setCurrentCount(0);
              }}
              className="shrink-0"
            >
              {item.transliteration}
            </Button>
          ))}
        </div>

        {/* Main Counter */}
        <Card variant="spiritual" className="mb-6 overflow-hidden animate-scale-in">
          <CardContent className="p-8">
            {/* Arabic Text */}
            <div className="text-center mb-6">
              <p className="arabic-xl text-primary-foreground mb-2">
                {selectedDhikr.arabic}
              </p>
              <p className="text-primary-foreground/80 text-sm">
                {selectedDhikr.translation}
              </p>
            </div>

            {/* Counter Display */}
            <div 
              className={cn(
                "relative w-48 h-48 mx-auto mb-6 cursor-pointer select-none",
                "transition-transform duration-150",
                isAnimating && "scale-95"
              )}
              onClick={handleCount}
            >
              {/* Progress Ring */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="8"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  stroke="rgba(255,255,255,0.9)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (1 - progressPercent / 100)}`}
                  className="transition-all duration-300"
                />
              </svg>
              
              {/* Count Display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={cn(
                  "text-5xl font-bold text-primary-foreground transition-all",
                  isAnimating && "scale-110"
                )}>
                  {currentCount}
                </span>
                <span className="text-primary-foreground/70 text-sm">
                  of {selectedDhikr.count}
                </span>
              </div>
            </div>

            {/* Complete Message */}
            {isComplete && (
              <div className="text-center mb-4 animate-fade-in">
                <p className="text-primary-foreground font-medium">
                  ✨ MashaAllah! Completed!
                </p>
              </div>
            )}

            {/* Tap Instruction */}
            <p className="text-center text-primary-foreground/60 text-sm">
              Tap the circle to count
            </p>
          </CardContent>
        </Card>

        {/* Controls */}
        <div className="flex justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Button
            variant="subtle"
            size="lg"
            onClick={handleReset}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </Button>
          <Button
            variant="subtle"
            size="lg"
            className="flex items-center gap-2"
          >
            <Vibrate className="w-5 h-5" />
            Haptic
          </Button>
          <Button
            variant="subtle"
            size="lg"
            className="flex items-center gap-2"
          >
            <Volume2 className="w-5 h-5" />
            Sound
          </Button>
        </div>

        {/* Daily Stats */}
        <Card variant="elevated" className="mt-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4">Today's Progress</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">33</p>
                <p className="text-xs text-muted-foreground">SubhanAllah</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">33</p>
                <p className="text-xs text-muted-foreground">Alhamdulillah</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">34</p>
                <p className="text-xs text-muted-foreground">Allahu Akbar</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Dhikr;
