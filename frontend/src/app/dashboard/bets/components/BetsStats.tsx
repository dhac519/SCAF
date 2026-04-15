import { Clock, CheckCircle2, XCircle, Trophy, Coins } from 'lucide-react';

export function BetsStats({ totalStake, totalGanancias, totalPerdidas, totalProfit, bettingWallet, setTransferModalOpen }: any) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100 dark:border-indigo-800/50 rounded-3xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-indigo-600/80 dark:text-indigo-400/80 mb-2 uppercase tracking-wider">Pendiente</p>
            <h3 className="text-2xl font-black text-indigo-900 dark:text-indigo-300 tabular-nums">S/ {totalStake.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm"><Clock className="w-8 h-8 text-indigo-500" /></div>
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-3xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-700/80 dark:text-emerald-400/80 mb-2 uppercase tracking-wider">Ganancias</p>
            <h3 className="text-2xl font-black text-emerald-700 dark:text-emerald-400 tabular-nums">+S/ {totalGanancias.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm"><CheckCircle2 className="w-8 h-8 text-emerald-500" /></div>
        </div>

        <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50 rounded-3xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-rose-700/80 dark:text-rose-400/80 mb-2 uppercase tracking-wider">Pérdidas</p>
            <h3 className="text-2xl font-black text-rose-700 dark:text-rose-400 tabular-nums">-S/ {totalPerdidas.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm"><XCircle className="w-8 h-8 text-rose-500" /></div>
        </div>
        
        <div className={`border rounded-3xl p-6 shadow-sm flex items-center justify-between ${totalProfit >= 0 ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800/50' : 'bg-rose-50 border-rose-200 dark:bg-rose-900/20 dark:border-rose-800/50'}`}>
          <div>
            <p className={`text-sm font-semibold mb-2 uppercase tracking-wider ${totalProfit >= 0 ? 'text-emerald-700/80 dark:text-emerald-400/80' : 'text-rose-700/80 dark:text-rose-400/80'}`}>Balance Neto</p>
            <h3 className={`text-2xl font-black tabular-nums ${totalProfit >= 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
              {totalProfit > 0 ? '+' : ''}S/ {totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </h3>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm"><Trophy className={`w-8 h-8 ${totalProfit >= 0 ? 'text-emerald-500' : 'text-rose-500'}`} /></div>
        </div>
      </div>

      {bettingWallet && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm">
              <Coins className="w-10 h-10 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-700/80 dark:text-blue-400/80 mb-1 uppercase tracking-wider">Mi Saldo: Casa de Apuestas</p>
              <h3 className="text-3xl font-black text-blue-800 dark:text-blue-300 tabular-nums">S/ {Number(bettingWallet.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
            </div>
          </div>
          <button 
            onClick={() => setTransferModalOpen(true)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/20 transition-all flex items-center gap-2 justify-center"
          >
            Transferir a Cartera
          </button>
        </div>
      )}
    </>
  );
}
