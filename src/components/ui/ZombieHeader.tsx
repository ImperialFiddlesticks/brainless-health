import { ChevronLeft } from "lucide-react";
import { useRouter } from "@tanstack/react-router";

interface ZombieHeaderProps {
  name: string;
}

export default function ZombieHeader({ name }: ZombieHeaderProps) {
  const router = useRouter();

  return (
    <div className="relative flex items-center justify-center w-full px-4 py-3">
      <button
        onClick={() => router.history.back()}
        className="absolute left-4 text-white hover:text-green-400 transition-colors"
      >
        <ChevronLeft size={28} />
      </button>

      <h1 className="text-3xl font-bold text-white">{name}</h1>
    </div>
  );
}
