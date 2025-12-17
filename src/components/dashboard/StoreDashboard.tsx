import { ArrowUpRight, ChevronDown, TrendingUp } from "lucide-react";
import { useState } from "react";
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('ru-RU').format(Math.abs(value)) + ' ₽';
};
const segmentColors = {
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
  orange: 'bg-orange-400',
  yellow: 'bg-yellow-400',
  gray: 'bg-gray-400'
};
interface ListItemProps {
  label: string;
  value: number;
  color: string;
}
function ListItem({
  label,
  value,
  color
}: ListItemProps) {
  return <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        <span className="text-sm text-white/70">{label}</span>
      </div>
      <span className="text-sm font-medium tabular-nums text-white/90">{formatCurrency(value)}</span>
    </div>;
}
interface SegmentedBarProps {
  segments: {
    value: number;
    color: string;
  }[];
  total: number;
}
function SegmentedBar({
  segments,
  total
}: SegmentedBarProps) {
  return <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
      {segments.map((seg, i) => <div key={i} className={`${seg.color} first:rounded-l-full last:rounded-r-full`} style={{
      width: `${seg.value / total * 100}%`
    }} />)}
    </div>;
}
export function StoreDashboard() {
  const [showAllCharges, setShowAllCharges] = useState(false);
  const balance = 158285;
  const balanceChange = 1677;
  const salesTotal = 149226;
  const salesItems = [{
    label: "Выручка",
    value: 116712,
    color: "bg-cyan-400"
  }, {
    label: "Программы партнёров",
    value: 1013,
    color: "bg-cyan-400"
  }, {
    label: "Баллы за скидки",
    value: 31501,
    color: "bg-cyan-400"
  }];
  const chargesTotal = 62065;
  const chargesItems = [{
    label: "Вознаграждение Ozon",
    value: 31104,
    color: segmentColors.blue
  }, {
    label: "Услуги доставки",
    value: 18687,
    color: segmentColors.orange
  }, {
    label: "Услуги агентов",
    value: 12264,
    color: segmentColors.purple
  }, {
    label: "Другие услуги",
    value: 10,
    color: segmentColors.yellow
  }, {
    label: "Компенсации",
    value: 0,
    color: segmentColors.gray
  }];
  const chargeSegments = [{
    value: 31104,
    color: segmentColors.blue
  }, {
    value: 18687,
    color: segmentColors.orange
  }, {
    value: 12264,
    color: segmentColors.purple
  }, {
    value: 10,
    color: segmentColors.yellow
  }];
  const displayedCharges = showAllCharges ? chargesItems : chargesItems.slice(0, 4);
  return <div className="min-h-screen relative">
      <div className="gradient-bg" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Main Container */}
        <div className="glass-container rounded-3xl p-6 md:p-8 animate-fade-up">
          
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            {/* Title */}
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight uppercase text-white">
                Экономика магазина
              </h1>
              <p className="text-sm text-white/50 mt-1">1 дек. – 17 дек.</p>
            </div>

            {/* Balance */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-cyan-600/20 border border-cyan-400/30 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider">Баланс</p>
                  <p className="text-2xl md:text-3xl font-bold tabular-nums text-white">
                    {formatCurrency(balance)}
                  </p>
                </div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-positive/15 border border-positive/25 rounded">
                <ArrowUpRight className="w-4 h-4 text-positive" />
                <span className="text-sm font-semibold tabular-nums text-positive">
                  +{formatCurrency(balanceChange)}
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Sales Card */}
            <div className="lg:col-span-3 glass-card rounded-2xl p-5">
              <h3 className="text-sm font-medium mb-3 text-[#e8e8e8] text-justify">Продажи и возвраты</h3>
              <p className="text-2xl font-bold tabular-nums text-white mb-4">{formatCurrency(salesTotal)}</p>
              
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-5">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-cyan-300 rounded-full w-full" />
              </div>

              <div className="space-y-0.5">
                {salesItems.map(item => <ListItem key={item.label} {...item} />)}
              </div>
            </div>

            {/* Charges Card */}
            <div className="lg:col-span-6 glass-card rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-sm font-medium text-pink-400">Начисления</h3>
                <p className="text-xs text-white/50">
                  Итого: <span className="text-white/80 font-medium">{formatCurrency(87160)}</span>
                </p>
              </div>
              
              <p className="text-2xl font-bold tabular-nums text-pink-400 mb-4">
                −{formatCurrency(chargesTotal)}
              </p>
              
              <div className="mb-5">
                <SegmentedBar segments={chargeSegments} total={chargesTotal} />
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-0.5">
                {displayedCharges.map(item => <div key={item.label} className="flex items-center justify-between py-1.5">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${item.color}`} />
                      <span className="text-sm text-white/70 truncate max-w-[120px]">{item.label}</span>
                    </div>
                    <span className="text-sm font-medium tabular-nums text-white/90">−{formatCurrency(item.value)}</span>
                  </div>)}
              </div>

              <button onClick={() => setShowAllCharges(!showAllCharges)} className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors mt-4">
                <span>Посмотреть всё</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showAllCharges ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Summary Card */}
            <div className="lg:col-span-3 glass-card rounded-2xl p-5">
              <h3 className="text-sm font-medium text-cyan-400 mb-5">Сводка за период</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Выплачено</p>
                  <p className="text-2xl font-bold tabular-nums text-white">−{formatCurrency(59184)}</p>
                </div>
                
                <div className="h-px bg-white/5" />
                
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Итого начислено</p>
                  <p className="text-2xl font-bold tabular-nums text-positive">+{formatCurrency(87160)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}