'use client';

import { useState, useEffect, useMemo } from 'react';
import { api } from '@/lib/api';
import { Activity, Settings } from 'lucide-react';
import { toast } from 'sonner';

import { DashboardTab } from './components/DashboardTab';
import { RegistroTab } from './components/RegistroTab';
import { RankingTab } from './components/RankingTab';
import { ActionModals } from './components/ActionModals';

interface TipsterBank {
  initial: number;
  current: number;
  unitValue: number;
}

interface TipsterStats {
  totalBets: number;
  resolvedBets: number;
  totalWagered: number;
  totalRealProfit: number;
  totalUnits: number;
  yieldPercent: number;
  winRate: number;
  winLossMatches: { won: number, lost: number, voided: number };
}

export default function TipsterBankrollPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'registro' | 'ranking'>('dashboard');
  
  const [dashboardData, setDashboardData] = useState<{bank: TipsterBank, stats: TipsterStats, evolution: any[]}>({
    bank: { initial: 0, current: 0, unitValue: 100 },
    stats: { totalBets: 0, resolvedBets: 0, totalWagered: 0, totalRealProfit: 0, totalUnits: 0, yieldPercent: 0, winRate: 0, winLossMatches: { won: 0, lost: 0, voided: 0 } },
    evolution: []
  });
  const [bets, setBets] = useState<any[]>([]);
  const [ranking, setRanking] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [newBet, setNewBet] = useState({ tipster: '', event: '', stake: '', odds: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [showConfigModal, setShowConfigModal] = useState(false);
  const [bankConfig, setBankConfig] = useState({ initialBank: '', unitValue: '' });

  // Filters
  const [filterTipster, setFilterTipster] = useState<string>('ALL');
  const [filterMonth, setFilterMonth] = useState<string>('ALL');

  const fetchDashboard = async () => {
    try {
      const res = await api.get('/tipsters/dashboard');
      setDashboardData(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchBets = async () => {
    try {
      const res = await api.get('/tipsters');
      setBets(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchRanking = async () => {
    try {
      const res = await api.get('/tipsters/ranking');
      setRanking(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    await Promise.all([fetchDashboard(), fetchBets(), fetchRanking()]);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (dashboardData?.bank) {
       setBankConfig({
         initialBank: dashboardData.bank.initial.toString(),
         unitValue: dashboardData.bank.unitValue.toString()
       });
    }
  }, [dashboardData?.bank?.initial, dashboardData?.bank?.unitValue]);

  const handleEditClick = (bet: any) => {
    setEditingId(bet.id);
    setNewBet({ tipster: bet.tipster, event: bet.event, stake: bet.stake.toString(), odds: bet.odds.toString() });
    setShowModal(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteConfirmId(id);
  };

  const handleDeleteBet = async () => {
    if (!deleteConfirmId) return;
    try {
      await api.delete(`/tipsters/${deleteConfirmId}`);
      toast.success('Pronóstico eliminado');
      loadData();
    } catch (error) {
      toast.error('Error al eliminar pronóstico');
    } finally {
      setDeleteConfirmId(null);
    }
  };

  const handleCreateBet = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.patch(`/tipsters/${editingId}`, {
          tipster: newBet.tipster.trim().toUpperCase(),
          event: newBet.event,
          stake: Number(newBet.stake),
          odds: Number(newBet.odds)
        });
        toast.success('Pronóstico actualizado');
        setEditingId(null);
      } else {
        await api.post('/tipsters', {
          tipster: newBet.tipster.trim().toUpperCase(),
          event: newBet.event,
          stake: Number(newBet.stake),
          odds: Number(newBet.odds)
        });
        toast.success('Pronóstico añadido');
      }
      setShowModal(false);
      setNewBet({ tipster: '', event: '', stake: '', odds: '' });
      loadData();
    } catch (error) {
      toast.error('Error al guardar pronóstico');
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await api.patch(`/tipsters/${id}/status`, { status });
      toast.success('Estado actualizado');
      loadData();
    } catch (error) {
       toast.error('Error al actualizar estado');
    }
  };

  const handleUpdateBank = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.patch('/tipsters/bank', {
        initialBank: Number(bankConfig.initialBank),
        unitValue: Number(bankConfig.unitValue)
      });
      toast.success('Finanzas Matrix actualizadas correctamente');
      setShowConfigModal(false);
      loadData();
    } catch (error) {
       toast.error('Error al configurar el Banco');
    }
  };

  const handleExportCSV = () => {
    if (bets.length === 0) {
      toast.error('No hay datos para exportar');
      return;
    }

    const headers = ['Fecha', 'Tipster', 'Pronostico', 'Cuota', 'Stake', 'Apostado', 'Estado', 'Ganancia (U)', 'Ganancia (Soles)', 'Bank Acumulado (Soles)'];
    
    const rows = bets.map(b => {
      const apostado = Number(b.stake) * bank.unitValue;
      return [
        new Date(b.date).toLocaleDateString(),
        `"${b.tipster.replace(/"/g, '""')}"`,
        `"${b.event.replace(/"/g, '""')}"`,
        b.odds,
        b.stake,
        apostado,
        b.status === 'WON' ? 'Ganada' : b.status === 'LOST' ? 'Perdida' : b.status === 'VOID' ? 'Nula' : 'Pendiente',
        b.unitsProfit !== null ? Number(b.unitsProfit).toFixed(2) : '',
        b.realProfit !== null ? Number(b.realProfit).toFixed(2) : '',
        b.cumulativeBalance !== null ? Number(b.cumulativeBalance).toFixed(2) : ''
      ];
    });

    const csvContent = [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
    const blob = new Blob(["\ufeff", csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `SCAF_Bankroll_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Historial descargado con éxito');
  };

  const { bank } = dashboardData;

  const uniqueTipsters = useMemo(() => {
    const list = new Set<string>();
    bets.forEach(b => {
      list.add(b.tipster.trim().toUpperCase());
    });
    return Array.from(list).sort();
  }, [bets]);

  const uniqueMonths = useMemo(() => {
    const list = new Set<string>();
    bets.forEach(b => {
      const date = new Date(b.date);
      const m = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      list.add(m);
    });
    return Array.from(list).sort().reverse();
  }, [bets]);

  const filteredBets = useMemo(() => {
    return bets.filter(b => {
      let isMatch = true;
      if (filterTipster !== 'ALL' && b.tipster !== filterTipster) isMatch = false;
      if (filterMonth !== 'ALL') {
        const date = new Date(b.date);
        const m = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        if (m !== filterMonth) isMatch = false;
      }
      return isMatch;
    });
  }, [bets, filterTipster, filterMonth]);

  const dynamicStats = useMemo(() => {
    let totalWagered = 0;
    let totalRealProfit = 0;
    let totalUnits = 0;
    let won = 0;
    let lost = 0;
    let voided = 0;

    let localCumulative = bank.initial;
    const evolution: any[] = [];

    const sortedBets = [...filteredBets].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    sortedBets.forEach(bet => {
      if (bet.status !== 'PENDING') {
         totalWagered += Number(bet.amountWagered);
      }
      if (bet.realProfit !== null) totalRealProfit += Number(bet.realProfit);
      if (bet.unitsProfit !== null) totalUnits += Number(bet.unitsProfit);

      if (bet.status === 'WON') won++;
      else if (bet.status === 'LOST') lost++;
      else if (bet.status === 'VOID') voided++;

      if (bet.status !== 'PENDING') {
        localCumulative += Number(bet.realProfit || 0);
        evolution.push({
          date: bet.date,
          balance: localCumulative,
          profit: Number(bet.realProfit || 0)
        });
      }
    });

    const yieldPercent = totalWagered > 0 ? (totalRealProfit / totalWagered) * 100 : 0;
    const resolved = won + lost;
    const winRate = resolved > 0 ? (won / resolved) * 100 : 0;
    
    return {
      totalBets: filteredBets.length,
      resolvedBets: resolved + voided,
      totalWagered,
      totalRealProfit,
      totalUnits,
      yieldPercent,
      winRate,
      won, lost, voided,
      cumulativeBank: localCumulative,
      evolution
    };
  }, [filteredBets, bank.initial]);

  const COLORS = ['#22c55e', '#ef4444', '#94a3b8']; // Won, Lost, Void
  const pieData = [
    { name: 'Ganadas', value: dynamicStats.won },
    { name: 'Perdidas', value: dynamicStats.lost },
    { name: 'Nulas', value: dynamicStats.voided }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center">
            <Activity className="h-8 w-8 mr-3 text-blue-600" />
            Bankroll Tipsters
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Gestión analítica y seguimiento métrico de pronosticadores
          </p>
        </div>
        
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
           <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'dashboard' ? 'bg-white dark:bg-slate-700 shadow text-blue-600 dark:text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}>Dashboard</button>
           <button onClick={() => setActiveTab('registro')} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'registro' ? 'bg-white dark:bg-slate-700 shadow text-blue-600 dark:text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}>Registro</button>
           <button onClick={() => setActiveTab('ranking')} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'ranking' ? 'bg-white dark:bg-slate-700 shadow text-blue-600 dark:text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}>Ranking</button>
           <div className="w-[1px] h-6 bg-slate-300 dark:bg-slate-600 mx-1"></div>
           <button onClick={() => setShowConfigModal(true)} title="Configurar Bank Inicial" className="px-3 py-2 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all">
              <Settings className="h-5 w-5" />
           </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-20 animate-pulse text-slate-400">Calculando métricas...</div>
      ) : (
        <>
          {activeTab === 'dashboard' && <DashboardTab dynamicStats={dynamicStats} bank={bank} uniqueTipsters={uniqueTipsters} uniqueMonths={uniqueMonths} filterTipster={filterTipster} setFilterTipster={setFilterTipster} filterMonth={filterMonth} setFilterMonth={setFilterMonth} filteredBets={filteredBets} />}
          {activeTab === 'registro' && <RegistroTab bets={bets} initialBank={bank.initial} handleExportCSV={handleExportCSV} setShowModal={setShowModal} handleUpdateStatus={handleUpdateStatus} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} />}
          {activeTab === 'ranking' && <RankingTab ranking={ranking} />}
        </>
      )}

      <ActionModals 
        showModal={showModal} setShowModal={setShowModal} 
        showConfigModal={showConfigModal} setShowConfigModal={setShowConfigModal} 
        handleCreateBet={handleCreateBet} handleUpdateBank={handleUpdateBank} 
        newBet={newBet} setNewBet={setNewBet} 
        bankConfig={bankConfig} setBankConfig={setBankConfig} 
        dashboardData={dashboardData} 
        isEditing={!!editingId} setEditingId={setEditingId} 
        deleteConfirmId={deleteConfirmId} setDeleteConfirmId={setDeleteConfirmId} 
        handleDeleteBet={handleDeleteBet} 
        uniqueTipsters={uniqueTipsters}
      />
    </div>
  );
}
