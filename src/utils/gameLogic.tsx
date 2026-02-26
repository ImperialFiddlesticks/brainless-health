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

// Lägga till mat till zombiens förfogande (kan tas bort eftersom det finns bättre funktion nedan som beräknar)

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

// kontrollerar om vår zombie "dött"
export function isZombieDead(zombie: Zombie): boolean {
  return zombie.health <= 0;
}

// räknar ut hur mycket food man tjänat ihop (exempel)

export function calculateFood(
  minutes: number,
  km: number,
  gympass: number,
): number {
  return Math.floor((minutes * km * gympass) / 10);
}

// lägger till food som zombien kan äta av

export function applyWorkoutAddFood(
  zombie: Zombie,
  minutes: number,
  km: number,
  gympass: number,
): Zombie {
  const earnedFood = calculateFood(minutes, km, gympass);

  return {
    ...zombie,
    food: zombie.food + earnedFood,
  };
}
