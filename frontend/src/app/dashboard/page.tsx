'use client';

import { useAuthStore } from '@/store/authStore';
import { 
  TrendingUp, 
  Target, 
  Coins, 
  Wallet, 
  Activity,
  User,
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Sparkles,
  Rocket,
  BookOpen,
  Terminal
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DashboardLobby() {
  const { user } = useAuthStore();
  
  const [greeting, setGreeting] = useState('');
  useEffect(() => {
    const hr = new Date().getHours();
    if (hr < 12) setGreeting('Buenos días');
    else if (hr < 18) setGreeting('Buenas tardes');
    else setGreeting('Buenas noches');
  }, []);

  const activeModules = user?.modules || [];

  const ALL_MODULES = ['FINANCE', 'INVESTMENTS', 'BETS', 'COLLECTIONS', 'TIPSTER_BANKROLL', 'WIKI', 'NETOPS'];

  const getModuleConfig = (moduleId: string) => {
    switch(moduleId) {
      case 'FINANCE': return { title: 'Finanzas Personales', icon: Wallet, color: 'bg-blue-500', href: '/dashboard/finances', desc: 'Gestiona ingresos, gastos y liquidez general.' };
      case 'INVESTMENTS': return { title: 'Inversiones', icon: TrendingUp, color: 'bg-emerald-500', href: '/dashboard/investments', desc: 'Sigue el ROI de tu portafolio de activos.' };
      case 'BETS': return { title: 'Apuestas', icon: Target, color: 'bg-purple-500', href: '/dashboard/bets', desc: 'Registra tus tickets y mide tu yield real.' };
      case 'COLLECTIONS': return { title: 'Colecciones', icon: Coins, color: 'bg-amber-500', href: '/dashboard/collections', desc: 'Administra el valor de tus preciadas piezas.' };
      case 'TIPSTER_BANKROLL': return { title: 'Tipsters', icon: Activity, color: 'bg-indigo-500', href: '/dashboard/tipster-bankroll', desc: 'Lleva tu récord público como pronosticador.' };
      case 'WIKI': return { title: 'Wiki Hub', icon: BookOpen, color: 'bg-rose-600', href: '/dashboard/wiki', desc: 'Tu base de conocimientos personal y notas técnicas.' };
      case 'NETOPS': return { title: 'Net-Ops Hub', icon: Terminal, color: 'bg-teal-600', href: '/dashboard/netops', desc: 'Diccionario centralizado y generador de scripts.' };
      default: return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700 pb-16 pt-8">
      
      {/* Header Profile */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-purple-500/30">
            {user?.name?.charAt(0).toUpperCase() || <User className="h-10 w-10" />}
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 font-bold mb-1 uppercase tracking-widest text-sm flex items-center gap-2">
              {greeting} {user?.role === 'ADMIN' && <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-md text-[10px]"><ShieldCheck className="w-3 h-3 inline mr-1"/> ADMIN</span>}
            </p>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
              {user?.name || 'Comandante'}
            </h1>
          </div>
        </div>
        
        {/* Global info/Analytics link */}
        {(activeModules.length > 1 || user?.role === 'ADMIN') && (
          <Link href="/dashboard/analytics" className="hidden md:flex items-center gap-3 px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-xl transition-all group">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
              <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">Analítica Global</p>
              <p className="text-xs text-slate-500">Ver mega-gráficas fusionadas</p>
            </div>
            <ChevronRight className="h-5 w-5 text-slate-400 group-hover:translate-x-1 transition-transform ml-2" />
          </Link>
        )}
      </div>

      {/* Global Welcome / Info Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-[2.5rem] p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-blue-900/20 relative overflow-hidden">
         <div className="absolute top-0 right-0 opacity-10 pointer-events-none -mt-10 -mr-10">
           <Sparkles className="w-64 h-64" />
         </div>
         <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="max-w-2xl">
             <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4 inline-block">SCAF SYSTEM</span>
             <h3 className="text-3xl font-black mb-3">SCAF: Tu Gestor de Ecosistema Completo</h3>
             <p className="text-blue-100 text-sm font-medium leading-relaxed">
               Este es tu <b>Lobby de Operaciones</b>. SCAF está diseñado como una plataforma modular paramétrica. 
               Esto significa que puedes utilizar únicamente las herramientas que necesites para tu día a día, manteniendo tu interfaz limpia y enfocada. 
               Explora el catálogo de módulos a continuación y accede a tus áreas asignadas.
             </p>
           </div>
           <div className="bg-white/10 backdrop-blur-sm p-6 rounded-3xl border border-white/20 min-w-[200px] text-center">
             <p className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-1">Módulos Activos</p>
             <p className="text-4xl font-black">{activeModules.length} <span className="text-lg text-blue-300">/ {ALL_MODULES.length}</span></p>
           </div>
         </div>
      </div>

      {/* Grid of Modules (Launchpad) */}
      <div className="space-y-6">
         <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-2">
           <div>
             <h2 className="text-2xl font-black text-slate-900 dark:text-white">Catálogo de Módulos</h2>
             <p className="text-slate-500 font-medium mt-1">Conoce las herramientas disponibles en el sistema.</p>
           </div>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {activeModules.length === 0 ? (
             <div className="col-span-full p-12 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-[3rem] text-center bg-white/50 dark:bg-slate-900/50">
               <p className="text-slate-500 font-medium">Actualmente no posees módulos activos. Contacta a un administrador.</p>
             </div>
           ) : (
             activeModules.map((mod: string) => {
               const conf = getModuleConfig(mod);
               if (!conf) return null;
               const Icon = conf.icon;

               return (
                 <Link key={mod} href={conf.href} className="group relative bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col h-full">
                   <div className={`absolute top-0 right-0 w-32 h-32 ${conf.color} opacity-[0.03] dark:opacity-5 rounded-bl-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-500`}></div>
                   <div className={`w-14 h-14 rounded-2xl ${conf.color} flex items-center justify-center text-white mb-6 shadow-md`}>
                     <Icon className="h-7 w-7" />
                   </div>
                   <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">{conf.title}</h3>
                   <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium text-sm flex-grow">{conf.desc}</p>
                   
                   <div className="mt-auto flex items-center text-sm font-black text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                     Entrar al espacio <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform" />
                   </div>
                 </Link>
               );
             })
           )}
         </div>
      </div>

      {/* Future Updates Informational Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-sm relative overflow-hidden mt-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
              <Rocket className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">Próximamente en SCAF</h3>
              <p className="text-slate-500 font-medium text-sm max-w-2xl">
                Nuestro equipo se encuentra trabajando en nuevos módulos y expansiones para mantener a la plataforma en constante crecimiento. ¡Mantente atento a las futuras actualizaciones!
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border border-slate-200 dark:border-slate-700">
              Beta Release V2
            </span>
          </div>
        </div>
      </div>
      
    </div>
  );
}
