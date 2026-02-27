import PhoneFrame from "@/components/PhoneFrame";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/exerciseScreen/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PhoneFrame>
      <div className="w-full h-full flex justify-center">
        <div className="w-l main-container flex flex-col items-center h-full rounded-3xl overflow-x-visible">
          Exercise Screen
        </div>
      </div>
    </PhoneFrame>
  );
}
