'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { RefreshCcw } from 'lucide-react';
import Link from 'next/link';

import { DashboardSummaryCard } from '../components/DashboardSummaryCard';
import { DashboardTrends } from '../components/DashboardTrends';
import { DashboardShortcuts } from '../components/DashboardShortcuts';
import { EmptyDashboard } from '../components/EmptyDashboard';
import { TipsterMiniWidget } from '../components/TipsterMiniWidget';
import { BetsMiniWidget } from '../components/BetsMiniWidget';

export default function AnalyticsPage() {
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
        <p className="text-slate-500 font-bold animate-pulse">Consolidando data global...</p>
      </div>
    );
  }

  const activeModules = user?.modules || [];
  const hasFinance = activeModules.includes('FINANCE');
  const hasBets = activeModules.includes('BETS');
  const hasTipsters = activeModules.includes('TIPSTER_BANKROLL');
  const hasInvestments = activeModules.includes('INVESTMENTS');
  const hasCollections = activeModules.includes('COLLECTIONS');

  // Condición real de vacío total (ni finance, ni apuestas, ni colecciones ni inversiones):
  const hasAssetModules = hasFinance || hasBets || hasInvestments || hasCollections;
  
  // Filter distribution data based on active modules
  const filteredDistribution = data?.distribution?.filter((d: any) => {
    if (d.label === 'Efectivo') return hasFinance;
    if (d.label === 'Inversiones') return hasInvestments;
    if (d.label === 'Apuestas') return hasBets;
    if (d.label === 'Colecciones') return hasCollections;
    return true;
  }) || [];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-16">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Analítica Global</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Mega-analítica integral con todos tus gráficos y rendimientos fusionados.</p>
        </div>
        <div className="flex items-center gap-3">
           <button 
             onClick={fetchData}
             className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all"
           >
             <RefreshCcw className={`h-6 w-6 ${loading ? 'animate-spin text-blue-500' : 'text-slate-500'}`} />
           </button>
           {hasFinance && (
             <Link 
               href="/dashboard/finances" 
               className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20"
             >
               Gestionar Finanzas
             </Link>
           )}
         </div>
      </div>
      {hasAssetModules ? (
        <DashboardSummaryCard data={data} activeModules={activeModules} filteredDistribution={filteredDistribution} />
      ) : hasTipsters ? (
        <TipsterMiniWidget data={data} />
      ) : (
        <EmptyDashboard />
      )}
      
      {hasFinance && <DashboardTrends data={data} />}
      {!hasFinance && hasBets && <BetsMiniWidget data={data} />}

      <DashboardShortcuts data={data} activeModules={activeModules} />
    </div>
  );
}
