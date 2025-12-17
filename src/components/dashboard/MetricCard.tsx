import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface MetricCardProps {
  title: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
  gradient: "primary" | "accent" | "warm" | "gold";
  delay?: number;
  subtitle?: string;
}

const gradientClasses = {
  primary: "text-gradient-primary",
  accent: "text-gradient-accent",
  warm: "text-gradient-warm",
  gold: "text-gradient-gold",
};

const iconBgClasses = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent",
  warm: "bg-destructive/10 text-destructive",
  gold: "bg-yellow-500/10 text-yellow-500",
};

const glowClasses = {
  primary: "group-hover:glow-primary",
  accent: "group-hover:glow-accent",
  warm: "group-hover:glow-warm",
  gold: "group-hover:shadow-[0_0_40px_hsla(45,100%,55%,0.3)]",
};

function AnimatedNumber({ value, delay = 0 }: { value: number; delay?: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 1200, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.floor(easeOutQuart * Math.abs(value)));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, started]);

  return (
    <span className="mono tabular-nums">
      {value < 0 ? "−" : ""}{displayValue.toLocaleString("ru-RU")}
    </span>
  );
}

export function MetricCard({
  title,
  value,
  suffix = "₽",
  icon: Icon,
  gradient,
  delay = 0,
  subtitle,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "group relative glass-card gradient-border rounded-2xl p-6 overflow-hidden",
        "hover:scale-[1.03] transition-all duration-500",
        glowClasses[gradient]
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/[0.03] to-transparent rounded-bl-full" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={cn("p-2.5 rounded-xl", iconBgClasses[gradient])}>
            <Icon className="w-5 h-5" />
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-2">{title}</p>
        
        <div className="flex items-baseline gap-1.5">
          <span className={cn("text-3xl font-bold", gradientClasses[gradient])}>
            <AnimatedNumber value={value} delay={delay} />
          </span>
          <span className="text-lg text-muted-foreground">{suffix}</span>
        </div>

        {subtitle && (
          <p className="text-xs text-muted-foreground mt-2 opacity-70">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
