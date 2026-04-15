import { ShieldCheck } from 'lucide-react';

export function AlbumActionModals({ selectedCoin, setSelectedCoin, handleMarkAsObtained, quantity, setQuantity, year, setYear, quality, setQuality }: any) {
  if (!selectedCoin) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
      <form onSubmit={handleMarkAsObtained} className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-6 md:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
         <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Has obtenido la pieza</h3>
         <p className="text-emerald-600 font-bold mb-6 flex items-center gap-2">
           <ShieldCheck className="h-5 w-5" /> #{selectedCoin.id} - {selectedCoin.name}
         </p>

         <div className="space-y-4">
           <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Cantidad poseída</label>
              <input type="number" min="1" required value={quantity} onChange={e => setQuantity(e.target.value)} className="w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-emerald-500 font-bold" />
           </div>
           <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Año de Acuñación (Opcional)</label>
              <input type="number" value={year} onChange={e => setYear(e.target.value)} className="w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Ej: 2018" />
           </div>
           <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Calidad (Conservación)</label>
              <select required value={quality} onChange={(e) => setQuality(e.target.value)} className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500">
                <option value="UNC">UNC (Sin circular)</option>
                <option value="XF">XF (Extremadamente Fina)</option>
                <option value="VF">VF (Muy Fina)</option>
                <option value="F">F (Fina)</option>
              </select>
           </div>
         </div>

         <div className="flex gap-3 mt-8">
           <button type="button" onClick={() => setSelectedCoin(null)} className="flex-1 py-3 text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-200 transition-colors">Cancelar</button>
           <button type="submit" className="flex-1 py-3 bg-emerald-500 text-white font-black rounded-xl hover:bg-emerald-600 shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.02]">¡Tengo esta pieza!</button>
         </div>
      </form>
    </div>
  );
}
