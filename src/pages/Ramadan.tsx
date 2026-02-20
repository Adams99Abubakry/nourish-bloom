import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RamadanChecklist } from "@/components/RamadanChecklist";
import { FastingTracker } from "@/components/FastingTracker";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Moon, Star, Heart, BookOpen, PenLine, Calendar, Loader2, Gift, Utensils, Clock, Target, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useHijriDate } from "@/hooks/useHijriDate";
import { usePrayerTimesWithLocation } from "@/hooks/usePrayerTimes";
import { Skeleton } from "@/components/ui/skeleton";

const SUHOOR_TIPS = [
  "Eat dates, as the Prophet ﷺ encouraged breaking fast with them.",
  "Drink plenty of water to stay hydrated throughout the day.",
  "Include protein-rich foods like eggs and beans for sustained energy.",
  "Avoid very salty or spicy foods that increase thirst.",
  "Eat whole grains for slow-releasing energy (oats, brown bread).",
  "Include fruits with high water content like watermelon and cucumber.",
  "Delay Suhoor to just before Fajr for maximum benefit.",
];

const IFTAR_DUAS = [
  { arabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ", translation: "The thirst has gone, the veins are moistened, and the reward is established, if Allah wills." },
  { arabic: "اللَّهُمَّ لَكَ صُمْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ", translation: "O Allah, for You I fasted, and with Your provision I break my fast." },
];

const RAMADAN_DAILY_TIPS = [
  { day: 1, tip: "Set your intentions (niyyah) for Ramadan. Make dua for acceptance.", category: "Spiritual" },
  { day: 2, tip: "Begin reading at least 1 Juz of Quran daily to complete it in Ramadan.", category: "Quran" },
  { day: 3, tip: "Practice extra patience today — fasting is half of patience.", category: "Character" },
  { day: 4, tip: "Give sadaqah (charity) today, even if small. Every good deed is multiplied.", category: "Charity" },
  { day: 5, tip: "Make istighfar (seeking forgiveness) 100 times today.", category: "Dhikr" },
  { day: 6, tip: "Pray Tarawih tonight with focus and reflection.", category: "Prayer" },
  { day: 7, tip: "Fast your tongue — avoid gossip, lies, and harsh words.", category: "Character" },
  { day: 8, tip: "Feed someone who is fasting to earn their reward too.", category: "Charity" },
  { day: 9, tip: "Reflect on the meaning of the Quran you read today.", category: "Quran" },
  { day: 10, tip: "Make dua for the Muslim Ummah worldwide.", category: "Spiritual" },
  { day: 11, tip: "Increase your dhikr during the day, especially SubhanAllah.", category: "Dhikr" },
  { day: 12, tip: "Reconnect with a family member or friend you've lost touch with.", category: "Character" },
  { day: 13, tip: "Learn a new hadith or surah today.", category: "Knowledge" },
  { day: 14, tip: "Perform voluntary prayers (Duha, Tahajjud).", category: "Prayer" },
  { day: 15, tip: "Midway through! Evaluate your goals and recommit.", category: "Spiritual" },
  { day: 16, tip: "Send salawat upon the Prophet ﷺ abundantly today.", category: "Dhikr" },
  { day: 17, tip: "The Battle of Badr took place on 17th Ramadan. Reflect on sacrifice.", category: "Knowledge" },
  { day: 18, tip: "Increase your sadaqah as we approach the last 10 nights.", category: "Charity" },
  { day: 19, tip: "Begin preparing for I'tikaf if possible.", category: "Spiritual" },
  { day: 20, tip: "Make a comprehensive dua list for Laylatul Qadr.", category: "Prayer" },
  { day: 21, tip: "ODD NIGHT — Could be Laylatul Qadr! Maximize ibadah tonight.", category: "Laylatul Qadr" },
  { day: 22, tip: "Continue strong worship. Don't slack even on even nights.", category: "Prayer" },
  { day: 23, tip: "ODD NIGHT — Seek Laylatul Qadr with special dhikr and dua.", category: "Laylatul Qadr" },
  { day: 24, tip: "Give your zakat al-fitr if you haven't yet.", category: "Charity" },
  { day: 25, tip: "ODD NIGHT — Recite: اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي", category: "Laylatul Qadr" },
  { day: 26, tip: "Prepare for Eid! But don't let worship decrease.", category: "Spiritual" },
  { day: 27, tip: "ODD NIGHT — Many scholars say this is most likely Laylatul Qadr!", category: "Laylatul Qadr" },
  { day: 28, tip: "Reflect on how Ramadan has changed you. What will you continue?", category: "Spiritual" },
  { day: 29, tip: "ODD NIGHT — Last odd night. Make your final push!", category: "Laylatul Qadr" },
  { day: 30, tip: "Make dua that Allah accepts all your deeds this Ramadan.", category: "Spiritual" },
];

const Ramadan = () => {
  const [journalEntry, setJournalEntry] = useState("");
  const [selectedNight, setSelectedNight] = useState<number | null>(null);
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0, type: '' as 'suhoor' | 'iftar' | '' });
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  
  const { data: hijriDate, isLoading: hijriLoading } = useHijriDate();
  const { prayerData } = usePrayerTimesWithLocation();

  const totalDays = 30;
  const lastTenNights = [21, 23, 25, 27, 29];

  // Rotate suhoor tips
  useEffect(() => {
    setCurrentTipIndex(Math.floor(Math.random() * SUHOOR_TIPS.length));
  }, []);

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
        targetMinutes = fajrMinutes;
        type = 'suhoor';
      } else if (currentMinutes < maghribMinutes) {
        targetMinutes = maghribMinutes;
        type = 'iftar';
      } else {
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
  const dailyTip = ramadanDay ? RAMADAN_DAILY_TIPS[ramadanDay - 1] : RAMADAN_DAILY_TIPS[0];

  return (
    <div className="min-h-screen bg-background islamic-pattern">
      <Header />

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 mb-3 sm:mb-4">
            <Moon className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">Ramadan Dashboard</h1>
          
          {hijriLoading ? (
            <Skeleton className="h-6 w-48 mx-auto" />
          ) : hijriDate?.isRamadan ? (
            <p className="text-muted-foreground">
              Day <span className="font-semibold text-primary">{ramadanDay}</span> of {totalDays}
            </p>
          ) : (
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{hijriDate?.formatted}</p>
              <p className="text-xs text-muted-foreground arabic">{hijriDate?.formattedArabic}</p>
            </div>
          )}
        </div>

        {/* Suhoor/Iftar Countdown */}
        {countdown.type && (
          <Card variant="spiritual" className="animate-slide-up overflow-hidden">
            <CardContent className="p-4 sm:p-6 relative">
              <div className="absolute inset-0 islamic-pattern opacity-20" />
              <div className="relative text-center">
                <p className="text-primary-foreground/70 text-xs sm:text-sm mb-2">
                  {countdown.type === 'iftar' ? '🌅 Time until Iftar' : '🌙 Time until Suhoor ends'}
                </p>
                <div className="flex items-center justify-center gap-3 sm:gap-4">
                  {[
                    { val: countdown.hours, label: 'Hours' },
                    { val: countdown.minutes, label: 'Minutes' },
                    { val: countdown.seconds, label: 'Seconds' },
                  ].map((item, i) => (
                    <div key={item.label} className="flex items-center gap-3 sm:gap-4">
                      <div className="text-center">
                        <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground tabular-nums">
                          {item.val.toString().padStart(2, '0')}
                        </p>
                        <p className="text-[10px] sm:text-xs text-primary-foreground/60">{item.label}</p>
                      </div>
                      {i < 2 && <span className="text-2xl sm:text-3xl text-primary-foreground/50">:</span>}
                    </div>
                  ))}
                </div>
                
                {prayerData?.prayers && (
                  <div className="flex items-center justify-center gap-4 sm:gap-6 mt-3 sm:mt-4 text-xs sm:text-sm text-primary-foreground/70">
                    <span>🌙 Fajr: {prayerData.prayers.find(p => p.name === 'Fajr')?.time}</span>
                    <span>🌅 Maghrib: {prayerData.prayers.find(p => p.name === 'Maghrib')?.time}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Daily Tip Card */}
        {dailyTip && (
          <Card variant="elevated" className="animate-slide-up border-l-4 border-l-primary">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">{dailyTip.category}</span>
                    {ramadanDay && <span className="text-xs text-muted-foreground">Day {ramadanDay}</span>}
                  </div>
                  <p className="text-sm text-foreground">{dailyTip.tip}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Iftar Dua Card */}
        <Card variant="elevated" className="animate-slide-up">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Utensils className="w-5 h-5 text-primary" />
              Iftar Duas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {IFTAR_DUAS.map((dua, i) => (
              <div key={i} className="p-3 bg-secondary/30 rounded-lg">
                <p className="arabic text-lg sm:text-xl text-foreground text-right leading-loose mb-2">{dua.arabic}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{dua.translation}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Suhoor Tip */}
        <Card variant="subtle" className="animate-slide-up">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-start gap-3">
              <Utensils className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-primary mb-1">Suhoor Tip</p>
                <p className="text-sm text-muted-foreground">{SUHOOR_TIPS[currentTipIndex]}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ramadan Progress */}
        {hijriDate?.isRamadan && ramadanDay && (
          <Card variant="elevated" className="animate-slide-up">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground text-sm sm:text-base">Ramadan Progress</h3>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {Math.round((ramadanDay / totalDays) * 100)}% Complete
                </span>
              </div>
              <div className="grid grid-cols-10 gap-1 sm:gap-2">
                {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => (
                  <div
                    key={day}
                    className={cn(
                      "aspect-square rounded-md sm:rounded-lg flex items-center justify-center text-[10px] sm:text-xs font-medium transition-all",
                      day < ramadanDay
                        ? "bg-primary text-primary-foreground"
                        : day === ramadanDay
                        ? "bg-gold text-charcoal ring-2 ring-gold ring-offset-1 sm:ring-offset-2"
                        : lastTenNights.includes(day)
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 sm:mt-4 text-[10px] sm:text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded bg-primary" />
                  <span>Completed</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded bg-gold" />
                  <span>Today</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded bg-primary/20 border border-primary/30" />
                  <span>Last 10 (Odd)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Fasting Tracker */}
        <FastingTracker />

        {/* Main Grid */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          {/* Daily Checklist */}
          {/* <div className="animate-slide-up">
            <RamadanChecklist />
          </div> */}

          {/* Laylatul Qadr Tracker */}
          <Card variant="spiritual" className="animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary-foreground text-base sm:text-lg">
                <Star className="w-5 h-5" />
                Laylatul Qadr
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary-foreground/80 text-xs sm:text-sm mb-4">
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
                    <span className="text-base sm:text-lg font-bold">{night}</span>
                    <span className="text-[10px] sm:text-xs opacity-70">Night</span>
                  </button>
                ))}
              </div>
              <div className="mt-4 p-3 bg-primary-foreground/5 rounded-lg">
                <p className="text-xs sm:text-sm text-primary-foreground/80 arabic text-center leading-loose">
                  اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي
                </p>
                <p className="text-[10px] sm:text-xs text-primary-foreground/60 text-center mt-1">
                  "O Allah, You are Most Forgiving, and You love forgiveness, so forgive me." - Tirmidhi
                </p>
              </div>
              <p className="mt-3 text-[10px] sm:text-xs text-primary-foreground/50 text-center arabic">
                لَيْلَةُ الْقَدْرِ خَيْرٌ مِنْ أَلْفِ شَهْرٍ
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charity & Good Deeds Tracker */}
        <Card variant="elevated" className="animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Gift className="w-5 h-5 text-primary" />
              Ramadan Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: BookOpen, label: "Quran Completion", target: "30 Juz", color: "text-green-600" },
                { icon: Heart, label: "Daily Charity", target: "Give daily", color: "text-red-500" },
                { icon: Target, label: "Tarawih Nights", target: "30 nights", color: "text-blue-500" },
                { icon: Clock, label: "Tahajjud", target: "Last 10 nights", color: "text-purple-500" },
              ].map((goal) => (
                <div key={goal.label} className="p-3 bg-secondary/30 rounded-lg text-center">
                  <goal.icon className={cn("w-5 h-5 mx-auto mb-1.5", goal.color)} />
                  <p className="text-xs sm:text-sm font-medium text-foreground">{goal.label}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">{goal.target}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Journal */}
        <Card variant="elevated" className="animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <PenLine className="w-5 h-5 text-primary" />
              Ramadan Journal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs sm:text-sm text-muted-foreground mb-3">
              Reflect on your day, gratitude, and spiritual growth
            </p>
            <Textarea
              placeholder="What are you grateful for today? How did you grow spiritually?"
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              className="min-h-[100px] bg-secondary/30 border-border/50 resize-none text-sm"
            />
            <div className="flex justify-between items-center mt-3">
              <span className="text-[10px] sm:text-xs text-muted-foreground">
                {journalEntry.length} characters
              </span>
              <Button variant="spiritual" size="sm" className="text-xs sm:text-sm">
                Save Entry
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 animate-slide-up">
          {[
            { icon: BookOpen, value: "0", label: "Juz Read" },
            { icon: Heart, value: "$0", label: "Charity Given" },
            { icon: Moon, value: String(ramadanDay ? ramadanDay - 1 : 0), label: "Fasts Completed" },
            { icon: Calendar, value: "0", label: "Perfect Days" },
          ].map((stat) => (
            <Card key={stat.label} variant="subtle">
              <CardContent className="p-3 sm:p-4 text-center">
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-1.5 sm:mb-2" />
                <p className="text-xl sm:text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Ramadan;
