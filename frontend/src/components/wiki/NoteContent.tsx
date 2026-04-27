'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { WikiNote } from '@/lib/wiki-service';
import { Edit2, Save, X } from 'lucide-react';

interface NoteContentProps {
  note: WikiNote;
  onSave: (content: string) => Promise<void>;
}

export function NoteContent({ note, onSave }: NoteContentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(note.content);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await onSave(content);
    setIsSaving(false);
    setIsEditing(false);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 text-slate-100 p-8 overflow-hidden">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
        <h1 className="text-3xl font-bold text-white">{note.title}</h1>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                disabled={isSaving}
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm font-medium transition-colors"
              >
                <Save size={16} />
                {isSaving ? 'Guardando...' : 'Guardar'}
              </button>
              <button
                disabled={isSaving}
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors"
              >
                <X size={16} />
                Cancelar
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setContent(note.content);
                setIsEditing(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 rounded-lg text-sm font-medium transition-colors"
            >
              <Edit2 size={16} />
              Editar Nota
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isEditing ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full bg-slate-900 border border-slate-700 rounded-xl p-6 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none text-slate-100"
            placeholder="Escribe tu contenido en Markdown aquí..."
          />
        ) : (
          <div className="prose prose-invert prose-sky max-w-none">
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }: any) {
                  return (
                    <code
                      className={`${className} bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-sm`}
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                pre({ children }: any) {
                  return (
                    <pre className="bg-slate-900 p-4 rounded-xl border border-slate-800 overflow-x-auto my-4 font-mono text-sm text-sky-100">
                      {children}
                    </pre>
                  );
                },
              }}
            >
              {note.content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
