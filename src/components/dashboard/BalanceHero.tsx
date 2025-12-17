import { TrendingUp, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface BalanceHeroProps {
  balance: number;
  change: number;
}

function AnimatedNumber({ value, duration = 1500 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return (
    <span className="mono tabular-nums">
      {displayValue.toLocaleString("ru-RU")}
    </span>
  );
}

export function BalanceHero({ balance, change }: BalanceHeroProps) {
  const isPositive = change >= 0;

  return (
    <div className="relative glass-card gradient-border rounded-3xl p-8 overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
      {/* Background glow */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/20 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl opacity-30" />
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 shimmer opacity-30" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
            Текущий баланс
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-5xl md:text-6xl font-bold text-gradient-primary">
            <AnimatedNumber value={balance} />
          </span>
          <span className="text-3xl font-light text-muted-foreground">₽</span>
        </div>

        <div
          className={`flex items-center gap-2 mt-4 px-3 py-1.5 rounded-full w-fit ${
            isPositive 
              ? "bg-primary/10 text-primary" 
              : "bg-destructive/10 text-destructive"
          }`}
        >
          <TrendingUp className={`w-4 h-4 ${!isPositive && "rotate-180"}`} />
          <span className="text-sm font-semibold mono">
            {isPositive ? "+" : ""}{change.toLocaleString("ru-RU")} ₽
          </span>
        </div>
      </div>
    </div>
  );
}
