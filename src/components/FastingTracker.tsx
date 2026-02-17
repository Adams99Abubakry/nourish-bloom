import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useHijriDate } from "@/hooks/useHijriDate";
import { Check, X, Moon, Loader2, Flame, CircleDot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const TOTAL_DAYS = 30;

interface FastingDay {
  day: number;
  fasted: boolean | null;
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
  const markedCount = fastedCount + skippedCount;

  // Calculate current streak
  let streak = 0;
  const startDay = currentRamadanDay ?? markedCount;
  for (let i = startDay - 1; i >= 0; i--) {
    if (fastingDays[i]?.fasted === true) streak++;
    else break;
  }

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
    <Card variant="elevated" className="animate-slide-up overflow-hidden">
      <CardContent className="p-4 sm:p-5 space-y-4">
        {/* Top section: Title + stats */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Moon className="w-[18px] h-[18px] text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm sm:text-base leading-tight">Fasting Tracker</h3>
              <p className="text-[11px] text-muted-foreground">Tap to mark each day</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {streak > 0 && (
              <Badge variant="secondary" className="gap-1 text-[10px] px-2 py-0.5 bg-accent/15 text-accent-foreground border-accent/20">
                <Flame className="w-3 h-3 text-accent" />
                {streak}
              </Badge>
            )}
            <Badge variant="secondary" className="text-[10px] px-2 py-0.5">
              {fastedCount}/{TOTAL_DAYS}
            </Badge>
          </div>
        </div>

        {/* Compact progress bar */}
        <div className="relative h-1.5 w-full rounded-full bg-secondary overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all duration-500"
            style={{ width: `${Math.round((fastedCount / TOTAL_DAYS) * 100)}%` }}
          />
        </div>

        {/* Day grid - 10 columns for a cleaner month view */}
        <div className="space-y-1">
          {/* Row labels */}
          <div className="grid grid-cols-10 gap-[5px]">
            {fastingDays.map((day) => {
              const isToday = currentRamadanDay === day.day;
              const isFuture = currentRamadanDay ? day.day > currentRamadanDay : false;
              const isFasted = day.fasted === true;
              const isSkipped = day.fasted === false;

              return (
                <button
                  key={day.day}
                  disabled={isFuture || saving === day.day}
                  onClick={() => {
                    if (isFasted) {
                      // Fasted → Skipped
                      toggleFasting(day.day, false);
                    } else if (isSkipped) {
                      // Skipped → Unmarked (clear it)
                      toggleFasting(day.day, false);
                    } else {
                      // Unmarked → Fasted
                      toggleFasting(day.day, true);
                    }
                  }}
                  className={cn(
                    "relative aspect-square rounded-md flex items-center justify-center transition-all text-[11px] sm:text-xs font-medium",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    isToday && "ring-[1.5px] ring-primary ring-offset-1 ring-offset-background",
                    isFasted && "bg-primary text-primary-foreground",
                    isSkipped && "bg-destructive/15 text-destructive line-through",
                    !isFasted && !isSkipped && !isFuture && "bg-secondary/60 text-foreground/60 hover:bg-secondary",
                    isFuture && "bg-muted/30 text-muted-foreground/30 cursor-not-allowed"
                  )}
                  aria-label={`Day ${day.day}${isFasted ? ' - Fasted' : isSkipped ? ' - Skipped' : ''}`}
                >
                  {saving === day.day ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : isFasted ? (
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" strokeWidth={3} />
                  ) : (
                    day.day
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom row: Legend + hint */}
        <div className="flex items-center justify-between pt-0.5">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-[3px] bg-primary" />
              <span className="text-[10px] text-muted-foreground">Fasted</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-[3px] bg-destructive/20" />
              <span className="text-[10px] text-muted-foreground">Skipped</span>
            </div>
          </div>
          <span className="text-[9px] text-muted-foreground/60">Tap to cycle: ✓ → ✗ → clear</span>
        </div>

        {!user && (
          <p className="text-[10px] text-muted-foreground text-center border-t border-border/40 pt-3">
            Sign in to save your fasting data across devices
          </p>
        )}
      </CardContent>
    </Card>
  );
};
