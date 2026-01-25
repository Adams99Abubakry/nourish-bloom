import { Header } from "@/components/Header";
import { PrayerTimesCard } from "@/components/PrayerTimesCard";
import { RamadanCountdown } from "@/components/RamadanCountdown";
import { QuickActions } from "@/components/QuickActions";
import { DailyVerse } from "@/components/DailyVerse";
import { RamadanChecklist } from "@/components/RamadanChecklist";

const Index = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // This would be calculated based on actual Islamic calendar
  const ramadanDay = 15;

  return (
    <div className="min-h-screen bg-background islamic-pattern">
      <Header />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <section className="text-center py-6 animate-fade-in">
          <p className="text-sm text-muted-foreground mb-1">{formattedDate}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Ramadan Mubarak
          </h1>
          <p className="text-muted-foreground">
            Day <span className="font-semibold text-primary">{ramadanDay}</span> of Ramadan
          </p>
        </section>

        {/* Ramadan Countdown */}
        <section className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <RamadanCountdown />
        </section>

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
          <RamadanChecklist />
        </section>

        {/* Footer */}
        <footer className="text-center py-8 text-sm text-muted-foreground">
          <p className="font-arabic text-lg mb-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          <p>May Allah accept your worship during this blessed month</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
