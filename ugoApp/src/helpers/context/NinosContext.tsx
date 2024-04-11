// NinosContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Nino } from '../../types/nino';

// Definimos el tipo para el estado de los niños
interface NinosState {
  ninos: Nino[];
  setNinos: React.Dispatch<React.SetStateAction<Nino[]>>;
}

// Creamos el contexto con el tipo que acabamos de definir
const NinosContext = createContext<NinosState | undefined>(undefined);

// Definimos un hook personalizado para acceder al contexto
export const useNinos = () => {
  const context = useContext(NinosContext);
  if (!context) {
    throw new Error('useNinos debe usarse dentro de un NinosProvider');
  }
  return context;
};

// Definimos el proveedor de contexto
export const NinosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ninos, setNinos] = useState<Nino[]>([]);

  return (
    <NinosContext.Provider value={{ ninos, setNinos }}>
      {children}
    </NinosContext.Provider>
  );
};
