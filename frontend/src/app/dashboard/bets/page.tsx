'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Plus, Ticket, LayoutDashboard } from 'lucide-react';
import { toast } from 'sonner';
import BettingDashboard from '@/components/BettingDashboard';

import { BetsStats } from './components/BetsStats';
import { BetsList } from './components/BetsList';
import { BetsModals } from './components/BetsModals';

interface Bet {
  id: string;
  event: string;
  sport: string;
  stake: string;
  odds: string;
  status: 'PENDING' | 'WON' | 'LOST' | 'VOID' | 'CASHOUT';
  result: string | null;
  createdAt: string;
}

export default function BetsPage() {
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'dashboard'>('list');
  const [stats, setStats] = useState<any>(null);

  const [cashoutModalOpen, setCashoutModalOpen] = useState(false);
  const [cashoutBetId, setCashoutBetId] = useState<string | null>(null);
  const [cashoutStake, setCashoutStake] = useState<string>('');
  const [cashoutAmount, setCashoutAmount] = useState<string>('');

  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [transferAmount, setTransferAmount] = useState('');
  const [transferTargetId, setTransferTargetId] = useState('');

  const [event, setEvent] = useState('');
  const [sport, setSport] = useState('Fútbol');
  const [stake, setStake] = useState('');
  const [odds, setOdds] = useState('');
  const [wallets, setWallets] = useState<any[]>([]);
  const [walletId, setWalletId] = useState('');

  const fetchBets = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/bets');
      setBets(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWallets = async () => {
    try {
      const { data } = await api.get('/wallets');
      setWallets(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStats = async () => {
    try {
      const { data } = await api.get('/bets/stats');
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBets();
    fetchWallets();
    fetchStats();
  }, []);

  // Pre-seleccionar la billetera de apuestas por defecto
  useEffect(() => {
    if (wallets.length > 0 && !walletId) {
      const bWallet = wallets.find(w => w.type === 'BETTING');
      if (bWallet) setWalletId(bWallet.id);
    }
  }, [wallets, walletId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/bets', {
        event,
        sport,
        stake: Number(stake),
        odds: Number(odds),
        ...(walletId ? { walletId } : {})
      });
      setShowAddForm(false);
      setEvent('');
      setStake('');
      setOdds('');
      setWalletId('');
      fetchBets();
      fetchWallets();
      fetchStats();
      toast.success('Apuesta registrada correctamente');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Error al guardar apuesta');
    }
  };

  const handleResolve = async (id: string, status: 'WON' | 'LOST' | 'VOID') => {
    setResolvingId(id);
    try {
      await api.patch(`/bets/${id}/resolve`, { status });
      fetchBets();
      fetchWallets();
      fetchStats();
      toast.success('Estado de la apuesta actualizado');
    } catch (err) {
      toast.error('Error resolviendo apuesta');
    } finally {
      setResolvingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta apuesta? El dinero descontado será devuelto a tu billetera si sigue en PENDIENTE.')) return;
    try {
      await api.delete(`/bets/${id}`);
      fetchBets();
      fetchStats();
      toast.success('Apuesta eliminada');
    } catch (err) {
      toast.error('Error eliminando apuesta');
    }
  };

  const openCashoutModal = (id: string, stake: string) => {
    setCashoutBetId(id);
    setCashoutStake(stake);
    setCashoutAmount('');
    setCashoutModalOpen(true);
  };

  const confirmCashout = async () => {
    if (!cashoutBetId) return;
    if (cashoutAmount.trim() === '' || isNaN(Number(cashoutAmount))) {
      toast.error('Monto inválido'); return;
    }
    setResolvingId(cashoutBetId);
    try {
      await api.patch(`/bets/${cashoutBetId}/resolve`, { status: 'CASHOUT', cashoutAmount: Number(cashoutAmount) });
      fetchBets();
      fetchWallets();
      fetchStats();
      toast.success('Cashout exitoso');
      setCashoutModalOpen(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Error procesando cashout');
    } finally {
      setResolvingId(null);
    }
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    const actBettingWallet = wallets.find(w => w.type === 'BETTING');
    if (!actBettingWallet || !transferTargetId) return;
    try {
      await api.post('/transactions', {
        amount: Number(transferAmount),
        description: 'Retiro a Cartera desde Casa de Apuestas',
        type: 'TRANSFER',
        walletId: actBettingWallet.id,
        targetWalletId: transferTargetId
      });
      setTransferModalOpen(false);
      setTransferAmount('');
      setTransferTargetId('');
      fetchWallets();
      toast.success('Retiro a cartera completado');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Error al procesar el retiro');
    }
  };

  const totalStake = bets.filter(b => b.status === 'PENDING').reduce((acc, b) => acc + Number(b.stake), 0);
  const totalProfit = bets.filter(b => b.status !== 'PENDING').reduce((acc, b) => acc + Number(b.result || 0), 0);
  const totalGanancias = bets.filter(b => (b.status === 'WON' || b.status === 'CASHOUT') && Number(b.result || 0) > 0).reduce((acc, b) => acc + Number(b.result || 0), 0);
  const totalPerdidas = bets.filter(b => b.status === 'LOST' || Number(b.result || 0) < 0).reduce((acc, b) => acc + Math.abs(Number(b.result || 0)), 0);

  const bettingWallet = wallets.find(w => w.type === 'BETTING');
  const generalWallets = wallets.filter(w => w.type !== 'BETTING');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Apuestas</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Registra y monitorea tu historial de jugadas.</p>
        </div>
        <div className="flex bg-white dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 self-start md:self-auto">
          <button 
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${viewMode === 'list' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <Ticket className="w-4 h-4" />
            Tickets
          </button>
          <button 
            onClick={() => setViewMode('dashboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${viewMode === 'dashboard' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Performance
          </button>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center justify-center gap-2 bg-purple-600 text-white px-5 py-3 rounded-2xl font-bold hover:bg-purple-700 transition-all hover:-translate-y-1 shadow-xl shadow-purple-600/20"
        >
          <Plus className="h-5 w-5" />
          Nueva Jugada
        </button>
      </div>

      {viewMode === 'dashboard' && stats ? (
        <BettingDashboard stats={stats} />
      ) : (
        <>
          <BetsStats 
            totalStake={totalStake} totalGanancias={totalGanancias} 
            totalPerdidas={totalPerdidas} totalProfit={totalProfit} 
            bettingWallet={bettingWallet} setTransferModalOpen={setTransferModalOpen} 
          />
          <BetsList 
            loading={loading} bets={bets} resolvingId={resolvingId} 
            handleResolve={handleResolve} openCashoutModal={openCashoutModal} 
            handleDelete={handleDelete} 
          />
        </>
      )}

      <BetsModals 
        showAddForm={showAddForm} setShowAddForm={setShowAddForm} 
        handleSubmit={handleSubmit} event={event} setEvent={setEvent} 
        stake={stake} setStake={setStake} odds={odds} setOdds={setOdds} 
        walletId={walletId} setWalletId={setWalletId} wallets={wallets} 
        cashoutModalOpen={cashoutModalOpen} setCashoutModalOpen={setCashoutModalOpen} 
        cashoutStake={cashoutStake} cashoutAmount={cashoutAmount} 
        setCashoutAmount={setCashoutAmount} confirmCashout={confirmCashout} 
        resolvingId={resolvingId} cashoutBetId={cashoutBetId} 
        transferModalOpen={transferModalOpen} setTransferModalOpen={setTransferModalOpen} 
        bettingWallet={bettingWallet} handleTransfer={handleTransfer} 
        transferAmount={transferAmount} setTransferAmount={setTransferAmount} 
        transferTargetId={transferTargetId} setTransferTargetId={setTransferTargetId} 
        generalWallets={generalWallets}
      />
    </div>
  );
}
