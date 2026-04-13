'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { format, parseISO, subDays, isAfter } from 'date-fns';
import { TrendingUp, Award, Activity, Percent, PieChart as PieIcon, BarChart3 } from 'lucide-react';
import { useState } from 'react';

interface Stats {
  summary: {
    totalBets: number;
    totalStake: number;
    totalProfit: number;
    winRate: number;
    roi: number;
  };
  history: Array<{ date: string; profit: number; event: string }>;
  distribution: Array<{ name: string; value: number }>;
  sports: Array<{ name: string; profit: number; count: number }>;
}

const COLORS = {
  WON: '#10b981',
  LOST: '#f43f5e',
  VOID: '#94a3b8',
  CASHOUT: '#3b82f6',
  PENDING: '#f59e0b'
};

const PIE_COLORS = ['#10b981', '#f43f5e', '#3b82f6', '#f59e0b', '#94a3b8'];

export default function BettingDashboard({ stats }: { stats: Stats }) {
  const [dateRange, setDateRange] = useState('ALL');

  const filteredHistory = stats.history.filter(h => {
    if (dateRange === 'ALL') return true;
    const date = parseISO(h.date);
    const days = dateRange === '7D' ? 7 : dateRange === '30D' ? 30 : 90;
    return isAfter(date, subDays(new Date(), days));
  });

  const chartData = [...filteredHistory]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(h => ({
      ...h,
      formattedDate: format(parseISO(h.date), 'dd MMM'),
    }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 dark:bg-slate-900/95 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 backdrop-blur-md animate-in zoom-in-95 duration-200">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
            {format(parseISO(data.date), 'dd MMM, HH:mm')}
          </p>
          <p className="text-sm font-bold text-slate-900 dark:text-white mb-2 leading-tight">
            {data.event}
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
            <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">
              S/ {Number(data.profit).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Filters */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-2 rounded-2xl border border-slate-200 dark:border-slate-700 w-fit">
        <button 
          onClick={() => setDateRange('7D')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${dateRange === '7D' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
        >
          7D
        </button>
        <button 
          onClick={() => setDateRange('30D')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${dateRange === '30D' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
        >
          30D
        </button>
        <button 
          onClick={() => setDateRange('ALL')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${dateRange === 'ALL' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
        >
          Todo
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-3xl text-white shadow-xl shadow-emerald-500/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest mb-1">Beneficio Total</p>
          <h3 className="text-3xl font-black mb-4">S/ {stats.summary.totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
          <div className="flex items-center gap-2 bg-white/20 w-fit px-3 py-1 rounded-full backdrop-blur-md">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-bold">Growth</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-3xl text-white shadow-xl shadow-blue-500/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-1">ROI Global</p>
          <h3 className="text-3xl font-black mb-4">{Number(stats.summary.roi).toFixed(2)}%</h3>
          <div className="flex items-center gap-2 bg-white/20 w-fit px-3 py-1 rounded-full backdrop-blur-md">
            <Percent className="w-4 h-4" />
            <span className="text-sm font-bold">Performance</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-fuchsia-600 p-6 rounded-3xl text-white shadow-xl shadow-purple-500/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          <p className="text-purple-100 text-xs font-bold uppercase tracking-widest mb-1">Win Rate</p>
          <h3 className="text-3xl font-black mb-4">{Number(stats.summary.winRate).toFixed(1)}%</h3>
          <div className="flex items-center gap-2 bg-white/20 w-fit px-3 py-1 rounded-full backdrop-blur-md">
            <Award className="w-4 h-4" />
            <span className="text-sm font-bold">Accuracy</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-400 to-rose-500 p-6 rounded-3xl text-white shadow-xl shadow-orange-500/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          <p className="text-orange-100 text-xs font-bold uppercase tracking-widest mb-1">Total Apostado</p>
          <h3 className="text-3xl font-black mb-4">S/ {stats.summary.totalStake.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
          <div className="flex items-center gap-2 bg-white/20 w-fit px-3 py-1 rounded-full backdrop-blur-md">
            <Activity className="w-4 h-4" />
            <span className="text-sm font-bold">Volume</span>
          </div>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-500" />
                Evolución del Bankroll
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Crecimiento acumulado en el tiempo</p>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(val) => format(parseISO(val), 'dd MMM')}
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  tickFormatter={(val) => `S/ ${val}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="#6366f1" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorProfit)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
          <div className="w-full text-left mb-8">
            <h4 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <PieIcon className="w-5 h-5 text-purple-500" />
              Eficiencia de tickets
            </h4>
          </div>
          <div className="h-[280px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.distribution.filter(d => d.value > 0)}
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                  animationDuration={1500}
                >
                  {stats.distribution.filter(d => d.value > 0).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <span className="block text-2xl font-black text-slate-900 dark:text-white leading-none">{stats.summary.totalBets}</span>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Tickets</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full mt-6">
            {stats.distribution.filter(d => d.value > 0).map((d, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[d.name as keyof typeof COLORS] || PIE_COLORS[i % PIE_COLORS.length] }}></div>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 capitalize">{d.name.toLowerCase()}: {d.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="mb-8">
            <h4 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-500" />
              Rentabilidad por Deporte
            </h4>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.sports.sort((a,b) => b.profit - a.profit)}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <Tooltip 
                  cursor={{fill: 'rgba(226, 232, 240, 0.4)'}}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                />
                <Bar 
                  dataKey="profit" 
                  radius={[8, 8, 0, 0]} 
                  animationDuration={1500}
                >
                  {stats.sports.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.profit >= 0 ? '#10b981' : '#f43f5e'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
