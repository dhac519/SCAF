'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { LayoutDashboard, Wallet, TrendingUp, Target, LogOut, Menu, X, Loader2, Coins, ShieldAlert, Lock, Activity, BookOpen, Terminal } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/lib/api';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, checkAuth, logout } = useAuthStore();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      await checkAuth();
      setIsLoading(false);
    };
    initAuth();
  }, [checkAuth]);

  // Heartbeat ping to keep lastActiveAt updated
  useEffect(() => {
    if (!isAuthenticated) return;
    
    // Initial ping
    api.patch('/auth/heartbeat').catch(() => {});
    
    // Ping every 60 seconds
    const interval = setInterval(() => {
      api.patch('/auth/heartbeat').catch(() => {});
    }, 60000);
    
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  const routeModuleMap: Record<string, string> = {
    '/dashboard/finances': 'FINANCE',
    '/dashboard/investments': 'INVESTMENTS',
    '/dashboard/bets': 'BETS',
    '/dashboard/collections': 'COLLECTIONS',
    '/dashboard/tipster-bankroll': 'TIPSTER_BANKROLL',
    '/dashboard/wiki': 'WIKI',
    '/dashboard/netops': 'NETOPS',
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      // Check if current route requires a module
      const requiredModule = routeModuleMap[pathname];
      if (requiredModule && user.role !== 'ADMIN' && !user.modules?.includes(requiredModule)) {
        toast.error('No tienes acceso a este módulo');
        router.push('/dashboard');
      }
    }
  }, [pathname, user, isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  const baseNavItems = [
    { name: 'General', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Wiki Hub', href: '/dashboard/wiki', icon: BookOpen },
    { name: 'Net-Ops Hub', href: '/dashboard/netops', icon: Terminal, module: 'NETOPS' },
    { name: 'Finanzas', href: '/dashboard/finances', icon: Wallet, module: 'FINANCE' },
    { name: 'Inversiones', href: '/dashboard/investments', icon: TrendingUp, module: 'INVESTMENTS' },
    { name: 'Apuestas', href: '/dashboard/bets', icon: Target, module: 'BETS' },
    { name: 'Tipsters', href: '/dashboard/tipster-bankroll', icon: Activity, module: 'TIPSTER_BANKROLL' },
    { name: 'Colecciones', href: '/dashboard/collections', icon: Coins, module: 'COLLECTIONS' },
  ];

  // We add Analitica under General ONLY if the user has at least some modules (like Finance, Bets, etc)
  const hasMultipleModules = (user?.modules?.length || 0) > 0;
  if (hasMultipleModules) {
    baseNavItems.splice(1, 0, { name: 'Analítica Global', href: '/dashboard/analytics', icon: TrendingUp } as any);
  }

  const filteredNavItems = baseNavItems.filter(item => 
    user?.role === 'ADMIN' || !item.module || user?.modules?.includes(item.module)
  );

  const navItems = user?.role === 'ADMIN' 
    ? [...filteredNavItems, { name: 'Admin Panel', href: '/dashboard/admin', icon: ShieldAlert }] 
    : filteredNavItems;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row font-sans">
      <div className="md:hidden flex items-center justify-between p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20">
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 tracking-tight">SCAF</h1>
        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 -mr-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <aside className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:sticky md:top-0 md:translate-x-0 z-30 w-72 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 ease-in-out flex flex-col h-screen`}>
        <div className="p-6 hidden md:flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">SCAF Control</h1>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 mt-4 md:mt-2 custom-scrollbar">
          <div className="px-4 space-y-2">
            <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Menu Principal</p>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-4 py-3.5 text-sm font-semibold rounded-2xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-blue-600 shadow-md shadow-blue-500/20 text-white' 
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/80 dark:hover:text-slate-200'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3 shrink-0" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="px-4 py-3 mb-3 rounded-2xl bg-slate-100 dark:bg-slate-800/60 flex flex-col">
            <span className="text-sm font-bold text-slate-900 dark:text-white truncate">{user?.name || 'Usuario'}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</span>
          </div>
          <button
            onClick={() => {
              logout();
            }}
            className="flex w-full items-center justify-center px-4 py-3.5 text-sm font-semibold text-red-600 dark:text-red-400 bg-transparent rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
          >
            <LogOut className="h-5 w-5 mr-2 shrink-0" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-20 md:hidden transition-opacity" onClick={() => setSidebarOpen(false)} />
      )}

      <main className="flex-1 overflow-y-auto w-full relative">
        {/* Subtle background gradient for main content */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 -z-10" />
        <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-10 relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
