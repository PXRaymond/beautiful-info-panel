import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface BalanceCardProps {
  balance: string;
  change: string;
  isPositive?: boolean;
  className?: string;
}

export function BalanceCard({
  balance,
  change,
  isPositive = true,
  className,
}: BalanceCardProps) {
  return (
    <div
      className={cn(
        "bg-card border border-border rounded-lg p-5 animate-fade-in",
        className
      )}
    >
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Баланс
      </span>
      <div className="text-3xl font-bold mt-2 tracking-tight">{balance}</div>
      <div
        className={cn(
          "flex items-center gap-1 mt-2 text-sm font-medium",
          isPositive ? "text-positive" : "text-negative"
        )}
      >
        <TrendingUp className="w-4 h-4" />
        <span>{change}</span>
      </div>
    </div>
  );
}
