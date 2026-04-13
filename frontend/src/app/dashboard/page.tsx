'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { 
  RefreshCcw, 
  TrendingUp, 
  Target, 
  Coins, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight,
  PieChart as PieChartIcon,
  Activity,
  Plus
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  Legend
} from 'recharts';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get('/summary/global');
      setData(res.data);
    } catch (err) {
      console.error('Error fetching dashboard summary', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading && !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <RefreshCcw className="h-10 w-10 animate-spin text-blue-600" />
        <p className="text-slate-500 font-bold animate-pulse">Consolidando tu imperio financiero...</p>
      </div>
    );
  }

  const activeModules = user?.modules || [];
  
  // Filter distribution data based on active modules
  const filteredDistribution = data?.distribution.filter((d: any) => {
    if (d.label === 'Efectivo') return activeModules.includes('FINANCE');
    if (d.label === 'Inversiones') return activeModules.includes('INVESTMENTS');
    if (d.label === 'Apuestas') return activeModules.includes('BETS');
    if (d.label === 'Colecciones') return activeModules.includes('COLLECTIONS');
    return true;
  }) || [];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-16">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Vista 360°</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Resumen estratégico de todo tu patrimonio y rendimiento.</p>
        </div>
        <div className="flex items-center gap-3">
           <button 
             onClick={fetchData}
             className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all"
           >
             <RefreshCcw className={`h-6 w-6 ${loading ? 'animate-spin text-blue-500' : 'text-slate-500'}`} />
           </button>
           <Link 
             href="/dashboard/finances" 
             className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20"
           >
             Gestionar Finanzas
           </Link>
        </div>
      </div>

      {/* Top Level Summary Card */}
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

      {/* Trends and Logic Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Monthly Pulse chart */}
        <div className="xl:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
           <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8">Pulso Mensual (Ingresos vs Gastos)</h3>
           <div className="h-[350px]">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={data?.monthlyPulse || []}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                 <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold', fill: '#94a3b8' }} dy={10} />
                 <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold', fill: '#94a3b8' }} />
                 <Tooltip 
                   cursor={{ fill: '#f1f5f9' }}
                   contentStyle={{ 
                    backgroundColor: '#fff', 
                    borderRadius: '1.5rem', 
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    fontWeight: 'bold'
                  }} 
                 />
                 <Legend wrapperStyle={{ paddingTop: '20px' }} />
                 <Bar name="Ingresos" dataKey="income" fill="#10b981" radius={[6, 6, 0, 0]} barSize={20} />
                 <Bar name="Gastos" dataKey="expense" fill="#f43f5e" radius={[6, 6, 0, 0]} barSize={20} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Recent Transactions Mini View */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
           <div className="flex justify-between items-center mb-8">
             <h3 className="text-xl font-black text-slate-900 dark:text-white">Movimientos Recientes</h3>
             <Link href="/dashboard/finances" className="text-blue-600 font-bold text-sm hover:underline">Ver todo</Link>
           </div>
           <div className="space-y-6">
              {data?.latestTransactions.map((tx: any) => (
                <div key={tx.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                     <div className={`p-3 rounded-2xl ${
                       tx.type === 'INCOME' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-600'
                     }`}>
                       {tx.type === 'INCOME' ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
                     </div>
                     <div>
                        <p className="font-bold text-slate-900 dark:text-white truncate max-w-[120px]">{tx.description}</p>
                        <p className="text-xs font-bold text-slate-400">{tx.wallet?.name}</p>
                     </div>
                  </div>
                  <span className={`font-black tabular-nums ${tx.type === 'INCOME' ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}>
                    {tx.type === 'INCOME' ? '+' : '-'}S/ {Number(tx.amount).toLocaleString()}
                  </span>
                </div>
              ))}
              {data?.latestTransactions.length === 0 && (
                <p className="text-center py-12 text-slate-400 font-medium italic">No hay actividad reciente.</p>
              )}
           </div>
        </div>
      </div>

      {/* Bottom Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
         {activeModules.includes('INVESTMENTS') && (
           <Link href="/dashboard/investments" className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group">
             <TrendingUp className="h-10 w-10 text-emerald-500 mb-6 group-hover:scale-110 transition-transform" />
             <h4 className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">{data?.stats.activeInvestments}</h4>
             <p className="text-sm font-black text-slate-400 uppercase tracking-widest mt-1">Inversiones Activas</p>
           </Link>
         )}
         {activeModules.includes('BETS') && (
           <Link href="/dashboard/bets" className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group">
             <Target className="h-10 w-10 text-purple-500 mb-6 group-hover:scale-110 transition-transform" />
             <h4 className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">{data?.stats.pendingBets}</h4>
             <p className="text-sm font-black text-slate-400 uppercase tracking-widest mt-1">Apuestas en Juego</p>
           </Link>
         )}
         {activeModules.includes('COLLECTIONS') && (
           <Link href="/dashboard/collections" className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group">
             <Coins className="h-10 w-10 text-amber-500 mb-6 group-hover:scale-110 transition-transform" />
             <h4 className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">{data?.stats.collectionsCount}</h4>
             <p className="text-sm font-black text-slate-400 uppercase tracking-widest mt-1">Piezas Coleccionables</p>
           </Link>
         )}
         <Link href="/dashboard/finances" className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group">
           <Wallet className="h-10 w-10 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
           <h4 className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">{data?.distribution.find((d: any) => d.label === 'Efectivo')?.value.toLocaleString()}</h4>
           <p className="text-sm font-black text-slate-400 uppercase tracking-widest mt-1">Cash Líquido (S/)</p>
         </Link>
      </div>
    </div>
  );
}
