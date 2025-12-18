import { ArrowLeft, ShoppingBag, RotateCcw, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('ru-RU').format(Math.abs(value)) + ' ₽';
};

const allTransactions = [
  { id: 1, type: "income" as const, product: "Кроссовки Nike Air Max", sku: "NKE-AM-001", amount: 8990, time: "12:34", date: "Сегодня" },
  { id: 2, type: "refund" as const, product: "Футболка Adidas", sku: "ADS-TS-042", amount: 2490, time: "11:20", date: "Сегодня" },
  { id: 3, type: "income" as const, product: "Рюкзак North Face", sku: "NF-BP-103", amount: 5670, time: "10:45", date: "Сегодня" },
  { id: 4, type: "income" as const, product: "Джинсы Levi's 501", sku: "LV-501-BL", amount: 7890, time: "09:15", date: "Сегодня" },
  { id: 5, type: "refund" as const, product: "Куртка Columbia", sku: "CLM-JK-089", amount: 12340, time: "08:50", date: "Сегодня" },
  { id: 6, type: "income" as const, product: "Кеды Converse All Star", sku: "CNV-AS-WHT", amount: 6490, time: "18:22", date: "Вчера" },
  { id: 7, type: "income" as const, product: "Худи Champion", sku: "CHP-HD-GRY", amount: 5990, time: "16:45", date: "Вчера" },
  { id: 8, type: "refund" as const, product: "Шорты Nike Pro", sku: "NKE-PR-SHT", amount: 3290, time: "14:30", date: "Вчера" },
  { id: 9, type: "income" as const, product: "Сумка Michael Kors", sku: "MK-BG-112", amount: 15890, time: "12:15", date: "Вчера" },
  { id: 10, type: "income" as const, product: "Часы Casio G-Shock", sku: "CSO-GS-BLK", amount: 12990, time: "10:00", date: "Вчера" },
];

export default function Transactions() {
  const todayTotal = allTransactions
    .filter(t => t.date === "Сегодня")
    .reduce((sum, t) => sum + (t.type === "income" ? t.amount : -t.amount), 0);

  return (
    <div className="min-h-screen relative">
      <div className="gradient-bg" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Header */}
        <div className="glass-container rounded-2xl p-6 mb-6 animate-fade-up">
          <div className="flex items-center justify-between mb-6">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Назад</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/10">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs text-white/70">Приход</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/10">
                <div className="w-2 h-2 rounded-full bg-rose-400" />
                <span className="text-xs text-white/70">Возврат</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Все транзакции</h1>
              <p className="text-sm text-white/50">История продаж и возвратов</p>
            </div>
            
            <div className="flex flex-col items-end">
              <span className="text-xs text-white/40 uppercase tracking-wider">Баланс за сегодня</span>
              <span className={`text-2xl font-bold tabular-nums ${todayTotal >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {todayTotal >= 0 ? '+' : '−'}{formatCurrency(todayTotal)}
              </span>
            </div>
          </div>
          
          {/* Search & Filter */}
          <div className="flex gap-3 mt-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input 
                type="text"
                placeholder="Поиск по названию или артикулу..."
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-colors"
              />
            </div>
            <button className="px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl flex items-center gap-2 text-white/60 hover:text-white hover:border-white/20 transition-colors">
              <Filter className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">Фильтры</span>
            </button>
          </div>
        </div>

        {/* Transactions List */}
        <div className="space-y-4">
          {["Сегодня", "Вчера"].map((dateGroup, groupIndex) => (
            <div 
              key={dateGroup} 
              className="glass-container rounded-2xl p-5 animate-fade-up"
              style={{ animationDelay: `${groupIndex * 100}ms` }}
            >
              <h2 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">{dateGroup}</h2>
              
              <div className="space-y-2">
                {allTransactions
                  .filter(tx => tx.date === dateGroup)
                  .map((tx, index) => (
                    <div 
                      key={tx.id}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all cursor-pointer group"
                      style={{ animationDelay: `${(groupIndex * 100) + (index * 50)}ms` }}
                    >
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                        tx.type === "income" 
                          ? "bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/20" 
                          : "bg-gradient-to-br from-rose-500/20 to-rose-600/10 border border-rose-500/20"
                      }`}>
                        {tx.type === "income" ? (
                          <ShoppingBag className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <RotateCcw className="w-5 h-5 text-rose-400" />
                        )}
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white/90 truncate">{tx.product}</p>
                        <p className="text-xs text-white/40 mt-0.5">
                          <span className="font-mono">{tx.sku}</span>
                          <span className="mx-2">•</span>
                          <span>{tx.time}</span>
                        </p>
                      </div>
                      
                      {/* Amount */}
                      <div className="text-right">
                        <p className={`text-base font-semibold tabular-nums ${
                          tx.type === "income" ? "text-emerald-400" : "text-rose-400"
                        }`}>
                          {tx.type === "income" ? "+" : "−"}{formatCurrency(tx.amount)}
                        </p>
                        <p className="text-xs text-white/30 mt-0.5">
                          {tx.type === "income" ? "Продажа" : "Возврат"}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
