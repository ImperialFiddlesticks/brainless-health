import ZombieHeader from "@/components/ui/ZombieHeader";
import ZombiePicker from "@/components/ui/ZombiePicker";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-xl main-container flex flex-col items-center  h-screen rounded-3xl">
        <ZombieHeader headline="Brainless Fitness" />
        <ZombiePicker />
      </div>
    </div>
  );
}
