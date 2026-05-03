import { ShieldAlert, CheckCircle2, Loader2, KeyRound } from 'lucide-react';

export function AdminModals({ 
  isModalOpen, selectedUser, MODULES_CONFIG, toggleModule, setIsModalOpen, saveModules, updatingModules,
  isPasswordModalOpen, newPassword, setNewPassword, setIsPasswordModalOpen, savePassword, resettingPassword
}: any) {
  return (
    <>
      {/* Modules Assignment Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 p-8 animate-in slide-in-from-bottom-8 zoom-in-95">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShieldAlert className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Asignar Módulos</h2>
              <p className="text-slate-500 text-sm mt-1">Configura el acceso para <b>{selectedUser.name || selectedUser.email}</b></p>
            </div>

            <div className="space-y-3 mb-8 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2">
              {MODULES_CONFIG.map((mod: any) => {
                const isEnabled = selectedUser.modules.includes(mod.key);
                return (
                  <button
                    key={mod.key}
                    onClick={() => toggleModule(mod.key)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      isEnabled 
                        ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' 
                        : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-xl bg-white dark:bg-slate-800 shadow-sm ${isEnabled ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`}>
                        <mod.icon className="h-5 w-5" />
                      </div>
                      <span className={`font-bold ${isEnabled ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>{mod.label}</span>
                    </div>
                    {isEnabled && <CheckCircle2 className="h-6 w-6 text-blue-500 animate-in zoom-in" />}
                    {!isEnabled && <div className="h-6 w-6 rounded-full border-2 border-slate-200 dark:border-slate-700"></div>}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-4 font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              >
                Cancelar
              </button>
              <button 
                onClick={saveModules}
                disabled={updatingModules}
                className="flex-1 py-4 font-bold text-white bg-blue-600 rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
              >
                {updatingModules ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Guardar Cambios'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Reset Modal */}
      {isPasswordModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 p-8 animate-in slide-in-from-bottom-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <KeyRound className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Nueva Contraseña</h2>
              <p className="text-slate-500 text-sm mt-1">Ingresa la nueva clave para <b>{selectedUser.name || selectedUser.email}</b></p>
            </div>

            <input 
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-6 py-4 border-2 border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-800 text-lg font-bold outline-none focus:border-amber-500 transition-all mb-8 text-center"
            />

            <div className="flex gap-4">
              <button 
                onClick={() => setIsPasswordModalOpen(false)}
                className="flex-1 py-4 font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-2xl"
              >
                Cancelar
              </button>
              <button 
                onClick={savePassword}
                disabled={resettingPassword}
                className="flex-1 py-4 font-bold text-white bg-amber-600 rounded-2xl hover:bg-amber-700 shadow-xl shadow-amber-600/30 transition-all flex items-center justify-center gap-2"
              >
                {resettingPassword ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Restablecer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
