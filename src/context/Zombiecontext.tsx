/* eslint-disable react-refresh/only-export-components */

import { createContext, useState, useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { loadZombieState, saveZombieState } from "../utils/localstorage";
import type { Zombie, ZombieStatus } from "../types/zombie";
import { isZombieDead } from "@/utils/gameLogic";

// en typ för det som context innehåller
type ZombieContextType = {
  zombie: Zombie;
  setZombie: React.Dispatch<React.SetStateAction<Zombie>>;
  status: ZombieStatus;
  setHealth: (health: number) => void;
  setBrains: (brains: number) => void;
  addFood: (food: number) => void;
  experience: number;
  addExperience: (xp: number) => void;
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
    health: 20,
    food: 0,
    lastFed: new Date().toISOString(),
    status: "Happy",
    brains: 0,
    experience: 0,
  };
  const setHealth = (health: number) => {
    setZombie((prev) => ({
      ...prev,
      health: Math.max(0, Math.min(100, health)),
    }));
  };
  const setBrains = (brains: number) => {
    setZombie((prev) => ({ ...prev, brains }));
  };

  const addExperience = (xp: number) => {
    setZombie((prev) => ({ ...prev, experience: prev.experience + xp }));
  };
  // useState för vår zombie, default om det inte finns något sparat i localStorage
  const addFood = (food: number) => {
    setZombie((prev) => {
      const newFood = prev.food + food;
      const earnedBrains = Math.floor(newFood / 10);
      const remainingFood = newFood % 10;
      return {
        ...prev,
        food: remainingFood,
        brains: prev.brains + earnedBrains,
      };
    });
  };
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

  // kolla om zombien är död när zombie uppdateras

  useEffect(() => {
    const dead = isZombieDead(zombie);
    if (dead) {
      console.log("Din zombie är död!");
      alert("Your zombie has died!");
    }
  }, [zombie]);

  // JSX som returneras

  const value = useMemo(
    () => ({
      zombie,
      setZombie,
      status,
      setHealth,
      setBrains,
      addFood,
      experience: zombie.experience,
      addExperience,
    }),
    [zombie, status],
  );

  return (
    <ZombieContext.Provider value={value}>
      {children}
    </ZombieContext.Provider>
  );
}
