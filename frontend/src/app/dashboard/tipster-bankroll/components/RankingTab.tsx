export function RankingTab({ ranking }: any) {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
               <thead className="text-xs uppercase bg-[#004d66] text-white font-bold">
                 <tr>
                   <th className="px-4 py-4 rounded-tl-xl">TIPSTER</th>
                   <th className="px-4 py-4 text-center">Nº APUESTAS</th>
                   <th className="px-4 py-4 text-center">UNIDADES</th>
                   <th className="px-4 py-4 text-center">YIELD %</th>
                   <th className="px-4 py-4 text-center">WIN RATE %</th>
                   <th className="px-4 py-4 text-center rounded-tr-xl">PROFIT REAL</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-semibold text-slate-800 dark:text-slate-200">
                 {ranking.map((r: any, i: number) => (
                   <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                      <td className="px-4 py-4 border-l-4 border-l-blue-500">{r.tipster}</td>
                      <td className="px-4 py-4 text-center">{r.count}</td>
                      <td className={`px-4 py-4 text-center ${r.units > 0 ? 'text-green-500' : r.units < 0 ? 'text-red-500': ''}`}>{r.units > 0 ? '+' : ''}{r.units.toFixed(2)}</td>
                      <td className={`px-4 py-4 text-center ${r.yieldPercent > 0 ? 'text-green-500' : r.yieldPercent < 0 ? 'text-red-500': ''}`}>{r.yieldPercent > 0 ? '+' : ''}{r.yieldPercent.toFixed(2)}%</td>
                      <td className="px-4 py-4 text-center text-blue-500">{r.winRate.toFixed(1)}%</td>
                      <td className={`px-4 py-4 text-center ${r.profit > 0 ? 'text-green-500' : r.profit < 0 ? 'text-red-500': ''}`}>S/ {r.profit.toLocaleString()}</td>
                   </tr>
                 ))}
                 {ranking.length === 0 && (
                    <tr><td colSpan={6} className="text-center py-8 text-slate-500 font-normal">No hay datos en el ranking</td></tr>
                 )}
               </tbody>
            </table>
         </div>
       </div>
    </div>
  );
}
