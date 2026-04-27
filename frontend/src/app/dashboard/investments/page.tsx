'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Plus, LayoutGrid, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

import { InvestmentMetrics } from './components/InvestmentMetrics';
import { InvestmentForm } from './components/InvestmentForm';
import { InvestmentList } from './components/InvestmentList';
import { MarketOverview } from './components/MarketOverview';

interface Investment {
  id: string;
  assetName: string;
  symbol?: string;
  coingeckoId?: string;
  type: string;
  initialAmount: number;
  currentValue: number;
  realTimePrice?: number;
  platform?: { name: string };
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

  // Form State for Quick Add
  const [autoSymbol, setAutoSymbol] = useState('');
  const [autoCoingeckoId, setAutoCoingeckoId] = useState('');
  
  // Currency State
  const [usdToPen, setUsdToPen] = useState(3.75); // Fallback to a common value

  const fetchInvestments = async () => {
    setLoading(true);
    try {
      const [{ data }, { data: trends }] = await Promise.all([
        api.get('/investments'),
        api.get('/investments/market-trends')
      ]);
      setInvestments(data);
      if (trends.forex?.rates?.PEN) {
        setUsdToPen(trends.forex.rates.PEN);
      }
    } catch (err) {
      toast.error('Error al cargar activos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  const handleSubmit = async (data: any) => {
    try {
      await api.post('/investments', data);
      setShowAddForm(false);
      setAssetName('');
      setInitialAmount('');
      fetchInvestments();
      toast.success('Inversión registrada correctamente');
    } catch (err: any) {
      toast.error('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleSelectMarketAsset = (asset: any) => {
    setAssetName(asset.name);
    setType(asset.type);
    setShowAddForm(true);
    // These will be passed to the form to pre-fill it via Event
    window.dispatchEvent(new CustomEvent('quick-add-asset', { detail: asset }));
    toast.info(`Configurando para añadir ${asset.name}`);
  };

  const handleUpdateValue = async (id: string) => {
    if (!updateValue) return;
    try {
      await api.patch(`/investments/${id}`, { currentValue: Number(updateValue) });
      setUpdatingId(null);
      setUpdateValue('');
      fetchInvestments();
      toast.success('Valor actualizado');
    } catch (err) {
      toast.error('Error actualizando el valor');
    }
  };

  const handleAddPlatform = async () => {
    const name = prompt('Nombre de la plataforma (Binance, MetaMask, etc):');
    if (!name) return;
    try {
      await api.post('/investments/platforms', { name });
      toast.success('Plataforma añadida');
    } catch (err) {
      toast.error('Error al añadir plataforma');
    }
  };

  const totalInitial = investments.reduce((acc, inv) => acc + Number(inv.initialAmount), 0);
  const totalCurrent = investments.reduce((acc, inv) => acc + Number(inv.currentValue), 0);
  const globalROI = totalInitial > 0 ? ((totalCurrent - totalInitial) / totalInitial) * 100 : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <LayoutGrid className="text-sky-500" />
            Inversiones 2.0
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Gestión centralizada de activos con datos en tiempo real.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchInvestments}
            className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl hover:bg-slate-200 transition-all"
            title="Refrescar precios"
          >
            <RefreshCw className={loading ? 'animate-spin' : ''} size={20} />
          </button>
          <button
            onClick={handleAddPlatform}
            className="flex items-center justify-center gap-2 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-5 py-3 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm"
          >
            Gestionar Plataformas
          </button>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-3 rounded-2xl font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all hover:scale-[1.02] shadow-xl"
          >
            <Plus className="h-5 w-5" />
            Nuevo Activo
          </button>
        </div>
      </div>

      <InvestmentMetrics totalInitial={totalInitial} totalCurrent={totalCurrent} globalROI={globalROI} usdToPen={usdToPen} />

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
        usdToPen={usdToPen}
      />

      <MarketOverview onSelectAsset={handleSelectMarketAsset} usdToPen={usdToPen} />
    </div>
  );
}
