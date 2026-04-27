'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface Platform {
  id: string;
  name: string;
}

interface InvestmentFormProps {
  showAddForm: boolean;
  setShowAddForm: (show: boolean) => void;
  handleSubmit: (data: any) => Promise<void>;
  assetName: string;
  setAssetName: (v: string) => void;
  type: string;
  setType: (v: string) => void;
  initialAmount: string;
  setInitialAmount: (v: string) => void;
}

export function InvestmentForm({
  showAddForm, setShowAddForm,
  handleSubmit, assetName, setAssetName,
  type, setType, initialAmount, setInitialAmount
}: InvestmentFormProps) {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [platformId, setPlatformId] = useState('');
  const [symbol, setSymbol] = useState('');
  const [coingeckoId, setCoingeckoId] = useState('');

  useEffect(() => {
    if (showAddForm) {
      api.get('/investments/platforms').then(res => setPlatforms(res.data)).catch(() => {});
    }
  }, [showAddForm]);

  useEffect(() => {
    const handleQuickAdd = (e: any) => {
      const asset = e.detail;
      setSymbol(asset.symbol || '');
      setCoingeckoId(asset.id || '');
    };

    window.addEventListener('quick-add-asset', handleQuickAdd);
    return () => window.removeEventListener('quick-add-asset', handleQuickAdd);
  }, []);

  if (!showAddForm) return null;

  const localHandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit({
      assetName,
      type,
      initialAmount: Number(initialAmount),
      symbol,
      coingeckoId: type === 'CRIPTO' ? coingeckoId : undefined,
      platformId: platformId || undefined
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl animate-in slide-in-from-top-4 duration-300">
      <form onSubmit={localHandleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Activo</label>
            <input
              type="text" value={assetName} onChange={(e) => setAssetName(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all text-slate-900 dark:text-white"
              placeholder="Ej: Bitcoin" required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Tipo</label>
            <select
              value={type} onChange={(e) => setType(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all text-slate-900 dark:text-white"
            >
              <option value="CRIPTO">Criptomoneda</option>
              <option value="ACCION">Acción</option>
              <option value="FOREX">Divisa</option>
              <option value="NEGOCIO">Negocio/Otros</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Inversión (Base)</label>
            <input
              type="number" value={initialAmount} onChange={(e) => setInitialAmount(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all text-slate-900 dark:text-white"
              placeholder="0.00" required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Plataforma</label>
            <select
              value={platformId} onChange={(e) => setPlatformId(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all text-slate-900 dark:text-white"
            >
              <option value="">Ninguna</option>
              {platforms.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
        </div>

        {type === 'CRIPTO' && (
          <div className="grid md:grid-cols-2 gap-6 p-4 bg-slate-100 dark:bg-slate-800/30 rounded-2xl">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Símbolo (Ej: BTC)</label>
              <input
                type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border-none rounded-xl px-4 py-2 text-slate-900 dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">CoinGecko ID (p/ datos en vivo)</label>
              <input
                type="text" value={coingeckoId} onChange={(e) => setCoingeckoId(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border-none rounded-xl px-4 py-2 text-slate-900 dark:text-white"
                placeholder="Ej: bitcoin, ethereum"
              />
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button" onClick={() => setShowAddForm(false)}
            className="px-6 py-3 rounded-xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-lg"
          >
            Guardar Inversión
          </button>
        </div>
      </form>
    </div>
  );
}
