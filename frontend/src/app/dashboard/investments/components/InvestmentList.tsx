'use client';

import { ExternalLink, TrendingUp, TrendingDown, Building2, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Asset {
  id: string;
  assetName: string;
  symbol?: string;
  type: string;
  initialAmount: string | number;
  currentValue: string | number;
  realTimePrice?: number;
  platform?: { name: string };
}

interface InvestmentListProps {
  loading: boolean;
  investments: Asset[];
  updatingId: string | null;
  setUpdatingId: (id: string | null) => void;
  updateValue: string;
  setUpdateValue: (v: string) => void;
  handleUpdateValue: (id: string) => void;
  usdToPen: number;
}

export function InvestmentList({
  loading,
  investments,
  updatingId,
  setUpdatingId,
  updateValue,
  setUpdateValue,
  handleUpdateValue,
  usdToPen
}: InvestmentListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-3xl" />
        ))}
      </div>
    );
  }

  if (investments.length === 0) {
    return (
      <div className="bg-slate-100 dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center">
        <p className="text-slate-500 dark:text-slate-400">No tienes activos registrados todavía.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {investments.map((inv) => {
        const initial = Number(inv.initialAmount);
        const currentVal = Number(inv.currentValue);
        const roi = initial > 0 ? ((currentVal - initial) / initial) * 100 : 0;
        const isPositive = roi >= 0;

        const valInPen = currentVal * usdToPen;

        return (
          <div key={inv.id} className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 hover:shadow-2xl hover:shadow-slate-900/5 dark:hover:shadow-white/5 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-slate-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-slate-900 transition-colors">
                  {inv.type === 'CRIPTO' ? <TrendingUp size={20} /> : <Building2 size={20} />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white leading-none">{inv.assetName}</h3>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{inv.type} {inv.symbol && `• ${inv.symbol}`}</span>
                </div>
              </div>
              <div className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold",
                isPositive ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" : "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400"
              )}>
                {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {roi.toFixed(2)}%
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-tight">Valor Actual</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">
                    ${currentVal.toLocaleString()}
                  </p>
                  <p className="text-xs font-bold text-slate-400 mt-1">S/ {valInPen.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-tight">Invertido</p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">${initial.toLocaleString()}</p>
                </div>
              </div>

              {inv.platform && (
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-xs text-slate-600 dark:text-slate-400">
                  <Wallet size={14} />
                  <span>En <span className="font-bold text-slate-900 dark:text-white">{inv.platform.name}</span></span>
                </div>
              )}

              {inv.realTimePrice && (
                <div className="flex items-center justify-between text-[10px] text-sky-500 dark:text-sky-400 font-bold uppercase tracking-widest pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span>Precio en Vivo</span>
                  <span>${inv.realTimePrice.toLocaleString()} / S/ {(inv.realTimePrice * usdToPen).toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="mt-6 flex gap-2">
              {updatingId === inv.id ? (
                <div className="flex-1 flex gap-2 animate-in slide-in-from-bottom-2">
                  <input
                    type="number" value={updateValue} onChange={(e) => setUpdateValue(e.target.value)}
                    className="flex-1 bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-slate-900"
                    placeholder="Nuevo valor USD..." autoFocus
                  />
                  <button onClick={() => handleUpdateValue(inv.id)} className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-xl text-xs font-bold">OK</button>
                  <button onClick={() => setUpdatingId(null)} className="text-slate-400 px-2">X</button>
                </div>
              ) : (
                <button
                  onClick={() => setUpdatingId(inv.id)}
                  className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                  Actualizar Valor
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
