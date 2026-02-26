import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";
import { ZombieProvider } from "./context/Zombiecontext.tsx";

const router = createRouter({
  routeTree,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ZombieProvider>
      <RouterProvider router={router} />
    </ZombieProvider>
  </StrictMode>,
);
