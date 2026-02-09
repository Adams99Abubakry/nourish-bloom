import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, BookOpen, Quote } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const charityInspirations = [
  {
    type: "Qur'an",
    arabic: "مَّن ذَا الَّذِي يُقْرِضُ اللَّهَ قَرْضًا حَسَنًا فَيُضَاعِفَهُ لَهُ أَضْعَافًا كَثِيرَةً",
    translation: "Who is it that would loan Allah a goodly loan so He may multiply it for him many times over?",
    reference: "Surah Al-Baqarah 2:245",
  },
  {
    type: "Qur'an",
    arabic: "الَّذِينَ يُنفِقُونَ أَمْوَالَهُم بِاللَّيْلِ وَالنَّهَارِ سِرًّا وَعَلَانِيَةً فَلَهُمْ أَجْرُهُمْ عِندَ رَبِّهِمْ",
    translation: "Those who spend their wealth by night and day, secretly and openly, they shall have their reward with their Lord.",
    reference: "Surah Al-Baqarah 2:274",
  },
  {
    type: "Hadith",
    arabic: "مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ",
    translation: "Charity does not decrease wealth.",
    reference: "Sahih Muslim 2588",
  },
  {
    type: "Hadith",
    arabic: "الصَّدَقَةُ تُطْفِئُ الْخَطِيئَةَ كَمَا يُطْفِئُ الْمَاءُ النَّارَ",
    translation: "Charity extinguishes sin as water extinguishes fire.",
    reference: "Tirmidhi 2616",
  },
];

export function DonationCard() {
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const inspiration = charityInspirations[Math.floor(Date.now() / 86400000) % charityInspirations.length];

  const handleDonate = () => {
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount < 100) {
      toast({ title: "Invalid amount", description: "Please enter at least ₦100", variant: "destructive" });
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ title: "Invalid email", description: "Please enter a valid email address", variant: "destructive" });
      return;
    }

    const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
    if (!publicKey) {
      toast({ title: "Configuration error", description: "Payment is not configured yet", variant: "destructive" });
      return;
    }

    setIsProcessing(true);

    const handler = (window as any).PaystackPop?.setup({
      key: publicKey,
      email,
      amount: numAmount * 100, // Paystack uses kobo
      currency: "NGN",
      ref: `NUR_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      callback: (response: any) => {
        setIsProcessing(false);
        toast({
          title: "JazakAllahu Khairan! 🤲",
          description: `Your donation of ₦${numAmount.toLocaleString()} was successful. Reference: ${response.reference}`,
        });
        setAmount("");
        setEmail("");
      },
      onClose: () => {
        setIsProcessing(false);
      },
    });

    if (handler) {
      handler.openIframe();
    } else {
      setIsProcessing(false);
      toast({ title: "Loading payment", description: "Please try again in a moment", variant: "destructive" });
    }
  };

  return (
    <Card variant="elevated" className="overflow-hidden">
      <CardContent className="p-4 sm:p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
            <Heart className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Support Nur ul Islam</h3>
            <p className="text-xs text-muted-foreground">Help us keep this app free for everyone</p>
          </div>
        </div>

        {/* Inspiration Quote */}
        <div className="bg-background/50 rounded-xl p-3 space-y-2 border border-border/30">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {inspiration.type === "Qur'an" ? (
              <BookOpen className="w-3 h-3" />
            ) : (
              <Quote className="w-3 h-3" />
            )}
            <span className="font-medium">{inspiration.reference}</span>
          </div>
          <p className="text-sm arabic text-foreground leading-relaxed text-right">{inspiration.arabic}</p>
          <p className="text-xs text-muted-foreground italic">{inspiration.translation}</p>
        </div>

        {/* Donation Form */}
        <div className="space-y-3">
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-background/70"
          />
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₦</span>
              <Input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-7 bg-background/70"
                min="100"
              />
            </div>
            <Button
              variant="gold"
              onClick={handleDonate}
              disabled={isProcessing}
              className="whitespace-nowrap"
            >
              {isProcessing ? "Processing..." : "Donate"}
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground text-center">
            Secure payment via Paystack • Minimum ₦100
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
