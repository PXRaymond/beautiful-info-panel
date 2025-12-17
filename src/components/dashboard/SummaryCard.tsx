import { cn } from "@/lib/utils";

interface SummaryItem {
  label: string;
  value: string;
  isNegative?: boolean;
}

interface SummaryCardProps {
  title: string;
  items: SummaryItem[];
  className?: string;
}

export function SummaryCard({ title, items, className }: SummaryCardProps) {
  return (
    <div
      className={cn(
        "bg-card border border-border rounded-lg p-5 animate-fade-in",
        className
      )}
    >
      <h3 className="text-sm font-medium text-muted-foreground mb-5">
        {title}
      </h3>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index}>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {item.label}
            </span>
            <div
              className={cn(
                "text-2xl font-bold mt-1 tracking-tight",
                item.isNegative ? "text-negative" : "text-foreground"
              )}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
