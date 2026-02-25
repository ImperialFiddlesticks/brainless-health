import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import ZombieHeader from "@/components/ui/ZombieHeader";

export const Route = createFileRoute("/zombieScreen/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [experience, setExperience] = useState(0);
  const maxXP = 500;
  return (
    <div className="w-full flex justify-center">
      <div className="w-xl main-container flex flex-col items-center  h-screen rounded-3xl">
        <ZombieHeader headline="Bob" />
        <div className="flex flex-col items-center mt-30">
          <img alt="Happy Zombie" src="/happyZombie.png" />
          <Progress
            value={(experience / maxXP) * 100}
            className="w-full h-3 bg-white [&>div]:bg-green-500 mt-10"
          />

          <p className="text-white">Level 1</p>
          <button
            onClick={() => setExperience((prev) => Math.min(prev + 10, 100))}
          >
            +10 XP
          </button>
        </div>
      </div>
    </div>
  );
}
