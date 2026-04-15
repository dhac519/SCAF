import { Activity } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export function DashboardSummaryCard({ data, activeModules, filteredDistribution }: any) {
  return (
    <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-blue-900/40">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px]"></div>
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-blue-200 text-xs font-black uppercase tracking-widest mb-6">
            <Activity className="h-4 w-4" /> En tiempo real
          </span>
          <p className="text-slate-400 font-bold mb-2">Patrimonio Neto Total</p>
          <h2 className="text-6xl md:text-7xl font-black tracking-tighter tabular-nums mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            S/ {data?.stats.totalNetWorth.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </h2>
          
          <div className="grid grid-cols-2 gap-6">
             {activeModules.includes('BETS') && (
               <div className="p-5 rounded-3xl bg-white/5 border border-white/10">
                 <p className="text-slate-500 text-xs font-black uppercase mb-1">Profit Apuestas</p>
                 <p className={`text-2xl font-bold tabular-nums ${data?.stats.totalBettingProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                   {data?.stats.totalBettingProfit >= 0 ? '+' : ''}S/ {data?.stats.totalBettingProfit.toLocaleString()}
                 </p>
               </div>
             )}
             {activeModules.includes('COLLECTIONS') && (
               <div className="p-5 rounded-3xl bg-white/5 border border-white/10">
                 <p className="text-slate-500 text-xs font-black uppercase mb-1">Items Colecciones</p>
                 <p className="text-2xl font-bold tabular-nums text-amber-400">{data?.stats.collectionsCount}</p>
               </div>
             )}
          </div>
        </div>

        <div className="h-[300px] w-full flex items-center justify-center bg-white/5 rounded-[2.5rem] border border-white/5 p-6 backdrop-blur-md">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={filteredDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={8}
                dataKey="value"
                animationDuration={1500}
              >
                {filteredDistribution.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  borderRadius: '1.5rem', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                  color: '#f8fafc'
                }} 
                itemStyle={{ fontWeight: 'bold' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-3 ml-4">
             {filteredDistribution.map((d: any) => (
               <div key={d.label} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></div>
                  <span className="text-xs font-bold text-slate-300">{d.label}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
