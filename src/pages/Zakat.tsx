import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Coins, Info, DollarSign, HelpCircle } from "lucide-react";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ZakatValues {
  cash: number;
  bankBalance: number;
  goldValue: number;
  silverValue: number;
  stocks: number;
  businessAssets: number;
  receivables: number;
  otherAssets: number;
  liabilities: number;
}

const NISAB_GOLD_GRAMS = 87.48; // grams of gold
const NISAB_SILVER_GRAMS = 612.36; // grams of silver
const ZAKAT_RATE = 0.025; // 2.5%

// Current approximate prices (these should ideally come from an API)
const GOLD_PRICE_PER_GRAM = 65; // USD approximate
const SILVER_PRICE_PER_GRAM = 0.85; // USD approximate

const Zakat = () => {
  const [values, setValues] = useState<ZakatValues>({
    cash: 0,
    bankBalance: 0,
    goldValue: 0,
    silverValue: 0,
    stocks: 0,
    businessAssets: 0,
    receivables: 0,
    otherAssets: 0,
    liabilities: 0,
  });

  const [goldGrams, setGoldGrams] = useState(0);
  const [silverGrams, setSilverGrams] = useState(0);
  const [currency, setCurrency] = useState("USD");

  // Calculate gold and silver values
  const updateGoldValue = (grams: number) => {
    setGoldGrams(grams);
    setValues(prev => ({ ...prev, goldValue: grams * GOLD_PRICE_PER_GRAM }));
  };

  const updateSilverValue = (grams: number) => {
    setSilverGrams(grams);
    setValues(prev => ({ ...prev, silverValue: grams * SILVER_PRICE_PER_GRAM }));
  };

  const handleInputChange = (field: keyof ZakatValues, value: string) => {
    const numValue = parseFloat(value) || 0;
    setValues(prev => ({ ...prev, [field]: numValue }));
  };

  const calculations = useMemo(() => {
    const totalAssets = 
      values.cash +
      values.bankBalance +
      values.goldValue +
      values.silverValue +
      values.stocks +
      values.businessAssets +
      values.receivables +
      values.otherAssets;

    const netWorth = totalAssets - values.liabilities;
    
    const nisabGold = NISAB_GOLD_GRAMS * GOLD_PRICE_PER_GRAM;
    const nisabSilver = NISAB_SILVER_GRAMS * SILVER_PRICE_PER_GRAM;
    const nisabThreshold = Math.min(nisabGold, nisabSilver); // Use silver (lower) for safety
    
    const isEligible = netWorth >= nisabThreshold;
    const zakatDue = isEligible ? netWorth * ZAKAT_RATE : 0;

    return {
      totalAssets,
      netWorth,
      nisabGold,
      nisabSilver,
      nisabThreshold,
      isEligible,
      zakatDue,
    };
  }, [values]);

  const resetCalculator = () => {
    setValues({
      cash: 0,
      bankBalance: 0,
      goldValue: 0,
      silverValue: 0,
      stocks: 0,
      businessAssets: 0,
      receivables: 0,
      otherAssets: 0,
      liabilities: 0,
    });
    setGoldGrams(0);
    setSilverGrams(0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Calculator className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Zakat Calculator</h1>
          <p className="text-muted-foreground">حاسبة الزكاة</p>
          <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
            Calculate your annual zakat based on your savings, gold, silver, and other assets
          </p>
        </div>

        {/* Nisab Information */}
        <Card variant="spiritual" className="mb-6 animate-slide-up overflow-hidden">
          <CardContent className="p-6 relative">
            <div className="absolute inset-0 islamic-pattern opacity-20" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-primary-foreground" />
                <h3 className="font-semibold text-primary-foreground">Current Nisab Thresholds</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-primary-foreground">
                <div>
                  <p className="text-sm text-primary-foreground/70">Gold Nisab ({NISAB_GOLD_GRAMS}g)</p>
                  <p className="text-xl font-bold">{formatCurrency(calculations.nisabGold)}</p>
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/70">Silver Nisab ({NISAB_SILVER_GRAMS}g)</p>
                  <p className="text-xl font-bold">{formatCurrency(calculations.nisabSilver)}</p>
                </div>
              </div>
              <p className="text-xs text-primary-foreground/60 mt-4">
                * Prices are approximate. Please verify current gold/silver prices for accurate calculations.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Assets Input */}
          <Card variant="elevated" className="animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                Your Assets
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cash */}
              <div className="space-y-2">
                <Label htmlFor="cash" className="flex items-center gap-2">
                  Cash in Hand
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-3.5 h-3.5 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Physical cash you have at home or on your person</p>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Input
                  id="cash"
                  type="number"
                  min="0"
                  step="0.01"
                  value={values.cash || ''}
                  onChange={(e) => handleInputChange('cash', e.target.value)}
                  placeholder="0.00"
                />
              </div>

              {/* Bank Balance */}
              <div className="space-y-2">
                <Label htmlFor="bank">Bank Balances</Label>
                <Input
                  id="bank"
                  type="number"
                  min="0"
                  step="0.01"
                  value={values.bankBalance || ''}
                  onChange={(e) => handleInputChange('bankBalance', e.target.value)}
                  placeholder="0.00"
                />
              </div>

              {/* Gold */}
              <div className="space-y-2">
                <Label htmlFor="goldGrams" className="flex items-center gap-2">
                  Gold (in grams)
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-3.5 h-3.5 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Include all gold jewelry, coins, and bullion you own</p>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="goldGrams"
                    type="number"
                    min="0"
                    step="0.01"
                    value={goldGrams || ''}
                    onChange={(e) => updateGoldValue(parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    className="flex-1"
                  />
                  <div className="flex items-center px-3 bg-secondary rounded-lg text-sm text-muted-foreground">
                    ≈ {formatCurrency(values.goldValue)}
                  </div>
                </div>
              </div>

              {/* Silver */}
              <div className="space-y-2">
                <Label htmlFor="silverGrams">Silver (in grams)</Label>
                <div className="flex gap-2">
                  <Input
                    id="silverGrams"
                    type="number"
                    min="0"
                    step="0.01"
                    value={silverGrams || ''}
                    onChange={(e) => updateSilverValue(parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    className="flex-1"
                  />
                  <div className="flex items-center px-3 bg-secondary rounded-lg text-sm text-muted-foreground">
                    ≈ {formatCurrency(values.silverValue)}
                  </div>
                </div>
              </div>

              {/* Stocks/Investments */}
              <div className="space-y-2">
                <Label htmlFor="stocks">Stocks & Investments</Label>
                <Input
                  id="stocks"
                  type="number"
                  min="0"
                  step="0.01"
                  value={values.stocks || ''}
                  onChange={(e) => handleInputChange('stocks', e.target.value)}
                  placeholder="0.00"
                />
              </div>

              {/* Business Assets */}
              <div className="space-y-2">
                <Label htmlFor="business">Business Assets/Inventory</Label>
                <Input
                  id="business"
                  type="number"
                  min="0"
                  step="0.01"
                  value={values.businessAssets || ''}
                  onChange={(e) => handleInputChange('businessAssets', e.target.value)}
                  placeholder="0.00"
                />
              </div>

              {/* Money Owed to You */}
              <div className="space-y-2">
                <Label htmlFor="receivables">Money Owed to You</Label>
                <Input
                  id="receivables"
                  type="number"
                  min="0"
                  step="0.01"
                  value={values.receivables || ''}
                  onChange={(e) => handleInputChange('receivables', e.target.value)}
                  placeholder="0.00"
                />
              </div>

              {/* Other Assets */}
              <div className="space-y-2">
                <Label htmlFor="other">Other Zakatable Assets</Label>
                <Input
                  id="other"
                  type="number"
                  min="0"
                  step="0.01"
                  value={values.otherAssets || ''}
                  onChange={(e) => handleInputChange('otherAssets', e.target.value)}
                  placeholder="0.00"
                />
              </div>

              {/* Liabilities */}
              <div className="space-y-2">
                <Label htmlFor="liabilities" className="flex items-center gap-2">
                  Immediate Liabilities/Debts
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-3.5 h-3.5 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Include debts due within the next lunar year</p>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Input
                  id="liabilities"
                  type="number"
                  min="0"
                  step="0.01"
                  value={values.liabilities || ''}
                  onChange={(e) => handleInputChange('liabilities', e.target.value)}
                  placeholder="0.00"
                />
              </div>

              <Button variant="subtle" onClick={resetCalculator} className="w-full mt-4">
                Reset Calculator
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-primary" />
                  Calculation Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Total Assets</span>
                  <span className="font-semibold text-foreground">{formatCurrency(calculations.totalAssets)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Less: Liabilities</span>
                  <span className="font-semibold text-destructive">-{formatCurrency(values.liabilities)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Net Zakatable Wealth</span>
                  <span className="font-bold text-foreground">{formatCurrency(calculations.netWorth)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Nisab Threshold</span>
                  <span className="font-semibold text-foreground">{formatCurrency(calculations.nisabThreshold)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Zakat Eligible?</span>
                  <span className={cn(
                    "font-semibold px-3 py-1 rounded-full text-sm",
                    calculations.isEligible 
                      ? "bg-primary/10 text-primary" 
                      : "bg-muted text-muted-foreground"
                  )}>
                    {calculations.isEligible ? "Yes" : "No"}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Zakat Due */}
            <Card 
              variant={calculations.isEligible ? "spiritual" : "subtle"} 
              className="animate-slide-up overflow-hidden"
              style={{ animationDelay: '0.2s' }}
            >
              <CardContent className="p-6 relative">
                {calculations.isEligible && <div className="absolute inset-0 islamic-pattern opacity-20" />}
                <div className="relative text-center">
                  <p className={cn(
                    "text-sm mb-2",
                    calculations.isEligible ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}>
                    Zakat Due (2.5%)
                  </p>
                  <p className={cn(
                    "text-4xl font-bold",
                    calculations.isEligible ? "text-primary-foreground" : "text-foreground"
                  )}>
                    {formatCurrency(calculations.zakatDue)}
                  </p>
                  {calculations.isEligible && (
                    <p className="text-sm text-primary-foreground/60 mt-4">
                      May Allah accept your zakat and purify your wealth 🤲
                    </p>
                  )}
                  {!calculations.isEligible && calculations.netWorth > 0 && (
                    <p className="text-sm text-muted-foreground mt-4">
                      Your wealth is below the nisab threshold. Zakat is not obligatory.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card variant="subtle" className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <CardContent className="p-4">
                <h4 className="font-semibold text-foreground mb-2">Important Notes</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Zakat is calculated at 2.5% of your net zakatable wealth</li>
                  <li>• Your wealth must meet the nisab and be held for one lunar year</li>
                  <li>• Personal items like your home and car are not zakatable</li>
                  <li>• Consult a scholar for complex situations</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Zakat;
