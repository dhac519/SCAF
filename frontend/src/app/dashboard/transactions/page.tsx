'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Plus, ArrowDownRight, ArrowUpRight, Repeat, Calendar, Search, Tag, Wallet as WalletIcon } from 'lucide-react';

interface Transaction {
  id: string;
  amount: string;
  description: string;
  type: 'INCOME' | 'EXPENSE' | 'TRANSFER';
  date: string;
  wallet: { name: string };
  targetWallet?: { name: string };
  category?: { name: string };
}

interface Wallet {
  id: string;
  name: string;
  currency: string;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'INCOME' | 'EXPENSE' | 'TRANSFER'>('EXPENSE');
  const [walletId, setWalletId] = useState('');
  const [targetWalletId, setTargetWalletId] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [txRes, wRes] = await Promise.all([
        api.get('/transactions'),
        api.get('/wallets')
      ]);
      setTransactions(txRes.data);
      setWallets(wRes.data);
      if (wRes.data.length > 0 && !walletId) setWalletId(wRes.data[0].id);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/transactions', {
        amount: Number(amount),
        description,
        type,
        walletId,
        targetWalletId: type === 'TRANSFER' ? targetWalletId : undefined,
      });
      setShowAddForm(false);
      setAmount('');
      setDescription('');
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al guardar la transacción');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Transacciones</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Gestiona tus ingresos, gastos y transferencias.</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-2xl font-semibold hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] self-start md:self-auto"
        >
          <Plus className="h-5 w-5" />
          Nueva Transacción
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl mb-8 animate-in slide-in-from-top-4">
          <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Registrar Movimiento</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="col-span-full flex gap-3 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl">
              {['EXPENSE', 'INCOME', 'TRANSFER'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t as any)}
                  className={`flex-1 py-3 text-sm font-semibold rounded-xl capitalize transition-all ${
                    type === t 
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  {t === 'EXPENSE' ? 'Gasto' : t === 'INCOME' ? 'Ingreso' : 'Transferencia'}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Monto</label>
              <input
                type="number"
                step="0.01"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Descripción</label>
              <input
                type="text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Ej: Almuerzo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Billetera {type === 'TRANSFER' && 'Origen'}</label>
              <select
                required
                value={walletId}
                onChange={(e) => setWalletId(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              >
                <option value="" disabled>Selecciona billetera</option>
                {wallets.map(w => <option key={w.id} value={w.id}>{w.name} ({w.currency})</option>)}
              </select>
            </div>

            {type === 'TRANSFER' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Billetera Destino</label>
                <select
                  required
                  value={targetWalletId}
                  onChange={(e) => setTargetWalletId(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                >
                  <option value="" disabled>Selecciona destino</option>
                  {wallets.map(w => <option key={w.id} value={w.id}>{w.name} ({w.currency})</option>)}
                </select>
              </div>
            )}

            <div className="col-span-full flex justify-end gap-3 mt-4">
              <button type="button" onClick={() => setShowAddForm(false)} className="px-6 py-3 font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                Cancelar
              </button>
              <button type="submit" className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20">
                Guardar Transacción
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Transaction List */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Últimos Movimientos</h2>
        </div>
        
        {loading ? (
          <div className="p-12 text-center flex flex-col items-center text-slate-500">
            <span className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin mb-4" />
            Cargando transacciones...
          </div>
        ) : transactions.length > 0 ? (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {transactions.map((tx) => (
              <div key={tx.id} className="p-5 md:p-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3.5 rounded-2xl shrink-0 ${
                    tx.type === 'INCOME' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400' :
                    tx.type === 'EXPENSE' ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400' :
                    'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400'
                  }`}>
                    {tx.type === 'INCOME' && <ArrowUpRight className="h-6 w-6" />}
                    {tx.type === 'EXPENSE' && <ArrowDownRight className="h-6 w-6" />}
                    {tx.type === 'TRANSFER' && <Repeat className="h-6 w-6" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base md:text-lg tracking-tight">{tx.description}</h4>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium">
                      <span className="flex items-center gap-1.5"><WalletIcon className="h-4 w-4 text-slate-400" /> {tx.wallet?.name} {tx.targetWallet ? `➔ ${tx.targetWallet.name}` : ''}</span>
                      <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-slate-400" /> {new Date(tx.date).toLocaleDateString()}</span>
                      {tx.category && <span className="flex items-center gap-1.5"><Tag className="h-4 w-4 text-slate-400" /> {tx.category.name}</span>}
                    </div>
                  </div>
                </div>
                <div className="md:text-right flex items-center md:block ml-14 md:ml-0">
                  <span className={`font-extrabold text-lg md:text-xl tabular-nums ${
                    tx.type === 'INCOME' ? 'text-emerald-600 dark:text-emerald-400' :
                    tx.type === 'EXPENSE' ? 'text-slate-900 dark:text-white' :
                    'text-indigo-600 dark:text-indigo-400'
                  }`}>
                    {tx.type === 'INCOME' ? '+' : tx.type === 'EXPENSE' ? '-' : ''} {Number(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-16 text-center bg-slate-50/30 dark:bg-slate-900/30">
            <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 border border-slate-100 dark:border-slate-800">
              <Search className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Sin Movimientos</h3>
            <p className="text-slate-500 max-w-sm mx-auto">Aún no has registrado ninguna transacción.</p>
          </div>
        )}
      </div>
    </div>
  );
}
