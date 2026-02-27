import { ChevronLeft, Dumbbell } from "lucide-react";
import { useRouter } from "@tanstack/react-router";

interface ZombieHeaderProps {
  headline: string;
}

export default function ZombieHeader({ headline }: ZombieHeaderProps) {
  const router = useRouter();

  return (
    <div className="relative flex items-center justify-center w-full px-4 py-3 h-15">
      <button
        title="go back"
        onClick={() => router.history.back()}
        className="absolute left-4 text-white hover:text-[#94e019]  transition-colors bg-transparent border-none"
      >
        <ChevronLeft size={28} />
      </button>

      <h1 className="text-3xl font-bold text-white">{headline}</h1>
      <button
        onClick={() => router.navigate({ to: "/exerciseScreen/" })}
        className="absolute right-4 text-white hover:text-[#94e019]  transition-colors bg-transparent border-none"
        aria-label="Gå till träning"
        title="Gå till träning"
      >
        <Dumbbell size={28} />
      </button>
    </div>
  );
}
