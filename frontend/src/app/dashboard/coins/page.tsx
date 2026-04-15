'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Coins, FolderPlus, Plus } from 'lucide-react';

import { CoinIndicators } from './components/CoinIndicators';
import { CoinsForms } from './components/CoinsForms';
import { CoinsGallery } from './components/CoinsGallery';
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

      <CoinsForms 
        showCategoryForm={showCategoryForm} handleCreateCategory={handleCreateCategory} 
        newCatName={newCatName} setNewCatName={setNewCatName} setShowCategoryForm={setShowCategoryForm}
        showAddForm={showAddForm} handleCreateCoin={handleCreateCoin} name={name} 
        setName={setName} year={year} setYear={setYear} quality={quality} setQuality={setQuality}
        categories={categories} categoryId={categoryId} setCategoryId={setCategoryId} 
        estimatedValue={estimatedValue} setEstimatedValue={setEstimatedValue} setShowAddForm={setShowAddForm}
      />

      <CoinIndicators coins={coins} totalEstimatedValue={totalEstimatedValue} />

      <CoinsGallery 
        filterQuery={filterQuery} setFilterQuery={setFilterQuery} 
        loading={loading} coins={coins} filteredCoins={filteredCoins} 
      />
    </div>
  );
}
