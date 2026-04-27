'use client';

import { useState } from 'react';
import { WikiFolder, WikiTopic, WikiNote } from '@/lib/wiki-service';
import { ChevronRight, ChevronDown, Folder, FileText, Plus } from 'lucide-react';

interface WikiSidebarProps {
  folders: WikiFolder[];
  onSelectNote: (note: WikiNote) => void;
  onCreateFolder: () => void;
  onCreateTopic: (folderId: string) => void;
  onCreateNote: (topicId: string) => void;
}

export function WikiSidebar({
  folders,
  onSelectNote,
  onCreateFolder,
  onCreateTopic,
  onCreateNote,
}: WikiSidebarProps) {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  const toggleFolder = (id: string) => {
    setExpandedFolders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleTopic = (id: string) => {
    setExpandedTopics((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 h-full overflow-y-auto p-4 text-slate-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">Wiki Hub</h2>
        <button
          onClick={onCreateFolder}
          className="p-1 hover:bg-slate-800 rounded text-sky-400"
          title="Nueva Carpeta"
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="space-y-2">
        {folders.map((folder) => (
          <div key={folder.id} className="space-y-1">
            <div
              className="flex items-center group cursor-pointer hover:text-white"
              onClick={() => toggleFolder(folder.id)}
            >
              {expandedFolders[folder.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <Folder size={16} className="ml-1 mr-2 text-amber-400" />
              <span className="flex-1 text-sm font-medium">{folder.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCreateTopic(folder.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-slate-700 rounded"
              >
                <Plus size={14} />
              </button>
            </div>

            {expandedFolders[folder.id] && (
              <div className="ml-4 border-l border-slate-800 pl-2 space-y-1">
                {folder.topics.map((topic) => (
                  <div key={topic.id} className="space-y-1">
                    <div
                      className="flex items-center group cursor-pointer hover:text-white py-0.5"
                      onClick={() => toggleTopic(topic.id)}
                    >
                      {expandedTopics[topic.id] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      <span className="flex-1 text-sm">{topic.name}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onCreateNote(topic.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-slate-700 rounded"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {expandedTopics[topic.id] && (
                      <div className="ml-4 space-y-1">
                        {topic.notes.map((note) => (
                          <div
                            key={note.id}
                            className="flex items-center text-xs py-1 px-2 cursor-pointer rounded hover:bg-slate-800 hover:text-sky-400 transition-colors"
                            onClick={() => onSelectNote(note)}
                          >
                            <FileText size={12} className="mr-2 opacity-60" />
                            <span className="truncate">{note.title}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
