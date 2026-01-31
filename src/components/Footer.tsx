import { Moon } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-6 sm:py-8 mt-auto border-t border-border/50 safe-bottom">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="text-center space-y-3 sm:space-y-4">
          {/* Islamic greeting */}
          <p className="arabic text-base sm:text-lg text-muted-foreground">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground px-4">
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
          
          {/* Developer credit */}
          <div className="flex items-center justify-center gap-2 pt-3 sm:pt-4">
            <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-secondary/50">
              <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              <span className="text-xs sm:text-sm text-muted-foreground">
                Developed by{" "}
                <span className="font-semibold text-foreground">
                  DevSiddique
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
