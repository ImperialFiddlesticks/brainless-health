import "./exerciseStyling.css";
import PhoneFrame from "@/components/PhoneFrame";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useContext } from "react";
import { NumberInput } from "@/components/ui/numberInput";
import { ZombieContext } from "@/context/Zombiecontext";
import { addFood } from "@/utils/gameLogic";
import type { Zombie } from "@/types/zombie";

export const Route = createFileRoute("/exerciseScreen/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [steps, setSteps] = useState(0);

  const [workout, setWorkout] = useState(0);
  const [meditate, setMeditate] = useState(0);
  const [awayscreen, setAwayscreen] = useState(0);
  const { setZombie } = useContext(ZombieContext)!;

  function handleSubmit() {
    const earnedFood = Math.floor(steps / 1000);
    setZombie((prev: Zombie) => addFood(prev, earnedFood));
    setSteps(0);
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-xl main-container bg-[#ffffff] h-screen rounded-3xl">
        <h2 className="exercise-heading">Registrera träning</h2>

        <NumberInput
          label="Number of steps this week:"
          value={steps}
          onChange={setSteps}
          className="NumberInput"
        />

        <NumberInput
          label="Hours of workout this week:"
          value={workout}
          onChange={setWorkout}
          className="NumberInput"
        />

        <NumberInput
          label="Hours of meditation this week:"
          value={meditate}
          onChange={setMeditate}
          className="NumberInput"
        />

        <NumberInput
          label="Hours away from brainrot screentime this week:"
          value={awayscreen}
          onChange={setAwayscreen}
          className="NumberInput"
        />

        <button type="button" onClick={handleSubmit}>
          Registrera
        </button>
    <PhoneFrame>
      <div className="w-full h-full flex justify-center">
        <div className="w-l main-container flex flex-col items-center h-full rounded-3xl overflow-x-visible">
          Exercise Screen
        </div>
      </div>
    </PhoneFrame>
  );
}
