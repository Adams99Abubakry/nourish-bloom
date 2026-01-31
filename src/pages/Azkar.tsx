import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { azkarCategories, type Azkar as AzkarType } from "@/data/hisnulMuslimData";
import { Sun, Moon, BookOpen, Check, Share2, Copy, Twitter, Facebook } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Azkar = () => {
  const [selectedCategory, setSelectedCategory] = useState("morning");
  const [completedAzkar, setCompletedAzkar] = useState<Record<string, number>>({});

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "morning":
        return <Sun className="w-5 h-5" />;
      case "evening":
        return <Moon className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const currentCategory = azkarCategories.find(c => c.id === selectedCategory);

  const handleCount = (azkarId: number, maxCount: number) => {
    const key = `${selectedCategory}-${azkarId}`;
    const current = completedAzkar[key] || 0;
    if (current < maxCount) {
      setCompletedAzkar(prev => ({
        ...prev,
        [key]: current + 1
      }));
    }
  };

  const resetCount = (azkarId: number) => {
    const key = `${selectedCategory}-${azkarId}`;
    setCompletedAzkar(prev => ({
      ...prev,
      [key]: 0
    }));
  };

  const getCount = (azkarId: number) => {
    const key = `${selectedCategory}-${azkarId}`;
    return completedAzkar[key] || 0;
  };

  const isComplete = (azkarId: number, maxCount: number) => {
    return getCount(azkarId) >= maxCount;
  };

  const getTotalProgress = () => {
    if (!currentCategory) return 0;
    const total = currentCategory.azkar.reduce((sum, a) => sum + a.count, 0);
    const completed = currentCategory.azkar.reduce((sum, a) => sum + Math.min(getCount(a.id), a.count), 0);
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const copyToClipboard = async (azkar: AzkarType) => {
    const text = `${azkar.arabic}\n\n${azkar.transliteration}\n\n${azkar.translation}\n\n— ${azkar.reference}`;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  const shareToTwitter = (azkar: AzkarType) => {
    const text = `${azkar.arabic}\n\n"${azkar.translation}"\n\n— ${azkar.reference}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const shareToFacebook = (azkar: AzkarType) => {
    const text = `${azkar.arabic}\n\n"${azkar.translation}"\n\n— ${azkar.reference}`;
    const url = `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const shareNative = async (azkar: AzkarType) => {
    const text = `${azkar.arabic}\n\n${azkar.transliteration}\n\n${azkar.translation}\n\n— ${azkar.reference}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: azkar.title,
          text: text,
        });
      } catch (err) {
        // User cancelled or share failed
        if ((err as Error).name !== "AbortError") {
          toast.error("Failed to share");
        }
      }
    } else {
      // Fallback to copy
      copyToClipboard(azkar);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-primary/10 mb-3 sm:mb-4">
            <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">Hisnul Muslim</h1>
          <p className="text-muted-foreground text-sm sm:text-base">حصن المسلم - Fortress of the Muslim</p>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="animate-slide-up">
          <TabsList className="w-full justify-start overflow-x-auto mb-4 sm:mb-6 flex-nowrap">
            {azkarCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="gap-1.5 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3 shrink-0">
                {getCategoryIcon(category.id)}
                <span className="hidden xs:inline">{category.name}</span>
                <span className="xs:hidden">{category.name.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {azkarCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-3 sm:space-y-4">
              {/* Progress Card */}
              <Card variant="spiritual" className="overflow-hidden">
                <CardContent className="p-4 sm:p-6 relative">
                  <div className="absolute inset-0 islamic-pattern opacity-20" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-3 sm:mb-4 gap-3">
                      <div className="min-w-0">
                        <h2 className="text-lg sm:text-xl font-semibold text-primary-foreground truncate">
                          {category.arabicName}
                        </h2>
                        <p className="text-primary-foreground/70 text-xs sm:text-sm">
                          {category.azkar.length} adhkar in this section
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-2xl sm:text-3xl font-bold text-primary-foreground">
                          {getTotalProgress()}%
                        </p>
                        <p className="text-[10px] sm:text-xs text-primary-foreground/60">Completed</p>
                      </div>
                    </div>
                    <div className="h-1.5 sm:h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary-foreground/80 transition-all duration-300"
                        style={{ width: `${getTotalProgress()}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Azkar List */}
              <div className="space-y-3 sm:space-y-4">
                {category.azkar.map((azkar) => (
                  <Card 
                    key={azkar.id} 
                    variant={isComplete(azkar.id, azkar.count) ? "subtle" : "elevated"}
                    className={cn(
                      "overflow-hidden transition-all",
                      isComplete(azkar.id, azkar.count) && "opacity-75"
                    )}
                  >
                    <CardContent className="p-4 sm:p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                          <div className={cn(
                            "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shrink-0",
                            isComplete(azkar.id, azkar.count)
                              ? "bg-primary text-primary-foreground"
                              : "bg-primary/10 text-primary"
                          )}>
                            {isComplete(azkar.id, azkar.count) ? (
                              <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                            ) : (
                              azkar.id
                            )}
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-semibold text-foreground text-sm sm:text-base truncate">{azkar.title}</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground arabic truncate">
                              {azkar.arabicTitle}
                            </p>
                          </div>
                        </div>
                        
                        {/* Share Button */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon-sm" className="shrink-0 w-8 h-8">
                              <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => shareNative(azkar)}>
                              <Share2 className="w-4 h-4 mr-2" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => copyToClipboard(azkar)}>
                              <Copy className="w-4 h-4 mr-2" />
                              Copy to Clipboard
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => shareToTwitter(azkar)}>
                              <Twitter className="w-4 h-4 mr-2" />
                              Share on X
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => shareToFacebook(azkar)}>
                              <Facebook className="w-4 h-4 mr-2" />
                              Share on Facebook
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Arabic Text */}
                      <div className="bg-secondary/50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
                        <p className="arabic-lg text-foreground text-center leading-loose">
                          {azkar.arabic}
                        </p>
                      </div>

                      {/* Transliteration */}
                      <p className="text-xs sm:text-sm text-muted-foreground italic mb-1.5 sm:mb-2">
                        {azkar.transliteration}
                      </p>

                      {/* Translation */}
                      <p className="text-foreground mb-3 sm:mb-4 text-sm sm:text-base">{azkar.translation}</p>

                      {/* Reference */}
                      <p className="text-[10px] sm:text-xs text-muted-foreground mb-3 sm:mb-4">
                        Reference: {azkar.reference}
                      </p>

                      {/* Counter */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <Button
                            variant={isComplete(azkar.id, azkar.count) ? "subtle" : "default"}
                            onClick={() => handleCount(azkar.id, azkar.count)}
                            disabled={isComplete(azkar.id, azkar.count)}
                            className="min-w-[100px] sm:min-w-[120px] text-xs sm:text-sm"
                            size="sm"
                          >
                            {isComplete(azkar.id, azkar.count) ? (
                              "Done ✓"
                            ) : (
                              `Count (${getCount(azkar.id)}/${azkar.count})`
                            )}
                          </Button>
                          {getCount(azkar.id) > 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => resetCount(azkar.id)}
                              className="text-xs sm:text-sm px-2"
                            >
                              Reset
                            </Button>
                          )}
                        </div>
                        <span className="text-xs sm:text-sm text-muted-foreground">
                          Repeat {azkar.count}x
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Azkar;
