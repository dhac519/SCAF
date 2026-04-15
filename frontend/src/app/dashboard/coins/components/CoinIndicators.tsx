import { Coins, DollarSign } from 'lucide-react';

export function CoinIndicators({ coins, totalEstimatedValue }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-100 dark:border-amber-800/50 rounded-3xl p-6 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-amber-700/80 dark:text-amber-400/80 mb-2 uppercase tracking-wider">Total de Piezas</p>
          <h3 className="text-4xl font-black text-amber-900 dark:text-amber-300 tabular-nums">{coins.length}</h3>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl shadow-sm"><Coins className="w-10 h-10 text-amber-500" /></div>
      </div>
      
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Tasación del Catálogo</p>
          <h3 className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">
            S/ {totalEstimatedValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </h3>
        </div>
        <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl shadow-sm"><DollarSign className="w-10 h-10 text-emerald-500" /></div>
      </div>
    </div>
  );
}
