import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <div className="flex justify-center m-10 ">
        <h1 className="font-bold text-4xl text-black">Brainless Bob</h1>
      </div>
      <Outlet />
    </React.Fragment>
  );
}
