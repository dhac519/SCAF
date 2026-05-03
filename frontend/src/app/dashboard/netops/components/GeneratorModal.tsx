'use client';

import { useState, useEffect } from 'react';
import { NetOpsCommand } from '@/lib/netops-service';
import { X, Copy, Terminal } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  command: NetOpsCommand;
  onClose: () => void;
}

export default function GeneratorModal({ command, onClose }: Props) {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [output, setOutput] = useState(command.command);

  // Initialize inputs based on variables
  useEffect(() => {
    if (command.variables && Array.isArray(command.variables)) {
      const initial: Record<string, string> = {};
      command.variables.forEach(v => {
        initial[v.name] = '';
      });
      setInputs(initial);
    }
  }, [command]);

  // Update output when inputs change
  useEffect(() => {
    let result = command.command;
    Object.keys(inputs).forEach(key => {
      // Reemplazar todas las instancias de {{variable}}
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
      result = result.replace(regex, inputs[key] || `{{${key}}}`);
    });
    setOutput(result);
  }, [inputs, command.command]);

  const handleInputChange = (key: string, value: string) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast.success('Script copiado al portapapeles');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <div className="flex items-center gap-2">
            <Terminal className="text-emerald-500" size={20} />
            <h2 className="text-lg font-semibold text-white">Generador: {command.title}</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Panel Izquierdo: Inputs */}
          <div className="w-full md:w-1/3 border-r border-slate-800 bg-slate-950 p-4 overflow-y-auto">
            <h3 className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-wider">Parámetros</h3>
            
            {(!command.variables || command.variables.length === 0) ? (
              <p className="text-sm text-slate-500">Este comando no tiene variables configuradas.</p>
            ) : (
              <div className="space-y-4">
                {command.variables.map((v: any, idx: number) => (
                  <div key={idx}>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      {v.label || v.name} <span className="text-slate-600 text-xs font-mono ml-1">({'{' + v.name + '}'})</span>
                    </label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-900 border border-slate-800 rounded-md py-2 px-3 text-white focus:border-emerald-500 focus:outline-none transition-colors"
                      placeholder={`Valor para ${v.label || v.name}`}
                      value={inputs[v.name] || ''}
                      onChange={(e) => handleInputChange(v.name, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            )}
            
            {command.description && (
              <div className="mt-8 p-3 bg-sky-900/20 border border-sky-800/30 rounded-md">
                <p className="text-xs text-sky-300/80 leading-relaxed">{command.description}</p>
              </div>
            )}
          </div>

          {/* Panel Derecho: Preview del Script */}
          <div className="w-full md:w-2/3 bg-[#0d1117] flex flex-col relative">
            <div className="flex justify-between items-center p-2 border-b border-slate-800/50 bg-[#0d1117]/80">
              <span className="text-xs text-slate-500 font-mono ml-2">Salida Generada</span>
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-emerald-600/90 text-slate-300 hover:text-white px-3 py-1.5 rounded transition-all"
              >
                <Copy size={14} /> Copiar Script
              </button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
              <pre className="font-mono text-sm text-emerald-400/90 whitespace-pre-wrap leading-relaxed custom-scrollbar">
                {output}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
