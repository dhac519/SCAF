import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

export function InvestmentMetrics({ totalInitial, totalCurrent, globalROI }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-center">
        <p className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">Capital Inicial Invertido</p>
        <h3 className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">S/ {totalInitial.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
      </div>
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-800 border dark:border-slate-700 rounded-3xl p-6 shadow-xl text-white flex flex-col justify-center relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-20"><Activity className="w-48 h-48" /></div>
        <p className="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider relative z-10">Valoración Actual</p>
        <h3 className="text-4xl font-black text-white tabular-nums relative z-10">S/ {totalCurrent.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
      </div>
      <div className={`rounded-3xl p-6 shadow-sm border flex flex-col justify-center ${globalROI >= 0 ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800/50' : 'bg-rose-50 border-rose-200 dark:bg-rose-900/20 dark:border-rose-800/50'}`}>
        <p className={`text-sm font-semibold mb-2 uppercase tracking-wider ${globalROI >= 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>Rendimiento Global (ROI)</p>
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-full ${globalROI >= 0 ? 'bg-emerald-200 dark:bg-emerald-800/50' : 'bg-rose-200 dark:bg-rose-800/50'}`}>
            {globalROI >= 0 ? <TrendingUp className="h-6 w-6 text-emerald-700 dark:text-emerald-300" /> : <TrendingDown className="h-6 w-6 text-rose-700 dark:text-rose-300" />}
          </div>
          <h3 className={`text-4xl font-black tabular-nums ${globalROI >= 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
            {globalROI > 0 ? '+' : ''}{globalROI.toFixed(2)}%
          </h3>
        </div>
      </div>
    </div>
  );
}
