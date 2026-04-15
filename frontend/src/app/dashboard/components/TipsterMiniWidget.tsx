import { Activity, Target } from 'lucide-react';
import Link from 'next/link';

export function TipsterMiniWidget({ data }: any) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 shadow-sm relative overflow-hidden text-white group">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-purple-500/20 rounded-full blur-[50px] group-hover:bg-purple-500/40 transition-colors"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-2xl font-black text-white flex items-center gap-2">
               <Activity className="h-6 w-6 text-purple-400" />
               Bankroll Tipster
             </h3>
             <Link href="/dashboard/tipster-bankroll" className="text-purple-400 font-bold text-sm hover:underline">Gestionar</Link>
          </div>
          <p className="text-slate-400 font-bold mb-2">Fondo Actual Ficticio</p>
          <h2 className="text-5xl font-black tracking-tighter tabular-nums mb-4">
             S/ {data?.stats?.tipsterCurrentBank?.toLocaleString('en-US', { minimumFractionDigits: 2 }) || '0.00'}
          </h2>
          <p className="text-sm font-medium text-slate-500">Mantén al día tus registros para una estadística impecable.</p>
        </div>
      </div>
    </div>
  );
}
