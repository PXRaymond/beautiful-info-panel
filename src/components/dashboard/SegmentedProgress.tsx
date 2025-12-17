import { cn } from "@/lib/utils";

interface Segment {
  value: number;
  color: string;
  label: string;
}

interface SegmentedProgressProps {
  segments: Segment[];
  total: number;
  className?: string;
}

export function SegmentedProgress({ segments, total, className }: SegmentedProgressProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Progress bar */}
      <div className="h-3 bg-secondary/30 rounded-full overflow-hidden flex">
        {segments.map((segment, index) => {
          const percentage = (segment.value / total) * 100;
          return (
            <div
              key={index}
              className={cn(
                "h-full transition-all duration-1000 ease-out first:rounded-l-full last:rounded-r-full",
                segment.color
              )}
              style={{ 
                width: `${percentage}%`,
              }}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={cn("w-2.5 h-2.5 rounded-full", segment.color)} />
            <span className="text-xs text-muted-foreground">{segment.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
