import { useDroppable } from "@dnd-kit/core";
import type { ZombieStatus } from "@/types/zombie";

const zombieImages: Record<ZombieStatus, string> = {
  Happy: "/happyZombie.png",
  Hungry: "/hungryZombie.png",
  Weak: "/weakZombie.png",
  Dead: "/deadZombie.png",
};

interface ZombieDropZoneProps {
  status: ZombieStatus;
}

export default function ZombieDropZone({ status }: ZombieDropZoneProps) {
  const { setNodeRef, isOver } = useDroppable({ id: "zombie" });

  return (
    <div
      ref={setNodeRef}
      className={`transition-all duration-200  rounded-full ${isOver ? "scale-110 drop-shadow-[0_0_20px_rgba(74,222,128,0.8)]" : ""}`}
    >
      <img
        alt={`${status} Zombie`}
        src={zombieImages[status]}
        className=" h-70"
      />
    </div>
  );
}
