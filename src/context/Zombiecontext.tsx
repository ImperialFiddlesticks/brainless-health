/* eslint-disable react-refresh/only-export-components */

import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { loadZombieState, saveZombieState } from "../utils/localstorage";
import type { Zombie, ZombieStatus } from "../types/zombie";

// en typ för det som context innehåller
type ZombieContextType = {
  zombie: Zombie;
  setZombie: React.Dispatch<React.SetStateAction<Zombie>>;
  status: ZombieStatus;
  setHealth: (health: number) => void;
};

// Skapa contexten

export const ZombieContext = createContext<ZombieContextType | undefined>(
  undefined,
);

function deriveStatus(zombie: Zombie): ZombieStatus {
  if (zombie.health <= 0) return "Dead";
  if (zombie.health <= 30) return "Weak";
  if (zombie.health <= 75) return "Hungry";
  return "Happy";
}
// Provider-komponenten

export function ZombieProvider({ children }: { children: ReactNode }) {
  const defaultZombie: Zombie = {
    health: 100,
    food: 0,
    lastFed: new Date().toISOString(),
    status: "Happy",
  };
  const setHealth = (health: number) => {
    setZombie((prev) => ({
      ...prev,
      health: Math.max(0, Math.min(100, health)),
    }));
  };

  // useState för vår zombie, default om det inte finns något sparat i localStorage

  const [zombie, setZombie] = useState<Zombie>(() => {
    const loaded = loadZombieState();
    if (!loaded) return defaultZombie;
    return { ...loaded, status: loaded.status as ZombieStatus };
  });

  const status = deriveStatus(zombie);
  // useEffect som känner när zombie-state har ändrats och sparar då till localstorage

  useEffect(() => {
    saveZombieState(zombie);
  }, [zombie]);

  // JSX som returneras

  return (
    <ZombieContext.Provider value={{ zombie, setZombie, status, setHealth }}>
      {children}
    </ZombieContext.Provider>
  );
}
