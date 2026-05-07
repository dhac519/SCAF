'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { api } from '@/lib/api';
import { 
  User, 
  Mail, 
  Lock, 
  Shield, 
  Save, 
  Loader2, 
  KeyRound, 
  Eye, 
  EyeOff,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { user, checkAuth } = useAuthStore();
  const [isUpdating, setIsUpdating] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  
  // Form states
  const [name, setName] = useState(user?.name || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      if (newPassword && newPassword !== confirmPassword) {
        toast.error('Las contraseñas no coinciden');
        setIsUpdating(false);
        return;
      }

      const payload: any = { name };
      if (newPassword) {
        payload.password = newPassword;
      }

      await api.patch('/users/me', payload);
      await checkAuth(); // Refresh user data in store
      
      toast.success('Perfil actualizado correctamente');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al actualizar el perfil');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Mi Perfil</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Gestiona tu información personal y seguridad de la cuenta.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: User Info Summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <User size={80} />
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg mb-4">
                <span className="text-white font-bold text-3xl">{user?.name?.charAt(0) || user?.email.charAt(0).toUpperCase()}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user?.name || 'Usuario'}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{user?.email}</p>
              
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                <Shield className="w-3 h-3 mr-1" />
                {user?.role === 'ADMIN' ? 'Administrador' : 'Usuario Estándar'}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                <CheckCircle2 className="w-4 h-4 mr-3 text-green-500" />
                Cuenta activa
              </div>
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                <Lock className="w-4 h-4 mr-3 text-blue-500" />
                Seguridad Protegida
              </div>
            </div>
          </div>
          
          <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-lg shadow-blue-500/20">
            <h3 className="font-bold flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              Sugerencia
            </h3>
            <p className="text-sm text-blue-100 mt-2">
              Utiliza una contraseña de al menos 8 caracteres que incluya letras y números para mayor seguridad.
            </p>
          </div>
        </div>

        {/* Right Column: Edit Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleUpdateProfile} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm space-y-8">
            {/* General Info Section */}
            <section className="space-y-6">
              <div className="flex items-center space-x-2 text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
                <User className="w-5 h-5 text-blue-500" />
                <h3 className="font-bold">Información General</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Nombre Completo</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-900 dark:text-white"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Correo Electrónico</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-500 cursor-not-allowed outline-none"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Security Section */}
            <section className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2 text-slate-900 dark:text-white">
                  <KeyRound className="w-5 h-5 text-purple-500" />
                  <h3 className="font-bold">Seguridad y Contraseña</h3>
                </div>
                <button 
                  type="button"
                  onClick={() => setShowPasswords(!showPasswords)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  {showPasswords ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Nueva Contraseña</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <input
                      type={showPasswords ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-900 dark:text-white"
                      placeholder="Mínimo 6 caracteres"
                      minLength={6}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Confirmar Nueva Contraseña</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <input
                      type={showPasswords ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-900 dark:text-white"
                      placeholder="Repite la contraseña"
                      minLength={6}
                    />
                  </div>
                </div>
              </div>
              
              {newPassword && (
                <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center bg-amber-50 dark:bg-amber-900/20 p-3 rounded-xl border border-amber-100 dark:border-amber-900/30">
                  <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
                  Al guardar, tu sesión se mantendrá activa pero la contraseña cambiará permanentemente.
                </p>
              )}
            </section>

            {/* Submit Button */}
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isUpdating}
                className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/25 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                    Guardando cambios...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                    Guardar Cambios
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
