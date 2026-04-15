import { Compass } from 'lucide-react';
import Link from 'next/link';

export function EmptyDashboard() {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] shadow-sm text-center">
      <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
        <Compass className="h-10 w-10 text-blue-500" />
      </div>
      <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
        Tu centro de comando está listo
      </h3>
      <p className="text-slate-500 dark:text-slate-400 max-w-lg mb-8">
        Actualmente no tienes activado el módulo de Finanzas, por lo que las gráficas generales no se muestran.
        Utiliza el menú lateral para acceder a la gestión de tus módulos activos.
      </p>
      <div className="flex gap-4">
        <Link href="/dashboard" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-colors">
          Explorar Menú Lateral
        </Link>
      </div>
    </div>
  );
}
