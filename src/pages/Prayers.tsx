import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Compass, MapPin, Bell, BellOff, Clock, Navigation, Loader2, Volume2, VolumeX } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { usePrayerTimesWithLocation, Location } from "@/hooks/usePrayerTimes";
import { useAdhan } from "@/hooks/useAdhan";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

// Calculate Qibla direction based on user's location
const calculateQiblaDirection = (latitude: number, longitude: number): number => {
  // Kaaba coordinates
  const kaabaLat = 21.4225;
  const kaabaLng = 39.8262;
  
  // Convert to radians
  const lat1 = (latitude * Math.PI) / 180;
  const lat2 = (kaabaLat * Math.PI) / 180;
  const lng1 = (longitude * Math.PI) / 180;
  const lng2 = (kaabaLng * Math.PI) / 180;
  
  // Calculate bearing
  const dLng = lng2 - lng1;
  const x = Math.sin(dLng) * Math.cos(lat2);
  const y = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  
  let bearing = Math.atan2(x, y);
  bearing = (bearing * 180) / Math.PI;
  bearing = (bearing + 360) % 360;
  
  return Math.round(bearing);
};

// Get compass direction name
const getDirectionName = (degrees: number): string => {
  const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

const Prayers = () => {
  const { prayerData, location, isLoading, error } = usePrayerTimesWithLocation();
  const { 
    isPlaying, 
    currentPrayer, 
    notificationsEnabled, 
    audioEnabled,
    enableNotifications, 
    disableNotifications, 
    toggleAudio,
    stopAdhan 
  } = useAdhan(prayerData?.prayers);
  
  const [notificationStates, setNotificationStates] = useState<Record<string, boolean>>({
    Fajr: true,
    Dhuhr: true,
    Asr: true,
    Maghrib: true,
    Isha: true,
  });

  const [deviceOrientation, setDeviceOrientation] = useState<number | null>(null);
  const [qiblaDirection, setQiblaDirection] = useState<number>(0);
  const [compassAvailable, setCompassAvailable] = useState(false);
  const [compassError, setCompassError] = useState<string | null>(null);

  // Calculate Qibla when location is available
  useEffect(() => {
    if (location) {
      const qibla = calculateQiblaDirection(location.latitude, location.longitude);
      setQiblaDirection(qibla);
    }
  }, [location]);

  // Try to get device orientation for compass - improved for mobile
  useEffect(() => {
    let orientationHandler: ((event: DeviceOrientationEvent) => void) | null = null;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      // Use webkitCompassHeading for iOS if available (true north)
      const heading = (event as any).webkitCompassHeading ?? event.alpha;
      
      if (heading !== null && heading !== undefined) {
        // For iOS webkitCompassHeading, the value is already correct
        // For Android alpha, we need to adjust
        const isIOS = (event as any).webkitCompassHeading !== undefined;
        
        if (isIOS) {
          setDeviceOrientation(heading);
        } else {
          // Android: alpha is degrees from north, but goes counterclockwise
          // We need to invert it for correct compass behavior
          setDeviceOrientation(360 - heading);
        }
        setCompassAvailable(true);
        setCompassError(null);
      }
    };

    orientationHandler = handleOrientation;

    const startCompass = () => {
      if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', handleOrientation, true);
      }
    };

    // Check if we need to request permission (iOS 13+)
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      // Permission will be requested on button click
    } else if (window.DeviceOrientationEvent) {
      // No permission needed, start directly
      startCompass();
    }

    return () => {
      if (orientationHandler) {
        window.removeEventListener('deviceorientation', orientationHandler);
      }
    };
  }, []);

  const requestCompassPermission = async () => {
    setCompassError(null);
    
    try {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        if (permission === 'granted') {
          const handleOrientation = (event: DeviceOrientationEvent) => {
            const heading = (event as any).webkitCompassHeading ?? event.alpha;
            if (heading !== null && heading !== undefined) {
              const isIOS = (event as any).webkitCompassHeading !== undefined;
              setDeviceOrientation(isIOS ? heading : 360 - heading);
              setCompassAvailable(true);
            }
          };
          window.addEventListener('deviceorientation', handleOrientation, true);
          toast.success("Compass enabled! Point your device north.");
        } else {
          setCompassError("Compass permission denied");
          toast.error("Compass permission denied");
        }
      } else {
        // Try to enable without permission request
        setCompassError("Compass may not be available on this device");
        toast.info("Move your device in a figure-8 pattern to calibrate the compass");
      }
    } catch (error) {
      console.error('Compass permission error:', error);
      setCompassError("Could not access compass");
      toast.error("Could not access compass sensor");
    }
  };

  // Get current time to determine next prayer
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const toggleNotification = async (prayerName: string) => {
    if (!notificationsEnabled) {
      const granted = await enableNotifications();
      if (granted) {
        toast.success("Adhan notifications enabled!");
      } else {
        toast.error("Please enable notifications in your browser settings");
        return;
      }
    }
    
    setNotificationStates(prev => ({
      ...prev,
      [prayerName]: !prev[prayerName]
    }));
  };

  const prayersWithStatus = prayerData?.prayers.map((prayer) => {
    const [hours, minutes] = prayer.time.split(':').map(Number);
    const prayerTime = hours * 60 + minutes;
    return {
      ...prayer,
      isPast: prayerTime < currentTime,
      prayerMinutes: prayerTime,
    };
  }) || [];

  const nextPrayer = prayersWithStatus.find(p => !p.isPast) || prayersWithStatus[0];

  // Calculate the arrow rotation (Qibla relative to device heading)
  const arrowRotation = compassAvailable && deviceOrientation !== null
    ? qiblaDirection - deviceOrientation
    : qiblaDirection;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-primary/10 mb-3 sm:mb-4">
            <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">Prayer Times</h1>
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-muted-foreground text-sm">
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
                <span>Detecting location...</span>
              </>
            ) : (
              <>
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="truncate max-w-[200px]">{location?.city}{location?.country ? `, ${location.country}` : ""}</span>
              </>
            )}
          </div>
          {prayerData?.hijriDate && (
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">{prayerData.hijriDate}</p>
          )}
        </div>

        {/* Adhan Status Banner */}
        {isPlaying && (
          <Card variant="spiritual" className="mb-4 sm:mb-6 animate-slide-up overflow-hidden">
            <CardContent className="p-3 sm:p-4 relative">
              <div className="absolute inset-0 islamic-pattern opacity-20" />
              <div className="relative flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground animate-pulse shrink-0" />
                  <div className="min-w-0">
                    <p className="font-semibold text-primary-foreground text-sm sm:text-base">Adhan Playing</p>
                    <p className="text-xs sm:text-sm text-primary-foreground/70 truncate">{currentPrayer} prayer time</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={stopAdhan} className="text-primary-foreground shrink-0">
                  Stop
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Adhan Settings */}
        <Card variant="subtle" className="mb-4 sm:mb-6 animate-slide-up">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-sm sm:text-base">Adhan Notifications</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground truncate">Get notified at prayer times</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <Button
                  variant={notificationsEnabled ? "default" : "subtle"}
                  size="sm"
                  onClick={notificationsEnabled ? disableNotifications : enableNotifications}
                  className="text-xs sm:text-sm px-2 sm:px-3"
                >
                  {notificationsEnabled ? "On" : "Off"}
                </Button>
                <Button
                  variant={audioEnabled ? "default" : "subtle"}
                  size="icon-sm"
                  onClick={toggleAudio}
                  title={audioEnabled ? "Disable Adhan Audio" : "Enable Adhan Audio"}
                  className="w-8 h-8"
                >
                  {audioEnabled ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          {/* Prayer Times */}
          <div className="space-y-4 animate-slide-up">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Today's Prayers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {isLoading ? (
                  <>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <Skeleton key={i} className="h-16 w-full rounded-xl" />
                    ))}
                  </>
                ) : error ? (
                  <p className="text-muted-foreground text-center py-8">
                    Unable to load prayer times. Please enable location access.
                  </p>
                ) : (
                  prayersWithStatus.map((prayer) => (
                    <div
                      key={prayer.name}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-xl transition-all",
                        prayer.name === nextPrayer?.name
                          ? "bg-primary text-primary-foreground"
                          : prayer.isPast
                          ? "bg-muted/50 text-muted-foreground"
                          : "bg-secondary/50"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center",
                          prayer.name === nextPrayer?.name
                            ? "bg-primary-foreground/20"
                            : "bg-primary/10"
                        )}>
                          <span className={cn(
                            "font-arabic text-sm",
                            prayer.name === nextPrayer?.name ? "text-primary-foreground" : "text-primary"
                          )}>
                            {prayer.arabicName}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium block">{prayer.name}</span>
                          {prayer.name === nextPrayer?.name && prayerData?.timeToNextPrayer && (
                            <span className="text-xs text-primary-foreground/70">
                              in {prayerData.timeToNextPrayer}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="font-semibold tabular-nums">{prayer.time}</span>
                        {prayer.name !== "Sunrise" && (
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => toggleNotification(prayer.name)}
                            className={cn(
                              prayer.name === nextPrayer?.name
                                ? "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                          >
                            {notificationStates[prayer.name] && notificationsEnabled ? (
                              <Bell className="w-4 h-4" />
                            ) : (
                              <BellOff className="w-4 h-4" />
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Qibla Direction */}
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <Card variant="spiritual" className="h-full">
              <CardContent className="p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center min-h-[320px] sm:min-h-[400px]">
                <Compass className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground/80 mb-3 sm:mb-4" />
                <h2 className="text-lg sm:text-xl font-semibold text-primary-foreground mb-1 sm:mb-2">
                  Qibla Direction
                </h2>
                <p className="text-primary-foreground/70 text-xs sm:text-sm mb-4 sm:mb-8 text-center px-4">
                  Face the Kaaba in Mecca for prayer
                </p>

                {/* Compass */}
                <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64">
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full border-2 sm:border-4 border-primary-foreground/20" />
                  
                  {/* Direction markers */}
                  <div className="absolute inset-3 sm:inset-4 rounded-full border sm:border-2 border-primary-foreground/10" />
                  
                  {/* Cardinal directions */}
                  <span className="absolute top-1.5 sm:top-2 left-1/2 -translate-x-1/2 text-xs sm:text-sm font-medium text-primary-foreground">N</span>
                  <span className="absolute bottom-1.5 sm:bottom-2 left-1/2 -translate-x-1/2 text-xs sm:text-sm font-medium text-primary-foreground/60">S</span>
                  <span className="absolute left-1.5 sm:left-2 top-1/2 -translate-y-1/2 text-xs sm:text-sm font-medium text-primary-foreground/60">W</span>
                  <span className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 text-xs sm:text-sm font-medium text-primary-foreground/60">E</span>

                  {/* Qibla arrow */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
                    style={{ transform: `rotate(${arrowRotation}deg)` }}
                  >
                    <div className="relative h-full flex flex-col items-center justify-start pt-6 sm:pt-8">
                      <Navigation className="w-6 h-6 sm:w-8 sm:h-8 text-gold fill-gold" />
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-primary-foreground/30" />
                  </div>
                </div>

                <div className="mt-4 sm:mt-8 text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-primary-foreground">{qiblaDirection}°</p>
                  <p className="text-primary-foreground/70 text-xs sm:text-sm">{getDirectionName(qiblaDirection)}</p>
                  
                  {!compassAvailable && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-3 sm:mt-4 text-primary-foreground/80 hover:text-primary-foreground text-xs sm:text-sm"
                      onClick={requestCompassPermission}
                    >
                      <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                      Enable Compass
                    </Button>
                  )}
                  
                  {compassAvailable && (
                    <p className="text-[10px] sm:text-xs text-primary-foreground/50 mt-2">
                      ✓ Compass active - Point device north
                    </p>
                  )}
                  
                  {compassError && (
                    <p className="text-[10px] sm:text-xs text-primary-foreground/50 mt-2">
                      {compassError}
                    </p>
                  )}
                  
                  {!location && (
                    <p className="text-[10px] sm:text-xs text-primary-foreground/50 mt-2">
                      Enable location for accurate Qibla
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Card variant="subtle">
            <CardContent className="p-4">
              <h3 className="font-medium text-foreground mb-1">Calculation Method</h3>
              <p className="text-sm text-muted-foreground">ISNA (Islamic Society of North America)</p>
            </CardContent>
          </Card>
          <Card variant="subtle">
            <CardContent className="p-4">
              <h3 className="font-medium text-foreground mb-1">Juristic Method</h3>
              <p className="text-sm text-muted-foreground">Hanafi (Standard)</p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Prayers;
