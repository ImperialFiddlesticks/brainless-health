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
import { createPortal } from "react-dom";
import PhoneFrame from "@/components/PhoneFrame";

function getHealthBarColor(status: ZombieStatus): string {
  if (status === "Dead") return "[&>div]:bg-orange-500 bg-red-500";
  if (status === "Weak") return "[&>div]:bg-orange-500 bg-white/20";
  if (status === "Hungry") return "[&>div]:bg-yellow-500 bg-white/20";
  return "[&>div]:bg-[#6F9838] bg-white/20";
}

export const Route = createFileRoute("/zombieScreen/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const { status, zombie, setHealth, setBrains, experience, addExperience } =
    useContext(ZombieContext)!;
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
    <PhoneFrame>
      <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <div className="flex-1 flex flex-col items-center justify-start overflow-visible">
          <ZombieHeader headline="Bob" />
          <div className="flex flex-col items-center mt-5 overflow-visible">
            <Progress
              value={(experience / maxXP) * 100}
              className="w-70 h-2 bg-white/20 [&>div]:bg-green-500 mt-10"
            />
            <p className="text-white mb-10">Level 1</p>
            <ZombieDropZone status={status} />
            <Progress
              value={zombie.health}
              className={`w-87 h-2 bg-white/20 mt-4 ${getHealthBarColor(status)}`}
            />
            <p className="text-white">Hunger</p>

            <div
              className="bg-white/50 h-50 w-90

              
              flex justify-center flex-wrap items-center gap-2 mt-5 rounded-2xl overflow-visible"
            >
              {Array.from({ length: zombie.brains }).map((_, i) => (
                <Brain key={`brain-${i}`} id={`brain-${i}`} />
              ))}
            </div>
          </div>
        </div>
        <DragOverlay>
          {draggingId &&
            createPortal(
              <img
                alt="brain"
                src="/brain.png"
                className="w-25 h-25 opacity-80"
              />,
              document.body,
            )}
        </DragOverlay>
        <button
          onClick={() => setHealth(0)}
          className="mt-4 text-xs text-red-400 underline opacity-50"
        >
          💀 Kill zombie (demo)
        </button>
      </DndContext>
    </PhoneFrame>
  );
}
