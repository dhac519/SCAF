import { Target, Clock, CheckCircle2, XCircle, MinusCircle, Coins, Trash2 } from 'lucide-react';

export function BetsList({ loading, bets, resolvingId, handleResolve, openCashoutModal, handleDelete }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Tickets Recientes</h2>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-800/60 flex flex-col">
        {loading && bets.length === 0 ? (
          <div className="p-12 text-center text-slate-500 animate-pulse">Cargando jugadas...</div>
        ) : bets.length > 0 ? (
          bets.map((bet: any) => {
            const isPending = bet.status === 'PENDING';
            const isWon = bet.status === 'WON';
            const isLost = bet.status === 'LOST';
            return (
              <div key={bet.id} className="p-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-2xl">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg tracking-tight mb-2">{bet.event}</h4>
                    <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
                      <span className="bg-white dark:bg-slate-900 border dark:border-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-lg shadow-sm">Stake: <b>S/ {Number(bet.stake).toFixed(2)}</b></span>
                      <span className="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400 px-3 py-1 rounded-lg">Cuota: <b>{Number(bet.odds).toFixed(2)}</b></span>
                      {isPending && <span className="text-amber-500 flex items-center gap-1.5 ml-2"><Clock className="w-4 h-4"/> Pendiente</span>}
                      {isWon && <span className="text-emerald-500 flex items-center gap-1.5 ml-2"><CheckCircle2 className="w-4 h-4"/> Ganada</span>}
                      {isLost && <span className="text-rose-500 flex items-center gap-1.5 ml-2"><XCircle className="w-4 h-4"/> Perdida</span>}
                      {bet.status === 'VOID' && <span className="text-slate-500 flex items-center gap-1.5 ml-2"><MinusCircle className="w-4 h-4"/> Nula</span>}
                      {bet.status === 'CASHOUT' && <span className="text-blue-500 flex items-center gap-1.5 ml-2"><Coins className="w-4 h-4"/> Retirada</span>}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 md:justify-end border-t md:border-0 border-slate-100 dark:border-slate-800 pt-4 md:pt-0">
                  {isPending ? (
                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                      <button disabled={resolvingId === bet.id} onClick={() => handleResolve(bet.id, 'WON')} className="p-2.5 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 rounded-xl transition-all" title="Marcar Ganada"><CheckCircle2 className="w-5 h-5"/></button>
                      <button disabled={resolvingId === bet.id} onClick={() => openCashoutModal(bet.id, bet.stake)} className="p-2.5 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-xl transition-all" title="Cashout (Retiro Anticipado)"><Coins className="w-5 h-5"/></button>
                      <button disabled={resolvingId === bet.id} onClick={() => handleResolve(bet.id, 'LOST')} className="p-2.5 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/50 rounded-xl transition-all" title="Marcar Perdida"><XCircle className="w-5 h-5"/></button>
                      <button disabled={resolvingId === bet.id} onClick={() => handleResolve(bet.id, 'VOID')} className="p-2.5 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 shadow-sm rounded-xl transition-all" title="Anular"><MinusCircle className="w-5 h-5"/></button>
                      <button disabled={resolvingId === bet.id} onClick={() => handleDelete(bet.id)} className="p-2.5 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-xl transition-all ml-2" title="Eliminar"><Trash2 className="w-5 h-5"/></button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1 pb-1">Resultado Neto</span>
                        <span className={`font-black text-2xl tabular-nums ${Number(bet.result) > 0 ? 'text-emerald-500' : Number(bet.result) < 0 ? 'text-rose-500' : 'text-slate-500'}`}>
                          {Number(bet.result) > 0 ? '+' : ''} S/ {Number(bet.result).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <button onClick={() => handleDelete(bet.id)} className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all ml-2" title="Eliminar"><Trash2 className="w-5 h-5"/></button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
           <div className="p-16 text-center text-slate-500 flex justify-center">
             <span className="bg-slate-100 dark:bg-slate-800 px-6 py-3 rounded-2xl inline-block">No hay apuestas registradas en el historial.</span>
           </div>
        )}
      </div>
    </div>
  );
}
