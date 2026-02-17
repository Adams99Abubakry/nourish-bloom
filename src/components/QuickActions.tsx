import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, HandHelping, Compass, CheckSquare, Heart, Calculator, Sun, MapPin, Brain } from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  {
    icon: BookOpen,
    label: "Read Qur'an",
    path: "/quran",
    description: "Continue reading",
  },
  {
    icon: HandHelping,
    label: "Duas",
    path: "/duas",
    description: "Supplications",
  },
  {
    icon: Sun,
    label: "Azkar",
    path: "/azkar",
    description: "Morning/Evening",
  },
  {
    icon: Compass,
    label: "Qibla",
    path: "/prayers",
    description: "Find direction",
  },
  {
    icon: Heart,
    label: "Dhikr",
    path: "/dhikr",
    description: "Remembrance",
  },
  {
    icon: Calculator,
    label: "Zakat",
    path: "/zakat",
    description: "Calculator",
  },
  {
    icon: MapPin,
    label: "Masjid",
    path: "/masjid-finder",
    description: "Find nearby",
  },
  {
    icon: CheckSquare,
    label: "Ramadan",
    path: "/ramadan",
    description: "Daily goals",
  },
  {
    icon: Brain,
    label: "Knowledge",
    path: "/islamic-knowledge",
    description: "Quiz & Q&A",
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-4 xs:grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-2 sm:gap-3">
      {actions.map((action) => (
        <Link key={action.path} to={action.path}>
          <Card variant="interactive" className="h-full">
            <CardContent className="p-2 sm:p-3 md:p-4 flex flex-col items-center text-center gap-1 sm:gap-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center">
                <action.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="font-medium text-xs sm:text-sm text-foreground truncate">{action.label}</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">{action.description}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
