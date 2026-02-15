import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Loader2, LocateFixed, Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ALL_COUNTRIES } from "@/data/countries";

interface LocationPermissionPopupProps {
  onLocationGranted?: (coords?: GeolocationCoordinates) => void;
  onDismiss?: () => void;
}

export const LocationPermissionPopup = ({
  onLocationGranted,
  onDismiss,
}: LocationPermissionPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showManual, setShowManual] = useState(false);
  const [country, setCountry] = useState("");
  const [countrySearch, setCountrySearch] = useState("");
  const [city, setCity] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { user, refreshProfile } = useAuth();
  const { toast } = useToast();

  const filteredCountries = ALL_COUNTRIES.filter(c =>
    c.toLowerCase().includes(countrySearch.toLowerCase())
  );

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("nur-location-popup-seen");
    const hasLocation = localStorage.getItem("nur-location-granted");
    
    if (!hasSeenPopup && !hasLocation) {
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleEnableLocation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!navigator.geolocation) {
        throw { code: 2, message: "Geolocation not supported" };
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: false, // Less strict for Capacitor
          timeout: 15000,
          maximumAge: 300000, // Accept cached position up to 5 min
        });
      });

      // Reverse geocode to get city name
      try {
        const { latitude, longitude } = position.coords;
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );
        const data = await response.json();
        const detectedCity = data.city || data.locality || "";
        const detectedCountry = data.countryName || "";
        
        if (user && detectedCity) {
          await supabase.from("profiles").update({
            preferred_city: detectedCity,
            preferred_country: detectedCountry,
            preferred_latitude: latitude,
            preferred_longitude: longitude,
          }).eq("user_id", user.id);
          await refreshProfile();
        }
      } catch {
        // Reverse geocode failed, but we still have coords
      }

      localStorage.setItem("nur-location-granted", "true");
      localStorage.setItem("nur-location-popup-seen", "true");
      onLocationGranted?.(position.coords);
      setIsOpen(false);
    } catch (err: any) {
      setError("Could not detect location automatically. Please enter it manually below.");
      setShowManual(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualSave = async () => {
    if (!city || !country) {
      setError("Please enter both city and country.");
      return;
    }

    setIsSaving(true);
    setError(null);
    try {
      const query = `${city}, ${country}`;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`
      );
      const data = await response.json();
      if (data.length === 0) {
        setError("Location not found. Please check your city/country name.");
        setIsSaving(false);
        return;
      }
      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);

      if (user) {
        await supabase.from("profiles").update({
          preferred_city: city,
          preferred_country: country,
          preferred_latitude: lat,
          preferred_longitude: lon,
        }).eq("user_id", user.id);
        await refreshProfile();
      }

      localStorage.setItem("nur-location-granted", "true");
      localStorage.setItem("nur-location-popup-seen", "true");
      toast({ title: "Location Set ✅", description: `Prayer times will be based on ${city}, ${country}.` });
      onLocationGranted?.();
      setIsOpen(false);
    } catch {
      setError("Failed to save location. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem("nur-location-popup-seen", "true");
    setIsOpen(false);
    onDismiss?.();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-md mx-auto rounded-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
            <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
          </div>
          <DialogTitle className="text-center text-lg sm:text-xl">
            Set Your Location for Prayer Times
          </DialogTitle>
          <DialogDescription className="text-center text-sm">
            We need your location to show accurate prayer times, Qibla direction, and nearby mosques.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
          {error && (
            <div className="p-2.5 sm:p-3 rounded-lg bg-destructive/10 text-destructive text-xs sm:text-sm text-center">
              {error}
            </div>
          )}

          {!showManual && (
            <div className="space-y-2">
              <Button className="w-full h-10 sm:h-11 text-sm" onClick={handleEnableLocation} disabled={isLoading}>
                {isLoading ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Detecting Location...</>
                ) : (
                  <><LocateFixed className="w-4 h-4 mr-2" />Auto-detect Location</>
                )}
              </Button>
              <Button variant="outline" className="w-full h-10 sm:h-11 text-sm" onClick={() => setShowManual(true)}>
                <MapPin className="w-4 h-4 mr-2" />Enter Location Manually
              </Button>
            </div>
          )}

          {showManual && (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-sm">Country</Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search country..."
                    value={countrySearch}
                    onChange={(e) => { setCountrySearch(e.target.value); setCountry(""); }}
                    className="pl-8"
                  />
                </div>
                {countrySearch && !country && (
                  <div className="max-h-32 overflow-y-auto border rounded-md bg-background">
                    {filteredCountries.slice(0, 10).map((c) => (
                      <button
                        key={c}
                        className="w-full text-left px-3 py-1.5 text-sm hover:bg-accent transition-colors"
                        onClick={() => { setCountry(c); setCountrySearch(c); }}
                      >
                        {c}
                      </button>
                    ))}
                    {filteredCountries.length === 0 && (
                      <p className="px-3 py-2 text-xs text-muted-foreground">No country found</p>
                    )}
                  </div>
                )}
                {country && (
                  <p className="text-xs text-primary">✓ {country}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">City</Label>
                <Input placeholder="e.g. Lagos, London, Riyadh" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              <Button className="w-full h-10 sm:h-11 text-sm" onClick={handleManualSave} disabled={isSaving || !city || !country}>
                {isSaving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</> : "Save Location"}
              </Button>
              <Button variant="ghost" className="w-full text-sm" onClick={() => { setShowManual(false); setError(null); }}>
                Back to auto-detect
              </Button>
            </div>
          )}

          {!showManual && (
            <Button variant="ghost" className="w-full h-10 sm:h-11 text-sm" onClick={handleDismiss} disabled={isLoading}>
              Maybe Later
            </Button>
          )}

          <p className="text-[10px] sm:text-xs text-muted-foreground text-center px-4">
            Your location is only used for prayer times and never shared.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
