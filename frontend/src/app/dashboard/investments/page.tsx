'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Plus } from 'lucide-react';

import { InvestmentMetrics } from './components/InvestmentMetrics';
import { InvestmentForm } from './components/InvestmentForm';
import { InvestmentList } from './components/InvestmentList';

interface Investment {
  id: string;
  assetName: string;
  type: string;
  initialAmount: string;
  currentValue: string;
}

export default function InvestmentsPage() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [assetName, setAssetName] = useState('');
  const [type, setType] = useState('CRIPTO');
  const [initialAmount, setInitialAmount] = useState('');
  
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [updateValue, setUpdateValue] = useState('');

  const fetchInvestments = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/investments');
      setInvestments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/investments', {
        assetName,
        type,
        initialAmount: Number(initialAmount),
      });
      setShowAddForm(false);
      setAssetName('');
      setInitialAmount('');
      fetchInvestments();
    } catch (err: any) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleUpdateValue = async (id: string) => {
    if (!updateValue) return;
    try {
      await api.patch(`/investments/${id}`, { currentValue: Number(updateValue) });
      setUpdatingId(null);
      setUpdateValue('');
      fetchInvestments();
    } catch (err) {
      alert('Error actualizando el valor');
    }
  };

  const totalInitial = investments.reduce((acc, inv) => acc + Number(inv.initialAmount), 0);
  const totalCurrent = investments.reduce((acc, inv) => acc + Number(inv.currentValue), 0);
  const globalROI = totalInitial > 0 ? ((totalCurrent - totalInitial) / totalInitial) * 100 : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Portafolio</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Sigue el rendimiento y ROI de tus activos de largo plazo.</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-3 rounded-2xl font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all hover:scale-[1.02] shadow-xl shadow-slate-900/10 dark:shadow-white/10"
        >
          <Plus className="h-5 w-5" />
          Nuevo Activo
        </button>
      </div>

      <InvestmentMetrics totalInitial={totalInitial} totalCurrent={totalCurrent} globalROI={globalROI} />

      <InvestmentForm 
        showAddForm={showAddForm} setShowAddForm={setShowAddForm}
        handleSubmit={handleSubmit} assetName={assetName} setAssetName={setAssetName}
        type={type} setType={setType} initialAmount={initialAmount} setInitialAmount={setInitialAmount}
      />

      <InvestmentList 
        loading={loading} investments={investments} 
        updatingId={updatingId} setUpdatingId={setUpdatingId}
        updateValue={updateValue} setUpdateValue={setUpdateValue}
        handleUpdateValue={handleUpdateValue}
      />
    </div>
  );
}
