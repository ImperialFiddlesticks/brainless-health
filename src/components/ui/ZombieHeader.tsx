import { ChevronLeft } from "lucide-react";
import { useRouter } from "@tanstack/react-router";

interface ZombieHeaderProps {
  headline: string;
}

export default function ZombieHeader({ headline }: ZombieHeaderProps) {
  const router = useRouter();

  return (
    <div className="relative flex items-center justify-center w-full px-4 py-3">
      <button
        onClick={() => router.history.back()}
        className="absolute left-4 text-white hover:text-green-400 transition-colors"
      >
        <ChevronLeft size={28} />
      </button>

      <h1 className="text-3xl font-bold text-white">{headline}</h1>
    </div>
  );
}
