import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface BreakdownItem {
  label: string;
  value: number;
  color: string;
}

interface BreakdownCardProps {
  title: string;
  items: BreakdownItem[];
  total: number;
  type: "income" | "expense";
}

export function BreakdownCard({ title, items, total, type }: BreakdownCardProps) {
  const [expanded, setExpanded] = useState(false);
  const visibleItems = expanded ? items : items.slice(0, 3);

  return (
    <div className="glass-card gradient-border rounded-2xl p-6 overflow-hidden">
      <h3 className={cn(
        "text-sm font-medium mb-6",
        type === "income" ? "text-primary" : "text-destructive"
      )}>
        {title}
      </h3>

      {/* Progress bars */}
      <div className="space-y-4 mb-6">
        {visibleItems.map((item, index) => {
          const percentage = (Math.abs(item.value) / total) * 100;
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground truncate max-w-[60%]">
                  {item.label}
                </span>
                <span className={cn(
                  "font-medium mono tabular-nums",
                  type === "expense" && "text-destructive"
                )}>
                  {type === "expense" && item.value !== 0 ? "−" : ""}
                  {Math.abs(item.value).toLocaleString("ru-RU")} ₽
                </span>
              </div>
              
              <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-1000 ease-out",
                    item.color
                  )}
                  style={{ 
                    width: `${percentage}%`,
                    animationDelay: `${index * 100}ms`
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {items.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          {expanded ? "Скрыть" : `Ещё ${items.length - 3}`}
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform duration-300",
              expanded && "rotate-180"
            )}
          />
        </button>
      )}
    </div>
  );
}
