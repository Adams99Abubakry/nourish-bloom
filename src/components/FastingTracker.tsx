import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useHijriDate } from "@/hooks/useHijriDate";
import { Check, X, Moon, Loader2, Trophy, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

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
  const progressPercent = Math.round((fastedCount / TOTAL_DAYS) * 100);

  // Calculate current streak
  let streak = 0;
  for (let i = fastingDays.length - 1; i >= 0; i--) {
    if (fastingDays[i].fasted === true) streak++;
    else if (fastingDays[i].fasted !== null) break;
    else if (currentRamadanDay && fastingDays[i].day < currentRamadanDay) break;
  }
  // Recalculate from current day backwards
  streak = 0;
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
      {/* Header with gradient accent */}
      <CardHeader className="pb-2 relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/60 to-primary/20" />
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Moon className="w-4 h-4 text-primary" />
          </div>
          Fasting Tracker
        </CardTitle>
        <p className="text-xs text-muted-foreground mt-0.5">
          Track your daily fasts throughout Ramadan
        </p>
      </CardHeader>

      <CardContent className="space-y-5 pt-2">
        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold text-foreground">{fastedCount}/{TOTAL_DAYS} days</span>
          </div>
          <Progress value={progressPercent} className="h-2.5" />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-primary/5 border border-primary/10 p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Check className="w-3.5 h-3.5 text-primary" />
            </div>
            <p className="text-lg font-bold text-foreground leading-none">{fastedCount}</p>
            <p className="text-[10px] text-muted-foreground mt-1">Fasted</p>
          </div>
          <div className="rounded-xl bg-destructive/5 border border-destructive/10 p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <X className="w-3.5 h-3.5 text-destructive" />
            </div>
            <p className="text-lg font-bold text-foreground leading-none">{skippedCount}</p>
            <p className="text-[10px] text-muted-foreground mt-1">Skipped</p>
          </div>
          <div className="rounded-xl bg-accent/50 border border-border/50 p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-primary" />
            </div>
            <p className="text-lg font-bold text-foreground leading-none">{streak}</p>
            <p className="text-[10px] text-muted-foreground mt-1">Streak</p>
          </div>
        </div>

        {/* Achievement badge */}
        {fastedCount >= 10 && (
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-primary/5 border border-primary/15">
            <Trophy className="w-4 h-4 text-primary shrink-0" />
            <p className="text-xs text-foreground">
              {fastedCount >= 30
                ? "🎉 MashaAllah! You completed all 30 days!"
                : fastedCount >= 20
                ? "Almost there! Keep going, you're doing amazing!"
                : "Great progress! You've fasted more than 10 days!"}
            </p>
          </div>
        )}

        {/* Calendar-style day grid */}
        <div>
          {/* Week headers */}
          <div className="grid grid-cols-6 gap-1.5 mb-1.5">
            {["1–6", "7–12", "13–18", "19–24", "25–30", ""].map((label, i) =>
              i < 5 ? (
                <div key={i} className="text-center">
                  <span className="text-[9px] text-muted-foreground/60 font-medium">Week {i + 1}</span>
                </div>
              ) : null
            )}
          </div>

          <div className="grid grid-cols-6 gap-1.5">
            {fastingDays.map((day) => {
              const isToday = currentRamadanDay === day.day;
              const isFuture = currentRamadanDay ? day.day > currentRamadanDay : false;
              const isFasted = day.fasted === true;
              const isSkipped = day.fasted === false;

              return (
                <div
                  key={day.day}
                  className={cn(
                    "relative rounded-lg aspect-square flex flex-col items-center justify-center transition-all border cursor-default",
                    isToday && "ring-2 ring-primary ring-offset-2 ring-offset-background",
                    isFasted && "bg-primary/10 border-primary/25",
                    isSkipped && "bg-destructive/8 border-destructive/20",
                    !isFasted && !isSkipped && "bg-secondary/40 border-border/40",
                    isFuture && "opacity-30 pointer-events-none"
                  )}
                >
                  {/* Day number */}
                  <span className={cn(
                    "text-[11px] font-semibold leading-none",
                    isToday ? "text-primary" : "text-foreground/70"
                  )}>
                    {day.day}
                  </span>

                  {/* Status icon */}
                  {isFasted && <Check className="w-3 h-3 text-primary mt-0.5" />}
                  {isSkipped && <X className="w-3 h-3 text-destructive mt-0.5" />}

                  {/* Action buttons - only show for non-future days */}
                  {!isFuture && !isFasted && !isSkipped && (
                    <div className="flex gap-0.5 mt-0.5">
                      <button
                        onClick={() => toggleFasting(day.day, true)}
                        disabled={saving === day.day}
                        className="w-4 h-4 rounded-full bg-primary/15 hover:bg-primary/30 flex items-center justify-center transition-colors"
                        aria-label={`Mark day ${day.day} as fasted`}
                      >
                        <Check className="w-2.5 h-2.5 text-primary" />
                      </button>
                      <button
                        onClick={() => toggleFasting(day.day, false)}
                        disabled={saving === day.day}
                        className="w-4 h-4 rounded-full bg-destructive/15 hover:bg-destructive/30 flex items-center justify-center transition-colors"
                        aria-label={`Mark day ${day.day} as skipped`}
                      >
                        <X className="w-2.5 h-2.5 text-destructive" />
                      </button>
                    </div>
                  )}

                  {/* Already marked - tap to undo */}
                  {!isFuture && (isFasted || isSkipped) && (
                    <button
                      onClick={() => toggleFasting(day.day, isFasted ? true : false)}
                      disabled={saving === day.day}
                      className="absolute inset-0 rounded-lg"
                      aria-label={`Undo day ${day.day}`}
                    />
                  )}

                  {saving === day.day && (
                    <div className="absolute inset-0 bg-background/60 rounded-lg flex items-center justify-center">
                      <Loader2 className="w-3 h-3 animate-spin text-primary" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 pt-1">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-primary/20 border border-primary/30" />
            <span className="text-[10px] text-muted-foreground">Fasted</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-destructive/15 border border-destructive/25" />
            <span className="text-[10px] text-muted-foreground">Skipped</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-secondary/40 border border-border/40" />
            <span className="text-[10px] text-muted-foreground">Unmarked</span>
          </div>
        </div>

        {!user && (
          <p className="text-[10px] text-muted-foreground text-center pt-1">
            Sign in to save your fasting data across devices
          </p>
        )}
      </CardContent>
    </Card>
  );
};
