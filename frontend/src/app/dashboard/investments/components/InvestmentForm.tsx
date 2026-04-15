export function InvestmentForm({
  handleSubmit, showAddForm, setShowAddForm, assetName, setAssetName,
  type, setType, initialAmount, setInitialAmount
}: any) {
  if (!showAddForm) return null;

  return (
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
  );
}
