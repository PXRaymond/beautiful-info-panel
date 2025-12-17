import { BalanceHero } from "./BalanceHero";
import { MetricCard } from "./MetricCard";
import { BreakdownCard } from "./BreakdownCard";
import { SegmentedProgress } from "./SegmentedProgress";
import { 
  Wallet, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar,
  Zap
} from "lucide-react";

export function StoreDashboard() {
  const salesItems = [
    { label: "Выручка", value: 116712, color: "bg-gradient-to-r from-primary to-cyan-400" },
    { label: "Баллы за скидки", value: 31501, color: "bg-gradient-to-r from-emerald-500 to-green-400" },
    { label: "Программы партнёров", value: 1013, color: "bg-gradient-to-r from-teal-500 to-cyan-400" },
  ];

  const chargesItems = [
    { label: "Вознаграждение Ozon", value: 31104, color: "bg-gradient-to-r from-blue-500 to-indigo-500" },
    { label: "Услуги доставки", value: 18687, color: "bg-gradient-to-r from-orange-500 to-amber-400" },
    { label: "Услуги агентов", value: 12264, color: "bg-gradient-to-r from-purple-500 to-pink-500" },
    { label: "Другие услуги", value: 10, color: "bg-gradient-to-r from-slate-500 to-slate-400" },
    { label: "Компенсации", value: 0, color: "bg-gradient-to-r from-gray-500 to-gray-400" },
  ];

  const segments = [
    { value: 31104, color: "bg-blue-500", label: "Комиссия" },
    { value: 18687, color: "bg-orange-500", label: "Доставка" },
    { value: 12264, color: "bg-purple-500", label: "Агенты" },
    { value: 10, color: "bg-slate-500", label: "Прочее" },
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 lg:p-10">
      {/* Background gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 animate-fade-in">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                Аналитика
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Экономика магазина
            </h1>
            <div className="flex items-center gap-2 mt-3 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">1 декабря — 17 декабря 2024</span>
            </div>
          </div>

          <BalanceHero balance={158285} change={1677} />
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Main metrics row */}
          <MetricCard
            title="Продажи и возвраты"
            value={149226}
            icon={Wallet}
            gradient="primary"
            delay={100}
          />
          
          <MetricCard
            title="Начисления"
            value={-62065}
            icon={TrendingDown}
            gradient="warm"
            delay={200}
          />

          <MetricCard
            title="Выплачено"
            value={-59184}
            icon={ArrowDownRight}
            gradient="accent"
            delay={300}
          />

          <MetricCard
            title="Итого начислено"
            value={87160}
            icon={ArrowUpRight}
            gradient="gold"
            delay={400}
          />
        </div>

        {/* Detailed breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <div 
            className="glass-card gradient-border rounded-2xl p-6 animate-fade-in"
            style={{ animationDelay: "500ms" }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Структура расходов</h3>
              <span className="text-sm text-muted-foreground mono">
                Всего: 62 065 ₽
              </span>
            </div>
            <SegmentedProgress segments={segments} total={62065} />
          </div>

          <div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in"
            style={{ animationDelay: "600ms" }}
          >
            <BreakdownCard
              title="Доходы"
              items={salesItems}
              total={149226}
              type="income"
            />
            <BreakdownCard
              title="Расходы"
              items={chargesItems}
              total={62065}
              type="expense"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
