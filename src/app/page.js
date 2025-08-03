'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCalculatorConfig } from '@/context/CalculatorContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const router = useRouter();
  const { config } = useCalculatorConfig();

  const [size, setSize] = useState('');
  const [color, setColor] = useState('0');
  const [complexity, setComplexity] = useState(1);
  const [shading, setShading] = useState('0');
  const [needles, setNeedles] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();

    const sizeCm = parseInt(size, 10);
    const needleCount = parseInt(needles, 10);

    if (isNaN(sizeCm) || sizeCm <= 0 || isNaN(needleCount)) {
      alert('Informe valores válidos.');
      return;
    }

    const basePrice = (config.pricePerCm || 80) * sizeCm;
    const colorMultiplier = 1 + (parseInt(color) * config.colorIncrement);
    const complexityIncrement = complexity * config.complexityIncrement;
    const shadingIncrement = config.shadingMap[shading] || 0;
    const needleIncrement = needleCount * config.needlePrice;

    const total =
      basePrice * colorMultiplier +
      basePrice * shadingIncrement +
      basePrice * complexityIncrement +
      needleIncrement;

    setResult(total.toFixed(2));
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 flex items-center justify-center p-4 relative">
      <button
        className="unstyled-button absolute top-4 right-4 text-2xl"
        onClick={() => router.push('/config')}
        aria-label="Ir para configurações"
      >
        <FontAwesomeIcon icon={faGear} />
      </button>

      <div className="bg-white rounded-lg shadow p-8 w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Calculadora de Preço de Tatuagem</h1>

        <form className="space-y-6" onSubmit={handleCalculate}>
          <div>
            <label className="block font-medium mb-1">Tamanho em cm:</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-full border rounded-full px-3 py-2"
              value={size}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) setSize(val);
              }}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Coloração:</label>
            <div className="flex flex-col gap-1">
              <label>
                <input type="radio" name="color" value="0" checked={color === '0'} onChange={(e) => setColor(e.target.value)} /> Apenas preto
              </label>
              <label>
                <input type="radio" name="color" value="1" checked={color === '1'} onChange={(e) => setColor(e.target.value)} /> Uma cor
              </label>
              <label>
                <input type="radio" name="color" value="2" checked={color === '2'} onChange={(e) => setColor(e.target.value)} /> Duas cores
              </label>
              <label>
                <input type="radio" name="color" value="3" checked={color === '3'} onChange={(e) => setColor(e.target.value)} /> Três ou mais cores
              </label>
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Complexidade: <span className="font-bold">{complexity}</span>
            </label>
            <input
              type="range"
              min="1"
              max="15"
              value={complexity}
              onChange={(e) => setComplexity(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Sombreamento:</label>
            <div className="flex flex-col gap-1">
              <label>
                <input type="radio" name="shading" value="0" checked={shading === '0'} onChange={(e) => setShading(e.target.value)} /> Não possui
              </label>
              <label>
                <input type="radio" name="shading" value="1" checked={shading === '1'} onChange={(e) => setShading(e.target.value)} /> Possui minoritariamente
              </label>
              <label>
                <input type="radio" name="shading" value="2" checked={shading === '2'} onChange={(e) => setShading(e.target.value)} /> Possui majoritariamente
              </label>
              <label>
                <input type="radio" name="shading" value="3" checked={shading === '3'} onChange={(e) => setShading(e.target.value)} /> Possui totalmente
              </label>
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Quantidade de agulhas:</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-full border rounded-full px-3 py-2"
              value={needles}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) setNeedles(val);
              }}
              required
            />
          </div>

          <button type="submit" className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-800">
            Calcular
          </button>
        </form>

        {result && (
          <div className="mt-6 text-center">
            <p className="text-lg font-semibold">Preço estimado: R$ {result}</p>
          </div>
        )}
      </div>
    </main>
  );
}
