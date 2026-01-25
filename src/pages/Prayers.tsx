import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { defaultPrayers } from "@/data/quranData";
import { Compass, MapPin, Bell, BellOff, Clock, Navigation } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Prayers = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState<Record<string, boolean>>({
    Fajr: true,
    Dhuhr: true,
    Asr: true,
    Maghrib: true,
    Isha: true,
  });

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

  const nextPrayer = prayersWithStatus.find(p => !p.isPast) || prayersWithStatus[0];

  const toggleNotification = (prayerName: string) => {
    setNotificationsEnabled(prev => ({
      ...prev,
      [prayerName]: !prev[prayerName]
    }));
  };

  // Simulated Qibla direction (this would use device compass in production)
  const qiblaDirection = 135; // degrees

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Clock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Prayer Times</h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>New York, USA</span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Prayer Times */}
          <div className="space-y-4 animate-slide-up">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Today's Prayers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {prayersWithStatus.map((prayer) => (
                  <div
                    key={prayer.name}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-xl transition-all",
                      prayer.name === nextPrayer.name
                        ? "bg-primary text-primary-foreground"
                        : prayer.isPast
                        ? "bg-muted/50 text-muted-foreground"
                        : "bg-secondary/50"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        prayer.name === nextPrayer.name
                          ? "bg-primary-foreground/20"
                          : "bg-primary/10"
                      )}>
                        <span className={cn(
                          "font-arabic text-sm",
                          prayer.name === nextPrayer.name ? "text-primary-foreground" : "text-primary"
                        )}>
                          {prayer.arabicName}
                        </span>
                      </div>
                      <span className="font-medium">{prayer.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="font-semibold tabular-nums">{prayer.time}</span>
                      {prayer.name !== "Sunrise" && (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => toggleNotification(prayer.name)}
                          className={cn(
                            prayer.name === nextPrayer.name
                              ? "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {notificationsEnabled[prayer.name] ? (
                            <Bell className="w-4 h-4" />
                          ) : (
                            <BellOff className="w-4 h-4" />
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Qibla Direction */}
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <Card variant="spiritual" className="h-full">
              <CardContent className="p-8 flex flex-col items-center justify-center min-h-[400px]">
                <Compass className="w-8 h-8 text-primary-foreground/80 mb-4" />
                <h2 className="text-xl font-semibold text-primary-foreground mb-2">
                  Qibla Direction
                </h2>
                <p className="text-primary-foreground/70 text-sm mb-8 text-center">
                  Face the Kaaba in Mecca for prayer
                </p>

                {/* Compass */}
                <div className="relative w-64 h-64">
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full border-4 border-primary-foreground/20" />
                  
                  {/* Direction markers */}
                  <div className="absolute inset-4 rounded-full border-2 border-primary-foreground/10" />
                  
                  {/* Cardinal directions */}
                  <span className="absolute top-2 left-1/2 -translate-x-1/2 text-sm font-medium text-primary-foreground">N</span>
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm font-medium text-primary-foreground/60">S</span>
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm font-medium text-primary-foreground/60">W</span>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-medium text-primary-foreground/60">E</span>

                  {/* Qibla arrow */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ transform: `rotate(${qiblaDirection}deg)` }}
                  >
                    <div className="relative h-full flex flex-col items-center justify-start pt-8">
                      <Navigation className="w-8 h-8 text-gold fill-gold" />
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-primary-foreground/30" />
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-3xl font-bold text-primary-foreground">{qiblaDirection}°</p>
                  <p className="text-primary-foreground/70 text-sm">Southeast</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Card variant="subtle">
            <CardContent className="p-4">
              <h3 className="font-medium text-foreground mb-1">Calculation Method</h3>
              <p className="text-sm text-muted-foreground">ISNA (Islamic Society of North America)</p>
            </CardContent>
          </Card>
          <Card variant="subtle">
            <CardContent className="p-4">
              <h3 className="font-medium text-foreground mb-1">Juristic Method</h3>
              <p className="text-sm text-muted-foreground">Hanafi (Standard)</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Prayers;
