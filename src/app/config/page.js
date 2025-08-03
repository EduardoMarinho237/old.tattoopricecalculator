'use client';

import { useCalculatorConfig } from '@/context/CalculatorContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ConfigPage() {
  const { config, setConfig } = useCalculatorConfig();
  const router = useRouter();

  const [localConfig, setLocalConfig] = useState(config);

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfig(localConfig);
    router.push('/');
  };

  const updateField = (field, value) => {
    setLocalConfig(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateShading = (key, value) => {
    setLocalConfig(prev => ({
      ...prev,
      shadingMap: {
        ...prev.shadingMap,
        [key]: parseFloat(value),
      },
    }));
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-800 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Configurações de Cálculo</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium mb-1">Preço por cm (R$):</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={localConfig.pricePerCm ?? 80}
              onChange={e => updateField('pricePerCm', parseFloat(e.target.value))}
              className="w-full border px-2 py-1 rounded-full"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Acréscimo por cor adicional:</label>
            <input
              type="number"
              step="0.01"
              value={localConfig.colorIncrement}
              onChange={e => updateField('colorIncrement', parseFloat(e.target.value))}
              className="w-full border px-2 py-1 rounded-full"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Acréscimo por complexidade (por ponto):</label>
            <input
              type="number"
              step="0.01"
              value={localConfig.complexityIncrement}
              onChange={e => updateField('complexityIncrement', parseFloat(e.target.value))}
              className="w-full border px-2 py-1 rounded-full"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Valor por agulha:</label>
            <input
              type="number"
              step="1"
              value={localConfig.needlePrice}
              onChange={e => updateField('needlePrice', parseInt(e.target.value))}
              className="w-full border px-2 py-1 rounded-full"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Valores de sombreamento:</label>
            <div className="space-y-1">
              <label className="block">
                Não possui (0):{' '}
                <input
                  type="number"
                  step="0.01"
                  value={localConfig.shadingMap['0']}
                  onChange={e => updateShading('0', e.target.value)}
                  className="ml-2 border px-2 py-1 rounded-full"
                />
              </label>
              <label className="block">
                Minoritariamente (1):{' '}
                <input
                  type="number"
                  step="0.01"
                  value={localConfig.shadingMap['1']}
                  onChange={e => updateShading('1', e.target.value)}
                  className="ml-2 border px-2 py-1 rounded-full"
                />
              </label>
              <label className="block">
                Majoritariamente (2):{' '}
                <input
                  type="number"
                  step="0.01"
                  value={localConfig.shadingMap['2']}
                  onChange={e => updateShading('2', e.target.value)}
                  className="ml-2 border px-2 py-1 rounded-full"
                />
              </label>
              <label className="block">
                Totalmente (3):{' '}
                <input
                  type="number"
                  step="0.01"
                  value={localConfig.shadingMap['3']}
                  onChange={e => updateShading('3', e.target.value)}
                  className="ml-2 border px-2 py-1 rounded-full"
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-800 mt-4"
          >
            Salvar e Voltar
          </button>
        </form>
      </div>
    </main>
  );
}
