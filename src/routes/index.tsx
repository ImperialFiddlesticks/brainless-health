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
          <ZombieHeader headline="Brainless Fitness" />
          <img
            alt="brainless fitness logo"
            src="/logo.png"
            className="w-20 h-20 mt-10"
          />
          <Button
            onClick={() => navigate({ to: "/pickYourZombieScreen/" })}
            className="mt-10"
          >
            Start
          </Button>
        </div>
      </div>
    </PhoneFrame>
  );
}
