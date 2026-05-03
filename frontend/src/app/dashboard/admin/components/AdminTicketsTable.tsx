import { Trash2, CheckCircle2, Circle, Clock, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

export function AdminTicketsTable({ tickets, loading, handleStatusChange, handleDeleteTicket }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm mt-8">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
         <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
           <MessageSquare className="h-5 w-5 text-blue-500" />
           Buzón de Soporte y Apelaciones
         </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="px-6 py-4 font-semibold whitespace-nowrap">Usuario (Email)</th>
              <th className="px-6 py-4 font-semibold">Motivo / Mensaje</th>
              <th className="px-6 py-4 font-semibold text-center whitespace-nowrap">Estado</th>
              <th className="px-6 py-4 font-semibold text-center whitespace-nowrap">Fecha</th>
              <th className="px-6 py-4 font-semibold text-right whitespace-nowrap">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-slate-700 dark:text-slate-300">
            {tickets.map((t: any) => (
              <tr key={t.id} className={`hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors ${t.status === 'PENDING' ? 'bg-amber-50/30 dark:bg-amber-900/10' : ''}`}>
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap">
                  {t.email}
                </td>
                <td className="px-6 py-4">
                  <p className="max-w-md text-sm text-slate-600 dark:text-slate-400 break-words">{t.reason}</p>
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  {t.status === 'PENDING' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                      <Clock className="h-3.5 w-3.5" /> Pendiente
                    </span>
                  )}
                  {t.status === 'RESOLVED' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Resuelto
                    </span>
                  )}
                  {t.status === 'REJECTED' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
                      <Circle className="h-3.5 w-3.5" /> Rechazado
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 font-medium text-slate-500 text-center whitespace-nowrap">
                  {new Date(t.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-2">
                    {t.status === 'PENDING' && (
                      <button 
                        onClick={() => handleStatusChange(t.id, 'RESOLVED')}
                        className="p-2 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50 rounded-xl transition-all"
                        title="Marcar como Resuelto"
                      >
                        <CheckCircle2 className="h-5 w-5" />
                      </button>
                    )}
                    <button 
                      onClick={() => handleDeleteTicket(t.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all"
                      title="Eliminar Ticket"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {tickets.length === 0 && !loading && (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-bold text-lg">No hay tickets de soporte pendientes.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
