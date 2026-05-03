'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { api } from '@/lib/api';
import { Loader2, Mail, Lock, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAppealing, setIsAppealing] = useState(false);
  const [appealReason, setAppealReason] = useState('');
  const [submittingAppeal, setSubmittingAppeal] = useState(false);
  const [appealSent, setAppealSent] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get('email');
    if (emailParam) {
       setEmail(emailParam);
       toast.success('Cuenta registrada correctamente, ingresa tu contraseña');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsAppealing(false);
    setAppealSent(false);
    setLoading(true);

    try {
      const { data } = await api.post('/auth/login', { email, password });
      login(data.access_token, undefined);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleAppeal = async () => {
    if (!appealReason) return toast.error('Debes escribir un motivo');
    setSubmittingAppeal(true);
    try {
      await api.post('/auth/support-ticket', { email, reason: appealReason });
      setAppealSent(true);
      toast.success('Ticket enviado al Administrador');
    } catch (err) {
      toast.error('Error al enviar el ticket');
    } finally {
      setSubmittingAppeal(false);
    }
  };

  return (
    <div className="flex bg-slate-50 relative min-h-screen items-center justify-center dark:bg-slate-950 px-4">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800 p-8 transition-all hover:shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">Bienvenido a SCAF</h1>
            <p className="text-slate-500 dark:text-slate-400">Ingresa tus credenciales para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Contraseña</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="flex justify-end mt-2">
                <button type="button" onClick={() => toast.info('Si olvidaste tu contraseña, por favor comunícate con el Administrador', { duration: 5000 })} className="text-xs font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm font-medium text-center bg-red-50 dark:bg-red-900/30 p-3 rounded-xl flex flex-col items-center gap-2">
                <span>{error}</span>
                {error.includes('desactivada') && !isAppealing && !appealSent && (
                  <button 
                    type="button" 
                    onClick={() => setIsAppealing(true)}
                    className="text-xs font-bold bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-3 py-1.5 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    ¿Crees que es un error? Apelar bloqueo
                  </button>
                )}
              </div>
            )}

            {isAppealing && !appealSent && (
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in-95">
                <p className="text-sm font-bold text-slate-900 dark:text-white mb-2">Apelar Bloqueo de Cuenta</p>
                <textarea 
                  value={appealReason}
                  onChange={(e) => setAppealReason(e.target.value)}
                  placeholder="Escribe aquí tu motivo o solicita que te habiliten..."
                  className="w-full p-3 rounded-lg text-sm border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 mb-3 focus:outline-none focus:border-blue-500"
                  rows={3}
                ></textarea>
                <div className="flex gap-2">
                  <button 
                    type="button" 
                    onClick={() => setIsAppealing(false)}
                    className="flex-1 py-2 text-xs font-bold text-slate-500 bg-slate-200 dark:bg-slate-700 rounded-lg"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="button" 
                    onClick={handleAppeal}
                    disabled={submittingAppeal}
                    className="flex-1 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex justify-center items-center"
                  >
                    {submittingAppeal ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Enviar Ticket'}
                  </button>
                </div>
              </div>
            )}

            {appealSent && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-xl text-center animate-in fade-in">
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">¡Apelación enviada exitosamente!</p>
                <p className="text-xs text-emerald-500 mt-1">El administrador revisará tu caso pronto.</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02]"
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : (
                <>
                  Entrar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            ¿No tienes cuenta?{' '}
            <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 transition-colors">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
