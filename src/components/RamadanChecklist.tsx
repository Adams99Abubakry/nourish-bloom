import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

interface ChecklistItem {
  id: string;
  label: string;
  arabicLabel: string;
  completed: boolean;
}

const defaultChecklist: ChecklistItem[] = [
  { id: "fajr", label: "Fajr Prayer", arabicLabel: "صلاة الفجر", completed: false },
  { id: "dhuhr", label: "Dhuhr Prayer", arabicLabel: "صلاة الظهر", completed: false },
  { id: "asr", label: "Asr Prayer", arabicLabel: "صلاة العصر", completed: false },
  { id: "maghrib", label: "Maghrib Prayer", arabicLabel: "صلاة المغرب", completed: false },
  { id: "isha", label: "Isha Prayer", arabicLabel: "صلاة العشاء", completed: false },
  { id: "quran", label: "Qur'an Reading", arabicLabel: "قراءة القرآن", completed: false },
  { id: "dhikr", label: "Morning/Evening Dhikr", arabicLabel: "أذكار الصباح والمساء", completed: false },
  { id: "charity", label: "Daily Charity", arabicLabel: "الصدقة اليومية", completed: false },
];

export function RamadanChecklist() {
  const [items, setItems] = useState<ChecklistItem[]>(defaultChecklist);

  const toggleItem = (id: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedCount = items.filter(item => item.completed).length;
  const progressPercent = (completedCount / items.length) * 100;

  return (
    <Card variant="elevated">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            Today's Goals
          </CardTitle>
          <span className="text-sm text-muted-foreground">
            {completedCount}/{items.length}
          </span>
        </div>
        {/* Progress bar */}
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden mt-2">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {items.map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer group"
            >
              <Checkbox
                checked={item.completed}
                onCheckedChange={() => toggleItem(item.id)}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <div className="flex-1 flex items-center justify-between">
                <span className={`text-sm font-medium transition-all ${item.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                  {item.label}
                </span>
                <span className={`font-arabic text-sm transition-all ${item.completed ? 'text-muted-foreground/50' : 'text-muted-foreground'}`}>
                  {item.arabicLabel}
                </span>
              </div>
            </label>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
