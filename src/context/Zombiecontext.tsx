/* eslint-disable react-refresh/only-export-components */

import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { loadZombieState, saveZombieState } from "../utils/localstorage";
import type { Zombie } from "../types/zombie";

// en typ för det som context innehåller
type ZombieContextType = {
  zombie: Zombie;
  setZombie: React.Dispatch<React.SetStateAction<Zombie>>;
};

// Skapa contexten

export const ZombieContext = createContext<ZombieContextType | undefined>(
  undefined,
);

// Provider-komponenten

export function ZombieProvider({ children }: { children: ReactNode }) {
  const defaultZombie = {
    health: 10,
    food: 0,
    lastFed: new Date().toISOString(),
  };

  // useState för vår zombie, default om det inte finns något sparat i localStorage

  const [zombie, setZombie] = useState<Zombie>(
    () => loadZombieState() ?? defaultZombie,
  );

  // useEffect som känner när zombie-state har ändrats och sparar då till localstorage

  useEffect(() => {
    saveZombieState(zombie);
  }, [zombie]);

  // JSX som returneras

  return (
    <ZombieContext.Provider value={{ zombie, setZombie }}>
      {children}
    </ZombieContext.Provider>
  );
}
