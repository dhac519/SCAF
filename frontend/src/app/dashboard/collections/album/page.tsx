'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { collectionsData } from './data';
import { AlbumHubView, AlbumCustomView, AlbumChecklistView } from './components/AlbumViews';
import { AlbumActionModals } from './components/AlbumActionModals';

export default function AlbumHubPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  
  // Hub State
  const [activeSeries, setActiveSeries] = useState<string | null>(null);

  // Modals inside album
  const [selectedCoin, setSelectedCoin] = useState<any>(null);
  const [quantity, setQuantity] = useState('1');
  const [year, setYear] = useState('');
  const [quality, setQuality] = useState('UNC');

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

  const getSeriesData = () => collectionsData.find(s => s.id === activeSeries);

  const getOwnedCoinCount = (seriesId: string) => {
    const series = collectionsData.find(s => s.id === seriesId);
    if (!series) return { obtained: 0, total: 0 };
    const predefinedCount = series.items.filter(coin => items.some(i => i.name === coin.name && i.subcategory?.name === series.title)).length;
    const extraCount = items.filter(i => i.subcategory?.name === series.title && !series.items.some(pre => pre.name === i.name)).length;
    return { obtained: predefinedCount + extraCount, total: series.items.length + extraCount };
  };

  const handleMarkAsObtained = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCoin || !activeSeries) return;

    const seriesData = getSeriesData();
    if (!seriesData) return;

    try {
      // 1. Ensure "Monedas de Colección" Category exists
      let catId = categories.find(c => c.name === 'Monedas de Colección')?.id;
      if (!catId) {
        const cRes = await api.post('/collections/categories', { name: 'Monedas de Colección' });
        catId = cRes.data.id;
        setCategories([...categories, cRes.data]);
      }
      
      // 2. Ensure the Specific Subcategory exists (e.g. Fauna Silvestre)
      let pCategories = categories.length > 0 ? categories : [{ id: catId, subcategories: [] }];
      const parentCat = pCategories.find(c => c.id === catId);
      
      let subId = parentCat?.subcategories?.find((s: any) => s.name === seriesData.title)?.id;
      if (!subId) {
         const subRes = await api.post('/collections/subcategories', { name: seriesData.title, categoryId: catId });
         subId = subRes.data.id;
      }

      // 3. Post Item
      await api.post('/collections/items', {
        name: selectedCoin.name,
        categoryId: catId,
        subcategoryId: subId,
        year: year ? parseInt(year) : undefined,
        quality,
        quantity: parseInt(quantity) || 1
      });

      setSelectedCoin(null);
      setQuantity('1');
      setYear('');
      setQuality('UNC');
      fetchData();
    } catch (err: any) {
      alert('Error guardando moneda en álbum: ' + err.message);
    }
  };

  const getOwnedCoin = (name: string, seriesTitle: string) => {
    return items.find(i => i.name === name && i.subcategory?.name === seriesTitle);
  };

  // --- Identify Custom Subcategories ---
  const predefinedTitles = collectionsData.map(c => c.title);
  const customSubcategories = categories.flatMap(c => c.subcategories || []).filter(s => !predefinedTitles.includes(s.name));
  const itemsWithoutSub = items.filter(i => !i.subcategoryId);

  // --- Computed Custom Album Layout Variables ---
  let isCustom = false;
  let customTitle = '';
  let customItems: any[] = [];
  
  if (activeSeries?.startsWith('custom-')) {
    isCustom = true;
    const subId = activeSeries.replace('custom-', '');
    const sub = customSubcategories.find(s => s.id === subId);
    customTitle = sub ? sub.name : 'Álbum Personalizado';
    customItems = items.filter(i => i.subcategoryId === subId);
  } else if (activeSeries === 'misc') {
    isCustom = true;
    customTitle = 'Objetos Sin Subcategoría';
    customItems = itemsWithoutSub;
    customItems = itemsWithoutSub;
  }

  // --- CheckList Computed Vars ---
  const currentSeries = getSeriesData();
  const { obtained: obtainedCount, total: totalSlots } = activeSeries && currentSeries ? getOwnedCoinCount(activeSeries) : { obtained: 0, total: 0 };
  const extraOwnedCoins = currentSeries ? items.filter(i => i.subcategory?.name === currentSeries.title && !currentSeries.items.some((pre: any) => pre.name === i.name)) : [];

  // --- Dynamic Return ---
  return (
    <>
      {!activeSeries && (
        <AlbumHubView 
          setActiveSeries={setActiveSeries} items={items} 
          customSubcategories={customSubcategories} 
          itemsWithoutSub={itemsWithoutSub} getOwnedCoinCount={getOwnedCoinCount} 
        />
      )}
      {isCustom && activeSeries && (
        <AlbumCustomView 
          setActiveSeries={setActiveSeries} 
          customTitle={customTitle} customItems={customItems} 
        />
      )}
      {!isCustom && activeSeries && currentSeries && (
        <AlbumChecklistView 
          setActiveSeries={setActiveSeries} currentSeries={currentSeries} 
          obtainedCount={obtainedCount} totalSlots={totalSlots} 
          getOwnedCoin={getOwnedCoin} setSelectedCoin={setSelectedCoin} 
          extraOwnedCoins={extraOwnedCoins}
        />
      )}

      <AlbumActionModals 
        selectedCoin={selectedCoin} setSelectedCoin={setSelectedCoin} 
        handleMarkAsObtained={handleMarkAsObtained} quantity={quantity} 
        setQuantity={setQuantity} year={year} setYear={setYear} 
        quality={quality} setQuality={setQuality} 
      />
    </>
  );
}
