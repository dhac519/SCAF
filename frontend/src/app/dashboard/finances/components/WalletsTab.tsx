import { Wallet as WalletIcon, PlusCircle } from 'lucide-react';

export function WalletsTab({
  generalWallets, totalBalance, showWalletForm, setShowWalletForm,
  handleCreateWallet, newWalletName, setNewWalletName, newWalletBalance, setNewWalletBalance
}: any) {
  return (
    <div className="space-y-8">
      {/* Summary Banner */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <p className="text-blue-100 font-bold uppercase tracking-widest text-sm mb-4">Saldo Consolidado (Líquido)</p>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter tabular-nums mb-6">
            S/ {totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
          <button 
            onClick={() => setShowWalletForm(true)}
            className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-black text-lg hover:bg-blue-50 transition-all flex items-center gap-3 shadow-lg shadow-black/10"
          >
            <PlusCircle className="h-6 w-6" />
            Nueva Billetera
          </button>
        </div>
      </div>

      {showWalletForm && (
        <form onSubmit={handleCreateWallet} className="bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/50 p-8 rounded-[2.5rem] shadow-2xl animate-in slide-in-from-top-8">
          <h3 className="text-2xl font-black mb-8 text-slate-900 dark:text-white">Registrar Nueva Cuenta</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-500 uppercase tracking-widest">Nombre de la cuenta</label>
              <input
                type="text"
                required
                value={newWalletName}
                onChange={(e) => setNewWalletName(e.target.value)}
                className="w-full px-6 py-4 border-2 border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-800 text-lg font-bold outline-none focus:border-blue-500 transition-all"
                placeholder="Ej: BCP Ahorros"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-500 uppercase tracking-widest">Saldo Inicial (S/)</label>
              <input
                type="number"
                step="0.01"
                value={newWalletBalance}
                onChange={(e) => setNewWalletBalance(e.target.value)}
                className="w-full px-6 py-4 border-2 border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-800 text-lg font-bold outline-none focus:border-blue-500 transition-all"
                placeholder="0.00"
              />
            </div>
            <div className="md:col-span-2 flex gap-4">
               <button type="submit" className="flex-1 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">Añadir Billetera</button>
               <button type="button" onClick={() => setShowWalletForm(false)} className="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-black rounded-2xl hover:bg-slate-200 transition-all">Cancelar</button>
            </div>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {generalWallets.map((w: any) => (
          <div key={w.id} className="group bg-white dark:bg-slate-900 border-2 border-slate-50 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all hover:-translate-y-2">
            <div className="flex justify-between items-start mb-8">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-3xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <WalletIcon className="h-8 w-8" />
              </div>
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase">{w.currency}</span>
            </div>
            <h4 className="text-lg font-bold text-slate-500 dark:text-slate-400 mb-2">{w.name}</h4>
            <p className="text-4xl font-black text-slate-900 dark:text-white tabular-nums tracking-tighter">
              {w.currency === 'USD' ? '$' : 'S/'} {Number(w.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
