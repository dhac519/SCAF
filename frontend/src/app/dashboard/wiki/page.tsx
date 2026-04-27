'use client';

import { useEffect, useState } from 'react';
import { WikiService, WikiFolder, WikiNote } from '@/lib/wiki-service';
import { WikiSidebar } from '@/components/wiki/WikiSidebar';
import { NoteContent } from '@/components/wiki/NoteContent';
import { toast } from 'sonner';
import { BookOpen } from 'lucide-react';

export default function WikiPage() {
  const [folders, setFolders] = useState<WikiFolder[]>([]);
  const [selectedNote, setSelectedNote] = useState<WikiNote | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFolders();
  }, []);

  const loadFolders = async () => {
    try {
      const data = await WikiService.getFolders();
      setFolders(data);
    } catch (error) {
      toast.error('Error al cargar la Wiki');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateFolder = async () => {
    const name = prompt('Nombre de la nueva carpeta:');
    if (!name) return;
    try {
      await WikiService.createFolder(name);
      loadFolders();
      toast.success('Carpeta creada');
    } catch (error) {
      toast.error('Error al crear carpeta');
    }
  };

  const handleCreateTopic = async (folderId: string) => {
    const name = prompt('Nombre del nuevo tema:');
    if (!name) return;
    try {
      await WikiService.createTopic(name, folderId);
      loadFolders();
      toast.success('Tema creado');
    } catch (error) {
      toast.error('Error al crear tema');
    }
  };

  const handleCreateNote = async (topicId: string) => {
    const title = prompt('Título de la nueva nota:');
    if (!title) return;
    try {
      const note = await WikiService.createNote(title, '# ' + title + '\n\nEscribe aquí...', topicId);
      loadFolders();
      setSelectedNote(note);
      toast.success('Nota creada');
    } catch (error) {
      toast.error('Error al crear nota');
    }
  };

  const handleUpdateNote = async (content: string) => {
    if (!selectedNote) return;
    try {
      await WikiService.updateNote(selectedNote.id, content);
      setSelectedNote({ ...selectedNote, content });
      toast.success('Nota guardada');
      loadFolders(); // Refresh to update list if needed
    } catch (error) {
      toast.error('Error al guardar nota');
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-slate-950 text-slate-400">
        <div className="animate-pulse">Cargando Wiki...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      <WikiSidebar
        folders={folders}
        onSelectNote={setSelectedNote}
        onCreateFolder={handleCreateFolder}
        onCreateTopic={handleCreateTopic}
        onCreateNote={handleCreateNote}
      />
      
      <main className="flex-1 overflow-hidden">
        {selectedNote ? (
          <NoteContent 
            note={selectedNote} 
            onSave={handleUpdateNote} 
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 p-8 text-center">
            <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4 text-sky-400">
              <BookOpen size={32} />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Bienvenido a tu Wiki</h2>
            <p className="max-w-md">
              Selecciona una nota de la izquierda para ver su contenido o crea una nueva carpeta para empezar a organizar tu conocimiento.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
