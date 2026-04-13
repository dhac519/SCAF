'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { 
  Wallet as WalletIcon, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  Repeat, 
  History, 
  CreditCard,
  PlusCircle,
  TrendingUp,
  Search,
  Calendar,
  Tag
} from 'lucide-react';
import { toast } from 'sonner';

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
  wallet: { name: string };
  targetWallet?: { name: string };
  category?: { name: string };
}

export default function FinancesPage() {
  const [activeTab, setActiveTab] = useState<'wallets' | 'history'>('wallets');
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Wallet Form State
  const [showWalletForm, setShowWalletForm] = useState(false);
  const [newWalletName, setNewWalletName] = useState('');
  const [newWalletBalance, setNewWalletBalance] = useState('');

  // Transaction Form State
  const [showTxForm, setShowTxForm] = useState(false);
  const [txAmount, setTxAmount] = useState('');
  const [txDescription, setTxDescription] = useState('');
  const [txType, setTxType] = useState<'INCOME' | 'EXPENSE' | 'TRANSFER'>('EXPENSE');
  const [txWalletId, setTxWalletId] = useState('');
  const [txTargetWalletId, setTxTargetWalletId] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [wRes, txRes] = await Promise.all([
        api.get('/wallets'),
        api.get('/transactions')
      ]);
      setWallets(wRes.data);
      setTransactions(txRes.data);
      if (wRes.data.length > 0 && !txWalletId) setTxWalletId(wRes.data[0].id);
    } catch (err) {
      console.error(err);
      toast.error('Error al cargar datos financieros');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateWallet = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/wallets', {
        name: newWalletName,
        balance: Number(newWalletBalance) || 0,
        currency: 'PEN',
      });
      toast.success('Billetera creada con éxito');
      setNewWalletName('');
      setNewWalletBalance('');
      setShowWalletForm(false);
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al crear billetera');
    }
  };

  const handleCreateTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/transactions', {
        amount: Number(txAmount),
        description: txDescription,
        type: txType,
        walletId: txWalletId,
        targetWalletId: txType === 'TRANSFER' ? txTargetWalletId : undefined,
      });
      toast.success('Transacción registrada');
      setShowTxForm(false);
      setTxAmount('');
      setTxDescription('');
      fetchData();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Error al guardar la transacción');
    }
  };

  const generalWallets = wallets.filter(w => w.type !== 'BETTING');
  const totalBalance = generalWallets.reduce((acc, w) => acc + Number(w.balance), 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Cuentas y Finanzas</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Gestiona tu liquidez y sigue cada movimiento detalladamente.</p>
        </div>
        
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit">
          <button 
            onClick={() => setActiveTab('wallets')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'wallets' 
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <CreditCard className="h-4 w-4" />
            Mis Cuentas
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'history' 
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <History className="h-4 w-4" />
            Movimientos
          </button>
        </div>
      </div>

      {activeTab === 'wallets' ? (
        <div className="space-y-8">
          {/* Summary Banner */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <p className="text-blue-100 font-bold uppercase tracking-widest text-sm mb-4">Saldo Consolidado (Líquido)</p>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter tabular-nums mb-6">
                S/ {totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h2>
              <button 
                onClick={() => setShowWalletForm(true)}
                className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-black text-lg hover:bg-blue-50 transition-all flex items-center gap-3 shadow-lg shadow-black/10"
              >
                <PlusCircle className="h-6 w-6" />
                Nueva Billetera
              </button>
            </div>
          </div>

          {showWalletForm && (
            <form onSubmit={handleCreateWallet} className="bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/50 p-8 rounded-[2.5rem] shadow-2xl animate-in slide-in-from-top-8">
              <h3 className="text-2xl font-black mb-8 text-slate-900 dark:text-white">Registrar Nueva Cuenta</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-500 uppercase tracking-widest">Nombre de la cuenta</label>
                  <input
                    type="text"
                    required
                    value={newWalletName}
                    onChange={(e) => setNewWalletName(e.target.value)}
                    className="w-full px-6 py-4 border-2 border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-800 text-lg font-bold outline-none focus:border-blue-500 transition-all"
                    placeholder="Ej: BCP Ahorros"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-500 uppercase tracking-widest">Saldo Inicial (S/)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newWalletBalance}
                    onChange={(e) => setNewWalletBalance(e.target.value)}
                    className="w-full px-6 py-4 border-2 border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-800 text-lg font-bold outline-none focus:border-blue-500 transition-all"
                    placeholder="0.00"
                  />
                </div>
                <div className="md:col-span-2 flex gap-4">
                   <button type="submit" className="flex-1 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">Añadir Billetera</button>
                   <button type="button" onClick={() => setShowWalletForm(false)} className="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-black rounded-2xl hover:bg-slate-200 transition-all">Cancelar</button>
                </div>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {generalWallets.map(w => (
              <div key={w.id} className="group bg-white dark:bg-slate-900 border-2 border-slate-50 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all hover:-translate-y-2">
                <div className="flex justify-between items-start mb-8">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-3xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <WalletIcon className="h-8 w-8" />
                  </div>
                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase">{w.currency}</span>
                </div>
                <h4 className="text-lg font-bold text-slate-500 dark:text-slate-400 mb-2">{w.name}</h4>
                <p className="text-4xl font-black text-slate-900 dark:text-white tabular-nums tracking-tighter">
                  {w.currency === 'USD' ? '$' : 'S/'} {Number(w.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex justify-between items-center mb-4">
             <h2 className="text-2xl font-black text-slate-900 dark:text-white">Panel de Movimientos</h2>
             <button 
               onClick={() => setShowTxForm(true)}
               className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-2xl font-black hover:scale-105 transition-all flex items-center gap-2"
             >
               <Plus className="h-5 w-5" />
               Nuevo Movimiento
             </button>
          </div>

          {showTxForm && (
            <form onSubmit={handleCreateTransaction} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-2xl animate-in fade-in slide-in-from-top-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="md:col-span-3 flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                    {['EXPENSE', 'INCOME', 'TRANSFER'].map(t => (
                      <button 
                        key={t} type="button" 
                        onClick={() => setTxType(t as any)}
                        className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${txType === t ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
                      >
                        {t === 'EXPENSE' ? 'Gasto' : t === 'INCOME' ? 'Ingreso' : 'Transferencia'}
                      </button>
                    ))}
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Monto</label>
                    <input type="number" step="0.01" required value={txAmount} onChange={e => setTxAmount(e.target.value)} className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent rounded-2xl font-bold outline-none focus:border-blue-500 transition-all"/>
                 </div>
                 <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Descripción</label>
                    <input type="text" required value={txDescription} onChange={e => setTxDescription(e.target.value)} className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent rounded-2xl font-bold outline-none focus:border-blue-500 transition-all" placeholder="Ej: Pago de Luz"/>
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Billetera {txType === 'TRANSFER' && 'Origen'}</label>
                    <select value={txWalletId} onChange={e => setTxWalletId(e.target.value)} className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent rounded-2xl font-bold outline-none focus:border-blue-500 transition-all">
                      {wallets.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                    </select>
                 </div>
                 {txType === 'TRANSFER' && (
                   <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Billetera Destino</label>
                      <select value={txTargetWalletId} onChange={e => setTxTargetWalletId(e.target.value)} className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent rounded-2xl font-bold outline-none focus:border-blue-500 transition-all">
                        <option value="">Seleccionar...</option>
                        {wallets.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                      </select>
                   </div>
                 )}
                 <div className="md:col-span-3 flex gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button type="submit" className="flex-1 py-4 bg-slate-900 dark:bg-blue-600 text-white font-black rounded-2xl">Registrar</button>
                    <button type="button" onClick={() => setShowTxForm(false)} className="px-8 py-4 text-slate-500 font-bold">Cancelar</button>
                 </div>
              </div>
            </form>
          )}

          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
            {transactions.length > 0 ? (
              <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {transactions.map(tx => (
                  <div key={tx.id} className="p-6 md:p-8 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                       <div className={`p-4 rounded-2xl ${
                         tx.type === 'INCOME' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400' :
                         tx.type === 'EXPENSE' ? 'bg-rose-50 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400' :
                         'bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400'
                       }`}>
                         {tx.type === 'INCOME' ? <ArrowUpRight className="h-6 w-6" /> : tx.type === 'EXPENSE' ? <ArrowDownRight className="h-6 w-6" /> : <Repeat className="h-6 w-6" />}
                       </div>
                       <div>
                          <h5 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{tx.description}</h5>
                          <div className="flex flex-wrap items-center gap-4 mt-2 text-sm font-bold text-slate-400 uppercase tracking-widest">
                             <span className="flex items-center gap-1.5"><WalletIcon className="h-4 w-4" /> {tx.wallet?.name} {tx.targetWallet && `➔ ${tx.targetWallet.name}`}</span>
                             <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {new Date(tx.date).toLocaleDateString()}</span>
                          </div>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className={`text-2xl font-black tabular-nums ${
                         tx.type === 'INCOME' ? 'text-emerald-500' : tx.type === 'EXPENSE' ? 'text-slate-900 dark:text-white' : 'text-blue-500'
                       }`}>
                         {tx.type === 'INCOME' ? '+' : tx.type === 'EXPENSE' ? '-' : ''}S/ {Number(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                       </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-24 text-center">
                 <Search className="h-16 w-16 text-slate-200 mx-auto mb-6" />
                 <h4 className="text-2xl font-black text-slate-900 dark:text-white">Sin movimientos</h4>
                 <p className="text-slate-500 mt-2">No se han registrado transacciones aún.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
