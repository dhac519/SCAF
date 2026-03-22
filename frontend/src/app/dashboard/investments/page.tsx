'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Plus, TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-center">
          <p className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">Capital Inicial Invertido</p>
          <h3 className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">S/ {totalInitial.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
        </div>
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-800 border dark:border-slate-700 rounded-3xl p-6 shadow-xl text-white flex flex-col justify-center relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-20"><Activity className="w-48 h-48" /></div>
          <p className="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider relative z-10">Valoración Actual</p>
          <h3 className="text-4xl font-black text-white tabular-nums relative z-10">S/ {totalCurrent.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
        </div>
        <div className={`rounded-3xl p-6 shadow-sm border flex flex-col justify-center ${globalROI >= 0 ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800/50' : 'bg-rose-50 border-rose-200 dark:bg-rose-900/20 dark:border-rose-800/50'}`}>
          <p className={`text-sm font-semibold mb-2 uppercase tracking-wider ${globalROI >= 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>Rendimiento Global (ROI)</p>
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-full ${globalROI >= 0 ? 'bg-emerald-200 dark:bg-emerald-800/50' : 'bg-rose-200 dark:bg-rose-800/50'}`}>
              {globalROI >= 0 ? <TrendingUp className="h-6 w-6 text-emerald-700 dark:text-emerald-300" /> : <TrendingDown className="h-6 w-6 text-rose-700 dark:text-rose-300" />}
            </div>
            <h3 className={`text-4xl font-black tabular-nums ${globalROI >= 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
              {globalROI > 0 ? '+' : ''}{globalROI.toFixed(2)}%
            </h3>
          </div>
        </div>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl animate-in fade-in slide-in-from-top-4">
          <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Añadir Activo al Portafolio</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Nombre del Activo</label>
              <input type="text" required value={assetName} onChange={(e) => setAssetName(e.target.value)} className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 outline-none transition-all" placeholder="Ej: Bitcoin" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tipo</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-900 outline-none transition-all">
                <option value="CRIPTO">Criptomoneda</option>
                <option value="ACCION">Acciones/Bolsa</option>
                <option value="NEGOCIO">Negocio/Emprendimiento</option>
                <option value="OTRO">Otro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Capital Inicial</label>
              <input type="number" step="0.01" required value={initialAmount} onChange={(e) => setInitialAmount(e.target.value)} className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-900 outline-none transition-all" placeholder="0.00" />
            </div>
            <div className="col-span-full flex justify-end gap-3 mt-4">
              <button type="button" onClick={() => setShowAddForm(false)} className="px-6 py-3 font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">Cancelar</button>
              <button type="submit" className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-200 shadow-md transition-all">Guardar Activo</button>
            </div>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array(3).fill(0).map((_, i) => <div key={i} className="h-56 bg-white dark:bg-slate-900 rounded-3xl animate-pulse shadow-sm border border-slate-100 dark:border-slate-800"></div>)
        ) : investments.length > 0 ? (
          investments.map(inv => {
            const init = Number(inv.initialAmount);
            const curr = Number(inv.currentValue);
            const diff = curr - init;
            const roi = init > 0 ? (diff / init) * 100 : 0;
            const isUp = roi >= 0;

            return (
              <div key={inv.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] dark:opacity-5 group-hover:scale-125 transition-transform duration-500 pointer-events-none">
                  <Activity className="w-32 h-32" />
                </div>
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{inv.assetName}</h3>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full mt-2 inline-block uppercase tracking-wider">
                      {inv.type}
                    </span>
                  </div>
                  <div className={`flex flex-col items-end`}>
                    <div className={`flex items-center gap-1 font-bold text-base px-3 py-1 rounded-full ${isUp ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400'}`}>
                      {isUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {isUp ? '+' : ''}{roi.toFixed(1)}%
                    </div>
                  </div>
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-end border-b border-slate-100 dark:border-slate-800/60 pb-4">
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Inversión Inicial</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">S/ {init.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  
                  {updatingId === inv.id ? (
                    <div className="flex items-center gap-2 pt-2 animate-in slide-in-from-bottom-2">
                      <input
                        type="number"
                        step="0.01"
                        autoFocus
                        defaultValue={curr}
                        onChange={(e) => setUpdateValue(e.target.value)}
                        className="w-full px-3 py-2.5 text-sm border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-900 dark:focus:ring-white outline-none font-bold"
                        placeholder="Nuevo Valor"
                      />
                      <button onClick={() => handleUpdateValue(inv.id)} className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors">✓</button>
                      <button onClick={() => setUpdatingId(null)} className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">X</button>
                    </div>
                  ) : (
                    <div 
                      className="flex justify-between items-end pt-2 cursor-pointer group/value select-none" 
                      onClick={() => { setUpdatingId(inv.id); setUpdateValue(String(curr)); }}
                    >
                      <span className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5"><DollarSign className="w-4 h-4"/> Valorización</span>
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-blue-600 dark:text-blue-400 font-bold opacity-0 group-hover/value:opacity-100 transition-opacity mb-1 -translate-y-2 group-hover/value:translate-y-0 duration-300">✎ Actualizar</span>
                        <span className="font-extrabold text-2xl text-slate-900 dark:text-white tabular-nums tracking-tight">S/ {curr.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-16 text-center border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl">
            <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Sin Inversiones Activas</h3>
            <p className="text-slate-500 max-w-sm mx-auto">Comienza a registrar tus criptomonedas, acciones u otros activos para monitorear tu patrimonio a futuro.</p>
          </div>
        )}
      </div>
    </div>
  );
}
