import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Loader2, X } from "lucide-react";

interface LocationPermissionPopupProps {
  onLocationGranted?: (coords: GeolocationCoordinates) => void;
  onDismiss?: () => void;
}

export const LocationPermissionPopup = ({
  onLocationGranted,
  onDismiss,
}: LocationPermissionPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user has already dismissed or granted permission
    const hasSeenPopup = localStorage.getItem("nur-location-popup-seen");
    const hasLocation = localStorage.getItem("nur-location-granted");
    
    if (!hasSeenPopup && !hasLocation) {
      // Show popup after a short delay for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleEnableLocation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!navigator.geolocation) {
        throw new Error("Geolocation is not supported by your browser");
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      });

      localStorage.setItem("nur-location-granted", "true");
      localStorage.setItem("nur-location-popup-seen", "true");
      onLocationGranted?.(position.coords);
      setIsOpen(false);
    } catch (err: any) {
      if (err.code === 1) {
        setError("Location permission denied. Please enable it in your browser settings.");
      } else if (err.code === 2) {
        setError("Unable to determine your location. Please try again.");
      } else if (err.code === 3) {
        setError("Location request timed out. Please try again.");
      } else {
        setError(err.message || "Failed to get location");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem("nur-location-popup-seen", "true");
    setIsOpen(false);
    onDismiss?.();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl">
            Enable Location for Accurate Prayer Times
          </DialogTitle>
          <DialogDescription className="text-center">
            Allow location access to get precise prayer times for your area, accurate Qibla direction, and personalized Islamic calendar dates.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Button
              className="w-full"
              onClick={handleEnableLocation}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Detecting Location...
                </>
              ) : (
                <>
                  <MapPin className="w-4 h-4 mr-2" />
                  Enable Location
                </>
              )}
            </Button>

            <Button
              variant="ghost"
              className="w-full"
              onClick={handleDismiss}
              disabled={isLoading}
            >
              Maybe Later
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Your location is only used locally and never stored on our servers.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
