import { Wallet as WalletIcon, Plus, ArrowUpRight, ArrowDownRight, Repeat, Calendar, Search } from 'lucide-react';

export function HistoryTab({
  transactions, wallets, showTxForm, setShowTxForm,
  handleCreateTransaction, txAmount, setTxAmount, txDescription, setTxDescription,
  txType, setTxType, txWalletId, setTxWalletId, txTargetWalletId, setTxTargetWalletId
}: any) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-4">
         <h2 className="text-2xl font-black text-slate-900 dark:text-white">Panel de Movimientos</h2>
         <button 
           onClick={() => setShowTxForm(true)}
           className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-2xl font-black hover:scale-105 transition-all flex items-center gap-2"
         >
           <Plus className="h-5 w-5" />
           Nuevo Movimiento
         </button>
      </div>

      {showTxForm && (
        <form onSubmit={handleCreateTransaction} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-2xl animate-in fade-in slide-in-from-top-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="md:col-span-3 flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                {['EXPENSE', 'INCOME', 'TRANSFER'].map(t => (
                  <button 
                    key={t} type="button" 
                    onClick={() => setTxType(t as any)}
                    className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${txType === t ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
                  >
                    {t === 'EXPENSE' ? 'Gasto' : t === 'INCOME' ? 'Ingreso' : 'Transferencia'}
                  </button>
                ))}
             </div>
             <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Monto</label>
                <input type="number" step="0.01" required value={txAmount} onChange={e => setTxAmount(e.target.value)} className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent rounded-2xl font-bold outline-none focus:border-blue-500 transition-all"/>
             </div>
             <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Descripción</label>
                <input type="text" required value={txDescription} onChange={e => setTxDescription(e.target.value)} className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent rounded-2xl font-bold outline-none focus:border-blue-500 transition-all" placeholder="Ej: Pago de Luz"/>
             </div>
             <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Billetera {txType === 'TRANSFER' && 'Origen'}</label>
                <select value={txWalletId} onChange={e => setTxWalletId(e.target.value)} className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent rounded-2xl font-bold outline-none focus:border-blue-500 transition-all">
                  {wallets.map((w: any) => <option key={w.id} value={w.id}>{w.name}</option>)}
                </select>
             </div>
             {txType === 'TRANSFER' && (
               <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Billetera Destino</label>
                  <select value={txTargetWalletId} onChange={e => setTxTargetWalletId(e.target.value)} className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent rounded-2xl font-bold outline-none focus:border-blue-500 transition-all">
                    <option value="">Seleccionar...</option>
                    {wallets.map((w: any) => <option key={w.id} value={w.id}>{w.name}</option>)}
                  </select>
               </div>
             )}
             <div className="md:col-span-3 flex gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button type="submit" className="flex-1 py-4 bg-slate-900 dark:bg-blue-600 text-white font-black rounded-2xl">Registrar</button>
                <button type="button" onClick={() => setShowTxForm(false)} className="px-8 py-4 text-slate-500 font-bold">Cancelar</button>
             </div>
          </div>
        </form>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
        {transactions.length > 0 ? (
          <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
            {transactions.map((tx: any) => (
              <div key={tx.id} className="p-6 md:p-8 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                   <div className={`p-4 rounded-2xl ${
                     tx.type === 'INCOME' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400' :
                     tx.type === 'EXPENSE' ? 'bg-rose-50 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400' :
                     'bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400'
                   }`}>
                     {tx.type === 'INCOME' ? <ArrowUpRight className="h-6 w-6" /> : tx.type === 'EXPENSE' ? <ArrowDownRight className="h-6 w-6" /> : <Repeat className="h-6 w-6" />}
                   </div>
                   <div>
                      <h5 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{tx.description}</h5>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm font-bold text-slate-400 uppercase tracking-widest">
                         <span className="flex items-center gap-1.5"><WalletIcon className="h-4 w-4" /> {tx.wallet?.name} {tx.targetWallet && `➔ ${tx.targetWallet.name}`}</span>
                         <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {new Date(tx.date).toLocaleDateString()}</span>
                      </div>
                   </div>
                </div>
                <div className="text-right">
                   <p className={`text-2xl font-black tabular-nums ${
                     tx.type === 'INCOME' ? 'text-emerald-500' : tx.type === 'EXPENSE' ? 'text-slate-900 dark:text-white' : 'text-blue-500'
                   }`}>
                     {tx.type === 'INCOME' ? '+' : tx.type === 'EXPENSE' ? '-' : ''}S/ {Number(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                   </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-24 text-center">
             <Search className="h-16 w-16 text-slate-200 mx-auto mb-6" />
             <h4 className="text-2xl font-black text-slate-900 dark:text-white">Sin movimientos</h4>
             <p className="text-slate-500 mt-2">No se han registrado transacciones aún.</p>
          </div>
        )}
      </div>
    </div>
  );
}
