'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Plus, Target, CheckCircle2, XCircle, MinusCircle, Trophy, Clock, Trash2, Coins, LayoutDashboard, Ticket } from 'lucide-react';
import { toast } from 'sonner';
import BettingDashboard from '@/components/BettingDashboard';

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100 dark:border-indigo-800/50 rounded-3xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-indigo-600/80 dark:text-indigo-400/80 mb-2 uppercase tracking-wider">Pendiente</p>
            <h3 className="text-2xl font-black text-indigo-900 dark:text-indigo-300 tabular-nums">S/ {totalStake.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm"><Clock className="w-8 h-8 text-indigo-500" /></div>
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-3xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-700/80 dark:text-emerald-400/80 mb-2 uppercase tracking-wider">Ganancias</p>
            <h3 className="text-2xl font-black text-emerald-700 dark:text-emerald-400 tabular-nums">+S/ {totalGanancias.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm"><CheckCircle2 className="w-8 h-8 text-emerald-500" /></div>
        </div>

        <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50 rounded-3xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-rose-700/80 dark:text-rose-400/80 mb-2 uppercase tracking-wider">Pérdidas</p>
            <h3 className="text-2xl font-black text-rose-700 dark:text-rose-400 tabular-nums">-S/ {totalPerdidas.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm"><XCircle className="w-8 h-8 text-rose-500" /></div>
        </div>
        
        <div className={`border rounded-3xl p-6 shadow-sm flex items-center justify-between ${totalProfit >= 0 ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800/50' : 'bg-rose-50 border-rose-200 dark:bg-rose-900/20 dark:border-rose-800/50'}`}>
          <div>
            <p className={`text-sm font-semibold mb-2 uppercase tracking-wider ${totalProfit >= 0 ? 'text-emerald-700/80 dark:text-emerald-400/80' : 'text-rose-700/80 dark:text-rose-400/80'}`}>Balance Neto</p>
            <h3 className={`text-2xl font-black tabular-nums ${totalProfit >= 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
              {totalProfit > 0 ? '+' : ''}S/ {totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </h3>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm"><Trophy className={`w-8 h-8 ${totalProfit >= 0 ? 'text-emerald-500' : 'text-rose-500'}`} /></div>
        </div>
      </div>

      {bettingWallet && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm">
              <Coins className="w-10 h-10 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-700/80 dark:text-blue-400/80 mb-1 uppercase tracking-wider">Mi Saldo: Casa de Apuestas</p>
              <h3 className="text-3xl font-black text-blue-800 dark:text-blue-300 tabular-nums">S/ {Number(bettingWallet.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
            </div>
          </div>
          <button 
            onClick={() => setTransferModalOpen(true)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/20 transition-all flex items-center gap-2 justify-center"
          >
            Transferir a Cartera
          </button>
        </div>
      )}

      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 animate-in slide-in-from-bottom-4 zoom-in-95">
            <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Registrar Apuesta</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Evento / Partido</label>
                  <input type="text" required value={event} onChange={(e) => setEvent(e.target.value)} className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" placeholder="Ej: Real Madrid vs Barcelona" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Stake (Monto)</label>
                  <input type="number" step="0.01" required value={stake} onChange={(e) => setStake(e.target.value)} className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Cuota (Odds)</label>
                  <input type="number" step="0.01" required value={odds} onChange={(e) => setOdds(e.target.value)} className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" placeholder="1.85" />
                </div>
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Billetera de Descuento (Opcional)</label>
                  <select value={walletId} onChange={(e) => setWalletId(e.target.value)} className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all">
                    <option value="">No descontar (Solo registro)</option>
                    {wallets.map(w => (
                      <option key={w.id} value={w.id}>{w.name} (S/ {w.balance})</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-full flex justify-end gap-3 mt-4">
                  <button type="button" onClick={() => setShowAddForm(false)} className="px-6 py-3 font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">Cancelar</button>
                  <button type="submit" className="px-8 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 shadow-md shadow-purple-600/20 transition-all">Guardar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Tickets Recientes</h2>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800/60 flex flex-col">
          {loading && bets.length === 0 ? (
            <div className="p-12 text-center text-slate-500 animate-pulse">Cargando jugadas...</div>
          ) : bets.length > 0 ? (
            bets.map(bet => {
              const isPending = bet.status === 'PENDING';
              const isWon = bet.status === 'WON';
              const isLost = bet.status === 'LOST';
              return (
                <div key={bet.id} className="p-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-2xl">
                      <Target className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-lg tracking-tight mb-2">{bet.event}</h4>
                      <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
                        <span className="bg-white dark:bg-slate-900 border dark:border-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-lg shadow-sm">Stake: <b>S/ {Number(bet.stake).toFixed(2)}</b></span>
                        <span className="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400 px-3 py-1 rounded-lg">Cuota: <b>{Number(bet.odds).toFixed(2)}</b></span>
                        {isPending && <span className="text-amber-500 flex items-center gap-1.5 ml-2"><Clock className="w-4 h-4"/> Pendiente</span>}
                        {isWon && <span className="text-emerald-500 flex items-center gap-1.5 ml-2"><CheckCircle2 className="w-4 h-4"/> Ganada</span>}
                        {isLost && <span className="text-rose-500 flex items-center gap-1.5 ml-2"><XCircle className="w-4 h-4"/> Perdida</span>}
                        {bet.status === 'VOID' && <span className="text-slate-500 flex items-center gap-1.5 ml-2"><MinusCircle className="w-4 h-4"/> Nula</span>}
                        {bet.status === 'CASHOUT' && <span className="text-blue-500 flex items-center gap-1.5 ml-2"><Coins className="w-4 h-4"/> Retirada</span>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 md:justify-end border-t md:border-0 border-slate-100 dark:border-slate-800 pt-4 md:pt-0">
                    {isPending ? (
                      <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                        <button disabled={resolvingId === bet.id} onClick={() => handleResolve(bet.id, 'WON')} className="p-2.5 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 rounded-xl transition-all" title="Marcar Ganada"><CheckCircle2 className="w-5 h-5"/></button>
                        <button disabled={resolvingId === bet.id} onClick={() => openCashoutModal(bet.id, bet.stake)} className="p-2.5 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-xl transition-all" title="Cashout (Retiro Anticipado)"><Coins className="w-5 h-5"/></button>
                        <button disabled={resolvingId === bet.id} onClick={() => handleResolve(bet.id, 'LOST')} className="p-2.5 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/50 rounded-xl transition-all" title="Marcar Perdida"><XCircle className="w-5 h-5"/></button>
                        <button disabled={resolvingId === bet.id} onClick={() => handleResolve(bet.id, 'VOID')} className="p-2.5 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 shadow-sm rounded-xl transition-all" title="Anular"><MinusCircle className="w-5 h-5"/></button>
                        <button disabled={resolvingId === bet.id} onClick={() => handleDelete(bet.id)} className="p-2.5 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-xl transition-all ml-2" title="Eliminar"><Trash2 className="w-5 h-5"/></button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1 pb-1">Resultado Neto</span>
                          <span className={`font-black text-2xl tabular-nums ${Number(bet.result) > 0 ? 'text-emerald-500' : Number(bet.result) < 0 ? 'text-rose-500' : 'text-slate-500'}`}>
                            {Number(bet.result) > 0 ? '+' : ''} S/ {Number(bet.result).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <button onClick={() => handleDelete(bet.id)} className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all ml-2" title="Eliminar"><Trash2 className="w-5 h-5"/></button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
             <div className="p-16 text-center text-slate-500 flex justify-center">
               <span className="bg-slate-100 dark:bg-slate-800 px-6 py-3 rounded-2xl inline-block">No hay apuestas registradas en el historial.</span>
             </div>
          )}
        </div>
      </div>
    </>
  )}

      {cashoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 animate-in slide-in-from-bottom-4 zoom-in-95">
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Procesar Cashout</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              ¿Cuánto dinero OBTIENES en total al hacer Cashout?<br />
              Tu stake inicial fue de <b>S/ {Number(cashoutStake).toFixed(2)}</b>.
            </p>
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Monto de Retiro</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">S/</span>
                <input
                  type="number"
                  step="0.01"
                  value={cashoutAmount}
                  onChange={(e) => setCashoutAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="0.00"
                  autoFocus
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setCashoutModalOpen(false)} className="px-5 py-2.5 font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">Cancelar</button>
              <button
                disabled={resolvingId === cashoutBetId}
                onClick={confirmCashout}
                className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all flex items-center gap-2"
              >
                <Coins className="w-4 h-4" />
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {transferModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 animate-in slide-in-from-bottom-4 zoom-in-95">
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Transferir a Cartera</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Mueve fondos desde tu cuenta de apuestas hacia tus carteras.<br />
              Disponible: <b>S/ {Number(bettingWallet?.balance || 0).toFixed(2)}</b>
            </p>
            <form onSubmit={handleTransfer}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Monto a Transferir</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">S/</span>
                  <input
                    type="number"
                    step="0.01"
                    max={Number(bettingWallet?.balance || 0)}
                    required
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="0.00"
                    autoFocus
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Cartera Destino</label>
                <select 
                  required
                  value={transferTargetId} 
                  onChange={(e) => setTransferTargetId(e.target.value)} 
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                >
                  <option value="">Selecciona una cartera</option>
                  {generalWallets.map(w => (
                    <option key={w.id} value={w.id}>{w.name} (S/ {w.balance})</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setTransferModalOpen(false)} className="px-5 py-2.5 font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">Cancelar</button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all flex items-center gap-2"
                >
                  Transferir
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
