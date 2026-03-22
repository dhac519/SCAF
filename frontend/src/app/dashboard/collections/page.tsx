'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Plus, Folder, LayoutGrid, Tag, Search, FolderPlus, Layers, FileImage, Calendar, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

interface Item {
  id: string;
  name: string;
  year?: number;
  quality?: string;
  estimatedValue?: string;
  categoryId: string;
  category: { id: string, name: string };
  subcategory?: { id: string, name: string };
}

export default function CollectionsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  // Focus States
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Forms Visibility
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showSubcategoryForm, setShowSubcategoryForm] = useState(false);
  const [showItemForm, setShowItemForm] = useState(false);

  // Form States
  const [catName, setCatName] = useState('');
  const [subName, setSubName] = useState('');
  const [subCatId, setSubCatId] = useState('');

  const [itemName, setItemName] = useState('');
  const [itemCatId, setItemCatId] = useState('');
  const [itemSubId, setItemSubId] = useState('');
  const [itemYear, setItemYear] = useState('');
  const [itemQuality, setItemQuality] = useState('');
  const [itemValue, setItemValue] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [catRes, itemRes] = await Promise.all([
        api.get('/collections/categories'),
        api.get('/collections/items')
      ]);
      setCategories(catRes.data);
      setItems(itemRes.data);
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
      await api.post('/collections/categories', { name: catName });
      setCatName('');
      setShowCategoryForm(false);
      fetchData();
    } catch (err: any) { alert(err.response?.data?.message || 'Error'); }
  };

  const handleCreateSubcategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/collections/subcategories', { name: subName, categoryId: subCatId });
      setSubName('');
      setSubCatId('');
      setShowSubcategoryForm(false);
      fetchData();
    } catch (err: any) { alert(err.response?.data?.message || 'Error'); }
  };

  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/collections/items', {
        name: itemName,
        categoryId: itemCatId,
        subcategoryId: itemSubId || undefined,
        year: itemYear ? parseInt(itemYear) : undefined,
        quality: itemQuality || undefined,
        estimatedValue: itemValue ? Number(itemValue) : undefined,
      });
      setItemName('');
      setItemYear('');
      setItemQuality('');
      setItemValue('');
      setShowItemForm(false);
      fetchData();
    } catch (err: any) { alert(err.response?.data?.message || 'Error'); }
  };

  const filteredItems = items.filter(i => {
    if (selectedCategory && i.categoryId !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <div className="p-2.5 bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-2xl">
              <Folder className="h-8 w-8" />
            </div>
            Tus Colecciones
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Gestiona dinámicamente cualquier tipo de objeto valioso o histórico.</p>
        </div>
        <div className="flex flex-wrap justify-end gap-3">
          <Link href="/dashboard/collections/album" className="flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-4 py-3 rounded-2xl font-bold hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-all shadow-sm hover:-translate-y-0.5">
            <ShieldCheck className="h-5 w-5" /> Modo Álbum
          </Link>
          <button onClick={() => { setShowCategoryForm(!showCategoryForm); setShowSubcategoryForm(false); setShowItemForm(false); }} className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 px-4 py-3 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm hover:-translate-y-0.5">
            <FolderPlus className="h-5 w-5 text-indigo-500" /> Gran Categoría
          </button>
          <button onClick={() => { setShowSubcategoryForm(!showSubcategoryForm); setShowCategoryForm(false); setShowItemForm(false); }} className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-4 py-3 rounded-2xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shadow-sm hover:-translate-y-0.5">
            <Layers className="h-5 w-5 text-purple-500" /> Subcategoría
          </button>
          <button onClick={() => { setShowItemForm(!showItemForm); setShowCategoryForm(false); setShowSubcategoryForm(false); }} className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-3 rounded-2xl font-bold hover:from-indigo-600 hover:to-purple-700 transition-all shadow-xl shadow-indigo-500/20 hover:-translate-y-1">
            <Plus className="h-5 w-5" /> Añadir Objeto
          </button>
        </div>
      </div>

      {/* Forms Area */}
      {showCategoryForm && (
        <form onSubmit={handleCreateCategory} className="bg-white border p-6 rounded-3xl dark:bg-slate-900 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-end slide-in-from-top-4 animate-in fade-in shadow-xl shadow-indigo-900/5">
          <div className="flex-1 w-full">
             <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Nombre de Gran Categoría (Ej: Monedas, Estampillas)</label>
             <input required type="text" value={catName} onChange={e => setCatName(e.target.value)} className="w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <button type="submit" className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl md:flex-none w-full md:w-auto shadow-md hover:bg-indigo-700">Crear</button>
        </form>
      )}

      {showSubcategoryForm && (
        <form onSubmit={handleCreateSubcategory} className="bg-white border p-6 rounded-3xl dark:bg-slate-900 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 xl:gap-6 items-end slide-in-from-top-4 animate-in fade-in shadow-xl shadow-purple-900/5">
          <div className="md:col-span-1">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Pertenece a:</label>
            <select required value={subCatId} onChange={e => setSubCatId(e.target.value)} className="w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-purple-500">
              <option value="" disabled>Seleccionar Categoría Mayor</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="md:col-span-1">
             <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Nombre Subcategoría (Ej: Culturas)</label>
             <input required type="text" value={subName} onChange={e => setSubName(e.target.value)} className="w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div className="col-span-1">
             <button type="submit" disabled={categories.length === 0} className="w-full px-6 py-3 bg-purple-600 text-white font-bold rounded-xl shadow-md disabled:opacity-50 hover:bg-purple-700">Crear Subdivisión</button>
          </div>
        </form>
      )}

      {showItemForm && (
        <form onSubmit={handleCreateItem} className="bg-white border p-6 rounded-3xl dark:bg-slate-900 dark:border-indigo-900/50 shadow-2xl shadow-indigo-900/10 grid grid-cols-1 md:grid-cols-3 gap-6 slide-in-from-top-4 animate-in fade-in relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-500 blur-3xl opacity-10 rounded-full"></div>
           <div className="col-span-full mb-2 border-b border-slate-100 dark:border-slate-800/50 pb-4 relative z-10"><h3 className="text-2xl font-extrabold text-indigo-950 dark:text-white">Añadir Nuevo Objeto</h3></div>
           <div className="relative z-10">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Categoría Mayor *</label>
            <select required value={itemCatId} onChange={e => { setItemCatId(e.target.value); setItemSubId(''); }} className="w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="" disabled>Seleccione...</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="relative z-10">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Subcategoría (Opcional)</label>
            <select disabled={!itemCatId} value={itemSubId} onChange={e => setItemSubId(e.target.value)} className="w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-800 dark:border-slate-700 outline-none disabled:opacity-50 focus:ring-2 focus:ring-indigo-500">
              <option value="">Ninguna particular</option>
              {categories.find(c => c.id === itemCatId)?.subcategories.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div className="md:col-span-1 relative z-10">
             <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Nombre de Pieza u Objeto *</label>
             <input required type="text" value={itemName} onChange={e => setItemName(e.target.value)} className="w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="relative z-10">
             <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Año (Opcional)</label>
             <input type="number" value={itemYear} onChange={e => setItemYear(e.target.value)} className="w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="relative z-10">
             <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Estado / Calidad (Opcional)</label>
             <input type="text" value={itemQuality} onChange={e => setItemQuality(e.target.value)} placeholder="Ej: Nuevo, UNC, VF" className="w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="relative z-10">
             <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Valor Estimado (Opcional)</label>
             <input type="number" step="0.01" value={itemValue} onChange={e => setItemValue(e.target.value)} className="w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="0.00" />
          </div>
          <div className="col-span-full flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/50 relative z-10">
            <button type="button" onClick={() => setShowItemForm(false)} className="px-6 py-3 font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">Cancelar</button>
            <button type="submit" disabled={categories.length === 0} className="px-10 py-3 bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-600 shadow-xl shadow-indigo-500/30 transition-all disabled:opacity-50 hover:-translate-y-0.5">Guardar en Inventario</button>
          </div>
        </form>
      )}

      {/* Explorer */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide pt-4">
        <button onClick={() => setSelectedCategory(null)} className={`px-6 py-2.5 rounded-full font-bold whitespace-nowrap transition-all border shadow-sm hover:-translate-y-0.5 ${!selectedCategory ? 'bg-indigo-600 text-white border-indigo-600 shadow-indigo-600/30' : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200'}`}>
          Todos los Objetos
        </button>
        {categories.map(cat => (
          <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-6 py-2.5 rounded-full font-bold whitespace-nowrap transition-all border shadow-sm hover:-translate-y-0.5 ${selectedCategory === cat.id ? 'bg-indigo-600 text-white border-indigo-600 shadow-indigo-600/30' : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200'}`}>
            {cat.name}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl border border-transparent dark:border-slate-800/50">
        {loading && items.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-2"><div className="h-56 rounded-3xl bg-white dark:bg-slate-800 animate-pulse border shadow-sm"></div></div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <div key={item.id} className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-2xl hover:border-indigo-400 dark:hover:border-indigo-700/50 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 opacity-0 group-hover:opacity-10 blur-3xl transition-opacity pointer-events-none"></div>
                <div>
                  <div className="flex justify-between items-start mb-5 relative z-10">
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl group-hover:bg-indigo-100 group-hover:scale-110 transition-all">
                      <FileImage className="h-6 w-6" />
                    </div>
                    {item.quality && (
                      <span className="text-xs font-black text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg uppercase tracking-wider border border-slate-200 dark:border-slate-700">
                        {item.quality}
                      </span>
                    )}
                  </div>
                  <h3 className="font-extrabold text-lg text-slate-900 dark:text-white leading-snug mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{item.name}</h3>
                  <div className="space-y-2.5 text-sm font-semibold text-slate-500 dark:text-slate-400 mb-6 relative z-10">
                     <p className="flex items-center gap-2 truncate" title={item.category.name}><Folder className="h-5 w-5 text-slate-400" /> <span className="truncate">{item.category.name}</span></p>
                     {item.subcategory && <p className="flex items-center gap-2 truncate" title={item.subcategory.name}><Layers className="h-5 w-5 text-slate-400" /> <span className="truncate">{item.subcategory.name}</span></p>}
                     {item.year && <p className="flex items-center gap-2"><Calendar className="h-5 w-5 text-slate-400" /> {item.year}</p>}
                  </div>
                </div>
                <div className="pt-5 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center relative z-10">
                   <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Estimado</span>
                   <span className={`font-black text-xl tabular-nums ${item.estimatedValue ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-600'}`}>
                     {item.estimatedValue ? `S/ ${Number(item.estimatedValue).toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '--'}
                   </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <LayoutGrid className="h-14 w-14 text-slate-300 dark:text-slate-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Inventario Vacío</h3>
            <p className="text-slate-500 max-w-sm mx-auto">Comienza registrando una <b>Gran Categoría</b> (Por ej: Billetes Antiguos) y una subcategoría para archivar de forma organizada tu primer objeto.</p>
          </div>
        )}
      </div>
    </div>
  );
}
