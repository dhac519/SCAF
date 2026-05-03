'use client';

import { useState } from 'react';
import { NetOpsService, NetOpsPlatform, NetOpsCategory } from '@/lib/netops-service';
import { X, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddCommandModal({ onClose, onSuccess }: Props) {
  const [title, setTitle] = useState('');
  const [command, setCommand] = useState('');
  const [description, setDescription] = useState('');
  const [platform, setPlatform] = useState<NetOpsPlatform>(NetOpsPlatform.CISCO);
  const [category, setCategory] = useState<NetOpsCategory>(NetOpsCategory.NETWORKING);
  const [isGenerator, setIsGenerator] = useState(false);
  const [variables, setVariables] = useState<{name: string, label: string}[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddVariable = () => {
    setVariables([...variables, { name: '', label: '' }]);
  };

  const handleRemoveVariable = (index: number) => {
    setVariables(variables.filter((_, i) => i !== index));
  };

  const handleVariableChange = (index: number, field: 'name' | 'label', value: string) => {
    const newVars = [...variables];
    newVars[index][field] = value;
    setVariables(newVars);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !command) {
      toast.error('Título y Comando son obligatorios');
      return;
    }

    setIsSubmitting(true);
    try {
      await NetOpsService.createCommand({
        title,
        command,
        description,
        platform,
        category,
        isGenerator,
        variables: isGenerator ? variables : undefined
      });
      toast.success('Comando creado exitosamente');
      onSuccess();
    } catch (error) {
      toast.error('Error al crear el comando');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <h2 className="text-lg font-semibold text-white">Nuevo Comando Net-Ops</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          <form id="add-command-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Título</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-md py-2 px-3 text-white focus:border-emerald-500 focus:outline-none"
                  placeholder="Ej: Configurar VLAN"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Plataforma</label>
                  <select 
                    className="w-full bg-slate-950 border border-slate-800 rounded-md py-2 px-3 text-white focus:border-emerald-500 focus:outline-none"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as NetOpsPlatform)}
                  >
                    {Object.keys(NetOpsPlatform).map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Categoría</label>
                  <select 
                    className="w-full bg-slate-950 border border-slate-800 rounded-md py-2 px-3 text-white focus:border-emerald-500 focus:outline-none"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as NetOpsCategory)}
                  >
                    {Object.keys(NetOpsCategory).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Comando / Script</label>
              <textarea 
                className="w-full h-32 bg-slate-950 border border-slate-800 rounded-md py-2 px-3 text-white focus:border-emerald-500 focus:outline-none font-mono text-sm custom-scrollbar"
                placeholder="Ej: vlan {{vlan_id}} \n name {{vlan_name}}"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Descripción (Opcional)</label>
              <input 
                type="text" 
                className="w-full bg-slate-950 border border-slate-800 rounded-md py-2 px-3 text-white focus:border-emerald-500 focus:outline-none"
                placeholder="Notas adicionales o explicaciones"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2 mb-4">
                <input 
                  type="checkbox" 
                  id="isGenerator" 
                  className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-900"
                  checked={isGenerator}
                  onChange={(e) => setIsGenerator(e.target.checked)}
                />
                <label htmlFor="isGenerator" className="text-sm font-medium text-slate-200">Convertir en Generador de Configuración (Script Builder)</label>
              </div>

              {isGenerator && (
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-sm text-slate-400">Define las variables que usarás en el comando (ej: <code className="text-emerald-400">{'{{variable}}'}</code>)</p>
                    <button 
                      type="button" 
                      onClick={handleAddVariable}
                      className="text-xs bg-slate-800 hover:bg-slate-700 text-white px-2 py-1 rounded flex items-center gap-1 transition-colors"
                    >
                      <Plus size={14} /> Agregar Variable
                    </button>
                  </div>
                  
                  {variables.length === 0 ? (
                    <p className="text-sm text-slate-600 text-center py-4">No hay variables definidas.</p>
                  ) : (
                    <div className="space-y-2">
                      {variables.map((v, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <input 
                            type="text" 
                            placeholder="Nombre (ej: vlan_id)" 
                            className="flex-1 bg-slate-900 border border-slate-800 rounded text-sm py-1.5 px-2 text-white"
                            value={v.name}
                            onChange={(e) => handleVariableChange(index, 'name', e.target.value)}
                          />
                          <input 
                            type="text" 
                            placeholder="Etiqueta (ej: ID de VLAN)" 
                            className="flex-1 bg-slate-900 border border-slate-800 rounded text-sm py-1.5 px-2 text-white"
                            value={v.label}
                            onChange={(e) => handleVariableChange(index, 'label', e.target.value)}
                          />
                          <button 
                            type="button" 
                            onClick={() => handleRemoveVariable(index)}
                            className="text-slate-500 hover:text-red-400 p-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </form>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-900/80 flex justify-end gap-3">
          <button 
            type="button" 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            form="add-command-form"
            disabled={isSubmitting}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Guardando...' : 'Guardar Comando'}
          </button>
        </div>
      </div>
    </div>
  );
}
