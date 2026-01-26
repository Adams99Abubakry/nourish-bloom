import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RamadanChecklist } from "@/components/RamadanChecklist";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Moon, Star, Heart, BookOpen, PenLine, Calendar, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useHijriDate } from "@/hooks/useHijriDate";
import { usePrayerTimesWithLocation } from "@/hooks/usePrayerTimes";
import { Skeleton } from "@/components/ui/skeleton";

const Ramadan = () => {
  const [journalEntry, setJournalEntry] = useState("");
  const [selectedNight, setSelectedNight] = useState<number | null>(null);
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0, type: '' as 'suhoor' | 'iftar' | '' });
  
  const { data: hijriDate, isLoading: hijriLoading } = useHijriDate();
  const { prayerData } = usePrayerTimesWithLocation();

  const totalDays = 30;
  const lastTenNights = [21, 23, 25, 27, 29]; // Odd nights of last 10

  // Calculate Suhoor/Iftar countdown
  useEffect(() => {
    if (!prayerData?.prayers) return;

    const fajr = prayerData.prayers.find(p => p.name === 'Fajr');
    const maghrib = prayerData.prayers.find(p => p.name === 'Maghrib');
    
    if (!fajr || !maghrib) return;

    const updateCountdown = () => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      
      const [fajrHours, fajrMins] = fajr.time.split(':').map(Number);
      const [maghribHours, maghribMins] = maghrib.time.split(':').map(Number);
      
      const fajrMinutes = fajrHours * 60 + fajrMins;
      const maghribMinutes = maghribHours * 60 + maghribMins;

      let targetMinutes: number;
      let type: 'suhoor' | 'iftar';

      if (currentMinutes < fajrMinutes) {
        // Before Fajr - countdown to Suhoor end (Fajr)
        targetMinutes = fajrMinutes;
        type = 'suhoor';
      } else if (currentMinutes < maghribMinutes) {
        // After Fajr, before Maghrib - countdown to Iftar
        targetMinutes = maghribMinutes;
        type = 'iftar';
      } else {
        // After Maghrib - countdown to tomorrow's Suhoor
        targetMinutes = fajrMinutes + 24 * 60;
        type = 'suhoor';
      }

      let diffMinutes = targetMinutes - currentMinutes;
      if (diffMinutes < 0) diffMinutes += 24 * 60;

      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;
      const seconds = 59 - now.getSeconds();

      setCountdown({ hours, minutes, seconds, type });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [prayerData]);

  const ramadanDay = hijriDate?.isRamadan ? hijriDate.ramadanDay : null;

  return (
    <div className="min-h-screen bg-background islamic-pattern">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Moon className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Ramadan Dashboard</h1>
          
          {hijriLoading ? (
            <Skeleton className="h-6 w-48 mx-auto" />
          ) : hijriDate?.isRamadan ? (
            <p className="text-muted-foreground">
              Day <span className="font-semibold text-primary">{ramadanDay}</span> of {totalDays}
            </p>
          ) : (
            <div className="space-y-2">
              <p className="text-muted-foreground">
                Today: {hijriDate?.formatted}
              </p>
              <p className="text-sm text-muted-foreground arabic">
                {hijriDate?.formattedArabic}
              </p>
            </div>
          )}
        </div>

        {/* Suhoor/Iftar Countdown */}
        {countdown.type && (
          <Card variant="spiritual" className="animate-slide-up overflow-hidden">
            <CardContent className="p-6 relative">
              <div className="absolute inset-0 islamic-pattern opacity-20" />
              <div className="relative text-center">
                <p className="text-primary-foreground/70 text-sm mb-2">
                  {countdown.type === 'iftar' ? 'Time until Iftar' : 'Time until Suhoor ends'}
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="text-center">
                    <p className="text-4xl md:text-5xl font-bold text-primary-foreground">
                      {countdown.hours.toString().padStart(2, '0')}
                    </p>
                    <p className="text-xs text-primary-foreground/60">Hours</p>
                  </div>
                  <span className="text-3xl text-primary-foreground/50">:</span>
                  <div className="text-center">
                    <p className="text-4xl md:text-5xl font-bold text-primary-foreground">
                      {countdown.minutes.toString().padStart(2, '0')}
                    </p>
                    <p className="text-xs text-primary-foreground/60">Minutes</p>
                  </div>
                  <span className="text-3xl text-primary-foreground/50">:</span>
                  <div className="text-center">
                    <p className="text-4xl md:text-5xl font-bold text-primary-foreground">
                      {countdown.seconds.toString().padStart(2, '0')}
                    </p>
                    <p className="text-xs text-primary-foreground/60">Seconds</p>
                  </div>
                </div>
                
                {prayerData?.prayers && (
                  <div className="flex items-center justify-center gap-6 mt-4 text-sm text-primary-foreground/70">
                    <span>🌙 Fajr: {prayerData.prayers.find(p => p.name === 'Fajr')?.time}</span>
                    <span>🌅 Maghrib: {prayerData.prayers.find(p => p.name === 'Maghrib')?.time}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Ramadan Progress */}
        {hijriDate?.isRamadan && ramadanDay && (
          <Card variant="elevated" className="animate-slide-up">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Ramadan Progress</h3>
                <span className="text-sm text-muted-foreground">
                  {Math.round((ramadanDay / totalDays) * 100)}% Complete
                </span>
              </div>
              <div className="grid grid-cols-10 gap-1 sm:gap-2">
                {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => (
                  <div
                    key={day}
                    className={cn(
                      "aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-all",
                      day < ramadanDay
                        ? "bg-primary text-primary-foreground"
                        : day === ramadanDay
                        ? "bg-gold text-charcoal ring-2 ring-gold ring-offset-2"
                        : lastTenNights.includes(day)
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-primary" />
                  <span>Completed</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-gold" />
                  <span>Today</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-primary/20 border border-primary/30" />
                  <span>Last 10 (Odd)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Daily Checklist */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <RamadanChecklist />
          </div>

          {/* Laylatul Qadr Tracker */}
          <Card variant="spiritual" className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary-foreground">
                <Star className="w-5 h-5" />
                Laylatul Qadr
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary-foreground/80 text-sm mb-4">
                The Night of Power - seek it in the odd nights of the last ten days
              </p>
              <div className="grid grid-cols-5 gap-2">
                {lastTenNights.map((night) => (
                  <button
                    key={night}
                    onClick={() => setSelectedNight(selectedNight === night ? null : night)}
                    className={cn(
                      "aspect-square rounded-xl flex flex-col items-center justify-center transition-all",
                      selectedNight === night
                        ? "bg-gold text-charcoal"
                        : "bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"
                    )}
                  >
                    <span className="text-lg font-bold">{night}</span>
                    <span className="text-xs opacity-70">Night</span>
                  </button>
                ))}
              </div>
              <p className="mt-4 text-xs text-primary-foreground/60 text-center arabic">
                لَيْلَةُ الْقَدْرِ خَيْرٌ مِنْ أَلْفِ شَهْرٍ
              </p>
              <p className="text-xs text-primary-foreground/60 text-center">
                "The Night of Power is better than a thousand months"
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Journal */}
        <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PenLine className="w-5 h-5 text-primary" />
              Ramadan Journal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Reflect on your day, gratitude, and spiritual growth
            </p>
            <Textarea
              placeholder="What are you grateful for today? How did you grow spiritually?"
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              className="min-h-[120px] bg-secondary/30 border-border/50 resize-none"
            />
            <div className="flex justify-between items-center mt-4">
              <span className="text-xs text-muted-foreground">
                {journalEntry.length} characters
              </span>
              <Button variant="spiritual" size="sm">
                Save Entry
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <Card variant="subtle">
            <CardContent className="p-4 text-center">
              <BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">0</p>
              <p className="text-xs text-muted-foreground">Juz Read</p>
            </CardContent>
          </Card>
          <Card variant="subtle">
            <CardContent className="p-4 text-center">
              <Heart className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">$0</p>
              <p className="text-xs text-muted-foreground">Charity Given</p>
            </CardContent>
          </Card>
          <Card variant="subtle">
            <CardContent className="p-4 text-center">
              <Moon className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">
                {ramadanDay ? ramadanDay - 1 : 0}
              </p>
              <p className="text-xs text-muted-foreground">Fasts Completed</p>
            </CardContent>
          </Card>
          <Card variant="subtle">
            <CardContent className="p-4 text-center">
              <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">0</p>
              <p className="text-xs text-muted-foreground">Perfect Days</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Ramadan;
