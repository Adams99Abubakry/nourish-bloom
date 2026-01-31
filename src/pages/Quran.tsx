import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { surahs } from "@/data/quranData";
import { Search, BookOpen, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const Quran = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "meccan" | "medinan">("all");

  const filteredSurahs = surahs.filter((surah) => {
    const matchesSearch =
      surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.name.includes(searchQuery) ||
      surah.number.toString() === searchQuery;
    
    const matchesFilter =
      filter === "all" ||
      (filter === "meccan" && surah.revelationType === "Meccan") ||
      (filter === "medinan" && surah.revelationType === "Medinan");

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-primary/10 mb-3 sm:mb-4">
            <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">The Noble Qur'an</h1>
          <p className="text-muted-foreground text-sm sm:text-base">القرآن الكريم</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-4 animate-slide-up">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            <Input
              placeholder="Search surah by name or number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 sm:pl-10 h-10 sm:h-12 bg-card border-border/50 text-sm sm:text-base"
            />
          </div>
          
          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {(["all", "meccan", "medinan"] as const).map((type) => (
              <Button
                key={type}
                variant={filter === type ? "default" : "subtle"}
                size="sm"
                onClick={() => setFilter(type)}
                className="capitalize text-xs sm:text-sm shrink-0 px-2.5 sm:px-3"
              >
                {type === "all" ? "All Surahs" : type}
              </Button>
            ))}
          </div>
        </div>

        {/* Surah List */}
        <div className="grid gap-1.5 sm:gap-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {filteredSurahs.map((surah) => (
            <Link key={surah.number} to={`/quran/${surah.number}`}>
              <Card variant="interactive" className="group">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-2.5 sm:gap-4">
                    {/* Surah Number */}
                    <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-primary font-semibold text-xs sm:text-base">{surah.number}</span>
                    </div>
                    
                    {/* Surah Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                        <h3 className="font-semibold text-foreground text-sm sm:text-base">{surah.englishName}</h3>
                        <span className={cn(
                          "text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full shrink-0",
                          surah.revelationType === "Meccan" 
                            ? "bg-accent/20 text-accent-foreground" 
                            : "bg-primary/10 text-primary"
                        )}>
                          {surah.revelationType}
                        </span>
                      </div>
                      <p className="text-[10px] sm:text-sm text-muted-foreground truncate">
                        {surah.englishNameTranslation} • {surah.numberOfAyahs} verses
                      </p>
                    </div>
                    
                    {/* Arabic Name */}
                    <div className="text-right shrink-0">
                      <p className="font-arabic text-base sm:text-xl text-foreground">{surah.name}</p>
                    </div>
                    
                    {/* Arrow */}
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 hidden xs:block" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredSurahs.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <p className="text-muted-foreground text-sm sm:text-base">No surahs found matching your search.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Quran;
