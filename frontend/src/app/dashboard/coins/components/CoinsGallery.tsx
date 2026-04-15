import { Search, Coins, Calendar, Tag } from 'lucide-react';

export function CoinsGallery({ filterQuery, setFilterQuery, loading, coins, filteredCoins }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="p-5 md:p-8 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Galería Numismática</h2>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar por moneda, año o grupo..." 
            value={filterQuery}
            onChange={e => setFilterQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all shadow-sm"
          />
        </div>
      </div>
      
      <div className="p-5 md:p-8 bg-slate-50/50 dark:bg-slate-900/50">
        {loading && coins.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {Array(4).fill(0).map((_, i) => <div key={i} className="h-56 rounded-3xl bg-white dark:bg-slate-800 animate-pulse border border-slate-200 dark:border-slate-700"></div>)}
          </div>
        ) : filteredCoins.length > 0 ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {filteredCoins.map((coin: any) => (
                <div key={coin.id} className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-2xl hover:border-amber-400 dark:hover:border-amber-700/50 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-200 to-orange-400 rounded-full opacity-0 group-hover:opacity-10 blur-2xl transition-opacity pointer-events-none"></div>
                  
                  <div>
                    <div className="flex justify-between items-start mb-5 relative z-10">
                      <div className="p-3 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-2xl group-hover:bg-amber-100 group-hover:scale-110 transition-all">
                        <Coins className="h-6 w-6" />
                      </div>
                      <span className="text-xs font-black text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg tracking-widest border border-slate-200 dark:border-slate-700 uppercase group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {coin.quality}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 dark:text-white leading-snug mb-4 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {coin.name}
                    </h3>
                    
                    <div className="space-y-2.5 text-sm font-semibold text-slate-500 dark:text-slate-400 mb-6 relative z-10">
                      <p className="flex items-center gap-2"><Calendar className="h-5 w-5 text-slate-400" /> {coin.year}</p>
                      <p className="flex items-center gap-2 truncate" title={coin.category?.name}><Tag className="h-5 w-5 text-slate-400" /> <span className="truncate">{coin.category?.name || 'Sin Categoría'}</span></p>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center relative z-10">
                     <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Tasación</span>
                     <span className={`font-black text-xl tabular-nums ${coin.estimatedValue ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-600'}`}>
                       {coin.estimatedValue ? `S/ ${Number(coin.estimatedValue).toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '--'}
                     </span>
                  </div>
                </div>
             ))}
           </div>
        ) : (
           <div className="py-20 text-center">
            <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center mx-auto mb-6">
              <Search className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Sin Resultados</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">Comienza agregando una categoría nueva para poder registrar tus piezas históricas al catálogo.</p>
          </div>
        )}
      </div>
    </div>
  );
}
