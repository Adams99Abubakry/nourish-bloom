import { Card, CardContent } from "@/components/ui/card";
import { Moon, Sun, Utensils } from "lucide-react";
import { useEffect, useState } from "react";

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

export function RamadanCountdown() {
  const [timeToIftar, setTimeToIftar] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0 });
  const [timeToSuhoor, setTimeToSuhoor] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0 });
  const [isFasting, setIsFasting] = useState(true);

  // Example times - in production these would come from prayer time API
  const iftarTime = "18:15";
  const suhoorTime = "05:00";

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      
      const [iftarHours, iftarMins] = iftarTime.split(':').map(Number);
      const iftarMinutes = iftarHours * 60 + iftarMins;
      
      const [suhoorHours, suhoorMins] = suhoorTime.split(':').map(Number);
      const suhoorMinutes = suhoorHours * 60 + suhoorMins;

      // Determine if currently fasting
      const fasting = currentMinutes >= suhoorMinutes && currentMinutes < iftarMinutes;
      setIsFasting(fasting);

      // Calculate time to Iftar
      let minutesToIftar = iftarMinutes - currentMinutes;
      if (minutesToIftar < 0) minutesToIftar += 24 * 60;
      
      const iftarHoursLeft = Math.floor(minutesToIftar / 60);
      const iftarMinsLeft = minutesToIftar % 60;
      const iftarSecsLeft = 60 - now.getSeconds();

      setTimeToIftar({
        hours: iftarHoursLeft,
        minutes: iftarMinsLeft,
        seconds: iftarSecsLeft === 60 ? 0 : iftarSecsLeft,
      });

      // Calculate time to Suhoor
      let minutesToSuhoor = suhoorMinutes - currentMinutes;
      if (minutesToSuhoor < 0) minutesToSuhoor += 24 * 60;
      
      const suhoorHoursLeft = Math.floor(minutesToSuhoor / 60);
      const suhoorMinsLeft = minutesToSuhoor % 60;

      setTimeToSuhoor({
        hours: suhoorHoursLeft,
        minutes: suhoorMinsLeft,
        seconds: iftarSecsLeft === 60 ? 0 : iftarSecsLeft,
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Iftar Card */}
      <Card variant={isFasting ? "spiritual" : "subtle"} className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isFasting ? 'bg-primary-foreground/20' : 'bg-primary/10'}`}>
              <Utensils className={`w-6 h-6 ${isFasting ? 'text-primary-foreground' : 'text-primary'}`} />
            </div>
            <div>
              <h3 className={`font-semibold ${isFasting ? 'text-primary-foreground' : 'text-foreground'}`}>
                Iftar
              </h3>
              <p className={`text-sm ${isFasting ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                Break your fast at {iftarTime}
              </p>
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className={`text-4xl font-bold tabular-nums ${isFasting ? 'text-primary-foreground' : 'text-foreground'}`}>
              {formatNumber(timeToIftar.hours)}
            </span>
            <span className={`text-lg ${isFasting ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>h</span>
            <span className={`text-4xl font-bold tabular-nums ${isFasting ? 'text-primary-foreground' : 'text-foreground'}`}>
              {formatNumber(timeToIftar.minutes)}
            </span>
            <span className={`text-lg ${isFasting ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>m</span>
            <span className={`text-2xl font-bold tabular-nums ${isFasting ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
              {formatNumber(timeToIftar.seconds)}
            </span>
            <span className={`text-sm ${isFasting ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>s</span>
          </div>
        </CardContent>
      </Card>

      {/* Suhoor Card */}
      <Card variant={!isFasting ? "spiritual" : "subtle"} className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${!isFasting ? 'bg-primary-foreground/20' : 'bg-primary/10'}`}>
              <Moon className={`w-6 h-6 ${!isFasting ? 'text-primary-foreground' : 'text-primary'}`} />
            </div>
            <div>
              <h3 className={`font-semibold ${!isFasting ? 'text-primary-foreground' : 'text-foreground'}`}>
                Suhoor
              </h3>
              <p className={`text-sm ${!isFasting ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                Pre-dawn meal ends at {suhoorTime}
              </p>
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className={`text-4xl font-bold tabular-nums ${!isFasting ? 'text-primary-foreground' : 'text-foreground'}`}>
              {formatNumber(timeToSuhoor.hours)}
            </span>
            <span className={`text-lg ${!isFasting ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>h</span>
            <span className={`text-4xl font-bold tabular-nums ${!isFasting ? 'text-primary-foreground' : 'text-foreground'}`}>
              {formatNumber(timeToSuhoor.minutes)}
            </span>
            <span className={`text-lg ${!isFasting ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>m</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
