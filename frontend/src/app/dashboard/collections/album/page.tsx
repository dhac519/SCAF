'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { CheckCircle2, ShieldCheck, ArrowLeft, Plus, Library, LayoutGrid, Award, Folder, FileImage } from 'lucide-react';
import Link from 'next/link';

const collectionsData = [
  {
    id: 'riqueza-orgullo',
    title: 'Riqueza y Orgullo del Perú',
    years: '2010 - 2016',
    items: [
      { id: 1, name: 'Tumi de Oro (Lambayeque)' },
      { id: 2, name: 'Sarcófagos de Karajía (Amazonas)' },
      { id: 3, name: 'Estela de Raimondi (Áncash)' },
      { id: 4, name: 'Chullpas de Sillustani (Puno)' },
      { id: 5, name: 'Monasterio de Santa Catalina (Arequipa)' },
      { id: 6, name: 'Machu Picchu (Cusco)' },
      { id: 7, name: 'Gran Pajatén (San Martín)' },
      { id: 8, name: 'Piedra de Saywite (Apurímac)' },
      { id: 9, name: 'Fortaleza del Real Felipe (Callao)' },
      { id: 10, name: 'Templo del Sol - Vilcashuamán (Ayacucho)' },
      { id: 11, name: 'Kuntur Wasi (Cajamarca)' },
      { id: 12, name: 'Templo Inca de Huaytará (Huancavelica)' },
      { id: 13, name: 'Templo de Kotosh (Huánuco)' },
      { id: 14, name: 'Arte Textil Paracas (Ica)' },
      { id: 15, name: 'Tunanmarca (Junín)' },
      { id: 16, name: 'Ciudad Sagrada de Caral (Lima)' },
      { id: 17, name: 'Huaca de la Luna (La Libertad)' },
      { id: 18, name: 'Antiguo Hotel Palace (Loreto)' },
      { id: 19, name: 'Catedral de Lima (Lima)' },
      { id: 20, name: 'Petroglifos de Pusharo (Madre de Dios)' },
      { id: 21, name: 'Arquitectura Moqueguana (Moquegua)' },
      { id: 22, name: 'Huarautambo (Pasco)' },
      { id: 23, name: 'Cerámica Vicús (Piura)' },
      { id: 24, name: 'Cabeza de Vaca (Tumbes)' },
      { id: 25, name: 'Cerámica Shipibo-Konibo (Ucayali)' },
      { id: 26, name: 'Arco Parabólico de Tacna (Tacna)' },
    ]
  },
  {
    id: 'recursos-naturales',
    title: 'Recursos Naturales del Perú',
    years: '2013',
    items: [
      { id: 1, name: 'La Anchoveta' },
      { id: 2, name: 'El Cacao' },
      { id: 3, name: 'La Quinua' },
    ]
  },
  {
    id: 'fauna-silvestre',
    title: 'Fauna Silvestre Amenazada del Perú',
    years: '2017 - 2019',
    items: [
      { id: 1, name: 'Oso Andino de Anteojos' },
      { id: 2, name: 'Cocodrilo de Tumbes' },
      { id: 3, name: 'Cóndor Andino' },
      { id: 4, name: 'Tapir Andino' },
      { id: 5, name: 'Pava Aliblanca' },
      { id: 6, name: 'Jaguar' },
      { id: 7, name: 'Suri' },
      { id: 8, name: 'Mono Choro de Cola Amarilla' },
      { id: 9, name: 'Gato Andino' },
      { id: 10, name: 'Rana Gigante del Titicaca' },
    ]
  },
  {
    id: 'mujer-independencia',
    title: 'La Mujer en el Proceso de la Independencia',
    years: '2020',
    items: [
      { id: 1, name: 'Heroínas Toledo' },
      { id: 2, name: 'Brígida Silva de Ochoa' },
      { id: 3, name: 'María Parado de Bellido' },
    ]
  },
  {
    id: 'constructores',
    title: 'Constructores de la República Bicentenario',
    years: '2020 - 2023',
    items: [
      { id: 1, name: 'Juan Pablo Viscardo y Guzmán' },
      { id: 2, name: 'Hipólito Unanue' },
      { id: 3, name: 'Toribio Rodríguez de Mendoza' },
      { id: 4, name: 'Manuel Lorenzo de Vidaurre' },
      { id: 5, name: 'José Baquíjano y Carrillo' },
      { id: 6, name: 'José Faustino Sánchez Carrión' },
      { id: 7, name: 'Francisco Xavier de Luna Pizarro' },
      { id: 8, name: 'José de la Mar' },
      { id: 9, name: 'José Manuel Valdés' },
    ]
  },
  {
    id: 'ceramica-precolombina',
    title: 'Cerámica Precolombina Peruana',
    years: '2024 - 2025',
    items: [
      { id: 1, name: 'Cultura Huari' },
      { id: 2, name: 'Cultura Nasca' },
    ]
  }
];

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
  }

  // --- VIEW 1: HUB ---
  if (!activeSeries) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500 pb-16">
        <div>
          <Link href="/dashboard/collections" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white mb-4 transition-colors">
             <ArrowLeft className="h-4 w-4 mr-1" /> Volver a Inventario
          </Link>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-2xl">
              <Library className="h-8 w-8" />
            </div>
            Librería de Álbumes
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">
            Selecciona la serie numismática que deseas organizar. Usa el modo 'Pasar Lista' interactivo que ya conoces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {collectionsData.map(series => {
            const { obtained: owned, total } = getOwnedCoinCount(series.id);
            const percentage = Math.min((owned / total) * 100, 100);
            const isComplete = owned >= total && total > 0;

            return (
              <div 
                key={series.id} 
                onClick={() => setActiveSeries(series.id)}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden flex flex-col justify-between h-56"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-3xl transition-all ${isComplete ? 'bg-amber-400' : 'bg-emerald-500 group-hover:opacity-20'}`}></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-black text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg tracking-widest border border-slate-200 dark:border-slate-700 uppercase">
                      {series.years}
                    </span>
                    {isComplete && <Award className="h-6 w-6 text-amber-500" />}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {series.title}
                  </h3>
                </div>

                <div className="relative z-10 mt-auto">
                   <div className="flex justify-between text-sm font-bold mb-2">
                     <span className={isComplete ? 'text-amber-600 dark:text-amber-500' : 'text-emerald-600 dark:text-emerald-400'}>Progreso</span>
                     <span className="text-slate-900 dark:text-white tabular-nums">{owned} / {total}</span>
                   </div>
                   <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden shadow-inner border border-slate-200 dark:border-slate-700">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${isComplete ? 'bg-gradient-to-r from-amber-400 to-amber-500' : 'bg-gradient-to-r from-emerald-400 to-emerald-600'}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                   </div>
                </div>
              </div>
            )
          })}
          
          {customSubcategories.map(sub => {
             const subItems = items.filter(i => i.subcategoryId === sub.id);
             return (
               <div 
                 key={`custom-${sub.id}`} 
                 onClick={() => setActiveSeries(`custom-${sub.id}`)}
                 className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden flex flex-col justify-between h-56"
               >
                 <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-3xl transition-all bg-indigo-500 group-hover:opacity-20"></div>
                 
                 <div className="relative z-10">
                   <div className="flex justify-between items-start mb-4">
                     <span className="text-xs font-black text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg tracking-widest border border-slate-200 dark:border-slate-700 uppercase">
                       Personalizado
                     </span>
                   </div>
                   <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                     {sub.name}
                   </h3>
                 </div>

                 <div className="relative z-10 mt-auto">
                    <div className="flex justify-between text-sm font-bold mb-2">
                      <span className="text-indigo-600 dark:text-indigo-400">Piezas Registradas</span>
                      <span className="text-slate-900 dark:text-white tabular-nums">{subItems.length}</span>
                    </div>
                 </div>
               </div>
             );
          })}

          {itemsWithoutSub.length > 0 && (
               <div 
                 onClick={() => setActiveSeries('misc')}
                 className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden flex flex-col justify-between h-56"
               >
                 <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-3xl transition-all bg-slate-500 group-hover:opacity-20"></div>
                 
                 <div className="relative z-10">
                   <div className="flex justify-between items-start mb-4">
                     <span className="text-xs font-black text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg tracking-widest border border-slate-200 dark:border-slate-700 uppercase">
                       General
                     </span>
                   </div>
                   <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">
                     Sin Subcategoría
                   </h3>
                 </div>

                 <div className="relative z-10 mt-auto">
                    <div className="flex justify-between text-sm font-bold mb-2">
                      <span className="text-slate-600 dark:text-slate-400">Piezas Registradas</span>
                      <span className="text-slate-900 dark:text-white tabular-nums">{itemsWithoutSub.length}</span>
                    </div>
                 </div>
               </div>
          )}
        </div>

      </div>
    );
  }

  // --- VIEW 2: CUSTOM ALBUM VIEW ---
  if (isCustom) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500 pb-16">
        <div>
          <button onClick={() => setActiveSeries(null)} className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white mb-4 transition-colors">
             <ArrowLeft className="h-4 w-4 mr-1" /> Volver a Librería de Álbumes
          </button>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <div className="p-2.5 bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-2xl">
              <Folder className="h-8 w-8" />
            </div>
            {customTitle}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">
            Colección personalizada generada dinámicamente a partir de tu inventario.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm">
          
          <div className="mb-8">
             <div className="flex justify-between font-bold text-sm mb-2">
               <span className="text-slate-700 dark:text-slate-300">Total de piezas obtenidas</span>
               <span className="text-indigo-600 dark:text-indigo-400 tabular-nums">
                 {customItems.length}
               </span>
             </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 xl:gap-8">
             {customItems.map((coin, index) => {
               return (
                 <div 
                   key={coin.id}
                   className="relative w-full aspect-square rounded-[2rem] md:rounded-[3rem] flex flex-col items-center justify-center p-3 text-center transition-all duration-300 border-4 border-double bg-indigo-50 dark:bg-indigo-900/20 border-indigo-400 dark:border-indigo-600 shadow-xl shadow-indigo-500/10 scale-100"
                 >
                   <span className="font-black text-2xl absolute top-[15%] opacity-20 text-indigo-600 dark:text-indigo-400">
                     {(index + 1).toString().padStart(2, '0')}
                   </span>
                   
                   <div className="z-10 mt-4">
                     <h4 className="text-[10px] md:text-xs font-extrabold px-1 leading-tight text-indigo-900 dark:text-indigo-100">
                       {coin.name}
                     </h4>
                     {coin.quality && (
                       <p className="text-[9px] mt-1 font-semibold text-indigo-600 dark:text-indigo-400">
                         {coin.quality}
                       </p>
                     )}
                   </div>
                   
                   {coin.quantity > 1 && (
                      <div className="absolute bottom-0 translate-y-1/2 bg-indigo-500 text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-md border-2 border-white dark:border-slate-900">
                        x{coin.quantity}
                      </div>
                   )}
                 </div>
               )
             })}
             
             {customItems.length === 0 && (
                <div className="col-span-full py-12 text-center">
                  <p className="text-slate-500 font-bold mb-4">No hay piezas en este álbum.</p>
                  <Link href="/dashboard/collections" className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-6 py-3 rounded-xl font-bold hover:bg-indigo-200 dark:hover:bg-indigo-900/70 transition-colors">
                     Ir a Inventario
                  </Link>
                </div>
             )}
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW 3: ALBUM CHECKLIST (Predefined) ---
  const currentSeries = getSeriesData()!;
  const extraOwnedCoins = items.filter(
    i => i.subcategory?.name === currentSeries.title && 
         !currentSeries.items.some((pre: any) => pre.name === i.name)
  );

  const obtainedCount = currentSeries.items.filter(c => getOwnedCoin(c.name, currentSeries.title)).length + extraOwnedCoins.length;
  const totalSlots = currentSeries.items.length + extraOwnedCoins.length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-16">
      <div>
        <button onClick={() => setActiveSeries(null)} className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white mb-4 transition-colors">
           <ArrowLeft className="h-4 w-4 mr-1" /> Volver a Librería de Álbumes
        </button>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
          <div className="p-2.5 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-2xl">
            <ShieldCheck className="h-8 w-8" />
          </div>
          {currentSeries.title}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">
          Haz clic en las ranuras faltantes para declarar tu posesión numismática.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm">
        
        {/* Progress Bar */}
        <div className="mb-8">
           <div className="flex justify-between font-bold text-sm mb-2">
             <span className="text-slate-700 dark:text-slate-300">Colección completada</span>
             <span className="text-emerald-600 dark:text-emerald-400 tabular-nums">
               {obtainedCount} / {totalSlots}
             </span>
           </div>
           <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-4 overflow-hidden shadow-inner border border-slate-200 dark:border-slate-700">
              <div 
                className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${Math.min((obtainedCount / totalSlots) * 100, 100)}%` }}
              ></div>
           </div>
        </div>

        {/* Coin Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 xl:gap-8">
           {currentSeries.items.map((coin) => {
             const owned = getOwnedCoin(coin.name, currentSeries.title);
             return (
               <button 
                 key={coin.id}
                 onClick={() => !owned && setSelectedCoin(coin)}
                 disabled={!!owned}
                 className={`relative w-full aspect-square rounded-[2rem] md:rounded-[3rem] flex flex-col items-center justify-center p-3 text-center transition-all duration-300 border-4 border-double ${
                   owned 
                     ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-400 dark:border-emerald-600 shadow-xl shadow-emerald-500/20 scale-100 cursor-default' 
                     : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:scale-105 shadow-sm opacity-60 hover:opacity-100 border-dashed'
                 }`}
               >
                 <span className={`font-black text-2xl absolute top-[15%] opacity-20 ${owned ? 'text-emerald-600' : 'text-slate-500'}`}>0{coin.id}</span>
                 {owned && <CheckCircle2 className="absolute top-1 right-2 h-6 md:h-7 w-6 md:w-7 text-emerald-500 drop-shadow-md bg-white dark:bg-slate-900 rounded-full" />}
                 
                 <div className="z-10 mt-4">
                   <h4 className={`text-[10px] md:text-xs font-extrabold px-1 leading-tight ${owned ? 'text-emerald-900 dark:text-emerald-100' : 'text-slate-600 dark:text-slate-400'}`}>
                     {coin.name.includes('(') ? coin.name.split(' (')[0] : coin.name}
                   </h4>
                   {coin.name.includes('(') && (
                     <p className={`text-[9px] mt-1 font-semibold ${owned ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}>
                       {coin.name.split('(')[1]?.replace(')', '')}
                     </p>
                   )}
                 </div>
                 
                 {owned?.quantity > 1 && (
                    <div className="absolute bottom-0 translate-y-1/2 bg-emerald-500 text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-md border-2 border-white dark:border-slate-900">
                      x{owned.quantity}
                    </div>
                 )}
                 {!owned && (
                    <div className="absolute inset-0 bg-slate-900/10 dark:bg-black/20 rounded-[2rem] md:rounded-[3rem] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Plus className="h-8 w-8 text-slate-600 dark:text-slate-300" />
                    </div>
                 )}
               </button>
             )
           })}

           {/* Extra Coins mapped here */}
           {extraOwnedCoins.map((extraCoin, idx) => {
             return (
               <button 
                 key={`extra-${extraCoin.id}`}
                 disabled={true}
                 className="relative w-full aspect-square rounded-[2rem] md:rounded-[3rem] flex flex-col items-center justify-center p-3 text-center transition-all duration-300 border-4 border-double bg-emerald-50 dark:bg-emerald-900/20 border-emerald-400 dark:border-emerald-600 shadow-xl shadow-emerald-500/20 scale-100 cursor-default"
               >
                 <span className="font-black text-2xl absolute top-[15%] opacity-20 text-emerald-600">
                   0{currentSeries.items.length + idx + 1}
                 </span>
                 <CheckCircle2 className="absolute top-1 right-2 h-6 md:h-7 w-6 md:w-7 text-emerald-500 drop-shadow-md bg-white dark:bg-slate-900 rounded-full" />
                 
                 <div className="z-10 mt-4">
                   <h4 className="text-[10px] md:text-xs font-extrabold px-1 leading-tight text-emerald-900 dark:text-emerald-100">
                     {extraCoin.name.includes('(') ? extraCoin.name.split(' (')[0] : extraCoin.name}
                   </h4>
                   {extraCoin.name.includes('(') && (
                     <p className="text-[9px] mt-1 font-semibold text-emerald-600 dark:text-emerald-400">
                       {extraCoin.name.split('(')[1]?.replace(')', '')}
                     </p>
                   )}
                 </div>
                 
                 {extraCoin.quantity > 1 && (
                    <div className="absolute bottom-0 translate-y-1/2 bg-emerald-500 text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-md border-2 border-white dark:border-slate-900">
                      x{extraCoin.quantity}
                    </div>
                 )}
               </button>
             );
           })}
        </div>
      </div>

      {/* Obtain Modal */}
      {selectedCoin && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <form onSubmit={handleMarkAsObtained} className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-6 md:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
             <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Has obtenido la pieza</h3>
             <p className="text-emerald-600 font-bold mb-6 flex items-center gap-2">
               <ShieldCheck className="h-5 w-5" /> #{selectedCoin.id} - {selectedCoin.name}
             </p>

             <div className="space-y-4">
               <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Cantidad poseída</label>
                  <input type="number" min="1" required value={quantity} onChange={e => setQuantity(e.target.value)} className="w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-emerald-500 font-bold" />
               </div>
               <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Año de Acuñación (Opcional)</label>
                  <input type="number" value={year} onChange={e => setYear(e.target.value)} className="w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Ej: 2018" />
               </div>
               <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Calidad (Conservación)</label>
                  <select required value={quality} onChange={(e) => setQuality(e.target.value)} className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500">
                    <option value="UNC">UNC (Sin circular)</option>
                    <option value="XF">XF (Extremadamente Fina)</option>
                    <option value="VF">VF (Muy Fina)</option>
                    <option value="F">F (Fina)</option>
                  </select>
               </div>
             </div>

             <div className="flex gap-3 mt-8">
               <button type="button" onClick={() => setSelectedCoin(null)} className="flex-1 py-3 text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-200 transition-colors">Cancelar</button>
               <button type="submit" className="flex-1 py-3 bg-emerald-500 text-white font-black rounded-xl hover:bg-emerald-600 shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.02]">¡Tengo esta pieza!</button>
             </div>
          </form>
        </div>
      )}
    </div>
  );
}
