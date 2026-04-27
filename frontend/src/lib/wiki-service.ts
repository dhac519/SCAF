import { api } from './api';

export interface WikiNote {
  id: string;
  title: string;
  content: string;
  topicId: string;
}

export interface WikiTopic {
  id: string;
  name: string;
  folderId: string;
  notes: WikiNote[];
}

export interface WikiFolder {
  id: string;
  name: string;
  topics: WikiTopic[];
}

export const WikiService = {
  getFolders: async () => {
    const response = await api.get<WikiFolder[]>('/wiki/folders');
    return response.data;
  },

  createFolder: async (name: string) => {
    const response = await api.post('/wiki/folders', { name });
    return response.data;
  },

  createTopic: async (name: string, folderId: string) => {
    const response = await api.post('/wiki/topics', { name, folderId });
    return response.data;
  },

  createNote: async (title: string, content: string, topicId: string) => {
    const response = await api.post('/wiki/notes', { title, content, topicId });
    return response.data;
  },

  updateNote: async (id: string, content: string) => {
    const response = await api.patch(`/wiki/notes/${id}`, { content });
    return response.data;
  },

  getNote: async (id: string) => {
    const response = await api.get<WikiNote>(`/wiki/notes/${id}`);
    return response.data;
  },

  deleteNote: async (id: string) => {
    const response = await api.delete(`/wiki/notes/${id}`);
    return response.data;
  },
};
