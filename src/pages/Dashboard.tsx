import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PrayerTimesCard } from '@/components/PrayerTimesCard';
import { DailyVerse } from '@/components/DailyVerse';
import { LoginSplashScreen } from '@/components/SplashScreen';
import { useHijriDate } from '@/hooks/useHijriDate';
import { usePrayerTimesWithLocation } from '@/hooks/usePrayerTimes';
import { 
  BookOpen, 
  Moon, 
  Heart, 
  Compass, 
  Calendar, 
  Star,
  LogOut,
  Settings,
  ChevronRight,
  Calculator,
  Sun
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const Dashboard = () => {
  const { user, profile, isLoading, signOut, justLoggedIn, setJustLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { data: hijriDate, isLoading: hijriLoading } = useHijriDate();
  const { prayerData } = usePrayerTimesWithLocation();
  const [greeting, setGreeting] = useState('');
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  // Show splash screen after login
  useEffect(() => {
    if (justLoggedIn && user) {
      setShowSplash(true);
    }
  }, [justLoggedIn, user]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour < 17) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setJustLoggedIn(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (showSplash) {
    return <LoginSplashScreen onComplete={handleSplashComplete} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <div className="space-y-6">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </main>
      </div>
    );
  }

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'Muslim';
  const firstName = displayName.split(' ')[0];

  const quickLinks = [
    { name: "Read Qur'an", icon: BookOpen, path: '/quran', color: 'text-primary' },
    { name: 'Prayer Times', icon: Moon, path: '/prayers', color: 'text-primary' },
    { name: 'Duas', icon: Heart, path: '/duas', color: 'text-primary' },
    { name: 'Azkar', icon: Sun, path: '/azkar', color: 'text-primary' },
    { name: 'Dhikr', icon: Compass, path: '/dhikr', color: 'text-primary' },
    { name: 'Zakat', icon: Calculator, path: '/zakat', color: 'text-primary' },
    { name: 'Ramadan', icon: Star, path: '/ramadan', color: 'text-gold' },
    { name: 'Settings', icon: Settings, path: '/settings', color: 'text-muted-foreground' },
  ];

  return (
    <div className="min-h-screen bg-background islamic-pattern">
      <Header />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <Card variant="spiritual" className="overflow-hidden animate-fade-in">
          <CardContent className="p-6 relative">
            <div className="absolute inset-0 islamic-pattern opacity-20" />
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-primary-foreground/70 text-sm mb-1">{greeting}</p>
                <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
                  Assalamu Alaikum, {firstName}! 👋
                </h1>
                {hijriLoading ? (
                  <Skeleton className="h-5 w-48 bg-primary-foreground/20" />
                ) : hijriDate && (
                  <div className="space-y-1">
                    <p className="text-primary-foreground/80 text-sm">
                      {hijriDate.formatted}
                    </p>
                    <p className="text-primary-foreground/60 arabic text-sm">
                      {hijriDate.formattedArabic}
                    </p>
                    {hijriDate.isRamadan && (
                      <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-gold/20 text-gold">
                        <Star className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          Day {hijriDate.ramadanDay} of Ramadan
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                onClick={handleSignOut}
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <section className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Access</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
            {quickLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <Card variant="interactive" className="h-full">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 ${link.color}`}>
                      <link.icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{link.name}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Next Prayer */}
        {prayerData?.nextPrayer && (
          <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: '0.15s' }}>
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

        {/* Quran Progress */}
        {profile && (
          <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Continue Reading
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Link to={`/quran/${profile.quran_last_surah}`}>
                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                  <div>
                    <p className="font-medium text-foreground">
                      Surah {profile.quran_last_surah}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Verse {profile.quran_last_ayah}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Daily Verse */}
        <section className="animate-slide-up" style={{ animationDelay: '0.25s' }}>
          <DailyVerse />
        </section>

        {/* Main Grid */}
        <section className="grid gap-6 lg:grid-cols-2 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <PrayerTimesCard />
          
          {/* Stats Card */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Your Journey
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-primary/5 text-center">
                  <p className="text-3xl font-bold text-primary">
                    {profile?.dhikr_streak || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Day Streak</p>
                </div>
                <div className="p-4 rounded-xl bg-accent/10 text-center">
                  <p className="text-3xl font-bold text-accent">
                    {profile?.quran_last_surah || 1}
                  </p>
                  <p className="text-sm text-muted-foreground">Surahs Read</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
