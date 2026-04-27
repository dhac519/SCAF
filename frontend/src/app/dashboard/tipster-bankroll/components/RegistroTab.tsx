import { useState, useMemo, useEffect } from 'react';
import { Plus, FileSpreadsheet, Edit2, Trash2, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

export function RegistroTab({ 
  bets, initialBank, handleExportCSV, setShowModal, handleUpdateStatus, handleEditClick, handleDeleteClick 
}: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterResult, setFilterResult] = useState('ALL');
  const [filterMonth, setFilterMonth] = useState('ALL');

  const itemsPerPage = 6;

  const uniqueMonths = useMemo(() => {
    const list = new Set<string>();
    bets.forEach((b: any) => {
      const date = new Date(b.date);
      const m = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      list.add(m);
    });
    return Array.from(list).sort().reverse();
  }, [bets]);

  const enrichedBets = useMemo(() => {
    // 1. Sort all bets by date ascending to calculate sequence
    const sorted = [...bets].sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // 2. Calculate running balance
    let runningBalance = Number(initialBank || 0);
    const withBalance = sorted.map((bet: any) => {
      if (bet.status !== 'PENDING') {
        runningBalance += Number(bet.realProfit || 0);
      }
      return { ...bet, calculatedBalance: runningBalance };
    });

    // 3. Re-sort for display (descending)
    return withBalance.reverse();
  }, [bets, initialBank]);

  const filteredBets = useMemo(() => {
    return enrichedBets.filter((b: any) => {
      let isMatch = true;
      if (filterResult !== 'ALL' && b.status !== filterResult) isMatch = false;
      if (filterMonth !== 'ALL') {
         const date = new Date(b.date);
         const m = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
         if (m !== filterMonth) isMatch = false;
      }
      return isMatch;
    });
  }, [enrichedBets, filterResult, filterMonth]);

  const totalPages = Math.ceil(filteredBets.length / itemsPerPage) || 1;

  useEffect(() => {
    setCurrentPage(1);
  }, [filterResult, filterMonth]);

  const paginatedBets = useMemo(() => {
    const startOffset = (currentPage - 1) * itemsPerPage;
    return filteredBets.slice(startOffset, startOffset + itemsPerPage);
  }, [filteredBets, currentPage]);

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div className="flex flex-wrap gap-2 items-center bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <Filter className="h-5 w-5 text-slate-400 mx-1 md:mx-2" />
            <select 
              value={filterResult} onChange={e => setFilterResult(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border-none text-sm font-medium rounded-lg focus:ring-0 py-1.5 focus:outline-none"
            >
               <option value="ALL">Resultados: Todos</option>
               <option value="WON">Ganadas</option>
               <option value="LOST">Pérdidas</option>
               <option value="VOID">Nulas</option>
               <option value="PENDING">Pendientes</option>
            </select>
            <select 
              value={filterMonth} onChange={e => setFilterMonth(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border-none text-sm font-medium rounded-lg focus:ring-0 py-1.5 focus:outline-none"
            >
               <option value="ALL">Mes: Todos</option>
               {uniqueMonths.map(m => (
                 <option key={m} value={m}>{m}</option>
               ))}
            </select>
         </div>

         <div className="flex flex-wrap gap-2 md:gap-3">
         <button onClick={handleExportCSV} className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/30 hover:bg-emerald-700 transition-all">
            <FileSpreadsheet className="h-5 w-5 mr-2" /> Exportar a Excel
         </button>
         <button onClick={() => setShowModal(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all">
            <Plus className="h-5 w-5 mr-2" /> Añadir Pronóstico
         </button>
       </div>
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
                   <th className="px-4 py-4 text-center">Acciones</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                 {paginatedBets.map((b: any) => (
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
                          S/ {Number(b.calculatedBalance).toLocaleString()}
                        </td>
                       <td className="px-4 py-3 text-center">
                         <div className="flex justify-center gap-2">
                           <button onClick={() => handleEditClick(b)} className="p-1.5 text-blue-500 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 rounded-lg transition-colors border border-blue-100 dark:border-blue-800" title="Modificar">
                             <Edit2 className="h-4 w-4" />
                           </button>
                           <button onClick={() => handleDeleteClick(b.id)} className="p-1.5 text-red-500 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 rounded-lg transition-colors border border-red-100 dark:border-red-800" title="Eliminar">
                             <Trash2 className="h-4 w-4" />
                           </button>
                         </div>
                       </td>
                    </tr>
                 ))}
                 {paginatedBets.length === 0 && (
                    <tr><td colSpan={10} className="text-center py-8 text-slate-500">Ningún pronóstico registrado</td></tr>
                 )}
               </tbody>
            </table>
         </div>
       </div>
       {totalPages > 1 && (
         <div className="flex justify-between items-center bg-white dark:bg-slate-900 px-4 py-3 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 mt-2">
            <span className="text-sm text-slate-500 font-medium">
              Mostrando pág. <span className="font-bold text-slate-900 dark:text-white">{currentPage}</span> de {totalPages} ({filteredBets.length} ítems)
            </span>
            <div className="flex gap-2">
               <button 
                 disabled={currentPage === 1} 
                 onClick={() => setCurrentPage(p => p - 1)} 
                 className="p-1.5 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-slate-600 dark:text-slate-300"
               >
                 <ChevronLeft className="h-5 w-5" />
               </button>
               <button 
                 disabled={currentPage === totalPages} 
                 onClick={() => setCurrentPage(p => p + 1)} 
                 className="p-1.5 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-slate-600 dark:text-slate-300"
               >
                 <ChevronRight className="h-5 w-5" />
               </button>
            </div>
         </div>
       )}
    </div>
  );
}
