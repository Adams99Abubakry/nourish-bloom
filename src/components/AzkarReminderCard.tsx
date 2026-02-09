import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAzkarReminder } from "@/hooks/useAzkarReminder";
import { Bell, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AzkarReminderCard() {
  const { enabled, intervalHours, enable, disable, setIntervalHours, triggerReminder } = useAzkarReminder();
  const { toast } = useToast();

  const handleToggle = async (checked: boolean) => {
    if (checked) {
      await enable();
      toast({
        title: "Azkar Reminder Enabled 🕌",
        description: `You'll be reminded to say your Azkar every ${intervalHours} hour(s). Voice will play when the app is open, and notifications when it's in the background.`,
      });
    } else {
      disable();
      toast({
        title: "Azkar Reminder Disabled",
        description: "You will no longer receive Azkar reminders.",
      });
    }
  };

  const handleTest = () => {
    triggerReminder();
    toast({
      title: "Test Reminder Sent",
      description: "A voice reminder and notification should appear now.",
    });
  };

  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          Azkar Voice Reminder
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="azkar-reminder" className="flex items-center gap-2">
              <Volume2 className={`w-4 h-4 ${enabled ? "text-primary" : ""}`} />
              Hourly Azkar Reminder
            </Label>
            <p className="text-sm text-muted-foreground">
              A voice will remind you to say your Azkar
            </p>
          </div>
          <Switch
            id="azkar-reminder"
            checked={enabled}
            onCheckedChange={handleToggle}
          />
        </div>

        {enabled && (
          <>
            <div className="space-y-2">
              <Label>Reminder Interval</Label>
              <Select
                value={String(intervalHours)}
                onValueChange={(v) => setIntervalHours(Number(v))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.5">Every 30 minutes</SelectItem>
                  <SelectItem value="1">Every 1 hour</SelectItem>
                  <SelectItem value="2">Every 2 hours</SelectItem>
                  <SelectItem value="3">Every 3 hours</SelectItem>
                  <SelectItem value="4">Every 4 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" className="w-full" onClick={handleTest}>
              <Volume2 className="w-4 h-4 mr-2" />
              Test Reminder Now
            </Button>

            <div className="p-3 bg-secondary/50 rounded-lg">
              <p className="text-xs text-muted-foreground">
                <strong>How it works:</strong>
              </p>
              <ul className="text-xs text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                <li>Voice plays when the app tab is open</li>
                <li>Push notification is sent when app is in background</li>
                <li>Keep the browser tab open for best experience</li>
              </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
