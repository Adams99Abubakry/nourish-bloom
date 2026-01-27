import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Moon, CheckCircle2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface RamadanCountdownData {
  daysRemaining: number;
  ramadanStartDate: string;
  isRamadan: boolean;
  currentDay: number;
}

// Approximate Ramadan 2026 dates (1447 Hijri)
// Ramadan 2026 is expected to start around February 17, 2026
const RAMADAN_2026_START = new Date('2026-02-17');
const RAMADAN_2026_END = new Date('2026-03-19');

export function RamadanCountdown() {
  const [data, setData] = useState<RamadanCountdownData>({
    daysRemaining: 0,
    ramadanStartDate: '',
    isRamadan: false,
    currentDay: 0
  });

  useEffect(() => {
    const calculateRamadanData = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const ramadanStart = new Date(RAMADAN_2026_START);
      ramadanStart.setHours(0, 0, 0, 0);
      
      const ramadanEnd = new Date(RAMADAN_2026_END);
      ramadanEnd.setHours(0, 0, 0, 0);

      // Check if currently in Ramadan
      if (today >= ramadanStart && today <= ramadanEnd) {
        const daysDiff = Math.floor((today.getTime() - ramadanStart.getTime()) / (1000 * 60 * 60 * 24));
        setData({
          daysRemaining: 0,
          ramadanStartDate: ramadanStart.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          isRamadan: true,
          currentDay: daysDiff + 1
        });
      } else if (today < ramadanStart) {
        // Before Ramadan
        const daysDiff = Math.ceil((ramadanStart.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        setData({
          daysRemaining: daysDiff,
          ramadanStartDate: ramadanStart.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          isRamadan: false,
          currentDay: 0
        });
      } else {
        // After Ramadan 2026 - would need next year's dates
        setData({
          daysRemaining: 365, // Placeholder
          ramadanStartDate: 'February 2027 (approximate)',
          isRamadan: false,
          currentDay: 0
        });
      }
    };

    calculateRamadanData();
  }, []);

  const preparations = [
    { id: 1, title: "Start practicing voluntary fasts", done: false },
    { id: 2, title: "Set up Quran reading schedule", done: false },
    { id: 3, title: "Plan Tarawih prayer routine", done: false },
    { id: 4, title: "Calculate and prepare Zakat", done: false },
    { id: 5, title: "Stock up on dates and essentials", done: false },
    { id: 6, title: "Repair broken relationships", done: false },
    { id: 7, title: "Set spiritual goals for Ramadan", done: false },
    { id: 8, title: "Clear pending obligations", done: false },
  ];

  if (data.isRamadan) {
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
              Day {data.currentDay} of Ramadan
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
      {/* Countdown Card */}
      <Card variant="spiritual" className="overflow-hidden">
        <CardContent className="p-6 relative">
          <div className="absolute inset-0 islamic-pattern opacity-20" />
          <div className="relative text-center">
            <Moon className="w-8 h-8 text-primary-foreground mx-auto mb-4" />
            <p className="text-primary-foreground/70 text-sm mb-2">Days until Ramadan</p>
            <h3 className="text-5xl font-bold text-primary-foreground mb-2">
              {data.daysRemaining}
            </h3>
            <p className="text-sm text-primary-foreground/60">
              Expected: {data.ramadanStartDate}
            </p>
            <p className="text-xs text-primary-foreground/50 mt-2 arabic">
              اللهم بلغنا رمضان
            </p>
            <p className="text-xs text-primary-foreground/50">
              O Allah, let us reach Ramadan
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Preparations Card */}
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
