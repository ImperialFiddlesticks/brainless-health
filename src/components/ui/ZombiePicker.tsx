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
    <div className="flex flex-col items-center gap-8 w-full py-12">
      <h1 className="text-white text-3xl font-bold tracking-widest uppercase">
        Choose Your Zombie
      </h1>

      <div
        className="w-full max-w-3xl px-4 select-none touch-pan-y"
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="grid grid-cols-3 items-center gap-4">
          {trio.map((zIndex, slot) => {
            const zombie = zombies[zIndex];
            const isCenter = slot === 1;
            const isActive = zIndex === active;

            return (
              <button
                key={`${zombie.id}-${slot}`}
                onClick={() => handleSelect(zIndex)}
                className={cn(
                  "flex flex-col items-center rounded-2xl transition-all duration-300",
                  isCenter ? "scale-110 p-6" : "scale-90 opacity-50 p-4",
                  isCenter && !zombie.enabled
                    ? "cursor-not-allowed"
                    : "cursor-pointer",
                )}
                aria-current={isActive ? "true" : "false"}
              >
                <img
                  src={zombie.src}
                  alt={zombie.name}
                  className={cn(
                    "object-contain transition-all duration-300",
                    isCenter ? "w-40 h-40" : "w-24 h-24",
                  )}
                  draggable={false}
                />
                <span
                  className={cn(
                    "mt-3 font-bold tracking-wide",
                    isCenter
                      ? "text-green-400 text-lg"
                      : "text-white/40 text-sm",
                  )}
                >
                  {zombie.name}
                </span>
                {isCenter && (
                  <span className="mt-2 text-xs animate-pulse text-white/80">
                    {zombie.enabled ? "🧠 Tap to choose" : "Coming soon"}
                  </span>
                )}
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
                i === active ? "bg-green-400 w-4" : "bg-white/30 w-2",
              )}
              aria-label={`Go to ${zombies[i].name}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
