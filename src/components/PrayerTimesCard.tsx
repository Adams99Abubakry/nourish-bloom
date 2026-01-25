import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock } from "lucide-react";
import { defaultPrayers } from "@/data/quranData";
import { cn } from "@/lib/utils";

export function PrayerTimesCard() {
  // Get current time to determine next prayer
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  const prayersWithStatus = defaultPrayers.map((prayer) => {
    const [hours, minutes] = prayer.time.split(':').map(Number);
    const prayerTime = hours * 60 + minutes;
    return {
      ...prayer,
      isPast: prayerTime < currentTime,
      prayerMinutes: prayerTime,
    };
  });

  // Find next prayer
  const nextPrayer = prayersWithStatus.find(p => !p.isPast) || prayersWithStatus[0];

  return (
    <Card variant="elevated" className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Prayer Times
          </CardTitle>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span>Auto-detect</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-2">
          {prayersWithStatus.map((prayer) => (
            <div
              key={prayer.name}
              className={cn(
                "flex items-center justify-between p-3 rounded-xl transition-all",
                prayer.name === nextPrayer.name
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : prayer.isPast
                  ? "bg-muted/50 text-muted-foreground"
                  : "bg-secondary/50"
              )}
            >
              <div className="flex items-center gap-3">
                <span className={cn(
                  "font-arabic text-lg",
                  prayer.name === nextPrayer.name ? "text-primary-foreground" : "text-foreground"
                )}>
                  {prayer.arabicName}
                </span>
                <span className="text-sm font-medium">{prayer.name}</span>
              </div>
              <span className={cn(
                "font-semibold tabular-nums",
                prayer.name === nextPrayer.name ? "text-primary-foreground" : ""
              )}>
                {prayer.time}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
