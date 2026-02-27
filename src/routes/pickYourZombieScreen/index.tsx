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
      <div className="w-full h-full flex justify-center">
        <div className="w-l main-container flex flex-col items-center h-full rounded-3xl overflow-x-visible">
          <ZombieHeader headline="" />
          <ZombiePicker />
        </div>
      </div>
    </PhoneFrame>
  );
}
