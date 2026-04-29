import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function DashboardTab({ dynamicStats, bank, uniqueTipsters, uniqueMonths, filterTipster, setFilterTipster, filterMonth, setFilterMonth, filteredBets }: any) {
  const COLORS = ['#22c55e', '#ef4444', '#94a3b8']; // Won, Lost, Void
  const pieData = [
    { name: 'Ganadas', value: dynamicStats.won },
    { name: 'Perdidas', value: dynamicStats.lost },
    { name: 'Nulas', value: dynamicStats.voided }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* SIDEBAR ANALÍTICO */}
      <div className="lg:w-80 flex-shrink-0 space-y-4">
         <div className="bg-slate-900 shadow-xl overflow-hidden rounded-3xl border border-slate-800">
            <div className="p-4 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] text-center border-b border-white/10">
              <h2 className="text-xl font-black text-white italic tracking-widest drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">SCAF BETS</h2>
            </div>
            <div className="divide-y divide-white/5">
              <div className="p-4 text-center">
                 <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Ganancia / Perdida</p>
                 <div className={`py-2 px-4 rounded-xl ${dynamicStats.totalRealProfit >= 0 ? 'bg-emerald-900/40 text-emerald-400' : 'bg-red-900/40 text-red-500'} font-black text-2xl tracking-tight`}>
                   {dynamicStats.totalRealProfit >= 0 ? '+' : ''}S/ {Number(dynamicStats.totalRealProfit).toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                 </div>
              </div>

              <div className="p-4 text-center">
                 <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Nº Pronósticos</p>
                 <div className="font-black text-2xl text-white bg-slate-800/50 py-2 rounded-xl border border-white/5">{dynamicStats.totalBets}</div>
              </div>

              <div className="p-4 text-center">
                 <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Unidades</p>
                 <div className={`font-black text-2xl py-2 rounded-xl ${dynamicStats.totalUnits >= 0 ? 'text-emerald-400 bg-emerald-900/20' : 'text-red-500 bg-red-900/20'}`}>
                   {dynamicStats.totalUnits > 0 ? '+' : ''}{Number(dynamicStats.totalUnits).toFixed(2)}
                 </div>
              </div>

              <div className="p-4 text-center">
                 <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Cantidad Apostada</p>
                 <div className="font-black text-2xl text-slate-300">S/ {Number(dynamicStats.totalWagered).toLocaleString('es-PE', { minimumFractionDigits: 2 })}</div>
              </div>

              <div className="p-4 text-center border-t-2 border-white/10 mt-2 bg-black/20">
                 <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Bank Actual (Global)</p>
                 <div className={`font-black text-2xl ${bank.current >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                   S/ {Number(bank.current).toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                 </div>
              </div>
              
              <div className="p-4 text-center">
                 <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Saldo Global en U</p>
                 <div className={`font-black text-2xl ${bank.current >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                   {(bank.current / bank.unitValue).toFixed(2)} U
                 </div>
              </div>

              <div className="p-6">
                <div className="h-40 w-full relative">
                   <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-2xl font-black text-white">{isNaN(dynamicStats.winRate) ? 0 : dynamicStats.winRate.toFixed(0)}%</span>
                      <span className="text-[10px] uppercase font-bold text-slate-500">Win Rate</span>
                   </div>
                   <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={pieData} innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value" stroke="none">
                          {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                      </PieChart>
                   </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-2">
                   <div className="flex items-center text-xs font-bold text-emerald-500"><div className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></div> Aciertos</div>
                   <div className="flex items-center text-xs font-bold text-red-500"><div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div> Fallos</div>
                </div>
              </div>
            </div>
         </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 space-y-4">
         
         {/* FILTROS Y CABECERA */}
         <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
               <div className="flex flex-wrap gap-2">
                 <button onClick={() => setFilterTipster('ALL')} className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${filterTipster === 'ALL' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>TODOS LOS TIPSTERS</button>
                 {uniqueTipsters.map((t: string) => (
                   <button key={t} onClick={() => setFilterTipster(t)} className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${filterTipster === t ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>{t}</button>
                 ))}
               </div>
               
               <div className="flex items-center gap-2">
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">MES:</span>
                 <select value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-blue-500 outline-none">
                   <option value="ALL">Todo el Histórico</option>
                   {uniqueMonths.map((m: string) => {
                      const [y, mo] = m.split('-');
                      const monthName = new Date(parseInt(y), parseInt(mo)-1, 1).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
                      return <option key={m} value={m} className="capitalize">{monthName}</option>;
                   })}
                 </select>
               </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
               <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl flex flex-col items-center justify-center border border-slate-100 dark:border-slate-800 text-center">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">% Yield</span>
                  <span className={`text-3xl font-black ${dynamicStats.yieldPercent >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>{dynamicStats.yieldPercent > 0 ? '+' : ''}{dynamicStats.yieldPercent.toFixed(2)}%</span>
               </div>
               <div className="bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-2xl flex flex-col items-center justify-center border border-emerald-100 dark:border-emerald-900/30 text-center">
                  <span className="text-xs font-bold text-emerald-600/70 dark:text-emerald-500/70 uppercase tracking-wider mb-1">Nº Aciertos</span>
                  <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{dynamicStats.won}</span>
               </div>
               <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-2xl flex flex-col items-center justify-center border border-red-100 dark:border-red-900/30 text-center">
                  <span className="text-xs font-bold text-red-600/70 dark:text-red-500/70 uppercase tracking-wider mb-1">Nº Perdidas</span>
                  <span className="text-3xl font-black text-red-600 dark:text-red-400">{dynamicStats.lost}</span>
               </div>
            </div>
         </div>

         {/* GRÁFICA GIGANTE */}
         <div className="bg-slate-900 p-6 rounded-3xl shadow-xl border border-slate-800 relative">
           <div className="absolute top-6 left-6 z-10 p-3 bg-slate-800/80 backdrop-blur rounded-xl border border-slate-700">
             <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">Evolución de Rendimiento</p>
             <p className={`text-2xl font-black ${dynamicStats.totalRealProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {dynamicStats.totalRealProfit >= 0 ? '+' : ''}S/ {Number(dynamicStats.totalRealProfit).toLocaleString()}
             </p>
           </div>
           
           <div className="h-[400px] w-full pt-16">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={dynamicStats.evolution} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.5} />
                 <XAxis dataKey="date" tickFormatter={(v) => new Date(v).toLocaleDateString('es-ES', {month:'short', day:'numeric'})} stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                 <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `S/ ${v/1000}k`} orientation="right" tickLine={false} axisLine={false} dx={10} />
                 <RechartsTooltip formatter={(value: any) => [`S/ ${value}`, 'Bank']} labelFormatter={(v) => new Date(v).toLocaleDateString()} contentStyle={{ borderRadius: '12px', background: '#0f172a', border: '1px solid #1e293b', color: '#fff', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)' }} itemStyle={{ color: '#10b981', fontWeight: 'bold' }} />
                 <Line type="monotone" dataKey="balance" stroke="#10b981" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#10b981', stroke: '#0f172a', strokeWidth: 4 }} animationDuration={1000} />
               </LineChart>
             </ResponsiveContainer>
           </div>
         </div>
         
         {/* BLOQUE INFERIOR (TABLA Y RECIENTES) */}
         <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div className="xl:col-span-2 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
               <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Últimos Pronósticos {filterTipster !== 'ALL' && `- ${filterTipster}`}</h3>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                     <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 uppercase font-black">
                        <tr>
                          <th className="px-4 py-3">Pronóstico</th>
                          <th className="px-4 py-3 text-center">Cuota</th>
                          <th className="px-4 py-3 text-center">Stake</th>
                          <th className="px-4 py-3 text-center">Estado</th>
                          <th className="px-4 py-3 text-right">U (G/P)</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 font-semibold text-slate-700 dark:text-slate-300">
                        {[...filteredBets].sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5).map((b: any) => (
                           <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                              <td className="px-4 py-3 max-w-[150px] truncate" title={b.event}>{b.event}</td>
                              <td className="px-4 py-3 text-center text-blue-500">{parseFloat(Number(b.odds).toFixed(6))}</td>
                              <td className="px-4 py-3 text-center text-amber-500">{parseFloat(Number(b.stake).toFixed(6))}</td>
                              <td className="px-4 py-3 text-center">
                                 <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase
                                    ${b.status === 'WON' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' : ''}
                                    ${b.status === 'LOST' ? 'bg-red-100 text-red-600 dark:bg-red-900/30' : ''}
                                    ${b.status === 'VOID' ? 'bg-slate-200 text-slate-600 dark:bg-slate-700' : ''}
                                    ${b.status === 'PENDING' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' : ''}
                                 `}>
                                    {b.status === 'WON' ? 'Ganada' : b.status === 'LOST' ? 'Pérdida' : b.status === 'VOID' ? 'Nula' : 'Pediente'}
                                 </span>
                              </td>
                              <td className={`px-4 py-3 text-right font-black ${b.unitsProfit !== null ? (b.unitsProfit > 0 ? 'text-emerald-500' : b.unitsProfit < 0 ? 'text-red-500' : 'text-slate-500') : 'text-slate-400'}`}>
                                 {b.unitsProfit !== null ? Number(b.unitsProfit).toFixed(2) : '-'}
                              </td>
                           </tr>
                        ))}
                        {filteredBets.length === 0 && (
                           <tr><td colSpan={5} className="py-6 text-center text-slate-400 font-medium tracking-wide">No se encontraron resultados</td></tr>
                        )}
                     </tbody>
                  </table>
               </div>
            </div>
            
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
               <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Últimos 7 Días</h3>
               </div>
               <div className="p-4 flex-1 flex flex-col justify-center space-y-4">
                  {(() => {
                     const sevenDaysAgo = new Date();
                     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                     const last7Bets = filteredBets.filter((b:any) => new Date(b.date) >= sevenDaysAgo && b.status !== 'PENDING');
                     
                     let prof = 0;
                     let uns = 0;
                     last7Bets.forEach((b:any) => { prof += Number(b.realProfit); uns += Number(b.unitsProfit); });
                     
                     return (
                       <>
                          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                             <span className="text-xs font-bold uppercase text-slate-500">Muestras</span>
                             <span className="font-black text-slate-900 dark:text-white">{last7Bets.length} Apuestas</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                             <span className="text-xs font-bold uppercase text-slate-500">Unidades 7D</span>
                             <span className={`font-black ${uns > 0 ? 'text-emerald-500' : uns < 0 ? 'text-red-500' : 'text-slate-400'}`}>{uns > 0 ? '+' : ''}{uns.toFixed(2)} U</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                             <span className="text-xs font-bold uppercase text-slate-500">Profit 7D</span>
                             <span className={`font-black text-lg ${prof > 0 ? 'text-emerald-500' : prof < 0 ? 'text-red-500' : 'text-slate-400'}`}>{prof > 0 ? '+' : ''}S/ {prof.toLocaleString('es-PE')}</span>
                          </div>
                       </>
                     );
                  })()}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
