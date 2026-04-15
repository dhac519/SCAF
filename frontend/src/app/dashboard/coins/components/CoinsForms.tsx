export function CoinsForms({ 
  showCategoryForm, handleCreateCategory, newCatName, setNewCatName, setShowCategoryForm,
  showAddForm, handleCreateCoin, name, setName, year, setYear, quality, setQuality,
  categories, categoryId, setCategoryId, estimatedValue, setEstimatedValue, setShowAddForm
}: any) {
  return (
    <>
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
                  {categories.map((cat: any) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
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
    </>
  );
}
