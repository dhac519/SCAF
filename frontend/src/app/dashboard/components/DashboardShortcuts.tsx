import { TrendingUp, Target, Coins, Wallet } from 'lucide-react';
import Link from 'next/link';

export function DashboardShortcuts({ data, activeModules }: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
       {activeModules.includes('INVESTMENTS') && (
         <Link href="/dashboard/investments" className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group">
           <TrendingUp className="h-10 w-10 text-emerald-500 mb-6 group-hover:scale-110 transition-transform" />
           <h4 className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">{data?.stats?.activeInvestments || 0}</h4>
           <p className="text-sm font-black text-slate-400 uppercase tracking-widest mt-1">Inversiones Activas</p>
         </Link>
       )}
       {activeModules.includes('BETS') && (
         <Link href="/dashboard/bets" className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group">
           <Target className="h-10 w-10 text-purple-500 mb-6 group-hover:scale-110 transition-transform" />
           <h4 className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">{data?.stats?.pendingBets || 0}</h4>
           <p className="text-sm font-black text-slate-400 uppercase tracking-widest mt-1">Apuestas en Juego</p>
         </Link>
       )}
       {activeModules.includes('TIPSTER_BANKROLL') && (
         <Link href="/dashboard/tipster-bankroll" className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group">
           <Target className="h-10 w-10 text-indigo-500 mb-6 group-hover:scale-110 transition-transform" />
           <h4 className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">S/ {data?.stats?.tipsterCurrentBank?.toLocaleString() || 0}</h4>
           <p className="text-sm font-black text-slate-400 uppercase tracking-widest mt-1">Fondo Ficticio (Tipsters)</p>
         </Link>
       )}
       {activeModules.includes('COLLECTIONS') && (
         <Link href="/dashboard/collections" className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group">
           <Coins className="h-10 w-10 text-amber-500 mb-6 group-hover:scale-110 transition-transform" />
           <h4 className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">{data?.stats?.collectionsCount || 0}</h4>
           <p className="text-sm font-black text-slate-400 uppercase tracking-widest mt-1">Piezas Coleccionables</p>
         </Link>
       )}
       {activeModules.includes('FINANCE') && (
         <Link href="/dashboard/finances" className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group">
           <Wallet className="h-10 w-10 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
           <h4 className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">{data?.distribution?.find((d: any) => d.label === 'Efectivo')?.value?.toLocaleString() || 0}</h4>
           <p className="text-sm font-black text-slate-400 uppercase tracking-widest mt-1">Cash Líquido (S/)</p>
         </Link>
       )}
    </div>
  );
}
