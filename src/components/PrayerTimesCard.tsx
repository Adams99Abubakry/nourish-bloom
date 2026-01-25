import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePrayerTimesWithLocation } from "@/hooks/usePrayerTimes";
import { Skeleton } from "@/components/ui/skeleton";

export function PrayerTimesCard() {
  const { prayerData, location, isLoading, error } = usePrayerTimesWithLocation();

  // Get current time to determine next prayer
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  if (isLoading) {
    return (
      <Card variant="elevated" className="overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Prayer Times
            </CardTitle>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>Detecting location...</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="space-y-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-14 w-full rounded-xl" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !prayerData) {
    return (
      <Card variant="elevated" className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Prayer Times
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <p className="text-muted-foreground text-center py-4">
            Unable to load prayer times. Please enable location access.
          </p>
        </CardContent>
      </Card>
    );
  }

  const prayersWithStatus = prayerData.prayers.map((prayer) => {
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
            <span>{location?.city || "Unknown"}</span>
          </div>
        </div>
        {prayerData.hijriDate && (
          <p className="text-xs text-muted-foreground mt-1">{prayerData.hijriDate}</p>
        )}
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
              <div className="flex items-center gap-2">
                {prayer.name === nextPrayer.name && prayerData.timeToNextPrayer && (
                  <span className="text-xs bg-primary-foreground/20 px-2 py-0.5 rounded-full">
                    in {prayerData.timeToNextPrayer}
                  </span>
                )}
                <span className={cn(
                  "font-semibold tabular-nums",
                  prayer.name === nextPrayer.name ? "text-primary-foreground" : ""
                )}>
                  {prayer.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
