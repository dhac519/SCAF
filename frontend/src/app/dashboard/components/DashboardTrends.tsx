import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

export function DashboardTrends({ data }: any) {
  return (
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
  );
}
