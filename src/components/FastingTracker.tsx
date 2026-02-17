import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useHijriDate } from "@/hooks/useHijriDate";
import { Check, X, Moon, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TOTAL_DAYS = 30;

interface FastingDay {
  day: number;
  fasted: boolean | null; // null = not marked, true = fasted, false = skipped
  date: string;
}

export const FastingTracker = () => {
  const { user } = useAuth();
  const { data: hijriDate } = useHijriDate();
  const { toast } = useToast();
  const [fastingDays, setFastingDays] = useState<FastingDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<number | null>(null);

  const currentRamadanDay = hijriDate?.isRamadan ? hijriDate.ramadanDay : null;

  useEffect(() => {
    loadFastingData();
  }, [user]);

  const loadFastingData = async () => {
    const days: FastingDay[] = Array.from({ length: TOTAL_DAYS }, (_, i) => ({
      day: i + 1,
      fasted: null,
      date: `ramadan-day-${i + 1}`,
    }));

    if (user) {
      try {
        const { data } = await supabase
          .from("ramadan_goals")
          .select("goal_date, fasted")
          .eq("user_id", user.id)
          .like("goal_date", "%-ramadan-day-%");

        if (data) {
          data.forEach((record) => {
            const dayMatch = record.goal_date.match(/ramadan-day-(\d+)/);
            if (dayMatch) {
              const dayNum = parseInt(dayMatch[1]);
              const idx = days.findIndex((d) => d.day === dayNum);
              if (idx !== -1) {
                days[idx].fasted = record.fasted;
              }
            }
          });
        }
      } catch (err) {
        console.error("Error loading fasting data:", err);
      }
    } else {
      // Use localStorage for non-logged-in users
      const saved = localStorage.getItem("fasting-tracker");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          parsed.forEach((s: { day: number; fasted: boolean | null }) => {
            const idx = days.findIndex((d) => d.day === s.day);
            if (idx !== -1) days[idx].fasted = s.fasted;
          });
        } catch {}
      }
    }

    setFastingDays(days);
    setLoading(false);
  };

  const toggleFasting = async (day: number, value: boolean) => {
    const updated = fastingDays.map((d) =>
      d.day === day ? { ...d, fasted: d.fasted === value ? null : value } : d
    );
    setFastingDays(updated);
    const newValue = updated.find((d) => d.day === day)?.fasted ?? null;

    setSaving(day);

    if (user) {
      const goalDate = `2026-ramadan-day-${day}`;
      try {
        const { data: existing } = await supabase
          .from("ramadan_goals")
          .select("id")
          .eq("user_id", user.id)
          .eq("goal_date", goalDate)
          .maybeSingle();

        if (existing) {
          await supabase
            .from("ramadan_goals")
            .update({ fasted: newValue })
            .eq("id", existing.id);
        } else {
          await supabase.from("ramadan_goals").insert({
            user_id: user.id,
            goal_date: goalDate,
            fasted: newValue,
          });
        }
      } catch (err) {
        console.error("Error saving fasting data:", err);
        toast({ title: "Error saving", description: "Please try again", variant: "destructive" });
      }
    } else {
      localStorage.setItem(
        "fasting-tracker",
        JSON.stringify(updated.filter((d) => d.fasted !== null).map((d) => ({ day: d.day, fasted: d.fasted })))
      );
    }

    setSaving(null);
  };

  const fastedCount = fastingDays.filter((d) => d.fasted === true).length;
  const skippedCount = fastingDays.filter((d) => d.fasted === false).length;

  if (loading) {
    return (
      <Card variant="elevated">
        <CardContent className="p-6 flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="elevated" className="animate-slide-up">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <Moon className="w-5 h-5 text-primary" />
          Fasting Tracker
        </CardTitle>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Tap ✓ if you fasted, ✕ if you skipped
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-muted-foreground">Fasted: <span className="font-semibold text-foreground">{fastedCount}</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <span className="text-muted-foreground">Skipped: <span className="font-semibold text-foreground">{skippedCount}</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-muted" />
            <span className="text-muted-foreground">Remaining: <span className="font-semibold text-foreground">{TOTAL_DAYS - fastedCount - skippedCount}</span></span>
          </div>
        </div>

        {/* Day Grid */}
        <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
          {fastingDays.map((day) => {
            const isToday = currentRamadanDay === day.day;
            const isFuture = currentRamadanDay ? day.day > currentRamadanDay : false;

            return (
              <div
                key={day.day}
                className={cn(
                  "relative rounded-lg p-2 text-center transition-all border",
                  isToday && "ring-2 ring-primary ring-offset-1",
                  day.fasted === true && "bg-green-500/15 border-green-500/30",
                  day.fasted === false && "bg-red-400/15 border-red-400/30",
                  day.fasted === null && "bg-secondary/30 border-border/50",
                  isFuture && "opacity-40"
                )}
              >
                <p className={cn(
                  "text-xs font-medium mb-1",
                  isToday ? "text-primary" : "text-muted-foreground"
                )}>
                  Day {day.day}
                </p>

                {day.fasted === true && (
                  <Check className="w-4 h-4 text-green-500 mx-auto" />
                )}
                {day.fasted === false && (
                  <X className="w-4 h-4 text-red-400 mx-auto" />
                )}

                {!isFuture && (
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <button
                      onClick={() => toggleFasting(day.day, true)}
                      disabled={saving === day.day}
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-[10px] transition-all",
                        day.fasted === true
                          ? "bg-green-500 text-white"
                          : "bg-muted hover:bg-green-500/20 text-muted-foreground"
                      )}
                    >
                      ✓
                    </button>
                    <button
                      onClick={() => toggleFasting(day.day, false)}
                      disabled={saving === day.day}
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-[10px] transition-all",
                        day.fasted === false
                          ? "bg-red-400 text-white"
                          : "bg-muted hover:bg-red-400/20 text-muted-foreground"
                      )}
                    >
                      ✕
                    </button>
                  </div>
                )}

                {saving === day.day && (
                  <Loader2 className="w-3 h-3 animate-spin text-primary absolute top-1 right-1" />
                )}
              </div>
            );
          })}
        </div>

        {!user && (
          <p className="text-xs text-muted-foreground text-center">
            Sign in to save your fasting data across devices
          </p>
        )}
      </CardContent>
    </Card>
  );
};
