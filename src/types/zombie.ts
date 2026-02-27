// health kan ha ett värde mellan tex 0-10, food kan vara hur många hjärnor som finns tillgängliga nu,
// lastFed är ett datum omvandlat till iso-string

export type ZombieStatus = "Happy" | "Hungry" | "Weak" | "Dead";

export type Zombie = {
  health: number;
  food: number;
  brains: number;
  lastFed: string;
  status: ZombieStatus;
};
