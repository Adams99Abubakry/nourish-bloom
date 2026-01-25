import { Header } from "@/components/Header";
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
      
      <main className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">The Noble Qur'an</h1>
          <p className="text-muted-foreground">القرآن الكريم</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 space-y-4 animate-slide-up">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search surah by name or number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-card border-border/50"
            />
          </div>
          
          <div className="flex gap-2">
            {(["all", "meccan", "medinan"] as const).map((type) => (
              <Button
                key={type}
                variant={filter === type ? "default" : "subtle"}
                size="sm"
                onClick={() => setFilter(type)}
                className="capitalize"
              >
                {type === "all" ? "All Surahs" : type}
              </Button>
            ))}
          </div>
        </div>

        {/* Surah List */}
        <div className="grid gap-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {filteredSurahs.map((surah) => (
            <Link key={surah.number} to={`/quran/${surah.number}`}>
              <Card variant="interactive" className="group">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Surah Number */}
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-primary font-semibold">{surah.number}</span>
                    </div>
                    
                    {/* Surah Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{surah.englishName}</h3>
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded-full",
                          surah.revelationType === "Meccan" 
                            ? "bg-accent/20 text-accent-foreground" 
                            : "bg-primary/10 text-primary"
                        )}>
                          {surah.revelationType}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {surah.englishNameTranslation} • {surah.numberOfAyahs} verses
                      </p>
                    </div>
                    
                    {/* Arabic Name */}
                    <div className="text-right">
                      <p className="font-arabic text-xl text-foreground">{surah.name}</p>
                    </div>
                    
                    {/* Arrow */}
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredSurahs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No surahs found matching your search.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Quran;
