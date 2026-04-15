'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { CreditCard, History } from 'lucide-react';
import { toast } from 'sonner';

import { WalletsTab } from './components/WalletsTab';
import { HistoryTab } from './components/HistoryTab';

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
        <WalletsTab 
          generalWallets={generalWallets} totalBalance={totalBalance}
          showWalletForm={showWalletForm} setShowWalletForm={setShowWalletForm}
          handleCreateWallet={handleCreateWallet}
          newWalletName={newWalletName} setNewWalletName={setNewWalletName}
          newWalletBalance={newWalletBalance} setNewWalletBalance={setNewWalletBalance}
        />
      ) : (
        <HistoryTab 
          transactions={transactions} wallets={wallets} 
          showTxForm={showTxForm} setShowTxForm={setShowTxForm}
          handleCreateTransaction={handleCreateTransaction} 
          txAmount={txAmount} setTxAmount={setTxAmount} 
          txDescription={txDescription} setTxDescription={setTxDescription}
          txType={txType} setTxType={setTxType} 
          txWalletId={txWalletId} setTxWalletId={setTxWalletId} 
          txTargetWalletId={txTargetWalletId} setTxTargetWalletId={setTxTargetWalletId}
        />
      )}
    </div>
  );
}
