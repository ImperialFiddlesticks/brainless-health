import ZombieHeader from "@/components/ui/ZombieHeader";
import ZombiePicker from "@/components/ui/ZombiePicker";
import PhoneFrame from "@/components/PhoneFrame";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pickYourZombieScreen/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PhoneFrame>
      <div className="flex-1 flex flex-col items-center justify-center">
        <ZombieHeader headline="" />
        <ZombiePicker />
      </div>
    </PhoneFrame>
  );
}
