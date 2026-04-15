import { Users, Wallet, Target, Coins } from 'lucide-react';

export function AdminMetrics({ loading, stats }: any) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-pulse">
         {[1,2,3,4].map(i => <div key={i} className="h-32 bg-slate-200 dark:bg-slate-800 rounded-3xl"></div>)}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 rounded-xl"><Users className="h-6 w-6" /></div>
        </div>
        <h3 className="text-4xl font-black text-slate-900 dark:text-white tabular-nums">{stats.users}</h3>
        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Usuarios</p>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 rounded-xl"><Wallet className="h-6 w-6" /></div>
        </div>
        <h3 className="text-4xl font-black text-slate-900 dark:text-white tabular-nums">{stats.wallets}</h3>
        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Billeteras</p>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 rounded-xl"><Coins className="h-6 w-6" /></div>
        </div>
        <h3 className="text-4xl font-black text-slate-900 dark:text-white tabular-nums">{stats.collections}</h3>
        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Coleccionables</p>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 rounded-xl"><Target className="h-6 w-6" /></div>
        </div>
        <h3 className="text-4xl font-black text-slate-900 dark:text-white tabular-nums">{stats.transactions}</h3>
        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Transacciones</p>
      </div>
    </div>
  );
}
