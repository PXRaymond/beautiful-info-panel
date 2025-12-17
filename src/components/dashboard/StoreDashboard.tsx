import { ArrowUpRight, TrendingUp, TrendingDown, Wallet, CreditCard, PiggyBank, Receipt } from "lucide-react";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.abs(value));
};

interface StatItemProps {
  label: string;
  value: number;
  total: number;
}

function StatItem({ label, value, total }: StatItemProps) {
  const percentage = (value / total) * 100;
  
  return (
    <div className="group py-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-muted-foreground text-sm group-hover:text-foreground transition-colors">
          {label}
        </span>
        <span className="text-sm font-medium tabular-nums">
          {formatCurrency(value)}
        </span>
      </div>
      <div className="h-1 bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-muted-foreground/50 to-muted-foreground/30 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  type?: 'default' | 'positive' | 'negative';
  delay?: number;
}

function MetricCard({ title, value, icon: Icon, type = 'default', delay = 0 }: MetricCardProps) {
  const colorClass = type === 'positive' 
    ? 'text-positive' 
    : type === 'negative' 
      ? 'text-destructive' 
      : '';

  return (
    <div 
      className="bg-card border border-border rounded-2xl p-5 card-hover animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
          <Icon className="w-4 h-4 text-muted-foreground" />
        </div>
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {title}
        </span>
      </div>
      <p className={`text-2xl font-semibold tabular-nums ${colorClass}`}>
        {type === 'positive' && '+'}
        {type === 'negative' && '−'}
        {formatCurrency(value)}
      </p>
    </div>
  );
}

interface BreakdownCardProps {
  title: string;
  total: number;
  items: { label: string; value: number }[];
  delay?: number;
}

function BreakdownCard({ title, total, items, delay = 0 }: BreakdownCardProps) {
  return (
    <div 
      className="bg-card border border-border rounded-2xl p-5 animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-5">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {title}
        </span>
        <span className="text-lg font-semibold tabular-nums">
          {formatCurrency(total)}
        </span>
      </div>
      <div className="space-y-1">
        {items.map((item) => (
          <StatItem 
            key={item.label} 
            label={item.label} 
            value={item.value}
            total={total}
          />
        ))}
      </div>
    </div>
  );
}

export function StoreDashboard() {
  const balance = 158285;
  const balanceChange = 1677;

  const metrics = {
    salesAndReturns: 149226,
    charges: 62065,
    paid: 59184,
    totalCharged: 87160,
  };

  const income = [
    { label: "Выручка", value: 116712 },
    { label: "Баллы за скидки", value: 31501 },
    { label: "Программы партнёров", value: 1013 },
  ];

  const expenses = [
    { label: "Вознаграждение Ozon", value: 31104 },
    { label: "Услуги доставки", value: 18687 },
    { label: "Услуги агентов", value: 12264 },
    { label: "Другие услуги", value: 10 },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <div className="gradient-bg" />
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-20">
        {/* Header */}
        <header className="mb-16 animate-fade-up">
          <p className="text-sm text-muted-foreground mb-2">
            1 – 17 декабря 2024
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gradient">
            Экономика магазина
          </h1>
        </header>

        {/* Balance Hero */}
        <div 
          className="mb-16 animate-fade-up" 
          style={{ animationDelay: "100ms" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-positive/10 border border-positive/20 rounded-full mb-6">
            <div className="w-2 h-2 rounded-full bg-positive animate-pulse" />
            <span className="text-xs font-medium text-positive">Баланс растёт</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <span 
              className="text-6xl md:text-7xl font-bold tracking-tighter tabular-nums animate-number-in"
              style={{ animationDelay: "200ms" }}
            >
              {formatCurrency(balance)}
            </span>
            <div className="flex items-center gap-2 pb-2">
              <div className="flex items-center gap-1 text-positive">
                <ArrowUpRight className="w-5 h-5" />
                <span className="text-lg font-medium tabular-nums">
                  +{formatCurrency(balanceChange)}
                </span>
              </div>
              <span className="text-muted-foreground text-sm">за период</span>
            </div>
          </div>
        </div>

        {/* Main Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          <MetricCard 
            title="Продажи" 
            value={metrics.salesAndReturns}
            icon={Wallet}
            delay={300}
          />
          <MetricCard 
            title="Начисления" 
            value={metrics.charges}
            icon={Receipt}
            type="negative"
            delay={350}
          />
          <MetricCard 
            title="Выплачено" 
            value={metrics.paid}
            icon={CreditCard}
            type="negative"
            delay={400}
          />
          <MetricCard 
            title="Итого" 
            value={metrics.totalCharged}
            icon={PiggyBank}
            type="positive"
            delay={450}
          />
        </div>

        {/* Breakdown */}
        <div className="grid md:grid-cols-2 gap-3">
          <BreakdownCard 
            title="Структура доходов" 
            total={income.reduce((a, b) => a + b.value, 0)}
            items={income}
            delay={500}
          />
          <BreakdownCard 
            title="Структура расходов" 
            total={expenses.reduce((a, b) => a + b.value, 0)}
            items={expenses}
            delay={550}
          />
        </div>
      </div>
    </div>
  );
}
