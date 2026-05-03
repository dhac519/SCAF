'use client';

import { useEffect, useState } from 'react';
import { NetOpsService, NetOpsCommand, NetOpsPlatform } from '@/lib/netops-service';
import { Search, Plus, Terminal, Shield, Network, Monitor, Code } from 'lucide-react';
import { toast } from 'sonner';
import CommandCard from './components/CommandCard';
import AddCommandModal from './components/AddCommandModal';
import GeneratorModal from './components/GeneratorModal';

export default function NetOpsPage() {
  const [commands, setCommands] = useState<NetOpsCommand[]>([]);
  const [filteredCommands, setFilteredCommands] = useState<NetOpsCommand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('ALL');
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [generatorCommand, setGeneratorCommand] = useState<NetOpsCommand | null>(null);

  useEffect(() => {
    loadCommands();
  }, []);

  useEffect(() => {
    filterCommands();
  }, [commands, search, selectedPlatform]);

  const loadCommands = async () => {
    try {
      const data = await NetOpsService.getCommands();
      setCommands(data);
    } catch (error) {
      toast.error('Error al cargar comandos');
    } finally {
      setIsLoading(false);
    }
  };

  const filterCommands = () => {
    let result = commands;

    if (selectedPlatform !== 'ALL') {
      result = result.filter(c => c.platform === selectedPlatform);
    }

    if (search.trim() !== '') {
      const q = search.toLowerCase();
      result = result.filter(c => 
        c.title.toLowerCase().includes(q) || 
        c.command.toLowerCase().includes(q) ||
        (c.description && c.description.toLowerCase().includes(q))
      );
    }

    setFilteredCommands(result);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este comando?')) return;
    try {
      await NetOpsService.deleteCommand(id);
      toast.success('Comando eliminado');
      loadCommands();
    } catch (error) {
      toast.error('Error al eliminar');
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 p-6 overflow-y-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Terminal className="text-emerald-500" />
            Net-Ops Hub
          </h1>
          <p className="text-slate-400 mt-1">Diccionario centralizado y generador de configuración.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
        >
          <Plus size={18} /> Nuevo Comando
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por comando o descripción (Ctrl+K)..." 
            className="w-full bg-slate-950 border border-slate-800 rounded-md py-2 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500 transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {['ALL', 'CISCO', 'FORTINET', 'WINDOWS', 'LINUX', 'GENERIC'].map(platform => (
            <button
              key={platform}
              onClick={() => setSelectedPlatform(platform)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedPlatform === platform 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-transparent'
              }`}
            >
              {platform === 'ALL' ? 'Todos' : platform}
            </button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      {isLoading ? (
        <div className="flex justify-center py-20 text-slate-500">Cargando...</div>
      ) : filteredCommands.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500 bg-slate-900/50 border border-slate-800 border-dashed rounded-lg">
          <Code size={48} className="mb-4 opacity-50 text-slate-400" />
          <h3 className="text-xl font-medium text-slate-300">No hay comandos</h3>
          <p>Añade tu primer comando para empezar a usar la base de datos.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommands.map(cmd => (
            <CommandCard 
              key={cmd.id} 
              command={cmd} 
              onDelete={() => handleDelete(cmd.id)}
              onGenerate={() => setGeneratorCommand(cmd)}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {isAddModalOpen && (
        <AddCommandModal 
          onClose={() => setIsAddModalOpen(false)} 
          onSuccess={() => {
            setIsAddModalOpen(false);
            loadCommands();
          }} 
        />
      )}

      {generatorCommand && (
        <GeneratorModal 
          command={generatorCommand} 
          onClose={() => setGeneratorCommand(null)} 
        />
      )}
    </div>
  );
}
