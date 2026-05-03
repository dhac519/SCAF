'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Target, Wallet, Coins, TrendingUp, Activity, BookOpen, Terminal } from 'lucide-react';
import { toast } from 'sonner';

import { AdminMetrics } from './components/AdminMetrics';
import { AdminUsersTable } from './components/AdminUsersTable';
import { AdminTicketsTable } from './components/AdminTicketsTable';
import { AdminModals } from './components/AdminModals';

export default function AdminPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'users' | 'tickets'>('users');
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [updatingModules, setUpdatingModules] = useState(false);
  const [resettingPassword, setResettingPassword] = useState(false);

  // Hard route protection
  useEffect(() => {
    if (user && user.role !== 'ADMIN') {
      router.push('/dashboard');
    }
  }, [user, router]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, usersRes, ticketsRes] = await Promise.all([
        api.get('/admin/dashboard-stats'),
        api.get('/admin/users'),
        api.get('/admin/support-tickets')
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setTickets(ticketsRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      fetchData();
      
      // Auto-refresh stats and users every 30 seconds
      const interval = setInterval(() => {
        api.get('/admin/dashboard-stats').then(res => setStats(res.data)).catch(() => {});
        api.get('/admin/users').then(res => setUsers(res.data)).catch(() => {});
        api.get('/admin/support-tickets').then(res => setTickets(res.data)).catch(() => {});
      }, 30000);
      
      return () => clearInterval(interval);
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

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      await api.patch(`/admin/users/${id}/active`, { isActive });
      toast.success(`Cuenta ${isActive ? 'desbloqueada' : 'bloqueada'} con éxito`);
      fetchData();
    } catch (err: any) {
      toast.error('Error actualizando estado de cuenta');
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await api.patch(`/admin/support-tickets/${id}/status`, { status });
      toast.success('Estado del ticket actualizado');
      fetchData();
    } catch (err) {
      toast.error('Error actualizando ticket');
    }
  };

  const handleDeleteTicket = async (id: string) => {
    if (!window.confirm('¿Eliminar este ticket permanentemente?')) return;
    try {
      await api.delete(`/admin/support-tickets/${id}`);
      fetchData();
    } catch (err) {
      toast.error('Error eliminando ticket');
    }
  };

  const handleOpenModules = (user: any) => {
    setSelectedUser({ ...user, modules: user.modules || [] });
    setIsModalOpen(true);
  };

  const toggleModule = (module: string) => {
    setSelectedUser((prev: any) => {
      const currentModules = prev.modules;
      if (currentModules.includes(module)) {
        return { ...prev, modules: currentModules.filter((m: string) => m !== module) };
      } else {
        return { ...prev, modules: [...currentModules, module] };
      }
    });
  };

  const saveModules = async () => {
    setUpdatingModules(true);
    try {
      await api.patch(`/admin/users/${selectedUser.id}/modules`, { modules: selectedUser.modules });
      toast.success('Módulos actualizados para ' + selectedUser.name);
      fetchData();
      setIsModalOpen(false);
    } catch (err) {
      toast.error('Error actualizando módulos');
    } finally {
      setUpdatingModules(false);
    }
  };
  const handleOpenPassword = (user: any) => {
    setSelectedUser(user);
    setNewPassword('');
    setIsPasswordModalOpen(true);
  };

  const savePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      return toast.error('La contraseña debe tener al menos 6 caracteres');
    }
    setResettingPassword(true);
    try {
      await api.patch(`/admin/users/${selectedUser.id}/password`, { password: newPassword });
      toast.success('Contraseña actualizada con éxito');
      setIsPasswordModalOpen(false);
    } catch (err) {
      toast.error('Error actualizando contraseña');
    } finally {
      setResettingPassword(false);
    }
  };

  const MODULES_CONFIG = [
    { key: 'FINANCE', label: 'Finanzas', icon: Wallet, color: 'blue' },
    { key: 'INVESTMENTS', label: 'Inversiones', icon: TrendingUp, color: 'emerald' },
    { key: 'BETS', label: 'Apuestas', icon: Target, color: 'purple' },
    { key: 'TIPSTER_BANKROLL', label: 'Tipsters Bankroll', icon: Activity, color: 'rose' },
    { key: 'COLLECTIONS', label: 'Colecciones', icon: Coins, color: 'amber' },
    { key: 'WIKI', label: 'Wiki Hub', icon: BookOpen, color: 'rose' },
    { key: 'NETOPS', label: 'Net-Ops Hub', icon: Terminal, color: 'emerald' },
  ];

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

      <AdminMetrics loading={loading} stats={stats} />

      <div className="flex space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button 
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 text-sm font-bold rounded-xl transition-all ${activeTab === 'users' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
        >
          Directorio de Usuarios
        </button>
        <button 
          onClick={() => setActiveTab('tickets')}
          className={`px-4 py-2 text-sm font-bold rounded-xl transition-all flex items-center gap-2 ${activeTab === 'tickets' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
        >
          Buzón de Soporte
          {tickets.filter(t => t.status === 'PENDING').length > 0 && (
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'tickets' ? 'bg-white text-blue-600' : 'bg-rose-500 text-white'}`}>
              {tickets.filter(t => t.status === 'PENDING').length}
            </span>
          )}
        </button>
      </div>

      {activeTab === 'users' ? (
        <AdminUsersTable 
          users={users} loading={loading} userObj={user} 
          handleOpenModules={handleOpenModules} 
          handleOpenPassword={handleOpenPassword} 
          handleDeleteUser={handleDeleteUser} 
          handleToggleActive={handleToggleActive}
        />
      ) : (
        <AdminTicketsTable 
          tickets={tickets} loading={loading}
          handleStatusChange={handleStatusChange}
          handleDeleteTicket={handleDeleteTicket}
        />
      )}

      <AdminModals 
        isModalOpen={isModalOpen} selectedUser={selectedUser} 
        MODULES_CONFIG={MODULES_CONFIG} toggleModule={toggleModule} 
        setIsModalOpen={setIsModalOpen} saveModules={saveModules} 
        updatingModules={updatingModules} isPasswordModalOpen={isPasswordModalOpen} 
        newPassword={newPassword} setNewPassword={setNewPassword} 
        setIsPasswordModalOpen={setIsPasswordModalOpen} savePassword={savePassword} 
        resettingPassword={resettingPassword}
      />
    </div>
  );
}
