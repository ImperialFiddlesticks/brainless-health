import type { Zombie, ZombieStatus } from "../types/zombie";

// sparar zombie i localstorage och som objektet Zombie

export function saveZombieState(zombie: Zombie) {
  localStorage.setItem("ourzombie", JSON.stringify(zombie));
}

// Kollar om det finns något sparat, returnerar detta, annars null

export function loadZombieState(): Zombie | null {
  const getZombie = localStorage.getItem("ourzombie");
  if (!getZombie) return null;
  const parsed = JSON.parse(getZombie);

  return {
    ...parsed,
    status: (parsed.status ?? "Happy") as ZombieStatus,
  };
}
