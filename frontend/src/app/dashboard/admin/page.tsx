'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Users, Wallet, Target, Coins, Trash2 } from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Hard route protection
  useEffect(() => {
    if (user && user.role !== 'ADMIN') {
      router.push('/dashboard');
    }
  }, [user, router]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, usersRes] = await Promise.all([
        api.get('/admin/dashboard-stats'),
        api.get('/admin/users')
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      fetchData();
    }
  }, [user]);

  const handleDeleteUser = async (id: string, name: string) => {
    if (id === user?.id) return alert('No puedes borrarte a ti mismo.');
    if (!window.confirm(`¿Estás seguro que deseas ELIMINAR a ${name || 'este usuario'}? Esta acción borrará todas sus finanzas en cascada si la BD lo permite, de lo contrario prevendrá su borrado.`)) return;
    
    try {
      await api.delete(`/admin/users/${id}`);
      fetchData();
    } catch (err: any) {
      alert('Error eliminando usuario: ' + err.response?.data?.message || err.message);
    }
  };

  if (!user || user.role !== 'ADMIN') return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-16">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <div className="p-2.5 bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 rounded-2xl">
              <ShieldAlert className="h-8 w-8" />
            </div>
            Panel de Súper Administrador
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Visión omnipotente de todo el ecosistema DHAC Control.</p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-pulse">
           {[1,2,3,4].map(i => <div key={i} className="h-32 bg-slate-200 dark:bg-slate-800 rounded-3xl"></div>)}
        </div>
      ) : stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 rounded-xl"><Users className="h-6 w-6" /></div>
            </div>
            <h3 className="text-4xl font-black text-slate-900 dark:text-white tabular-nums">{stats.users}</h3>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Usuarios</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 rounded-xl"><Wallet className="h-6 w-6" /></div>
            </div>
            <h3 className="text-4xl font-black text-slate-900 dark:text-white tabular-nums">{stats.wallets}</h3>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Billeteras</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 rounded-xl"><Coins className="h-6 w-6" /></div>
            </div>
            <h3 className="text-4xl font-black text-slate-900 dark:text-white tabular-nums">{stats.collections}</h3>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Coleccionables</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 rounded-xl"><Target className="h-6 w-6" /></div>
            </div>
            <h3 className="text-4xl font-black text-slate-900 dark:text-white tabular-nums">{stats.transactions}</h3>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Transacciones</p>
          </div>
        </div>
      )}

      {/* Users Table */}
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
                <th className="px-6 py-4 font-semibold">Registro</th>
                <th className="px-6 py-4 font-semibold text-right">Opciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-slate-700 dark:text-slate-300">
              {users.map(u => (
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
                  <td className="px-6 py-4 font-medium text-slate-500">{new Date(u.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric'})}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDeleteUser(u.id, u.name)} disabled={u.id === user?.id} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all disabled:opacity-30 disabled:hover:bg-transparent">
                      <Trash2 className="h-5 w-5 ml-auto" />
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && !loading && (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-500 font-bold text-lg">No hay usuarios en la red.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
