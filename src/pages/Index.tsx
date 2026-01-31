import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PrayerTimesCard } from "@/components/PrayerTimesCard";
import { QuickActions } from "@/components/QuickActions";
import { DailyVerse } from "@/components/DailyVerse";
import { RamadanChecklist } from "@/components/RamadanChecklist";
import { RamadanCountdown } from "@/components/RamadanCountdown";
import { SplashScreen } from "@/components/SplashScreen";
import { LocationPermissionPopup } from "@/components/LocationPermissionPopup";
import { useHijriDate } from "@/hooks/useHijriDate";
import { usePrayerTimesWithLocation } from "@/hooks/usePrayerTimes";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Moon, Star, ArrowRight } from "lucide-react";

const Index = () => {
  const [showSplash, setShowSplash] = useState(() => {
    const hasSeenSplash = sessionStorage.getItem('nur-splash-seen');
    return !hasSeenSplash;
  });
  
  const { data: hijriDate, isLoading: hijriLoading } = useHijriDate();
  const { prayerData, location } = usePrayerTimesWithLocation();
  const { user } = useAuth();

  const handleSplashComplete = () => {
    sessionStorage.setItem('nur-splash-seen', 'true');
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  const handleLocationGranted = () => {
    // Refresh page to get new prayer times
    window.location.reload();
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-background islamic-pattern">
      <LocationPermissionPopup onLocationGranted={handleLocationGranted} />
      <Header />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <section className="text-center py-6 animate-fade-in">
          <p className="text-sm text-muted-foreground mb-1">{formattedDate}</p>
          
          {hijriLoading ? (
            <Skeleton className="h-8 w-48 mx-auto mb-2" />
          ) : hijriDate && (
            <>
              {hijriDate.isRamadan ? (
                <>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    Ramadan Mubarak
                  </h1>
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Star className="w-4 h-4 text-gold" />
                    <span>
                      Day <span className="font-semibold text-primary">{hijriDate.ramadanDay}</span> of Ramadan
                    </span>
                    <Star className="w-4 h-4 text-gold" />
                  </div>
                </>
              ) : (
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Assalamu Alaikum
                </h1>
              )}
              
              <div className="mt-3 space-y-1">
                <p className="text-muted-foreground arabic">{hijriDate.formattedArabic}</p>
                <p className="text-sm text-muted-foreground">{hijriDate.formatted}</p>
              </div>
            </>
          )}
          
          {location && (
            <p className="text-xs text-muted-foreground mt-2">
              📍 {location.city}, {location.country}
            </p>
          )}
        </section>

        {/* CTA for non-logged in users */}
        {!user && (
          <Card variant="elevated" className="animate-slide-up overflow-hidden border-primary/20">
            <CardContent className="p-4 sm:p-6 relative">
              <div className="absolute inset-0 islamic-pattern opacity-10" />
              <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h2 className="text-base sm:text-lg font-semibold text-foreground mb-1">
                    Track Your Spiritual Journey
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Sign in to save your progress, bookmarks, and daily goals
                  </p>
                </div>
                <Link to="/auth">
                  <Button variant="default" className="whitespace-nowrap">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Next Prayer Highlight */}
        {prayerData?.nextPrayer && (
          <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-muted-foreground text-sm mb-1">Next Prayer</p>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                    {prayerData.nextPrayer.name}
                    <span className="arabic ml-2 text-base sm:text-lg">{prayerData.nextPrayer.arabicName}</span>
                  </h3>
                  <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                    {prayerData.nextPrayer.time} • in {prayerData.timeToNextPrayer}
                  </p>
                </div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Moon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <QuickActions />
        </section>

        {/* Daily Verse */}
        <section className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <DailyVerse />
        </section>

        {/* Main Content Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <PrayerTimesCard />
          {hijriDate?.isRamadan ? <RamadanChecklist /> : <RamadanCountdown />}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
