export function Sparkline({
  series,
  className = "",
}: {
  series: number[];
  className?: string;
}) {
  const width = 88;
  const height = 28;
  const max = Math.max(...series);
  const min = Math.min(...series);
  const span = Math.max(max - min, 1);
  const points = series
    .map((value, index) => {
      const x = (index / (series.length - 1)) * width;
      const y = height - ((value - min) / span) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");
  const rising = series[series.length - 1] >= series[0];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      width={width}
      height={height}
      aria-hidden
    >
      <polyline
        fill="none"
        stroke={rising ? "#d4ff3f" : "#ff4d2a"}
        strokeWidth="2"
        points={points}
      />
    </svg>
  );
}
