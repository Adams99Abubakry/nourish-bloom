import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Settings as SettingsIcon, Moon, Sun, Bell, BellOff, Volume2, VolumeX, BookOpen, Languages, Save, ArrowLeft } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { AzkarReminderCard } from "@/components/AzkarReminderCard";
import { LocationSetupCard } from "@/components/LocationSetupCard";

const RECITERS = [
  { id: "ar.alafasy", name: "Mishary Rashid Alafasy" },
  { id: "ar.abdulsamad", name: "Abdul Samad" },
  { id: "ar.husary", name: "Mahmoud Khalil Al-Husary" },
  { id: "ar.minshawi", name: "Mohamed Siddiq El-Minshawi" },
  { id: "ar.abdurrahmaansudais", name: "Abdurrahman As-Sudais" },
  { id: "ar.shaatree", name: "Abu Bakr Ash-Shaatri" },
  { id: "ar.ahmedajamy", name: "Ahmed ibn Ali al-Ajamy" },
  { id: "ar.muhammadayyoub", name: "Muhammad Ayyoub" },
  { id: "ar.parhizgar", name: "Parhizgar" },
  { id: "ar.maaborki", name: "Maher Al Muaiqly" },
  { id: "ar.hanirifai", name: "Hani Ar-Rifai" },
  { id: "ar.saikiafassi", name: "Saik Al Fassi" },
];

const TRANSLATIONS = [
  { id: "en.sahih", name: "Sahih International (English)" },
  { id: "en.pickthall", name: "Pickthall (English)" },
  { id: "en.yusufali", name: "Yusuf Ali (English)" },
  { id: "ur.jalandhry", name: "Jalandhry (Urdu)" },
  { id: "id.indonesian", name: "Indonesian" },
  { id: "tr.turkish", name: "Turkish" },
  { id: "fr.french", name: "French" },
  { id: "de.german", name: "German" },
  { id: "es.spanish", name: "Spanish" },
  { id: "bn.bengali", name: "Bengali" },
];

export default function Settings() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { user, profile, refreshProfile } = useAuth();
  const { toast } = useToast();
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    return localStorage.getItem('nur-adhan-notifications') === 'true';
  });
  const [audioEnabled, setAudioEnabled] = useState(() => {
    return localStorage.getItem('nur-adhan-audio') === 'true';
  });
  const [preferredReciter, setPreferredReciter] = useState(profile?.preferred_reciter || "ar.alafasy");
  const [preferredTranslation, setPreferredTranslation] = useState(profile?.preferred_translation || "en.sahih");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setPreferredReciter(profile.preferred_reciter || "ar.alafasy");
      setPreferredTranslation(profile.preferred_translation || "en.sahih");
    }
  }, [profile]);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleNotificationsToggle = async (enabled: boolean) => {
    if (enabled) {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          setNotificationsEnabled(true);
          localStorage.setItem('nur-adhan-notifications', 'true');
          toast({
            title: "Notifications Enabled",
            description: "You will receive prayer time notifications. Make sure to keep this tab open or allow background notifications in your browser settings.",
          });
        } else {
          toast({
            title: "Permission Denied",
            description: "Please allow notifications in your browser settings to receive prayer alerts.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Not Supported",
          description: "Your browser doesn't support notifications.",
          variant: "destructive",
        });
      }
    } else {
      setNotificationsEnabled(false);
      localStorage.setItem('nur-adhan-notifications', 'false');
    }
  };

  const handleAudioToggle = (enabled: boolean) => {
    setAudioEnabled(enabled);
    localStorage.setItem('nur-adhan-audio', String(enabled));
    toast({
      title: enabled ? "Adhan Audio Enabled" : "Adhan Audio Disabled",
      description: enabled 
        ? "Adhan will play at prayer times when this tab is open." 
        : "Adhan audio has been turned off.",
    });
  };

  const savePreferences = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          preferred_reciter: preferredReciter,
          preferred_translation: preferredTranslation,
          dark_mode: isDarkMode,
        })
        .eq('user_id', user.id);

      if (error) throw error;

      await refreshProfile();
      
      toast({
        title: "Settings Saved",
        description: "Your preferences have been updated successfully.",
      });
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast({
        title: "Error",
        description: "Failed to save preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground">Customize your Nūr al-Islam experience</p>
          </div>
        </div>

        <div className="grid gap-6 max-w-2xl">
          {/* Appearance */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Switch between light and dark themes
                  </p>
                </div>
                <Switch
                  id="dark-mode"
                  checked={isDarkMode}
                  onCheckedChange={toggleDarkMode}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications" className="flex items-center gap-2">
                    {notificationsEnabled ? <Bell className="w-4 h-4 text-primary" /> : <BellOff className="w-4 h-4" />}
                    Prayer Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive browser notifications at prayer times
                  </p>
                </div>
                <Switch
                  id="notifications"
                  checked={notificationsEnabled}
                  onCheckedChange={handleNotificationsToggle}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="audio" className="flex items-center gap-2">
                    {audioEnabled ? <Volume2 className="w-4 h-4 text-primary" /> : <VolumeX className="w-4 h-4" />}
                    Adhan Audio
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Play the Adhan at prayer times
                  </p>
                </div>
                <Switch
                  id="audio"
                  checked={audioEnabled}
                  onCheckedChange={handleAudioToggle}
                />
              </div>

              <div className="p-3 bg-secondary/50 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  <strong>Note:</strong> To receive notifications, you need to:
                </p>
                <ul className="text-xs text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                  <li>Allow notifications when prompted by your browser</li>
                  <li>Keep this website tab open in your browser</li>
                  <li>Ensure your device is not on "Do Not Disturb" mode</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Azkar Voice Reminder */}
          <AzkarReminderCard />

          {/* Location Settings */}
          <LocationSetupCard />

          {/* Quran Preferences */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Qur'an Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reciter">Preferred Reciter</Label>
                <Select value={preferredReciter} onValueChange={setPreferredReciter}>
                  <SelectTrigger id="reciter">
                    <SelectValue placeholder="Select a reciter" />
                  </SelectTrigger>
                  <SelectContent>
                    {RECITERS.map((reciter) => (
                      <SelectItem key={reciter.id} value={reciter.id}>
                        {reciter.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="translation" className="flex items-center gap-2">
                  <Languages className="w-4 h-4" />
                  Preferred Translation
                </Label>
                <Select value={preferredTranslation} onValueChange={setPreferredTranslation}>
                  <SelectTrigger id="translation">
                    <SelectValue placeholder="Select a translation" />
                  </SelectTrigger>
                  <SelectContent>
                    {TRANSLATIONS.map((translation) => (
                      <SelectItem key={translation.id} value={translation.id}>
                        {translation.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <Button 
            onClick={savePreferences} 
            disabled={isSaving}
            className="w-full"
            variant="spiritual"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Saving..." : "Save Preferences"}
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
