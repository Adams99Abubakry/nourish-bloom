import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Loader2, Navigation, ExternalLink } from "lucide-react";
import { useLocation as usePrayerLocation } from "@/hooks/usePrayerTimes";
import { Skeleton } from "@/components/ui/skeleton";

interface Masjid {
  name: string;
  address: string;
  lat: number;
  lon: number;
  distance?: number;
}

const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const fetchNearbyMosques = async (lat: number, lon: number): Promise<Masjid[]> => {
  const query = `
    [out:json][timeout:15];
    (
      node["amenity"="place_of_worship"]["religion"="muslim"](around:10000,${lat},${lon});
      way["amenity"="place_of_worship"]["religion"="muslim"](around:10000,${lat},${lon});
    );
    out center body;
  `;
  const response = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: `data=${encodeURIComponent(query)}`,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  if (!response.ok) throw new Error("Failed to fetch mosques");
  const data = await response.json();

  const mosques: Masjid[] = data.elements
    .map((el: any) => {
      const elLat = el.lat ?? el.center?.lat;
      const elLon = el.lon ?? el.center?.lon;
      if (!elLat || !elLon) return null;
      const tags = el.tags || {};
      // Build a rich address from all available OSM tags
      const addressParts = [
        tags["addr:housenumber"],
        tags["addr:street"],
        tags["addr:suburb"] || tags["addr:neighbourhood"],
        tags["addr:city"] || tags["addr:town"] || tags["addr:village"],
        tags["addr:state"] || tags["addr:province"],
        tags["addr:postcode"],
        tags["addr:country"],
      ].filter(Boolean);
      const address = addressParts.length > 0
        ? addressParts.join(", ")
        : tags["description"] || tags["operator"] || "Tap directions for location";
      return {
        name: tags.name || tags["name:en"] || tags["name:ar"] || "Mosque",
        address,
        lat: elLat,
        lon: elLon,
        distance: haversineDistance(lat, lon, elLat, elLon),
      };
    })
    .filter(Boolean)
    .sort((a: Masjid, b: Masjid) => (a.distance || 0) - (b.distance || 0));

  return mosques;
};

export default function MasjidFinder() {
  const { location, loading: locationLoading } = usePrayerLocation();
  const [mosques, setMosques] = useState<Masjid[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (location) {
      loadMosques(location.latitude, location.longitude);
    }
  }, [location]);

  const loadMosques = async (lat: number, lon: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await fetchNearbyMosques(lat, lon);
      setMosques(results);
      if (results.length === 0) {
        setError("No mosques found nearby. Try searching a different area.");
      }
    } catch {
      setError("Failed to load nearby mosques. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`
      );
      const geoData = await geoRes.json();
      if (geoData.length === 0) {
        setError("Location not found. Please try a different search.");
        setIsLoading(false);
        return;
      }
      await loadMosques(parseFloat(geoData[0].lat), parseFloat(geoData[0].lon));
    } catch {
      setError("Search failed. Please try again.");
      setIsLoading(false);
    }
  };

  const openDirections = (masjid: Masjid) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${masjid.lat},${masjid.lon}`;
    window.open(url, "_blank");
  };

  const filtered = mosques.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-2xl">
        <div className="text-center mb-6 animate-fade-in">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-primary/10 mb-3">
            <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">Masjid Finder</h1>
          <p className="text-sm text-muted-foreground">Find nearby mosques for Jumu'ah and daily prayers</p>
          {location && (
            <p className="text-xs text-muted-foreground mt-1">📍 {location.city}, {location.country}</p>
          )}
        </div>

        {/* Search */}
        <div className="flex gap-2 mb-4 sm:mb-6">
          <Input
            placeholder="Search by city or mosque name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1"
          />
          <Button onClick={handleSearch} disabled={isLoading} size="icon" className="shrink-0">
            <Search className="w-4 h-4" />
          </Button>
        </div>

        {/* Loading */}
        {(isLoading || locationLoading) && (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))}
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <Card variant="subtle" className="text-center py-8">
            <CardContent>
              <p className="text-muted-foreground">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {!isLoading && !locationLoading && filtered.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">{filtered.length} mosque{filtered.length > 1 ? "s" : ""} found</p>
            {filtered.map((masjid, i) => (
              <Card key={i} variant="elevated" className="overflow-hidden animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-foreground text-sm sm:text-base truncate">{masjid.name}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">{masjid.address}</p>
                        {masjid.distance !== undefined && (
                          <p className="text-xs text-primary font-medium mt-1">
                            {masjid.distance < 1
                              ? `${Math.round(masjid.distance * 1000)}m away`
                              : `${masjid.distance.toFixed(1)}km away`}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openDirections(masjid)}
                      className="shrink-0 gap-1"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Directions</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
