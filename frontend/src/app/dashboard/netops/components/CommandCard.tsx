'use client';

import { NetOpsCommand } from '@/lib/netops-service';
import { Terminal, Copy, Settings2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  command: NetOpsCommand;
  onDelete: () => void;
  onGenerate: () => void;
}

export default function CommandCard({ command, onDelete, onGenerate }: Props) {
  
  const getPlatformColor = (platform: string) => {
    switch(platform) {
      case 'CISCO': return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
      case 'FORTINET': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'WINDOWS': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'LINUX': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'NETWORKING': return 'text-indigo-400';
      case 'SECURITY': return 'text-rose-400';
      case 'TROUBLESHOOTING': return 'text-amber-400';
      case 'SYSTEM': return 'text-emerald-400';
      default: return 'text-slate-400';
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command.command);
    toast.success('Comando copiado al portapapeles');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden flex flex-col hover:border-slate-700 transition-colors group">
      <div className="p-4 border-b border-slate-800 flex justify-between items-start">
        <div>
          <div className="flex gap-2 items-center mb-2">
            <span className={`text-xs px-2 py-0.5 rounded-md border font-mono ${getPlatformColor(command.platform)}`}>
              {command.platform}
            </span>
            <span className={`text-xs font-semibold ${getCategoryColor(command.category)}`}>
              {command.category}
            </span>
          </div>
          <h3 className="font-medium text-slate-200 line-clamp-1" title={command.title}>{command.title}</h3>
        </div>
        <button 
          onClick={onDelete}
          className="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
          title="Eliminar comando"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        {command.description && (
          <p className="text-sm text-slate-500 mb-3 line-clamp-2">{command.description}</p>
        )}
        
        <div className="mt-auto bg-slate-950 p-3 rounded-md font-mono text-sm text-slate-300 relative group/code overflow-hidden border border-slate-800">
          <pre className="whitespace-pre-wrap overflow-x-auto custom-scrollbar pr-8">
            {command.command}
          </pre>
          <button 
            onClick={copyToClipboard}
            className="absolute top-2 right-2 bg-slate-800 p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 opacity-0 group-hover/code:opacity-100 transition-opacity"
          >
            <Copy size={14} />
          </button>
        </div>
      </div>

      {command.isGenerator && (
        <div className="px-4 py-3 bg-slate-800/50 border-t border-slate-800">
          <button 
            onClick={onGenerate}
            className="w-full flex items-center justify-center gap-2 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 py-2 rounded-md transition-colors text-sm font-medium"
          >
            <Settings2 size={16} />
            Generar Configuración
          </button>
        </div>
      )}
    </div>
  );
}
