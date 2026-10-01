export function ScoreBar({
  label,
  value,
  tone = "volt",
}: {
  label: string;
  value: number;
  tone?: "volt" | "heat" | "paper";
}) {
  const color =
    tone === "heat" ? "bg-heat" : tone === "paper" ? "bg-paper" : "bg-volt";

  return (
    <div className="grid grid-cols-[72px_1fr_32px] items-center gap-2 text-[11px] tracking-wide">
      <span className="text-mist">{label}</span>
      <div className="h-[3px] bg-line">
        <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="font-mono text-right tabular-nums text-paper/80">
        {Math.round(value)}
      </span>
    </div>
  );
}
