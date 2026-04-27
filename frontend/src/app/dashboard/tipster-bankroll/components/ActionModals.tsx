import { Settings, AlertTriangle } from 'lucide-react';

export function ActionModals({ 
  showModal, setShowModal, showConfigModal, setShowConfigModal, 
  handleCreateBet, handleUpdateBank, 
  newBet, setNewBet, bankConfig, setBankConfig, dashboardData,
  isEditing, setEditingId,
  deleteConfirmId, setDeleteConfirmId, handleDeleteBet,
  uniqueTipsters = []
}: any) {
  return (
    <>
      {showModal && (
        <div className="fixed inset-0 min-h-screen bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md shadow-2xl p-6 relative animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6">
              {isEditing ? 'Modificar Pronóstico' : 'Añadir Pronóstico'}
            </h2>
            <form onSubmit={handleCreateBet} className="space-y-4">
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Tipster</label>
                  <input required value={newBet.tipster} onChange={e => setNewBet({...newBet, tipster: e.target.value})} list="tipsters-list" className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-blue-500" placeholder="Ej. Personalizado, Sergi" />
                  <datalist id="tipsters-list">
                    {uniqueTipsters.map((t: string) => (
                      <option key={t} value={t} />
                    ))}
                  </datalist>
               </div>
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Evento / Pronóstico</label>
                  <input required value={newBet.event} onChange={e => setNewBet({...newBet, event: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-blue-500" placeholder="Ej. Alcaraz a ganar" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Cuota (ODD)</label>
                    <input required type="number" step="any" value={newBet.odds} onChange={e => setNewBet({...newBet, odds: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-blue-500" placeholder="Ej. 1.55" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Stake</label>
                    <input required type="number" step="any" value={newBet.stake} onChange={e => setNewBet({...newBet, stake: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-blue-500" placeholder="Ej. 1" />
                    <p className="text-[10px] text-slate-400 mt-1 font-medium">Equivale a: <span className="font-bold text-slate-700 dark:text-slate-300">S/ {newBet.stake ? (Number(newBet.stake) * (dashboardData?.bank?.unitValue || 100)).toLocaleString() : '0'}</span></p>
                  </div>
               </div>
               
               <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => { setShowModal(false); if (setEditingId) setEditingId(null); setNewBet({ tipster: '', event: '', stake: '', odds: '' }); }} className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:opacity-80">Cancelar</button>
                  <button type="submit" className="flex-1 px-4 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-md shadow-blue-500/20">
                     {isEditing ? 'Actualizar' : 'Guardar'}
                  </button>
               </div>
            </form>
          </div>
        </div>
      )}

      {showConfigModal && (
        <div className="fixed inset-0 min-h-screen bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-sm shadow-2xl p-6 relative animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-800">
             <div className="flex items-center mb-6 text-slate-900 dark:text-white">
                <Settings className="h-6 w-6 mr-3 text-blue-600" />
                <h2 className="text-xl font-extrabold">Configurar Bank</h2>
             </div>
             
             <form onSubmit={handleUpdateBank} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Tu Banco Inicial (S/)</label>
                  <input required type="number" step="0.01" value={bankConfig.initialBank} onChange={e => setBankConfig({...bankConfig, initialBank: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-blue-500 font-bold text-lg" placeholder="100000" />
                  <p className="text-[10px] text-slate-400 mt-1">Capital total disponible para invertir</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Valor por Unidad (S/)</label>
                  <input required type="number" step="0.01" value={bankConfig.unitValue} onChange={e => setBankConfig({...bankConfig, unitValue: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-blue-500 font-bold text-lg" placeholder="100" />
                  <p className="text-[10px] text-slate-400 mt-1">¿A cuánto dinero real equivale "Stake 1"?</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30">
                   <p className="text-xs text-blue-800 dark:text-blue-300 font-medium">
                      💡 La gráfica y el historial se <span className="font-bold">auto-ajustarán matemáticamente</span> respetando estos nuevos valores al instante.
                   </p>
                </div>

                <div className="flex gap-3 pt-2">
                   <button type="button" onClick={() => setShowConfigModal(false)} className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:opacity-80">Cancelar</button>
                   <button type="submit" className="flex-1 px-4 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-md shadow-blue-500/20">Actualizar</button>
                </div>
             </form>
          </div>
        </div>
      )}

      {!!deleteConfirmId && (
        <div className="fixed inset-0 min-h-screen bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-sm shadow-2xl p-6 relative animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-800 text-center">
             <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-500" />
             </div>
             <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">Eliminar Pronóstico</h2>
             <p className="text-sm text-slate-500 mb-6 font-medium">¿Estás seguro que deseas eliminar este pronóstico? Se recalculará tu historial y banco. Esta acción no se puede deshacer.</p>
             
             <div className="flex gap-3">
                <button onClick={() => setDeleteConfirmId(null)} className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:opacity-80 transition-opacity">Cancelar</button>
                <button onClick={handleDeleteBet} className="flex-1 px-4 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 shadow-md shadow-red-500/20 transition-all">Eliminar</button>
             </div>
          </div>
        </div>
      )}
    </>
  );
}
