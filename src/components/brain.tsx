import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface BrainProps {
  id: string;
}

export default function Brain({ id }: BrainProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  return (
    <img
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      alt="brain"
      src="/brain.png"
      className="w-25 h-25"
    />
  );
}
