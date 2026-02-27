type Props = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  className?: string;
};

export function NumberInput({ label, value, onChange, className }: Props) {
  return (
    <label
      className={className}
      style={{ display: "flex", flexDirection: "column", gap: 4 }}
    >
      {label}
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}
