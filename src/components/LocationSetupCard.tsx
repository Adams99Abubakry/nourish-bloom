import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Loader2, Save, LocateFixed } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Angola", "Argentina", "Australia", "Austria",
  "Bahrain", "Bangladesh", "Belgium", "Bosnia and Herzegovina", "Brazil", "Brunei",
  "Cameroon", "Canada", "Chad", "China", "Colombia", "Comoros", "Côte d'Ivoire",
  "Denmark", "Djibouti", "Egypt", "Ethiopia", "Finland", "France", "Gambia",
  "Germany", "Ghana", "Guinea", "Guyana", "India", "Indonesia", "Iran", "Iraq",
  "Ireland", "Italy", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait",
  "Kyrgyzstan", "Lebanon", "Libya", "Malaysia", "Maldives", "Mali", "Mauritania",
  "Mexico", "Morocco", "Mozambique", "Netherlands", "Niger", "Nigeria", "Norway",
  "Oman", "Pakistan", "Palestine", "Philippines", "Poland", "Portugal", "Qatar",
  "Russia", "Saudi Arabia", "Senegal", "Sierra Leone", "Singapore", "Somalia",
  "South Africa", "Spain", "Sri Lanka", "Sudan", "Sweden", "Switzerland", "Syria",
  "Tajikistan", "Tanzania", "Thailand", "Trinidad and Tobago", "Tunisia", "Turkey",
  "Turkmenistan", "UAE", "Uganda", "Ukraine", "United Kingdom", "United States",
  "Uzbekistan", "Yemen"
];

interface LocationSetupCardProps {
  onLocationSaved?: () => void;
  showAsDialog?: boolean;
}

export function LocationSetupCard({ onLocationSaved }: LocationSetupCardProps) {
  const { user, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isGeolocating, setIsGeolocating] = useState(false);

  const geocodeLocation = async (city: string, state: string, country: string) => {
    const query = [city, state, country].filter(Boolean).join(", ");
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`
      );
      const data = await response.json();
      if (data.length > 0) {
        return { latitude: parseFloat(data[0].lat), longitude: parseFloat(data[0].lon) };
      }
    } catch (err) {
      console.error("Geocoding error:", err);
    }
    return null;
  };

  const handleAutoDetect = async () => {
    if (!navigator.geolocation) {
      toast({ title: "Not supported", description: "Geolocation is not supported by your device.", variant: "destructive" });
      return;
    }
    setIsGeolocating(true);
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 });
      });
      const { latitude, longitude } = position.coords;
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      const data = await response.json();
      setCity(data.city || data.locality || "");
      setState(data.principalSubdivision || "");
      setCountry(data.countryName || "");
    } catch {
      toast({ title: "Location failed", description: "Could not detect your location automatically.", variant: "destructive" });
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
      const coords = await geocodeLocation(city, state, country);
      if (!coords) {
        toast({ title: "Location not found", description: "Could not find coordinates for the given location. Please check and try again.", variant: "destructive" });
        setIsSaving(false);
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          preferred_city: city,
          preferred_country: country,
          preferred_latitude: coords.latitude,
          preferred_longitude: coords.longitude,
        })
        .eq("user_id", user.id);

      if (error) throw error;

      await refreshProfile();
      localStorage.setItem("nur-location-granted", "true");
      localStorage.setItem("nur-location-popup-seen", "true");

      toast({
        title: "Location Saved ✅",
        description: `Prayer times will now be based on ${city}, ${country}.`,
      });
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
        <Button
          variant="outline"
          className="w-full"
          onClick={handleAutoDetect}
          disabled={isGeolocating}
        >
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
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger id="country">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
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

        <Button
          className="w-full"
          onClick={handleSave}
          disabled={isSaving || (!city && !country)}
        >
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
