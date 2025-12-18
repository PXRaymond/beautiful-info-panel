import { ArrowUpRight, ChevronDown, Wallet, MapPin, ShoppingBag, RotateCcw, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
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
    color: "bg-emerald-400"
  }, {
    label: "Программы партнёров",
    value: 1013,
    color: "bg-emerald-400"
  }, {
    label: "Баллы за скидки",
    value: 31501,
    color: "bg-emerald-400"
  }];
  const chargesTotal = 62065;
  const chargesItems = [{
    label: "Вознаграждение Ozon",
    value: 31104,
    color: "bg-rose-400"
  }, {
    label: "Услуги доставки",
    value: 18687,
    color: "bg-amber-400"
  }, {
    label: "Услуги агентов",
    value: 12264,
    color: "bg-violet-400"
  }, {
    label: "Другие услуги",
    value: 10,
    color: "bg-sky-400"
  }, {
    label: "Компенсации",
    value: 0,
    color: "bg-slate-400"
  }];
  const chargeSegments = [{
    value: 31104,
    color: "bg-rose-400"
  }, {
    value: 18687,
    color: "bg-amber-400"
  }, {
    value: 12264,
    color: "bg-violet-400"
  }, {
    value: 10,
    color: "bg-sky-400"
  }];
  const displayedCharges = showAllCharges ? chargesItems : chargesItems.slice(0, 4);

  const deliveriesTotal = 134;
  const deliveriesData = [
    { region: "Москва, МО и Дальние регионы", count: 32, progress: 32/134, color: "bg-violet-500" },
    { region: "Санкт-Петербург и СЗО", count: 12, progress: 12/134, color: "bg-cyan-400" },
    { region: "Ростов", count: 8, progress: 8/134, color: "bg-emerald-400" },
  ];

  const transactions = [
    { id: 1, type: "income" as const, product: "Кроссовки Nike Air Max", amount: 8990, time: "12:34" },
    { id: 2, type: "refund" as const, product: "Футболка Adidas", amount: 2490, time: "11:20" },
    { id: 3, type: "income" as const, product: "Рюкзак North Face", amount: 5670, time: "10:45" },
    { id: 4, type: "income" as const, product: "Джинсы Levi's 501", amount: 7890, time: "09:15" },
    { id: 5, type: "refund" as const, product: "Куртка Columbia", amount: 12340, time: "08:50" },
  ];
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
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/15 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-white/50" />
                </div>
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider">Баланс</p>
                  <p className="text-2xl md:text-3xl font-bold tabular-nums text-white">
                    {formatCurrency(balance)}
                  </p>
                </div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="flex flex-col items-center gap-0.5">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-positive/15 border border-positive/25 rounded">
                  <ArrowUpRight className="w-4 h-4 text-positive" />
                  <span className="text-sm font-semibold tabular-nums text-positive">
                    +{formatCurrency(balanceChange)}
                  </span>
                </div>
                <span className="text-[10px] text-white/40">за сегодня</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">
            {/* Sales Card */}
            <div className="lg:col-span-3 glass-card rounded-2xl p-5 bg-gradient-to-br from-teal-500/[0.08] via-teal-600/[0.04] to-transparent">
              <h3 className="text-sm font-medium mb-3 text-emerald-400">Продажи и возвраты</h3>
              <p className="text-2xl font-bold tabular-nums text-emerald-400 mb-4">{formatCurrency(salesTotal)}</p>
              
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-5">
                <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full w-full" />
              </div>

              <div className="space-y-0.5">
                {salesItems.map(item => <ListItem key={item.label} {...item} />)}
              </div>
            </div>

            {/* Charges Card */}
            <div className="lg:col-span-5 glass-card rounded-2xl p-5 bg-gradient-to-br from-rose-500/[0.08] via-rose-600/[0.04] to-transparent">
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
            <div className="lg:col-span-2 glass-card rounded-2xl p-5 bg-gradient-to-br from-sky-500/[0.08] via-sky-600/[0.04] to-transparent">
              <h3 className="text-sm font-medium text-white/80 mb-5">Списания</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Выплачено</p>
                  <p className="text-2xl font-bold tabular-nums text-orange-400">−{formatCurrency(59184)}</p>
                </div>
                
                <div className="h-px bg-white/5" />
                
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Итого начислено</p>
                  <p className="text-2xl font-bold tabular-nums text-emerald-400">+{formatCurrency(87160)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Panels Row */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Deliveries Panel */}
          <div className="glass-container rounded-2xl p-5 bg-gradient-to-br from-indigo-500/[0.06] via-violet-600/[0.03] to-transparent animate-fade-up">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">Доставляются</h3>
                <p className="text-xs text-white/40 mt-0.5">Топ-3 кластера за неделю</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold tabular-nums text-white">{deliveriesTotal}</p>
                <p className="text-xs text-white/40">всего</p>
              </div>
            </div>

            {/* Regions List */}
            <div className="space-y-3">
              {deliveriesData.map((item, i) => (
                <div key={i} className="bg-white/[0.04] backdrop-blur-sm rounded-xl p-4 border border-white/[0.06]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${item.color}`} />
                      <span className="text-sm text-white/80">{item.region}</span>
                    </div>
                    <span className="text-sm font-semibold tabular-nums text-white">{item.count}</span>
                  </div>
                  <div className="h-1 bg-white/[0.08] rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color} rounded-full transition-all duration-500`}
                      style={{ width: `${item.progress * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Map Button */}
            <button className="w-full mt-4 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-400/30 flex items-center justify-center gap-2 text-cyan-400 hover:from-cyan-500/30 hover:to-emerald-500/30 transition-all group">
              <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Посмотреть карту</span>
            </button>
          </div>

          {/* Transactions Panel */}
          <div className="glass-container rounded-2xl p-5 bg-gradient-to-br from-slate-500/[0.04] via-slate-600/[0.02] to-transparent animate-fade-up">
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">Последние транзакции</h3>
                <p className="text-xs text-white/40 mt-0.5">Продажи и возвраты за сегодня</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-medium text-emerald-400">Приход</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span className="text-[10px] font-medium text-rose-400">Возврат</span>
                </div>
              </div>
            </div>

            {/* Transactions List */}
            <div className="space-y-1.5">
              {transactions.map((tx) => (
                <div 
                  key={tx.id} 
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-transparent hover:border-white/[0.06] transition-all cursor-pointer group"
                >
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                    tx.type === "income" 
                      ? "bg-gradient-to-br from-emerald-500/15 to-emerald-600/5" 
                      : "bg-gradient-to-br from-rose-500/15 to-rose-600/5"
                  }`}>
                    {tx.type === "income" ? (
                      <ShoppingBag className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <RotateCcw className="w-4 h-4 text-rose-400" />
                    )}
                  </div>
                  
                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/85 truncate font-medium">{tx.product}</p>
                    <p className="text-[11px] text-white/35">{tx.time}</p>
                  </div>
                  
                  {/* Amount */}
                  <div className="text-right">
                    <span className={`text-sm font-semibold tabular-nums ${
                      tx.type === "income" ? "text-emerald-400" : "text-rose-400"
                    }`}>
                      {tx.type === "income" ? "+" : "−"}{formatCurrency(tx.amount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <Link 
              to="/transactions"
              className="w-full mt-4 py-3.5 px-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center gap-2 text-white/60 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.12] transition-all group"
            >
              <span className="text-sm font-medium">Все транзакции</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>;
}