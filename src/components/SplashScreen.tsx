import { useState, useEffect } from 'react';
import { useLocation as useRouterLocation, useNavigate } from 'react-router-dom';
import { Moon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number;
}

export function SplashScreen({ onComplete, duration = 4000 }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, duration - 500);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, duration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 bg-primary flex flex-col items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center animate-fade-in">
        {/* Animated Logo */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-primary-foreground/20 flex items-center justify-center backdrop-blur-sm animate-pulse-glow">
            <Moon className="w-12 h-12 text-primary-foreground" />
          </div>
          {/* Decorative rings */}
          <div className="absolute inset-0 w-24 h-24 rounded-3xl border-2 border-primary-foreground/10 animate-ping" style={{ animationDuration: '2s' }} />
        </div>

        {/* App Name */}
        <h1 className="text-4xl font-bold text-primary-foreground mb-2 animate-slide-up">
          Nūr al-Islam
        </h1>
        
        {/* Arabic Name */}
        <p className="text-xl text-primary-foreground/80 arabic animate-slide-up" style={{ animationDelay: '0.1s' }}>
          نُور الإسلام
        </p>

        {/* Tagline */}
        <p className="text-sm text-primary-foreground/60 mt-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Your Digital Companion for Spiritual Growth
        </p>

        {/* Loading indicator */}
        <div className="mt-8 flex justify-center gap-1 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="w-2 h-2 rounded-full bg-primary-foreground/40 animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-2 h-2 rounded-full bg-primary-foreground/40 animate-bounce" style={{ animationDelay: '0.1s' }} />
          <div className="w-2 h-2 rounded-full bg-primary-foreground/40 animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
      </div>

      {/* Bismillah at bottom */}
      <div className="absolute bottom-12 text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <p className="text-primary-foreground/60 arabic text-lg">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
      </div>
    </div>
  );
}

// Login-specific splash screen that shows after authentication
export function LoginSplashScreen({ onComplete }: { onComplete: () => void }) {
  const { profile } = useAuth();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3500);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 bg-primary flex flex-col items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="text-center animate-fade-in">
        {/* Animated Logo */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-primary-foreground/20 flex items-center justify-center backdrop-blur-sm">
            <Moon className="w-12 h-12 text-primary-foreground" />
          </div>
        </div>

        {/* App Name */}
        <h1 className="text-4xl font-bold text-primary-foreground mb-2">
          Nūr al-Islam
        </h1>
        
        {/* Arabic Name */}
        <p className="text-xl text-primary-foreground/80 arabic">
          نُور الإسلام
        </p>

        {/* Welcome Message */}
        <div className="mt-8 animate-slide-up">
          <p className="text-primary-foreground/70 text-sm">Welcome back,</p>
          <p className="text-2xl font-semibold text-primary-foreground">
            {profile?.full_name || 'Dear Muslim'}
          </p>
        </div>

        {/* Loading indicator */}
        <div className="mt-8 flex justify-center gap-1">
          <div className="w-2 h-2 rounded-full bg-primary-foreground/40 animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-2 h-2 rounded-full bg-primary-foreground/40 animate-bounce" style={{ animationDelay: '0.1s' }} />
          <div className="w-2 h-2 rounded-full bg-primary-foreground/40 animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
      </div>

      {/* Bismillah at bottom */}
      <div className="absolute bottom-12 text-center">
        <p className="text-primary-foreground/60 arabic text-lg">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
      </div>
    </div>
  );
}
