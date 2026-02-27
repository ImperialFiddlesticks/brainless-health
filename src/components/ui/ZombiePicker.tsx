import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const zombies = [
  { id: 1, src: "/zombieTwo.png", name: "Rotsy", enabled: false },
  { id: 2, src: "/happyZombie.png", name: "Bob", enabled: true },
  { id: 3, src: "/zombieThree.png", name: "Grimble", enabled: false },
];

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export default function ZombiePicker() {
  const navigate = useNavigate();
  const [active, setActive] = useState(1); // start at Bob (index 1)
  const startX = useRef<number | null>(null);
  const dragging = useRef(false);
  const cooldown = useRef(false);

  // indices to render: left, center, right (wrap around)
  const trio = useMemo(() => {
    const len = zombies.length;
    const left = mod(active - 1, len);
    const center = mod(active, len);
    const right = mod(active + 1, len);
    return [left, center, right];
  }, [active]);

  const go = (dir: -1 | 1) => {
    if (cooldown.current) return;
    cooldown.current = true;
    setActive((a) => mod(a + dir, zombies.length));
    // tiny cooldown to prevent wheel/drag spamming
    window.setTimeout(() => (cooldown.current = false), 160);
  };

  const handleSelect = (index: number) => {
    // click side -> center it
    if (index !== active) {
      setActive(index);
      return;
    }
    // click center -> navigate if enabled
    if (!zombies[index].enabled) return;
    navigate({ to: "/zombieScreen" });
  };

  // keyboard arrows
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "Enter") handleSelect(active);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  // wheel scroll (trackpad/mouse wheel)
  const onWheel = (e: React.WheelEvent) => {
    // prevent page scrolling while interacting
    e.preventDefault();
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      go(e.deltaX > 0 ? 1 : -1);
    } else {
      go(e.deltaY > 0 ? 1 : -1);
    }
  };

  // pointer drag / swipe
  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    startX.current = e.clientX;
    // (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current || startX.current == null) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 35) {
      go(dx < 0 ? 1 : -1);
      startX.current = e.clientX; // reset so you can keep swiping
    }
  };

  const onPointerUp = () => {
    dragging.current = false;
    startX.current = null;
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full h-full justify-center px-4">
      <h1 className="text-white text-2xl font-bold tracking-widest uppercase mt-20">
        Pick Your Zombie
      </h1>

      <div
        className="w-full flex-1 flex flex-col items-center  select-none touch-pan-y"
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="flex items-center justify-center gap-4 w-full">
          {trio.map((zIndex, slot) => {
            const zombie = zombies[zIndex];
            const isCenter = slot === 1;

            return (
              <button
                key={`${zombie.id}-${slot}`}
                onClick={() => handleSelect(zIndex)}
                className={cn(
                  "flex flex-col items-center transition-all duration-300",
                  isCenter ? "scale-100" : "scale-40 opacity-50",
                  isCenter && !zombie.enabled
                    ? "cursor-not-allowed"
                    : "cursor-pointer",
                )}
              >
                <img
                  src={zombie.src}
                  alt={zombie.name}
                  className={cn(
                    "object-contain transition-all duration-300",
                    isCenter ? "w-96 h-96" : "w-40 h-40",
                  )}
                  draggable={false}
                />
                <span
                  className={cn(
                    "mt-1 font-bold tracking-wide",
                    isCenter
                      ? "text-[#94e019]  text-xl"
                      : "text-white/20 text-sm",
                  )}
                >
                  {zombie.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* dots */}
        <div className="flex justify-center gap-2 mt-6">
          {zombies.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === active ? "bg-[#94e019]  w-4" : "bg-white/30 w-2",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
