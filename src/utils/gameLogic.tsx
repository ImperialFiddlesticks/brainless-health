import type { Zombie } from "@/types/zombie";

// funktion som hanterar när zombien matas, food minskar, health ökar, nytt datum genereras

export function feedZombie(zombie: Zombie): Zombie {
  if (zombie.food <= 0) return zombie;
  return {
    ...zombie,
    health: Math.min(zombie.health + 1, 10),
    food: zombie.food - 1,
    lastFed: new Date().toISOString(),
  };
}

// Lägga till mat till zombiens förfogande

export function addFood(zombie: Zombie, amount: number): Zombie {
  return {
    ...zombie,
    food: zombie.food + amount,
  };
}

// hantera tid som gått sedan zombien matades senast

export function zombieDecay(zombie: Zombie): Zombie {
  // dagens datum i millisekunder
  const timeNow = Date.now();

  // när zombien senast matades
  const lastFed = new Date(zombie.lastFed).getTime();

  const hourspassed = (timeNow - lastFed) / (1000 * 60 * 60);

  if (hourspassed < 24) return zombie;

  // har det gått mer än 24 timmar sedan sist dras en poäng från health
  return {
    ...zombie,
    health: Math.max(zombie.health - 1, 0),
  };
}
