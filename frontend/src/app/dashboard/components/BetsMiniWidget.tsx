import { Target, TrendingUp, TrendingDown } from 'lucide-react';
import Link from 'next/link';

export function BetsMiniWidget({ data }: any) {
  const profit = data?.stats?.totalBettingProfit || 0;
  const isUp = profit >= 0;

  return (
    <div className={`p-8 rounded-[2.5rem] border shadow-sm relative overflow-hidden group ${
      isUp ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/50' 
           : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800/50'
    }`}>
      <div className="flex justify-between items-center mb-6">
         <h3 className={`text-2xl font-black flex items-center gap-2 ${isUp ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
           <Target className="h-6 w-6" />
           Rendimiento Apuestas
         </h3>
         <Link href="/dashboard/bets" className={`font-bold text-sm hover:underline ${isUp ? 'text-emerald-600 dark:text-emerald-500' : 'text-rose-600 dark:text-rose-500'}`}>
           Gestionar
         </Link>
      </div>
      <p className="text-slate-500 dark:text-slate-400 font-bold mb-2">Beneficio Neto</p>
      <div className="flex items-center gap-3">
        <h2 className={`text-5xl font-black tracking-tighter tabular-nums ${isUp ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
          {isUp ? '+' : ''}S/ {Math.abs(profit).toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </h2>
        {isUp ? <TrendingUp className="h-8 w-8 text-emerald-500" /> : <TrendingDown className="h-8 w-8 text-rose-500" />}
      </div>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-4">
        {data?.stats?.pendingBets || 0} apuestas pendientes actualmente.
      </p>
    </div>
  );
}
