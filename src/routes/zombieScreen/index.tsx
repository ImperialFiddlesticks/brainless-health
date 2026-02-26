import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import ZombieHeader from "@/components/ui/ZombieHeader";
import { useContext } from "react";
import { ZombieContext } from "@/context/Zombiecontext";
import type { ZombieStatus } from "@/types/zombie";

const zombieImages: Record<ZombieStatus, string> = {
  Happy: "/happyZombie.png",
  Hungry: "/hungryZombie.png",
  Weak: "/weakZombie.png",
  Dead: "/deadZombie.png",
};

export const Route = createFileRoute("/zombieScreen/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [experience, setExperience] = useState(0);
  const { status } = useContext(ZombieContext)!;
  const maxXP = 500;
  return (
    <div className="w-full flex justify-center">
      <div className="w-xl main-container flex flex-col items-center  h-screen rounded-3xl">
        <ZombieHeader headline="Bob" />
        <div className="flex flex-col items-center mt-30">
          <img alt={`${status} Zombie`} src={zombieImages[status]} />
          <Progress
            value={(experience / maxXP) * 100}
            className="w-full h-3 bg-white [&>div]:bg-green-500 mt-10"
          />

          <p className="text-white">Level 1</p>
          {/* <button
            onClick={() => setExperience((prev) => Math.min(prev + 10, 100))}
          >
            +10 XP
          </button> */}
          <div className="bg-white/50 h-55 w-100 flex justify-center flex-wrap mt-5 rounded-2xl">
            <img alt="brain" src="/brain.png" className="w-25 h-25" />
            <img alt="brain" src="/brain.png" className="w-25 h-25" />
            <img alt="brain" src="/brain.png" className="w-25 h-25" />
            <img alt="brain" src="/brain.png" className="w-25 h-25" />
            <img alt="brain" src="/brain.png" className="w-25 h-25" />
          </div>
        </div>
      </div>
    </div>
  );
}
