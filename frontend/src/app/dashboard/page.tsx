'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { Wallet as WalletIcon, Plus, ArrowUpRight, ArrowDownRight, RefreshCcw, Landmark, Repeat } from 'lucide-react';

interface Wallet {
  id: string;
  name: string;
  balance: string;
  currency: string;
  type?: string;
}

interface Transaction {
  id: string;
  amount: string;
  description: string;
  type: 'INCOME' | 'EXPENSE' | 'TRANSFER';
  date: string;
}

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [latestTx, setLatestTx] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newWalletName, setNewWalletName] = useState('');
  const [newWalletBalance, setNewWalletBalance] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [wRes, txRes] = await Promise.all([
        api.get('/wallets'),
        api.get('/transactions')
      ]);
      setWallets(wRes.data);
      if (txRes.data && txRes.data.length > 0) {
        setLatestTx(txRes.data[0]);
      } else {
        setLatestTx(null);
      }
    } catch (err) {
      console.error('Error fetching data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddWallet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWalletName) return;
    try {
      await api.post('/wallets', {
        name: newWalletName,
        balance: Number(newWalletBalance) || 0,
        currency: 'PEN',
      });
      setNewWalletName('');
      setNewWalletBalance('');
      setShowAddForm(false);
      fetchData();
    } catch (error: any) {
      console.error('Error creating wallet', error);
      alert(error.response?.data?.message || 'Error al crear billetera');
    }
  };

  const generalWallets = wallets.filter(w => w.type !== 'BETTING');
  const totalBalance = generalWallets.reduce((acc, w) => acc + Number(w.balance), 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Hola, {user?.name?.split(' ')[0] || 'Gestor'} 👋</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Aquí tienes un resumen actualizado de tu patrimonio.</p>
        </div>
        <button 
          onClick={fetchData} 
          className="p-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 self-start md:self-auto"
          title="Actualizar datos"
        >
          <RefreshCcw className={`h-5 w-5 ${loading ? 'animate-spin text-blue-500' : ''}`} />
        </button>
      </div>

      {/* Hero Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 shadow-xl shadow-blue-900/20 text-white">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center space-x-2 text-blue-100 mb-6">
              <Landmark className="h-6 w-6" />
              <span className="font-semibold tracking-wide">Patrimonio Total</span>
            </div>
            <div>
              <h2 className="text-5xl font-extrabold tracking-tight tabular-nums">
                S/ {totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h2>
              <div className="mt-4 flex items-center text-sm font-medium text-blue-100 bg-white/10 w-fit px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                <span className="flex items-center text-emerald-300 mr-2">
                  <ArrowUpRight className="h-4 w-4 mr-1" /> Activo
                </span>
                Distribuido en {generalWallets.length} cuentas
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className={`flex items-center space-x-2 mb-4 ${
              !latestTx ? 'text-slate-500' :
              latestTx.type === 'INCOME' ? 'text-emerald-500' : 
              latestTx.type === 'EXPENSE' ? 'text-rose-500' : 'text-blue-500'
            }`}>
              {!latestTx ? <ArrowDownRight className="h-5 w-5" /> :
               latestTx.type === 'INCOME' ? <ArrowUpRight className="h-5 w-5" /> :
               latestTx.type === 'EXPENSE' ? <ArrowDownRight className="h-5 w-5" /> : 
               <Repeat className="h-5 w-5" />}
              <span className="font-semibold">Último Movimiento</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white truncate" title={latestTx?.description}>
              {latestTx ? (
                <>
                  {latestTx.type === 'INCOME' ? '+' : latestTx.type === 'EXPENSE' ? '-' : ''}S/ {Number(latestTx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </>
              ) : '--'}
            </h3>
            {latestTx && <p className="text-sm font-medium text-slate-500 mt-1 truncate animate-in fade-in">{latestTx.description}</p>}
          </div>
          <p className="text-sm text-slate-400 mt-4">Actualizado hace unos instantes</p>
        </div>
      </div>

      {/* Wallets Grid */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <WalletIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            Mis Billeteras
          </h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-4 py-2.5 rounded-2xl font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span className="hidden sm:inline">Nueva Billetera</span>
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={handleAddWallet} className="bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/50 p-6 sm:p-8 rounded-3xl shadow-xl shadow-blue-900/5 mb-8 animate-in slide-in-from-top-4">
            <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Registrar Nueva Cuenta</h3>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-5">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Nombre de la cuenta</label>
                <input
                  type="text"
                  required
                  value={newWalletName}
                  onChange={(e) => setNewWalletName(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Ej: Ahorros BCP"
                />
              </div>
              <div className="md:col-span-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Saldo Inicial (Opcional)</label>
                <input
                  type="number"
                  step="0.01"
                  value={newWalletBalance}
                  onChange={(e) => setNewWalletBalance(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="0.00"
                />
              </div>
              <div className="md:col-span-3 flex items-end gap-3">
                <button type="button" onClick={() => setShowAddForm(false)} className="w-1/2 py-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                  Cancelar
                </button>
                <button type="submit" className="w-1/2 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20">
                  Añadir
                </button>
              </div>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && generalWallets.length === 0 ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 h-36 rounded-3xl animate-pulse border border-slate-100 dark:border-slate-800 shadow-sm"></div>
            ))
          ) : generalWallets.length > 0 ? (
            generalWallets.map((wallet) => (
              <div key={wallet.id} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl group-hover:scale-110 transition-transform">
                    <WalletIcon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-full uppercase tracking-wider">
                    {wallet.currency}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-500 dark:text-slate-400 mb-1">{wallet.name}</h3>
                  <p className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums tracking-tight">
                    {wallet.currency === 'USD' ? '$' : 'S/'} {Number(wallet.balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <WalletIcon className="h-10 w-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Aún no tienes billeteras</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">Comienza agregando tu primera cuenta de ahorros, efectivo o tarjeta de crédito para visualizar tu balance.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
