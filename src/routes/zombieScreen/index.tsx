import { createFileRoute } from "@tanstack/react-router";
import { useState, useContext } from "react";
import { Progress } from "@/components/ui/progress";
import ZombieHeader from "@/components/ui/ZombieHeader";
import { ZombieContext } from "@/context/Zombiecontext";
import Brain from "@/components/brain";
import ZombieDropZone from "@/components/ZombieDropZone";
import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import type { ZombieStatus } from "@/types/zombie";

function getHealthBarColor(status: ZombieStatus): string {
  if (status === "Dead") return "[&>div]:bg-orange-500 bg-red-500";
  if (status === "Weak") return "[&>div]:bg-orange-500 bg-white";
  if (status === "Hungry") return "[&>div]:bg-yellow-500 bg-white";
  return "[&>div]:bg-green-500 bg-white";
}

export const Route = createFileRoute("/zombieScreen/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [experience, setExperience] = useState(0);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const { status, zombie, setHealth, setBrains } = useContext(ZombieContext)!;
  const maxXP = 500;

  const handleDragStart = (event: DragStartEvent) => {
    setDraggingId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over?.id === "zombie") {
      setHealth(zombie.health + 10);
      setBrains(zombie.brains - 1);
    }
    setDraggingId(null);
  };

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <div className="w-full flex justify-center">
        <div className="w-xl main-container flex flex-col items-center  h-screen rounded-3xl">
          <ZombieHeader headline="Bob" />
          <div className="flex flex-col items-center mt-5">
            <Progress
              value={(experience / maxXP) * 100}
              className="w-70 h-3 bg-white [&>div]:bg-green-500 mt-10"
            />
            <p className="text-white mb-10">Level 1</p>
            <ZombieDropZone status={status} />
            <Progress
              value={zombie.health}
              className={`w-70 h-3 bg-white mt-4 ${getHealthBarColor(status)}`}
            />
            <p className="text-white">Hunger</p>

            <div className="bg-white/50 h-55 w-100 flex justify-center flex-wrap mt-5 rounded-2xl">
              {Array.from({ length: zombie.brains }).map((_, i) => (
                <Brain key={`brain-${i}`} id={`brain-${i}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <DragOverlay>
        {draggingId && (
          <img alt="brain" src="/brain.png" className="w-25 h-25 opacity-80" />
        )}
      </DragOverlay>
    </DndContext>
  );
}
