import { cn } from "@/lib/utils";

interface StatItem {
  label: string;
  value: string;
  color: "positive" | "negative" | "info" | "warning" | "purple" | "muted";
}

interface StatCardProps {
  title: string;
  mainValue: string;
  mainValueColor?: "positive" | "negative" | "default";
  progress?: {
    value: number;
    color: "positive" | "negative" | "multi";
    segments?: { value: number; color: string }[];
  };
  items: StatItem[];
  subtitle?: string;
  className?: string;
}

const colorMap = {
  positive: "bg-positive",
  negative: "bg-negative",
  info: "bg-info",
  warning: "bg-warning",
  purple: "bg-purple",
  muted: "bg-muted-foreground",
};

const dotColorMap = {
  positive: "bg-positive",
  negative: "bg-negative",
  info: "bg-segment-blue",
  warning: "bg-segment-orange",
  purple: "bg-segment-purple",
  muted: "bg-muted-foreground",
};

export function StatCard({
  title,
  mainValue,
  mainValueColor = "default",
  progress,
  items,
  subtitle,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-card border border-border rounded-lg p-5 animate-fade-in",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {subtitle && (
          <span className="text-sm text-muted-foreground">{subtitle}</span>
        )}
      </div>

      <div
        className={cn(
          "text-3xl font-bold mb-4 tracking-tight",
          mainValueColor === "positive" && "text-positive",
          mainValueColor === "negative" && "text-negative",
          mainValueColor === "default" && "text-foreground"
        )}
      >
        {mainValue}
      </div>

      {progress && (
        <div className="h-1.5 bg-secondary rounded-full mb-5 overflow-hidden">
          {progress.color === "multi" && progress.segments ? (
            <div className="h-full flex">
              {progress.segments.map((segment, index) => (
                <div
                  key={index}
                  className={cn("h-full", segment.color)}
                  style={{ width: `${segment.value}%` }}
                />
              ))}
            </div>
          ) : (
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                progress.color === "positive" ? "bg-positive" : "bg-negative"
              )}
              style={{ width: `${progress.value}%` }}
            />
          )}
        </div>
      )}

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-sm"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-2">
              <div
                className={cn("w-2 h-2 rounded-full", dotColorMap[item.color])}
              />
              <span className="text-muted-foreground">{item.label}</span>
            </div>
            <span
              className={cn(
                "font-medium tabular-nums",
                item.color === "negative" ? "text-negative" : "text-foreground"
              )}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
