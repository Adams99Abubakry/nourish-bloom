import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, HandHelping, Compass, CheckSquare, Heart } from "lucide-react";
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
    icon: Compass,
    label: "Qibla",
    path: "/prayers",
    description: "Find direction",
  },
  {
    icon: CheckSquare,
    label: "Ramadan",
    path: "/ramadan",
    description: "Daily goals",
  },
  {
    icon: Heart,
    label: "Dhikr",
    path: "/dhikr",
    description: "Remembrance",
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {actions.map((action) => (
        <Link key={action.path} to={action.path}>
          <Card variant="interactive" className="h-full">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <action.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-sm text-foreground">{action.label}</h3>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
