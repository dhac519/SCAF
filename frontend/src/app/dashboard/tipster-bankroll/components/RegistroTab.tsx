import { Plus, FileSpreadsheet } from 'lucide-react';

export function RegistroTab({ 
  bets, handleExportCSV, handleSeedData, setShowModal, handleUpdateStatus 
}: any) {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className="flex flex-wrap justify-end gap-3">
         <button onClick={handleExportCSV} className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/30 hover:bg-emerald-700 transition-all">
            <FileSpreadsheet className="h-5 w-5 mr-2" /> Exportar a Excel
         </button>
         <button onClick={handleSeedData} className="flex items-center px-4 py-2 bg-amber-600 text-white rounded-xl font-bold shadow-lg shadow-amber-500/30 hover:bg-amber-700 transition-all">
            Generar 45 Datos Multi-Mes
         </button>
         <button onClick={() => setShowModal(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all">
            <Plus className="h-5 w-5 mr-2" /> Añadir Pronóstico
         </button>
       </div>

       <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
               <thead className="text-xs uppercase bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800">
                 <tr>
                   <th className="px-4 py-4">Fecha</th>
                   <th className="px-4 py-4">Tipster</th>
                   <th className="px-4 py-4">Pronóstico</th>
                   <th className="px-4 py-4 text-center">Cuota</th>
                   <th className="px-4 py-4 text-center">Stake</th>
                   <th className="px-4 py-4 text-center">Resultado</th>
                   <th className="px-4 py-4 text-right">U (G/P)</th>
                   <th className="px-4 py-4 text-right">Profit</th>
                   <th className="px-4 py-4 text-right">Bank Acum.</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                 {bets.map((b: any) => (
                    <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 font-medium">
                       <td className="px-4 py-3 text-slate-500">{new Date(b.date).toLocaleDateString()}</td>
                       <td className="px-4 py-3">{b.tipster}</td>
                       <td className="px-4 py-3 text-slate-900 dark:text-white max-w-[200px] truncate" title={b.event}>{b.event}</td>
                       <td className="px-4 py-3 text-center">{Number(b.odds).toFixed(2)}</td>
                       <td className="px-4 py-3 text-center">{Number(b.stake).toFixed(1)}</td>
                       <td className="px-4 py-3 text-center">
                         {b.status === 'PENDING' ? (
                           <div className="flex gap-1 justify-center">
                              <button onClick={()=>handleUpdateStatus(b.id, 'WON')} className="h-6 w-6 rounded bg-green-100 text-green-600 hover:bg-green-500 hover:text-white">✓</button>
                              <button onClick={()=>handleUpdateStatus(b.id, 'LOST')} className="h-6 w-6 rounded bg-red-100 text-red-600 hover:bg-red-500 hover:text-white">✕</button>
                              <button onClick={()=>handleUpdateStatus(b.id, 'VOID')} className="h-6 w-6 rounded bg-slate-200 text-slate-600 hover:bg-slate-500 hover:text-white">-</button>
                           </div>
                         ) : (
                           <span className={`px-2 py-1 rounded text-xs font-bold uppercase
                              ${b.status === 'WON' ? 'bg-green-500 text-white' : ''}
                              ${b.status === 'LOST' ? 'bg-red-500 text-white' : ''}
                              ${b.status === 'VOID' ? 'bg-slate-500 text-white' : ''}
                           `}>
                              {b.status === 'WON' ? 'Ganada' : b.status === 'LOST' ? 'Pérdida' : 'Nula'}
                           </span>
                         )}
                       </td>
                       <td className={`px-4 py-3 text-right font-bold ${b.unitsProfit !== null ? (b.unitsProfit > 0 ? 'text-green-500' : b.unitsProfit < 0 ? 'text-red-500' : 'text-slate-400') : 'text-slate-400'}`}>
                         {b.unitsProfit !== null ? Number(b.unitsProfit).toFixed(2) : '-'}
                       </td>
                       <td className={`px-4 py-3 text-right font-bold ${b.realProfit !== null ? (b.realProfit > 0 ? 'text-green-500' : b.realProfit < 0 ? 'text-red-500' : 'text-slate-400') : 'text-slate-400'}`}>
                         {b.realProfit !== null ? `S/ ${Number(b.realProfit).toLocaleString()}` : '-'}
                       </td>
                       <td className="px-4 py-3 text-right font-bold text-slate-900 dark:text-white">
                         {b.cumulativeBalance !== null ? `S/ ${Number(b.cumulativeBalance).toLocaleString()}` : '-'}
                       </td>
                    </tr>
                 ))}
                 {bets.length === 0 && (
                    <tr><td colSpan={9} className="text-center py-8 text-slate-500">Ningún pronóstico registrado</td></tr>
                 )}
               </tbody>
            </table>
         </div>
       </div>
    </div>
  );
}
