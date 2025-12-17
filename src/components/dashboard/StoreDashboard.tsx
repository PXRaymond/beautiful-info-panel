import { StatCard } from "./StatCard";
import { BalanceCard } from "./BalanceCard";
import { SummaryCard } from "./SummaryCard";
import { ChargesCard } from "./ChargesCard";

export function StoreDashboard() {
  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Экономика магазина
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              1 дек. – 17 дек.
            </p>
          </div>
          <BalanceCard
            balance="158 285 ₽"
            change="+1 677 ₽"
            isPositive={true}
            className="md:min-w-[200px]"
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales and Returns Card */}
          <StatCard
            title="Продажи и возвраты"
            mainValue="149 226 ₽"
            mainValueColor="default"
            progress={{
              value: 78,
              color: "positive",
            }}
            items={[
              { label: "Выручка", value: "116 712 ₽", color: "positive" },
              { label: "Программы партнёров", value: "1 013 ₽", color: "positive" },
              { label: "Баллы за скидки", value: "31 501 ₽", color: "positive" },
            ]}
          />

          {/* Charges Card */}
          <ChargesCard
            title="Начисления"
            mainValue="−62 065 ₽"
            totalLabel="Итого:"
            totalValue="87 160 ₽"
            items={[
              { label: "Вознаграждение Ozon", value: "−31 104 ₽", color: "info" },
              { label: "Услуги доставки", value: "−18 687 ₽", color: "warning" },
              { label: "Услуги агентов", value: "−12 264 ₽", color: "purple" },
              { label: "Другие услуги", value: "−10 ₽", color: "muted" },
              { label: "Компенсации и декорр.", value: "0 ₽", color: "muted" },
            ]}
          />

          {/* Period Summary Card */}
          <SummaryCard
            title="Сводка за период"
            items={[
              { label: "Выплачено", value: "−59 184 ₽", isNegative: true },
              { label: "Итого начислено", value: "87 160 ₽", isNegative: false },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
