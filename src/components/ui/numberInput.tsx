import type { ReactNode } from "react";

type Props = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  className?: string;
  icon?: ReactNode;
};

export function NumberInput({
  label,
  value,
  onChange,
  className,
  icon,
}: Props) {
  return (
    <label
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        margin: 10,
        alignItems: "center",
      }}
    >
      {label}
      <div className="flex items-center justify-center">
        {icon}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>
    </label>
  );
}
