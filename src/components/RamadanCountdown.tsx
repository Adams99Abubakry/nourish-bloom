import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Moon, Sparkles } from "lucide-react";
import { useHijriDate } from "@/hooks/useHijriDate";
import { Skeleton } from "@/components/ui/skeleton";

const HIJRI_MONTH_NUMBERS: Record<string, number> = {
  "Muḥarram": 1, "Safar": 2, "Rabīʿ al-Awwal": 3, "Rabīʿ al-Thānī": 4,
  "Jumādá al-Ūlá": 5, "Jumādá al-Ākhirah": 6, "Rajab": 7, "Shaʿbān": 8,
  "Ramaḍān": 9, "Shawwāl": 10, "Dhū al-Qaʿdah": 11, "Dhū al-Ḥijjah": 12,
};

export function RamadanCountdown() {
  const { data: hijriDate, isLoading } = useHijriDate();

  if (isLoading) {
    return <Skeleton className="h-48 w-full rounded-xl" />;
  }

  const isRamadan = hijriDate?.isRamadan ?? false;
  const currentDay = hijriDate?.ramadanDay ?? 0;

  // Calculate approximate days until Ramadan from current Hijri date
  const getDaysUntilRamadan = () => {
    if (!hijriDate || isRamadan) return 0;
    const currentMonth = HIJRI_MONTH_NUMBERS[hijriDate.month] ?? 0;
    if (currentMonth === 0 || currentMonth >= 9) return 0;
    const remainingInCurrentMonth = 30 - hijriDate.day;
    const monthsBetween = 9 - currentMonth - 1;
    return remainingInCurrentMonth + (monthsBetween * 30);
  };

  const daysRemaining = getDaysUntilRamadan();

  const preparations = [
    { id: 1, title: "Start practicing voluntary fasts" },
    { id: 2, title: "Set up Quran reading schedule" },
    { id: 3, title: "Plan Tarawih prayer routine" },
    { id: 4, title: "Calculate and prepare Zakat" },
    { id: 5, title: "Stock up on dates and essentials" },
    { id: 6, title: "Repair broken relationships" },
    { id: 7, title: "Set spiritual goals for Ramadan" },
    { id: 8, title: "Clear pending obligations" },
  ];

  if (isRamadan) {
    return (
      <Card variant="spiritual" className="overflow-hidden">
        <CardContent className="p-6 relative">
          <div className="absolute inset-0 islamic-pattern opacity-20" />
          <div className="relative text-center">
            <Sparkles className="w-8 h-8 text-gold mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-primary-foreground mb-2">
              Ramadan Mubarak!
            </h3>
            <p className="text-primary-foreground/80 mb-4">
              Day {currentDay} of Ramadan
            </p>
            <p className="text-sm text-primary-foreground/60 arabic">
              شهر رمضان المبارك
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card variant="spiritual" className="overflow-hidden">
        <CardContent className="p-6 relative">
          <div className="absolute inset-0 islamic-pattern opacity-20" />
          <div className="relative text-center">
            <Moon className="w-8 h-8 text-primary-foreground mx-auto mb-4" />
            <p className="text-primary-foreground/70 text-sm mb-2">Days until Ramadan</p>
            <h3 className="text-5xl font-bold text-primary-foreground mb-2">
              {daysRemaining}
            </h3>
            {hijriDate && (
              <p className="text-sm text-primary-foreground/60">
                {hijriDate.day} {hijriDate.month} {hijriDate.year} AH
              </p>
            )}
            <p className="text-xs text-primary-foreground/50 mt-2 arabic">
              اللهم بلغنا رمضان
            </p>
            <p className="text-xs text-primary-foreground/50">
              O Allah, let us reach Ramadan
            </p>
          </div>
        </CardContent>
      </Card>

      <Card variant="elevated">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Ramadan Preparations</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Start preparing now to maximize your Ramadan blessings
          </p>
          <div className="space-y-3">
            {preparations.map((prep) => (
              <div
                key={prep.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="w-6 h-6 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">{prep.id}</span>
                </div>
                <span className="text-sm text-foreground flex-1">{prep.title}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
