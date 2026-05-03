import { api } from './api';

export enum NetOpsPlatform {
  CISCO = 'CISCO',
  FORTINET = 'FORTINET',
  WINDOWS = 'WINDOWS',
  LINUX = 'LINUX',
  GENERIC = 'GENERIC',
}

export enum NetOpsCategory {
  NETWORKING = 'NETWORKING',
  SECURITY = 'SECURITY',
  TROUBLESHOOTING = 'TROUBLESHOOTING',
  SYSTEM = 'SYSTEM',
}

export interface NetOpsCommand {
  id: string;
  title: string;
  command: string;
  description?: string;
  platform: NetOpsPlatform;
  category: NetOpsCategory;
  isGenerator: boolean;
  variables?: any;
  createdAt: string;
  updatedAt: string;
}

export const NetOpsService = {
  getCommands: async (): Promise<NetOpsCommand[]> => {
    const response = await api.get('/netops');
    return response.data;
  },

  getCommand: async (id: string): Promise<NetOpsCommand> => {
    const response = await api.get(`/netops/${id}`);
    return response.data;
  },

  createCommand: async (data: Partial<NetOpsCommand>): Promise<NetOpsCommand> => {
    const response = await api.post('/netops', data);
    return response.data;
  },

  updateCommand: async (id: string, data: Partial<NetOpsCommand>): Promise<NetOpsCommand> => {
    const response = await api.patch(`/netops/${id}`, data);
    return response.data;
  },

  deleteCommand: async (id: string): Promise<void> => {
    await api.delete(`/netops/${id}`);
  },
};
