'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Plus, Coins, Calendar, Tag, DollarSign, Search, FolderPlus } from 'lucide-react';

interface Category {
  id: string;
  name: string;
}

interface Coin {
  id: string;
  name: string;
  year: number;
  quality: string;
  categoryId: string;
  category: Category;
  estimatedValue: string | null;
  createdAt: string;
}

export default function CoinsPage() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  // UI States
  const [showAddForm, setShowAddForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  // Coin Form
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [quality, setQuality] = useState('UNC');
  const [categoryId, setCategoryId] = useState('');
  const [estimatedValue, setEstimatedValue] = useState('');

  // Category Form
  const [newCatName, setNewCatName] = useState('');

  // Filters
  const [filterQuery, setFilterQuery] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [coinsRes, catRes] = await Promise.all([
        api.get('/coins'),
        api.get('/coin-categories')
      ]);
      setCoins(coinsRes.data);
      setCategories(catRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/coin-categories', { name: newCatName });
      setNewCatName('');
      setShowCategoryForm(false);
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al crear categoría');
    }
  };

  const handleCreateCoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) return alert('Selecciona una categoría válida');
    try {
      await api.post('/coins', {
        name,
        year: parseInt(year),
        quality,
        categoryId,
        estimatedValue: estimatedValue ? Number(estimatedValue) : undefined,
      });
      setShowAddForm(false);
      setName('');
      setYear('');
      setQuality('UNC');
      setCategoryId('');
      setEstimatedValue('');
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al guardar la moneda');
    }
  };

  const filteredCoins = coins.filter(c => 
    c.name.toLowerCase().includes(filterQuery.toLowerCase()) || 
    (c.category?.name || '').toLowerCase().includes(filterQuery.toLowerCase()) ||
    c.quality.toLowerCase().includes(filterQuery.toLowerCase()) ||
    c.year.toString().includes(filterQuery)
  );

  const totalEstimatedValue = coins.reduce((acc, c) => acc + (Number(c.estimatedValue) || 0), 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 rounded-2xl">
              <Coins className="h-8 w-8" />
            </div>
            Numismática
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Inventario personal de monedas y categorías de colección.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => { setShowCategoryForm(!showCategoryForm); setShowAddForm(false); }}
            className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-4 py-3 rounded-2xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
          >
            <FolderPlus className="h-5 w-5" />
            Nueva Categoría
          </button>
          <button
            onClick={() => { setShowAddForm(!showAddForm); setShowCategoryForm(false); }}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-3 rounded-2xl font-bold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg shadow-amber-500/20"
          >
            <Plus className="h-5 w-5" />
            Añadir Moneda
          </button>
        </div>
      </div>

      {/* Categoría Modal / Formulario Expansible */}
      {showCategoryForm && (
        <form onSubmit={handleCreateCategory} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm animate-in fade-in slide-in-from-top-4 flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Nombre del Grupo / Categoría</label>
            <input type="text" required value={newCatName} onChange={(e) => setNewCatName(e.target.value)} className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Ej: Conmemorativas, Billetes Antiguos..." />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
             <button type="button" onClick={() => setShowCategoryForm(false)} className="px-5 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-semibold transition-colors">Cancelar</button>
             <button type="submit" className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl flex-1 md:flex-none shadow-md transition-transform hover:scale-[1.02]">Crear Grupo</button>
          </div>
        </form>
      )}

      {/* Moneda Formulario Expansible */}
      {showAddForm && (
        <form onSubmit={handleCreateCoin} className="bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/50 p-6 sm:p-8 rounded-3xl shadow-xl shadow-amber-900/5 animate-in fade-in slide-in-from-top-4">
          <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Registrar Moneda</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Nombre / Denominación</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" placeholder="Ej: 1 Sol de Plata 9 décimos" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Año de Acuñación</label>
              <input type="number" required value={year} onChange={(e) => setYear(e.target.value)} className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" placeholder="Ej: 1915" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Calidad (Conservación)</label>
              <select required value={quality} onChange={(e) => setQuality(e.target.value)} className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all">
                <option value="UNC">UNC (Sin circular)</option>
                <option value="AU">AU (Casi sin circular)</option>
                <option value="XF">XF (Extremadamente Fina)</option>
                <option value="VF">VF (Muy Fina)</option>
                <option value="F">F (Fina)</option>
                <option value="VG">VG (Muy Buena)</option>
                <option value="G">G (Buena)</option>
                <option value="PR">PR (Proof/Espejo)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Categoría Relacionada</label>
              {categories.length === 0 ? (
                <div className="px-4 py-3 border border-rose-300 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-xl text-sm font-medium">Primero debes crear una categoría.</div>
              ) : (
                <select required value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all">
                  <option value="" disabled>Seleccione una categoría...</option>
                  {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Valor Estimado (S/ Opcional)</label>
              <input type="number" step="0.01" value={estimatedValue} onChange={(e) => setEstimatedValue(e.target.value)} className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" placeholder="0.00" />
            </div>
            <div className="col-span-full flex justify-end gap-3 mt-4 border-t border-amber-100 dark:border-amber-900/30 pt-6">
              <button type="button" onClick={() => setShowAddForm(false)} className="px-6 py-3 font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">Cancelar</button>
              <button type="submit" disabled={categories.length === 0} className="px-10 py-3 bg-gradient-to-br from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:from-amber-600 disabled:opacity-50 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]">Guardar en Inventario</button>
            </div>
          </div>
        </form>
      )}

      {/* Grid Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-100 dark:border-amber-800/50 rounded-3xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-amber-700/80 dark:text-amber-400/80 mb-2 uppercase tracking-wider">Total de Piezas</p>
            <h3 className="text-4xl font-black text-amber-900 dark:text-amber-300 tabular-nums">{coins.length}</h3>
          </div>
          <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl shadow-sm"><Coins className="w-10 h-10 text-amber-500" /></div>
        </div>
        
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Tasación del Catálogo</p>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">
              S/ {totalEstimatedValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </h3>
          </div>
          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl shadow-sm"><DollarSign className="w-10 h-10 text-emerald-500" /></div>
        </div>
      </div>

      {/* Grid Iteration */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-5 md:p-8 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Galería Numismática</h2>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por moneda, año o grupo..." 
              value={filterQuery}
              onChange={e => setFilterQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all shadow-sm"
            />
          </div>
        </div>
        
        <div className="p-5 md:p-8 bg-slate-50/50 dark:bg-slate-900/50">
          {loading && coins.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {Array(4).fill(0).map((_, i) => <div key={i} className="h-56 rounded-3xl bg-white dark:bg-slate-800 animate-pulse border border-slate-200 dark:border-slate-700"></div>)}
            </div>
          ) : filteredCoins.length > 0 ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               {filteredCoins.map(coin => (
                  <div key={coin.id} className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-2xl hover:border-amber-400 dark:hover:border-amber-700/50 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-200 to-orange-400 rounded-full opacity-0 group-hover:opacity-10 blur-2xl transition-opacity pointer-events-none"></div>
                    
                    <div>
                      <div className="flex justify-between items-start mb-5 relative z-10">
                        <div className="p-3 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-2xl group-hover:bg-amber-100 group-hover:scale-110 transition-all">
                          <Coins className="h-6 w-6" />
                        </div>
                        <span className="text-xs font-black text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg tracking-widest border border-slate-200 dark:border-slate-700 uppercase group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          {coin.quality}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-lg text-slate-900 dark:text-white leading-snug mb-4 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {coin.name}
                      </h3>
                      
                      <div className="space-y-2.5 text-sm font-semibold text-slate-500 dark:text-slate-400 mb-6 relative z-10">
                        <p className="flex items-center gap-2"><Calendar className="h-5 w-5 text-slate-400" /> {coin.year}</p>
                        <p className="flex items-center gap-2 truncate" title={coin.category?.name}><Tag className="h-5 w-5 text-slate-400" /> <span className="truncate">{coin.category?.name || 'Sin Categoría'}</span></p>
                      </div>
                    </div>

                    <div className="pt-5 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center relative z-10">
                       <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Tasación</span>
                       <span className={`font-black text-xl tabular-nums ${coin.estimatedValue ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-600'}`}>
                         {coin.estimatedValue ? `S/ ${Number(coin.estimatedValue).toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '--'}
                       </span>
                    </div>
                  </div>
               ))}
             </div>
          ) : (
             <div className="py-20 text-center">
              <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Sin Resultados</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">Comienza agregando una categoría nueva para poder registrar tus piezas históricas al catálogo.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
