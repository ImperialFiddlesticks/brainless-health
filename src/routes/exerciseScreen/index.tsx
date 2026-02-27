import "./exerciseStyling.css";
import PhoneFrame from "@/components/PhoneFrame";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useContext } from "react";
import { NumberInput } from "@/components/ui/numberInput";
import { ZombieContext } from "@/context/Zombiecontext";
import ZombieHeader from "@/components/ui/ZombieHeader";
import { Footprints, Dumbbell, Brain, MonitorOff } from "lucide-react";
export const Route = createFileRoute("/exerciseScreen/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [steps, setSteps] = useState(0);
  const [workout, setWorkout] = useState(0);
  const [meditate, setMeditate] = useState(0);
  const [awayscreen, setAwayscreen] = useState(0);
  const { addFood } = useContext(ZombieContext)!;

  function handleSubmit() {
    addFood(Math.floor(steps / 1000));
    setSteps(0);
  }

  return (
    <PhoneFrame>
      <div className="flex-1 flex flex-col items-center p-4  rounded-3xl">
        <ZombieHeader headline="" />
        <h2 className="exercise-heading">Register Activities</h2>

        <NumberInput
          label="Number of steps this week:"
          value={steps}
          onChange={setSteps}
          className="NumberInput"
          icon={<Footprints className="text-[#94e019]  mr-5" size={25} />}
        />
        <NumberInput
          label="Hours of workout this week:"
          value={workout}
          onChange={setWorkout}
          className="NumberInput"
          icon={<Dumbbell className="text-[#94e019]  mr-5" size={25} />}
        />
        <NumberInput
          label="Hours of meditation this week:"
          value={meditate}
          onChange={setMeditate}
          className="NumberInput"
          icon={<Brain className="text-[#94e019]  mr-5" size={25} />}
        />
        <NumberInput
          label="Hours away from brainrot screentime this week:"
          value={awayscreen}
          onChange={setAwayscreen}
          className="NumberInput"
          icon={<MonitorOff className="text-[#94e019] mr-5" size={25} />}
        />

        <button
          type="button"
          onClick={handleSubmit}
          className="mt-10 w-20 h-15 rounded-full text-xl text-black
                     bg-[linear-gradient(180deg,#FAFBB5,#CFE068,#6F9838,#2F4A17)]
                     border-3 border-black cursor-pointer font-bold"
        >
          Save
        </button>
      </div>
    </PhoneFrame>
  );
}
