import { create } from 'zustand';
import Cookies from 'js-cookie';
import { api } from '../lib/api';

interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
  modules?: string[];
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user?: User) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: Cookies.get('token') || null,
  isAuthenticated: !!Cookies.get('token'),
  login: (token, user) => {
    Cookies.set('token', token, { expires: 7 }); // 7 days
    set({ token, user: user || null, isAuthenticated: true });
  },
  logout: () => {
    Cookies.remove('token');
    set({ token: null, user: null, isAuthenticated: false });
  },
  checkAuth: async () => {
    const token = Cookies.get('token');
    if (!token) {
      set({ isAuthenticated: false });
      return;
    }
    try {
      const response = await api.get('/users/me');
      set({ user: response.data, isAuthenticated: true });
    } catch (error) {
      Cookies.remove('token');
      set({ token: null, user: null, isAuthenticated: false });
    }
  },
}));
