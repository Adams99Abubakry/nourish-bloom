import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Loader2, Save, LocateFixed, Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ALL_COUNTRIES } from "@/data/countries";

interface LocationSetupCardProps {
  onLocationSaved?: () => void;
  showAsDialog?: boolean;
}

export function LocationSetupCard({ onLocationSaved }: LocationSetupCardProps) {
  const { user, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [country, setCountry] = useState("");
  const [countrySearch, setCountrySearch] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isGeolocating, setIsGeolocating] = useState(false);

  const filteredCountries = ALL_COUNTRIES.filter(c =>
    c.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const handleAutoDetect = async () => {
    if (!navigator.geolocation) {
      toast({ title: "Not supported", description: "Geolocation is not supported by your device.", variant: "destructive" });
      return;
    }
    setIsGeolocating(true);
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 15000, maximumAge: 300000 });
      });
      const { latitude, longitude } = position.coords;
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      const data = await response.json();
      const detectedCity = data.city || data.locality || "";
      const detectedState = data.principalSubdivision || "";
      const detectedCountry = data.countryName || "";
      setCity(detectedCity);
      setState(detectedState);
      setCountry(detectedCountry);
      setCountrySearch(detectedCountry);
    } catch {
      toast({ title: "Location failed", description: "Could not detect your location. Please enter manually.", variant: "destructive" });
    } finally {
      setIsGeolocating(false);
    }
  };

  const handleSave = async () => {
    if (!user) {
      toast({ title: "Sign in required", description: "Please sign in to save your location.", variant: "destructive" });
      return;
    }
    if (!city || !country) {
      toast({ title: "Missing info", description: "Please enter at least your city and country.", variant: "destructive" });
      return;
    }

    setIsSaving(true);
    try {
      const query = [city, state, country].filter(Boolean).join(", ");
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`
      );
      const data = await response.json();
      if (data.length === 0) {
        toast({ title: "Location not found", description: "Could not find coordinates. Please check and try again.", variant: "destructive" });
        setIsSaving(false);
        return;
      }

      const coords = { latitude: parseFloat(data[0].lat), longitude: parseFloat(data[0].lon) };
      const { error } = await supabase.from("profiles").update({
        preferred_city: city,
        preferred_country: country,
        preferred_latitude: coords.latitude,
        preferred_longitude: coords.longitude,
      }).eq("user_id", user.id);

      if (error) throw error;

      await refreshProfile();
      localStorage.setItem("nur-location-granted", "true");
      localStorage.setItem("nur-location-popup-seen", "true");
      toast({ title: "Location Saved ✅", description: `Prayer times will now be based on ${city}, ${country}.` });
      onLocationSaved?.();
    } catch (error) {
      console.error("Error saving location:", error);
      toast({ title: "Error", description: "Failed to save location. Please try again.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card variant="elevated">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <MapPin className="w-5 h-5 text-primary" />
          Set Your Location
        </CardTitle>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Enter your location for accurate prayer times
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="outline" className="w-full" onClick={handleAutoDetect} disabled={isGeolocating}>
          {isGeolocating ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Detecting...</>
          ) : (
            <><LocateFixed className="w-4 h-4 mr-2" /> Auto-detect My Location</>
          )}
        </Button>

        <div className="relative flex items-center gap-2">
          <div className="flex-1 border-t border-border" />
          <span className="text-xs text-muted-foreground">or enter manually</span>
          <div className="flex-1 border-t border-border" />
        </div>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="country" className="text-sm">Country</Label>
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
            {country && <p className="text-xs text-primary">✓ {country}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="state" className="text-sm">State / Province</Label>
            <Input id="state" placeholder="e.g. Lagos, California" value={state} onChange={(e) => setState(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="city" className="text-sm">City</Label>
            <Input id="city" placeholder="e.g. Ikeja, London" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
        </div>

        <Button className="w-full" onClick={handleSave} disabled={isSaving || (!city && !country)}>
          {isSaving ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
          ) : (
            <><Save className="w-4 h-4 mr-2" /> Save Location</>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
