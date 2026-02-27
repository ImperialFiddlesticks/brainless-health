import ZombieHeader from "@/components/ui/ZombieHeader";
import ZombiePicker from "@/components/ui/ZombiePicker";
import PhoneFrame from "@/components/PhoneFrame";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  return (
    <PhoneFrame>
      <div className="w-full h-full flex justify-center">
        <div className="w-full main-container flex flex-col items-center h-full rounded-3xl overflow-x-visible">
          <img
            alt="brainless fitness logo"
            src="/logo3.png"
            className="h-90 mt-10"
          />
          <Button
            onClick={() => navigate({ to: "/pickYourZombieScreen/" })}
            className="mt-10 w-40 h-25 rounded-full text-4xl text-black bg-[linear-gradient(180deg,#FAFBB5,#CFE068,#6F9838,#2F4A17)] border-3 border-black"
          >
            Start
          </Button>
        </div>
      </div>
    </PhoneFrame>
  );
}
