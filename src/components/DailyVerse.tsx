import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Bookmark, RefreshCw } from "lucide-react";

export function DailyVerse() {
  // This would be fetched from an API in production
  const verse = {
    arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
    translation: "And whoever relies upon Allah – then He is sufficient for him.",
    reference: "At-Talaq 65:3",
    surah: 65,
    ayah: 3,
  };

  return (
    <Card variant="spiritual" className="overflow-hidden relative">
      <div className="absolute inset-0 islamic-pattern opacity-30" />
      <CardContent className="p-6 md:p-8 relative">
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-medium text-primary-foreground/80 bg-primary-foreground/10 px-3 py-1 rounded-full">
            Verse of the Day
          </span>
          <Button variant="ghost" size="icon-sm" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="space-y-4 text-center">
          <p className="arabic-xl text-primary-foreground leading-relaxed">
            {verse.arabic}
          </p>
          <p className="text-lg text-primary-foreground/90 max-w-lg mx-auto">
            "{verse.translation}"
          </p>
          <p className="text-sm text-primary-foreground/70">
            — {verse.reference}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
            <Bookmark className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
