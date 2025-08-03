'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CalculatorContext = createContext();

const LOCAL_STORAGE_KEY = 'tattooCalcConfig';

const defaultConfig = {
  pricePerCm: 15,
  colorIncrement: 0.25,
  complexityIncrement: 0.12,
  shadingMap: {
    '0': 0,
    '1': 0.06,
    '2': 0.08,
    '3': 0.12,
  },
  needlePrice: 8,
};

export function CalculatorProvider({ children }) {
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultConfig;
    } catch {
      return defaultConfig;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
    } catch {
      console.warn('Não foi possível salvar a config no localStorage.');
    }
  }, [config]);

  return (
    <CalculatorContext.Provider value={{ config, setConfig }}>
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculatorConfig() {
  return useContext(CalculatorContext);
}
