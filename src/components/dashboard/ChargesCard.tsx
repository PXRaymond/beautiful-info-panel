import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ChargeItem {
  label: string;
  value: string;
  color: "info" | "warning" | "purple" | "muted";
}

interface ChargesCardProps {
  title: string;
  mainValue: string;
  totalLabel: string;
  totalValue: string;
  items: ChargeItem[];
  className?: string;
}

const dotColorMap = {
  info: "bg-segment-blue",
  warning: "bg-segment-orange",
  purple: "bg-segment-purple",
  muted: "bg-muted-foreground",
};

export function ChargesCard({
  title,
  mainValue,
  totalLabel,
  totalValue,
  items,
  className,
}: ChargesCardProps) {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? items : items.slice(0, 5);

  // Calculate segments for progress bar
  const totalAmount = items.reduce(
    (sum, item) => sum + Math.abs(parseFloat(item.value.replace(/[^\d.-]/g, ""))),
    0
  );

  const segments = items.map((item) => ({
    value: (Math.abs(parseFloat(item.value.replace(/[^\d.-]/g, ""))) / totalAmount) * 100,
    color: dotColorMap[item.color],
  }));

  return (
    <div
      className={cn(
        "bg-card border border-border rounded-lg p-5 animate-fade-in",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-medium text-negative">{title}</h3>
        <div className="text-right">
          <span className="text-xs text-muted-foreground">{totalLabel}</span>
          <span className="text-sm font-medium ml-2">{totalValue}</span>
        </div>
      </div>

      <div className="text-3xl font-bold text-negative mb-4 tracking-tight">
        {mainValue}
      </div>

      {/* Multi-segment progress bar */}
      <div className="h-1.5 bg-secondary rounded-full mb-5 overflow-hidden">
        <div className="h-full flex">
          {segments.map((segment, index) => (
            <div
              key={index}
              className={cn("h-full", segment.color)}
              style={{ width: `${segment.value}%` }}
            />
          ))}
        </div>
      </div>

      {/* Items in two columns */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        {visibleItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div
                className={cn("w-2 h-2 rounded-full shrink-0", dotColorMap[item.color])}
              />
              <span className="text-muted-foreground truncate">{item.label}</span>
            </div>
            <span className="font-medium text-negative tabular-nums ml-2 shrink-0">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {items.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center gap-1 text-sm text-info mt-4 hover:underline transition-colors"
        >
          {showAll ? "Скрыть" : "Посмотреть все"}
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform",
              showAll && "rotate-180"
            )}
          />
        </button>
      )}
    </div>
  );
}
