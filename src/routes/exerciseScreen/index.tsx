import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/exerciseScreen/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-xl main-container bg-[#ffffff] h-screen rounded-3xl">
        Exercise Screen
      </div>
    </div>
  );
}
