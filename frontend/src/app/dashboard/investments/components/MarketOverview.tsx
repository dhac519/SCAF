'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { TrendingUp, TrendingDown, RefreshCw, Layers, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MarketOverviewProps {
  onSelectAsset: (asset: { name: string; symbol: string; id: string; price: number; type: string }) => void;
  usdToPen: number;
}

export function MarketOverview({ onSelectAsset, usdToPen }: MarketOverviewProps) {
  const [data, setData] = useState<{ crypto: any[]; forex: any }>({ crypto: [], forex: {} });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'crypto' | 'forex'>('crypto');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const fetchTrends = async () => {
    try {
      const res = await api.get('/investments/market-trends');
      setData(res.data);
    } catch (error) {
      console.error('Error fetching trends', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrends();
    const dataInterval = setInterval(fetchTrends, 60000);
    return () => clearInterval(dataInterval);
  }, []);

  // Reset page when switching tabs
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const renderTable = (items: any[], type: 'CRIPTO' | 'FOREX') => {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const paginatedItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
      <div className="flex flex-col h-full">
        <div className="overflow-x-auto flex-grow">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Activo</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Precio USD</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Precio PEN (S/)</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Estado</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedItems.map((item) => {
                const name = type === 'CRIPTO' ? item.name : item.symbol;
                const symbol = type === 'CRIPTO' ? item.symbol : 'Moneda';
                const priceUsd = type === 'CRIPTO' ? item.current_price : (1 / item.rate);
                const pricePen = priceUsd * usdToPen;
                const change = type === 'CRIPTO' ? item.price_change_percentage_24h : 0;
                const img = type === 'CRIPTO' ? item.image : null;

                return (
                  <tr key={item.id || item.symbol} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {img ? (
                          <img src={img} alt={name} className="w-8 h-8 rounded-full shadow-sm" />
                        ) : (
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs uppercase shadow-lg",
                            item.symbol === 'USD' ? "bg-blue-600" : "bg-slate-400"
                          )}>
                            {item.symbol === 'USD' ? <DollarSign size={16} /> : item.symbol[0]}
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white text-sm">{name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="font-black text-slate-900 dark:text-white text-sm">
                        ${priceUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 3 })}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="font-bold text-slate-600 dark:text-slate-400 text-sm">
                        S/ {pricePen.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 3 })}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {type === 'CRIPTO' ? (
                        <span className={cn(
                          "text-xs font-bold flex items-center justify-end gap-1",
                          change >= 0 ? "text-emerald-500" : "text-rose-500"
                        )}>
                          {change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                          {change.toFixed(2)}%
                        </span>
                      ) : (
                        <div className="flex items-center justify-end gap-1.5">
                           <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                           <span className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter">Sync</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => onSelectAsset({ 
                          name: name, 
                          symbol: (type === 'CRIPTO' ? item.symbol : item.symbol).toUpperCase(), 
                          id: item.id || item.symbol.toLowerCase(), 
                          price: priceUsd,
                          type: type 
                        })}
                        className="opacity-0 group-hover:opacity-100 px-4 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-[10px] font-black uppercase transition-all shadow-lg active:scale-95"
                      >
                        Añadir
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/10">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Página <span className="text-slate-900 dark:text-white">{currentPage}</span> de {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-slate-50"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-slate-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const forexItems = Object.entries(data.forex.rates || {})
    .filter(([symbol]) => symbol !== 'PEN')
    .map(([symbol, rate]) => ({ symbol, rate, id: symbol }));

  // Add USD manually as the first item
  const allForex = [{ symbol: 'USD', rate: 1, id: 'usd' }, ...forexItems];

  return (
    <div className="mt-12 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="text-rose-500" />
            Monitor del Mercado Global
          </h2>
          <p className="text-slate-500 text-sm">Precios en vivo actualizados cada 60 segundos.</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-slate-100 dark:bg-slate-900 p-1 rounded-xl flex shadow-inner">
            <button
              onClick={() => setActiveTab('crypto')}
              className={cn(
                "px-6 py-2 rounded-lg text-xs font-black uppercase transition-all",
                activeTab === 'crypto' ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-lg" : "text-slate-400 hover:text-slate-600"
              )}
            >
              Cripto
            </button>
            <button
              onClick={() => setActiveTab('forex')}
              className={cn(
                "px-6 py-2 rounded-lg text-xs font-black uppercase transition-all",
                activeTab === 'forex' ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-lg" : "text-slate-400 hover:text-slate-600"
              )}
            >
              Divisas
            </button>
          </div>
          <button
            onClick={() => { setLoading(true); fetchTrends(); }}
            className="p-2 bg-slate-100 dark:bg-slate-900 text-slate-400 rounded-xl hover:text-rose-500 transition-colors shadow-sm"
          >
            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl shadow-slate-900/10 min-h-[580px]">
        {activeTab === 'crypto' ? (
          Array.isArray(data.crypto) && data.crypto.length > 0 ? renderTable(data.crypto, 'CRIPTO') : (
            <div className="p-12 text-center">
              <RefreshCw className="mx-auto mb-4 text-slate-300 animate-spin" />
              <p className="text-slate-400 text-xs font-bold uppercase italic">
                {loading ? 'Cargando cryptos...' : 'No se pudieron cargar los datos'}
              </p>
            </div>
          )
        ) : (
          renderTable(allForex, 'FOREX')
        )}
      </div>
    </div>
  );
}
