import { Moon } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-8 mt-auto border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4">
          {/* Islamic greeting */}
          <p className="arabic text-lg text-muted-foreground">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p className="text-sm text-muted-foreground">
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
          
          {/* Developer credit with animation */}
          <div className="flex items-center justify-center gap-2 pt-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 animate-pulse-subtle">
              <Moon className="w-4 h-4 text-primary animate-float" />
              <span className="text-sm text-muted-foreground">
                Developed with 💚 by{" "}
                <span className="font-semibold text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-shimmer">
                  SiddiqueDev
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
