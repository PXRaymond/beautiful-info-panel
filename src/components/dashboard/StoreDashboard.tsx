import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

interface StatItemProps {
  label: string;
  value: number;
  showSign?: boolean;
}

function StatItem({ label, value, showSign }: StatItemProps) {
  const isNegative = value < 0;
  
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className={`text-sm font-medium tabular-nums ${
        showSign 
          ? isNegative 
            ? 'text-destructive' 
            : 'text-positive'
          : ''
      }`}>
        {showSign && !isNegative && '+'}
        {formatCurrency(value)}
      </span>
    </div>
  );
}

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

function Card({ title, children, className = "", delay = 0 }: CardProps) {
  return (
    <div 
      className={`bg-card border border-border rounded-xl p-5 animate-fade-in ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}

export function StoreDashboard() {
  const balance = 158285;
  const balanceChange = 1677;

  const metrics = {
    salesAndReturns: 149226,
    charges: -62065,
    paid: -59184,
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
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        {/* Header */}
        <header className="mb-12 animate-fade-in">
          <p className="text-sm text-muted-foreground mb-1">
            1 – 17 декабря 2024
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">
            Экономика магазина
          </h1>
        </header>

        {/* Balance */}
        <div 
          className="mb-12 animate-fade-in" 
          style={{ animationDelay: "50ms" }}
        >
          <p className="text-sm text-muted-foreground mb-2">Баланс</p>
          <div className="flex items-baseline gap-4">
            <span className="text-5xl md:text-6xl font-semibold tracking-tight tabular-nums">
              {formatCurrency(balance)}
            </span>
            <div className={`flex items-center gap-1 text-sm font-medium ${
              balanceChange >= 0 ? 'text-positive' : 'text-destructive'
            }`}>
              {balanceChange >= 0 ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              <span className="tabular-nums">
                {balanceChange >= 0 ? '+' : ''}{formatCurrency(balanceChange)}
              </span>
            </div>
          </div>
        </div>

        {/* Main Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card title="Продажи и возвраты" delay={100}>
            <p className="text-2xl font-semibold tabular-nums">
              {formatCurrency(metrics.salesAndReturns)}
            </p>
          </Card>
          
          <Card title="Начисления" delay={150}>
            <p className="text-2xl font-semibold tabular-nums text-destructive">
              {formatCurrency(metrics.charges)}
            </p>
          </Card>
          
          <Card title="Выплачено" delay={200}>
            <p className="text-2xl font-semibold tabular-nums text-destructive">
              {formatCurrency(metrics.paid)}
            </p>
          </Card>
          
          <Card title="Итого начислено" delay={250}>
            <p className="text-2xl font-semibold tabular-nums text-positive">
              +{formatCurrency(metrics.totalCharged)}
            </p>
          </Card>
        </div>

        {/* Breakdown */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card title="Доходы" delay={300}>
            <div className="mb-4">
              <span className="text-2xl font-semibold tabular-nums">
                {formatCurrency(income.reduce((a, b) => a + b.value, 0))}
              </span>
            </div>
            <div>
              {income.map((item) => (
                <StatItem key={item.label} label={item.label} value={item.value} />
              ))}
            </div>
          </Card>
          
          <Card title="Расходы" delay={350}>
            <div className="mb-4">
              <span className="text-2xl font-semibold tabular-nums">
                {formatCurrency(expenses.reduce((a, b) => a + b.value, 0))}
              </span>
            </div>
            <div>
              {expenses.map((item) => (
                <StatItem key={item.label} label={item.label} value={item.value} />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
