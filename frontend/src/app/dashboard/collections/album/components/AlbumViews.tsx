import Link from 'next/link';
import { ArrowLeft, Library, Award, Folder, ShieldCheck, CheckCircle2, Plus } from 'lucide-react';
import { collectionsData } from '../data';

export function AlbumHubView({ setActiveSeries, items, customSubcategories, itemsWithoutSub, getOwnedCoinCount }: any) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-16">
        <div>
          <Link href="/dashboard/collections" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white mb-4 transition-colors">
             <ArrowLeft className="h-4 w-4 mr-1" /> Volver a Inventario
          </Link>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-2xl">
              <Library className="h-8 w-8" />
            </div>
            Librería de Álbumes
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">
            Selecciona la serie numismática que deseas organizar. Usa el modo 'Pasar Lista' interactivo que ya conoces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {collectionsData.map(series => {
            const { obtained: owned, total } = getOwnedCoinCount(series.id);
            const percentage = Math.min((owned / total) * 100, 100);
            const isComplete = owned >= total && total > 0;

            return (
              <div 
                key={series.id} 
                onClick={() => setActiveSeries(series.id)}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden flex flex-col justify-between h-56"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-3xl transition-all ${isComplete ? 'bg-amber-400' : 'bg-emerald-500 group-hover:opacity-20'}`}></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-black text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg tracking-widest border border-slate-200 dark:border-slate-700 uppercase">
                      {series.years}
                    </span>
                    {isComplete && <Award className="h-6 w-6 text-amber-500" />}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {series.title}
                  </h3>
                </div>

                <div className="relative z-10 mt-auto">
                   <div className="flex justify-between text-sm font-bold mb-2">
                     <span className={isComplete ? 'text-amber-600 dark:text-amber-500' : 'text-emerald-600 dark:text-emerald-400'}>Progreso</span>
                     <span className="text-slate-900 dark:text-white tabular-nums">{owned} / {total}</span>
                   </div>
                   <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden shadow-inner border border-slate-200 dark:border-slate-700">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${isComplete ? 'bg-gradient-to-r from-amber-400 to-amber-500' : 'bg-gradient-to-r from-emerald-400 to-emerald-600'}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                   </div>
                </div>
              </div>
            )
          })}
          
          {customSubcategories.map((sub: any) => {
             const subItems = items.filter((i: any) => i.subcategoryId === sub.id);
             return (
               <div 
                 key={`custom-${sub.id}`} 
                 onClick={() => setActiveSeries(`custom-${sub.id}`)}
                 className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden flex flex-col justify-between h-56"
               >
                 <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-3xl transition-all bg-indigo-500 group-hover:opacity-20"></div>
                 
                 <div className="relative z-10">
                   <div className="flex justify-between items-start mb-4">
                     <span className="text-xs font-black text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg tracking-widest border border-slate-200 dark:border-slate-700 uppercase">
                       Personalizado
                     </span>
                   </div>
                   <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                     {sub.name}
                   </h3>
                 </div>

                 <div className="relative z-10 mt-auto">
                    <div className="flex justify-between text-sm font-bold mb-2">
                      <span className="text-indigo-600 dark:text-indigo-400">Piezas Registradas</span>
                      <span className="text-slate-900 dark:text-white tabular-nums">{subItems.length}</span>
                    </div>
                 </div>
               </div>
             );
          })}

          {itemsWithoutSub.length > 0 && (
               <div 
                 onClick={() => setActiveSeries('misc')}
                 className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden flex flex-col justify-between h-56"
               >
                 <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-3xl transition-all bg-slate-500 group-hover:opacity-20"></div>
                 
                 <div className="relative z-10">
                   <div className="flex justify-between items-start mb-4">
                     <span className="text-xs font-black text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg tracking-widest border border-slate-200 dark:border-slate-700 uppercase">
                       General
                     </span>
                   </div>
                   <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">
                     Sin Subcategoría
                   </h3>
                 </div>

                 <div className="relative z-10 mt-auto">
                    <div className="flex justify-between text-sm font-bold mb-2">
                      <span className="text-slate-600 dark:text-slate-400">Piezas Registradas</span>
                      <span className="text-slate-900 dark:text-white tabular-nums">{itemsWithoutSub.length}</span>
                    </div>
                 </div>
               </div>
          )}
        </div>
      </div>
  );
}

export function AlbumCustomView({ setActiveSeries, customTitle, customItems }: any) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-16">
        <div>
          <button onClick={() => setActiveSeries(null)} className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white mb-4 transition-colors">
             <ArrowLeft className="h-4 w-4 mr-1" /> Volver a Librería de Álbumes
          </button>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <div className="p-2.5 bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-2xl">
              <Folder className="h-8 w-8" />
            </div>
            {customTitle}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">
            Colección personalizada generada dinámicamente a partir de tu inventario.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm">
          
          <div className="mb-8">
             <div className="flex justify-between font-bold text-sm mb-2">
               <span className="text-slate-700 dark:text-slate-300">Total de piezas obtenidas</span>
               <span className="text-indigo-600 dark:text-indigo-400 tabular-nums">
                 {customItems.length}
               </span>
             </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 xl:gap-8">
             {customItems.map((coin: any, index: number) => {
               return (
                 <div 
                   key={coin.id}
                   className="relative w-full aspect-square rounded-[2rem] md:rounded-[3rem] flex flex-col items-center justify-center p-3 text-center transition-all duration-300 border-4 border-double bg-indigo-50 dark:bg-indigo-900/20 border-indigo-400 dark:border-indigo-600 shadow-xl shadow-indigo-500/10 scale-100"
                 >
                   <span className="font-black text-2xl absolute top-[15%] opacity-20 text-indigo-600 dark:text-indigo-400">
                     {(index + 1).toString().padStart(2, '0')}
                   </span>
                   
                   <div className="z-10 mt-4">
                     <h4 className="text-[10px] md:text-xs font-extrabold px-1 leading-tight text-indigo-900 dark:text-indigo-100">
                       {coin.name}
                     </h4>
                     {coin.quality && (
                       <p className="text-[9px] mt-1 font-semibold text-indigo-600 dark:text-indigo-400">
                         {coin.quality}
                       </p>
                     )}
                   </div>
                   
                   {coin.quantity > 1 && (
                      <div className="absolute bottom-0 translate-y-1/2 bg-indigo-500 text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-md border-2 border-white dark:border-slate-900">
                        x{coin.quantity}
                      </div>
                   )}
                 </div>
               )
             })}
             
             {customItems.length === 0 && (
                <div className="col-span-full py-12 text-center">
                  <p className="text-slate-500 font-bold mb-4">No hay piezas en este álbum.</p>
                  <Link href="/dashboard/collections" className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-6 py-3 rounded-xl font-bold hover:bg-indigo-200 dark:hover:bg-indigo-900/70 transition-colors">
                     Ir a Inventario
                  </Link>
                </div>
             )}
          </div>
        </div>
      </div>
  );
}

export function AlbumChecklistView({ setActiveSeries, currentSeries, obtainedCount, totalSlots, getOwnedCoin, setSelectedCoin, extraOwnedCoins }: any) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-16">
      <div>
        <button onClick={() => setActiveSeries(null)} className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white mb-4 transition-colors">
           <ArrowLeft className="h-4 w-4 mr-1" /> Volver a Librería de Álbumes
        </button>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
          <div className="p-2.5 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-2xl">
            <ShieldCheck className="h-8 w-8" />
          </div>
          {currentSeries.title}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">
          Haz clic en las ranuras faltantes para declarar tu posesión numismática.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm">
        
        {/* Progress Bar */}
        <div className="mb-8">
           <div className="flex justify-between font-bold text-sm mb-2">
             <span className="text-slate-700 dark:text-slate-300">Colección completada</span>
             <span className="text-emerald-600 dark:text-emerald-400 tabular-nums">
               {obtainedCount} / {totalSlots}
             </span>
           </div>
           <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-4 overflow-hidden shadow-inner border border-slate-200 dark:border-slate-700">
              <div 
                className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${Math.min((obtainedCount / totalSlots) * 100, 100)}%` }}
              ></div>
           </div>
        </div>

        {/* Coin Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 xl:gap-8">
           {currentSeries.items.map((coin: any) => {
             const owned = getOwnedCoin(coin.name, currentSeries.title);
             return (
               <button 
                 key={coin.id}
                 onClick={() => !owned && setSelectedCoin(coin)}
                 disabled={!!owned}
                 className={`relative w-full aspect-square rounded-[2rem] md:rounded-[3rem] flex flex-col items-center justify-center p-3 text-center transition-all duration-300 border-4 border-double ${
                   owned 
                     ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-400 dark:border-emerald-600 shadow-xl shadow-emerald-500/20 scale-100 cursor-default' 
                     : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:scale-105 shadow-sm opacity-60 hover:opacity-100 border-dashed'
                 }`}
               >
                 <span className={`font-black text-2xl absolute top-[15%] opacity-20 ${owned ? 'text-emerald-600' : 'text-slate-500'}`}>0{coin.id}</span>
                 {owned && <CheckCircle2 className="absolute top-1 right-2 h-6 md:h-7 w-6 md:w-7 text-emerald-500 drop-shadow-md bg-white dark:bg-slate-900 rounded-full" />}
                 
                 <div className="z-10 mt-4">
                   <h4 className={`text-[10px] md:text-xs font-extrabold px-1 leading-tight ${owned ? 'text-emerald-900 dark:text-emerald-100' : 'text-slate-600 dark:text-slate-400'}`}>
                     {coin.name.includes('(') ? coin.name.split(' (')[0] : coin.name}
                   </h4>
                   {coin.name.includes('(') && (
                     <p className={`text-[9px] mt-1 font-semibold ${owned ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}>
                       {coin.name.split('(')[1]?.replace(')', '')}
                     </p>
                   )}
                 </div>
                 
                 {owned?.quantity > 1 && (
                    <div className="absolute bottom-0 translate-y-1/2 bg-emerald-500 text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-md border-2 border-white dark:border-slate-900">
                      x{owned.quantity}
                    </div>
                 )}
                 {!owned && (
                    <div className="absolute inset-0 bg-slate-900/10 dark:bg-black/20 rounded-[2rem] md:rounded-[3rem] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Plus className="h-8 w-8 text-slate-600 dark:text-slate-300" />
                    </div>
                 )}
               </button>
             )
           })}

           {/* Extra Coins mapped here */}
           {extraOwnedCoins.map((extraCoin: any, idx: number) => {
             return (
               <button 
                 key={`extra-${extraCoin.id}`}
                 disabled={true}
                 className="relative w-full aspect-square rounded-[2rem] md:rounded-[3rem] flex flex-col items-center justify-center p-3 text-center transition-all duration-300 border-4 border-double bg-emerald-50 dark:bg-emerald-900/20 border-emerald-400 dark:border-emerald-600 shadow-xl shadow-emerald-500/20 scale-100 cursor-default"
               >
                 <span className="font-black text-2xl absolute top-[15%] opacity-20 text-emerald-600">
                   0{currentSeries.items.length + idx + 1}
                 </span>
                 <CheckCircle2 className="absolute top-1 right-2 h-6 md:h-7 w-6 md:w-7 text-emerald-500 drop-shadow-md bg-white dark:bg-slate-900 rounded-full" />
                 
                 <div className="z-10 mt-4">
                   <h4 className="text-[10px] md:text-xs font-extrabold px-1 leading-tight text-emerald-900 dark:text-emerald-100">
                     {extraCoin.name.includes('(') ? extraCoin.name.split(' (')[0] : extraCoin.name}
                   </h4>
                   {extraCoin.name.includes('(') && (
                     <p className="text-[9px] mt-1 font-semibold text-emerald-600 dark:text-emerald-400">
                       {extraCoin.name.split('(')[1]?.replace(')', '')}
                     </p>
                   )}
                 </div>
                 
                 {extraCoin.quantity > 1 && (
                    <div className="absolute bottom-0 translate-y-1/2 bg-emerald-500 text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-md border-2 border-white dark:border-slate-900">
                      x{extraCoin.quantity}
                    </div>
                 )}
               </button>
             );
           })}
        </div>
      </div>
    </div>
  );
}
