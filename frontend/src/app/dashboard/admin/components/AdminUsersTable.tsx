import { Settings2, KeyRound, Trash2, UserX, UserCheck } from 'lucide-react';

export function AdminUsersTable({ users, loading, userObj, handleOpenModules, handleOpenPassword, handleDeleteUser, handleToggleActive }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800">
         <h2 className="text-xl font-bold text-slate-900 dark:text-white">Directorio de Usuarios</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="px-6 py-4 font-semibold">Identidad</th>
              <th className="px-6 py-4 font-semibold">Privilegios</th>
              <th className="px-6 py-4 font-semibold">Estado</th>
              <th className="px-6 py-4 font-semibold text-center">Cuentas</th>
              <th className="px-6 py-4 font-semibold text-center uppercase tracking-tighter">Registro</th>
              <th className="px-6 py-4 font-semibold text-right">Módulos</th>
              <th className="px-6 py-4 font-semibold text-right">Opciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-slate-700 dark:text-slate-300">
            {users.map((u: any) => (
              <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-sm shadow-inner uppercase">
                      {u.name?.charAt(0) || u.email.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-base">{u.name || 'Invitado Sin Nombre'}</p>
                      <p className="text-xs text-slate-500 font-medium">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${u.role === 'ADMIN' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-900/50' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 border border-slate-200 dark:border-slate-700'}`}>
                    {u.role === 'ADMIN' ? 'Super Admin' : 'Usuario Pila'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {(() => {
                    const isOnline = u.lastActiveAt && new Date().getTime() - new Date(u.lastActiveAt).getTime() < 120000;
                    return (
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-3 w-3">
                            {isOnline && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                            <span className={`relative inline-flex rounded-full h-3 w-3 ${isOnline ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                          </span>
                          <span className={`text-xs font-bold ${isOnline ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}>
                            {isOnline ? 'En línea' : 'Desconectado'}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                          {u.lastActiveAt ? new Date(u.lastActiveAt).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' }) : 'Nunca'}
                        </span>
                      </div>
                    );
                  })()}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="font-black text-lg text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-xl">
                    {u._count?.wallets || 0}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-slate-500 text-center">{new Date(u.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric'})}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex flex-wrap gap-1 justify-end">
                    {u.modules?.map((m: string) => (
                      <span key={m} className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[9px] font-bold text-slate-500 uppercase">
                        {m.slice(0, 3)}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleToggleActive(u.id, !u.isActive)}
                      className={`p-2 rounded-xl transition-all ${u.isActive ? 'text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20' : 'text-rose-600 bg-rose-50 dark:bg-rose-900/30 hover:bg-rose-100 dark:hover:bg-rose-900/50 hover:text-rose-700 dark:hover:text-rose-400'}`}
                      title={u.isActive ? 'Bloquear Cuenta' : 'Desbloquear Cuenta'}
                      disabled={u.id === userObj?.id}
                    >
                      {u.isActive ? <UserCheck className="h-5 w-5" /> : <UserX className="h-5 w-5" />}
                    </button>
                    <button 
                      onClick={() => handleOpenModules(u)}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all"
                      title="Gestionar Módulos"
                    >
                      <Settings2 className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleOpenPassword(u)}
                      className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-xl transition-all"
                      title="Resetear Contraseña"
                    >
                      <KeyRound className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleDeleteUser(u.id, u.name)} disabled={u.id === userObj?.id} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all disabled:opacity-30 disabled:hover:bg-transparent">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && !loading && (
              <tr><td colSpan={7} className="px-6 py-12 text-center text-slate-500 font-bold text-lg">No hay usuarios en la red.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
