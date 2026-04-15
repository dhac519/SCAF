import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

export function InvestmentList({
  loading, investments, updatingId, setUpdatingId,
  updateValue, setUpdateValue, handleUpdateValue
}: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading ? (
        Array(3).fill(0).map((_, i) => <div key={i} className="h-56 bg-white dark:bg-slate-900 rounded-3xl animate-pulse shadow-sm border border-slate-100 dark:border-slate-800"></div>)
      ) : investments.length > 0 ? (
        investments.map((inv: any) => {
          const init = Number(inv.initialAmount);
          const curr = Number(inv.currentValue);
          const diff = curr - init;
          const roi = init > 0 ? (diff / init) * 100 : 0;
          const isUp = roi >= 0;

          return (
            <div key={inv.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] dark:opacity-5 group-hover:scale-125 transition-transform duration-500 pointer-events-none">
                <Activity className="w-32 h-32" />
              </div>
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{inv.assetName}</h3>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full mt-2 inline-block uppercase tracking-wider">
                    {inv.type}
                  </span>
                </div>
                <div className={`flex flex-col items-end`}>
                  <div className={`flex items-center gap-1 font-bold text-base px-3 py-1 rounded-full ${isUp ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400'}`}>
                    {isUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {isUp ? '+' : ''}{roi.toFixed(1)}%
                  </div>
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-end border-b border-slate-100 dark:border-slate-800/60 pb-4">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Inversión Inicial</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">S/ {init.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
                
                {updatingId === inv.id ? (
                  <div className="flex items-center gap-2 pt-2 animate-in slide-in-from-bottom-2">
                    <input
                      type="number"
                      step="0.01"
                      autoFocus
                      defaultValue={curr}
                      onChange={(e) => setUpdateValue(e.target.value)}
                      className="w-full px-3 py-2.5 text-sm border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-900 dark:focus:ring-white outline-none font-bold"
                      placeholder="Nuevo Valor"
                    />
                    <button onClick={() => handleUpdateValue(inv.id)} className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors">✓</button>
                    <button onClick={() => setUpdatingId(null)} className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">X</button>
                  </div>
                ) : (
                  <div 
                    className="flex justify-between items-end pt-2 cursor-pointer group/value select-none" 
                    onClick={() => { setUpdatingId(inv.id); setUpdateValue(String(curr)); }}
                  >
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5"><DollarSign className="w-4 h-4"/> Valorización</span>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-blue-600 dark:text-blue-400 font-bold opacity-0 group-hover/value:opacity-100 transition-opacity mb-1 -translate-y-2 group-hover/value:translate-y-0 duration-300">✎ Actualizar</span>
                      <span className="font-extrabold text-2xl text-slate-900 dark:text-white tabular-nums tracking-tight">S/ {curr.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="col-span-full py-16 text-center border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl">
          <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
            <TrendingUp className="h-10 w-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Sin Inversiones Activas</h3>
          <p className="text-slate-500 max-w-sm mx-auto">Comienza a registrar tus criptomonedas, acciones u otros activos para monitorear tu patrimonio a futuro.</p>
        </div>
      )}
    </div>
  );
}
