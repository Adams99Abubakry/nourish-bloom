import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  audioUrl: string;
  onNext?: () => void;
  onPrevious?: () => void;
  verseNumber?: number;
  totalVerses?: number;
  className?: string;
}

export function AudioPlayer({
  audioUrl,
  onNext,
  onPrevious,
  verseNumber,
  totalVerses,
  className,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsPlaying(false);
      if (onNext) onNext();
    };

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [onNext]);

  useEffect(() => {
    // Reset and load new audio when URL changes
    if (audioRef.current) {
      audioRef.current.load();
      setProgress(0);
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [audioUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className={cn("flex items-center gap-2 p-3 rounded-xl bg-muted/50", className)}>
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={onPrevious}
        disabled={!onPrevious || verseNumber === 1}
        className="text-muted-foreground hover:text-foreground"
      >
        <SkipBack className="w-4 h-4" />
      </Button>

      <Button
        variant="subtle"
        size="icon"
        onClick={togglePlay}
        className="bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
      </Button>

      <Button
        variant="ghost"
        size="icon-sm"
        onClick={onNext}
        disabled={!onNext || verseNumber === totalVerses}
        className="text-muted-foreground hover:text-foreground"
      >
        <SkipForward className="w-4 h-4" />
      </Button>

      {/* Progress bar */}
      <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden mx-2">
        <div
          className="h-full bg-primary transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {verseNumber && totalVerses && (
        <span className="text-xs text-muted-foreground tabular-nums min-w-[3rem] text-center">
          {verseNumber}/{totalVerses}
        </span>
      )}

      <Button
        variant="ghost"
        size="icon-sm"
        onClick={toggleMute}
        className="text-muted-foreground hover:text-foreground"
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </Button>
    </div>
  );
}
