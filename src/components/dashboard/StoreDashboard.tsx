import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useState } from "react";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('ru-RU').format(Math.abs(value)) + ' ₽';
};

// Segment colors
const segmentColors = {
  blue: 'bg-blue-500',
  purple: 'bg-purple-500', 
  orange: 'bg-orange-400',
  yellow: 'bg-yellow-400',
  gray: 'bg-gray-400',
};

interface ListItemProps {
  label: string;
  value: number;
  color: string;
}

function ListItem({ label, value, color }: ListItemProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        <span className="text-sm text-foreground/80">{label}</span>
      </div>
      <span className="text-sm font-medium tabular-nums">{formatCurrency(value)}</span>
    </div>
  );
}

interface SegmentedBarProps {
  segments: { value: number; color: string }[];
  total: number;
}

function SegmentedBar({ segments, total }: SegmentedBarProps) {
  return (
    <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
      {segments.map((seg, i) => (
        <div
          key={i}
          className={`${seg.color} first:rounded-l-full last:rounded-r-full transition-all duration-500`}
          style={{ width: `${(seg.value / total) * 100}%` }}
        />
      ))}
    </div>
  );
}

export function StoreDashboard() {
  const [showAllCharges, setShowAllCharges] = useState(false);

  const balance = 158285;
  const balanceChange = 1677;

  const salesTotal = 149226;
  const salesItems = [
    { label: "Выручка", value: 116712, color: "bg-cyan-400" },
    { label: "Программы партнёров", value: 1013, color: "bg-cyan-400" },
    { label: "Баллы за скидки", value: 31501, color: "bg-cyan-400" },
  ];

  const chargesTotal = 62065;
  const chargesItems = [
    { label: "Вознаграждение Ozon", value: 31104, color: segmentColors.blue },
    { label: "Услуги доставки", value: 18687, color: segmentColors.orange },
    { label: "Услуги агентов", value: 12264, color: segmentColors.purple },
    { label: "Другие услуги", value: 10, color: segmentColors.yellow },
    { label: "Компенсации и деко...", value: 0, color: segmentColors.gray },
  ];

  const chargeSegments = [
    { value: 31104, color: segmentColors.blue },
    { value: 18687, color: segmentColors.orange },
    { value: 12264, color: segmentColors.purple },
    { value: 10, color: segmentColors.yellow },
  ];

  const displayedCharges = showAllCharges ? chargesItems : chargesItems.slice(0, 4);

  return (
    <div className="min-h-screen relative">
      <div className="gradient-bg" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
          {/* Title */}
          <div className="animate-fade-up">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight uppercase mb-1">
              Экономика магазина
            </h1>
            <p className="text-sm text-muted-foreground">1 дек. – 17 дек.</p>
          </div>

          {/* Balance Card */}
          <div 
            className="glass-card rounded-2xl px-6 py-4 animate-fade-up"
            style={{ animationDelay: "100ms" }}
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Баланс</p>
            <p className="text-3xl md:text-4xl font-bold tabular-nums text-cyan-400">
              {formatCurrency(balance)}
            </p>
            <div className="flex items-center gap-1 mt-1 text-positive">
              <ArrowUpRight className="w-4 h-4" />
              <span className="text-sm font-medium tabular-nums">+{formatCurrency(balanceChange)}</span>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Sales Card */}
          <div 
            className="lg:col-span-3 glass-card rounded-2xl p-5 animate-fade-up"
            style={{ animationDelay: "150ms" }}
          >
            <h3 className="text-sm font-medium text-pink-400 mb-3">Продажи и возвраты</h3>
            <p className="text-3xl font-bold tabular-nums mb-4">{formatCurrency(salesTotal)}</p>
            
            {/* Progress bar */}
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden mb-5">
              <div className="h-full bg-gradient-to-r from-cyan-400 to-cyan-300 rounded-full w-full" />
            </div>

            {/* Items */}
            <div className="space-y-1">
              {salesItems.map((item) => (
                <ListItem key={item.label} {...item} />
              ))}
            </div>
          </div>

          {/* Charges Card */}
          <div 
            className="lg:col-span-6 glass-card rounded-2xl p-5 animate-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-sm font-medium text-pink-400">Начисления</h3>
              <p className="text-xs text-muted-foreground">
                Итого: <span className="text-foreground font-medium">{formatCurrency(87160)}</span>
              </p>
            </div>
            
            <p className="text-3xl font-bold tabular-nums text-pink-400 mb-4">
              −{formatCurrency(chargesTotal)}
            </p>
            
            {/* Segmented Progress */}
            <div className="mb-5">
              <SegmentedBar segments={chargeSegments} total={chargesTotal} />
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-1">
              {displayedCharges.map((item) => (
                <div key={item.label} className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-sm text-foreground/80 truncate max-w-[120px]">{item.label}</span>
                  </div>
                  <span className="text-sm font-medium tabular-nums">−{formatCurrency(item.value)}</span>
                </div>
              ))}
            </div>

            {/* Show all button */}
            <button 
              onClick={() => setShowAllCharges(!showAllCharges)}
              className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors mt-3"
            >
              <span>Посмотреть всё</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showAllCharges ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Summary Card */}
          <div 
            className="lg:col-span-3 glass-card rounded-2xl p-5 animate-fade-up"
            style={{ animationDelay: "250ms" }}
          >
            <h3 className="text-sm font-medium text-cyan-400 mb-4">Сводка за период</h3>
            
            <div className="space-y-5">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Выплачено</p>
                <p className="text-2xl font-bold tabular-nums">−{formatCurrency(59184)}</p>
              </div>
              
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Итого начислено</p>
                <p className="text-2xl font-bold tabular-nums text-positive">+{formatCurrency(87160)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
