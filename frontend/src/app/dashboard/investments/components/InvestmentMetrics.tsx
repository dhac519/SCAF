'use client';

import { TrendingUp, PieChart, Activity, DollarSign } from 'lucide-react';

interface InvestmentMetricsProps {
  totalInitial: number;
  totalCurrent: number;
  globalROI: number;
  usdToPen: number;
}

export function InvestmentMetrics({ totalInitial, totalCurrent, globalROI, usdToPen }: InvestmentMetricsProps) {
  const totalProfit = totalCurrent - totalInitial;
  const isPositive = globalROI >= 0;

  const formatCurrency = (val: number) => {
    return {
      usd: val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      pen: (val * usdToPen).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    };
  };

  const initial = formatCurrency(totalInitial);
  const current = formatCurrency(totalCurrent);
  const profit = formatCurrency(totalProfit);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/5 transition-transform hover:scale-[1.02]">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-600 dark:text-slate-400">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Inversión Total</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">${initial.usd}</p>
            <p className="text-xs font-bold text-slate-400">S/ {initial.pen}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/5 transition-transform hover:scale-[1.02]">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-sky-100 dark:bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-600 dark:text-sky-400">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Valor de Mercado</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">${current.usd}</p>
            <p className="text-xs font-bold text-slate-400">S/ {current.pen}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/5 transition-transform hover:scale-[1.02]">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 ${isPositive ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600' : 'bg-rose-100 dark:bg-rose-500/10 text-rose-600'} rounded-2xl flex items-center justify-center`}>
            {isPositive ? <TrendingUp size={24} /> : <TrendingUp size={24} className="rotate-180" />}
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Ganancia / Pérdida</p>
            <p className={`text-2xl font-black ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
              {isPositive ? '+' : ''}${profit.usd}
            </p>
            <p className="text-xs font-bold text-slate-400">S/ {profit.pen}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/5 transition-transform hover:scale-[1.02]">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <PieChart size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">ROI Global</p>
            <p className={`text-2xl font-black ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
              {globalROI.toFixed(2)}%
            </p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Tipo de cambio: S/ {usdToPen.toFixed(3)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
