interface ConfidenceBadgeProps {
  score: number;
}

export const ConfidenceBadge = ({ score }: ConfidenceBadgeProps) => {
  const pct = Math.round(score * 100);
  const color =
    pct >= 90
      ? "text-success"
      : pct >= 80
      ? "text-primary"
      : pct >= 70
      ? "text-warning"
      : "text-destructive";

  return (
    <span className={`font-mono font-semibold text-xs ${color}`}>
      {pct}%
    </span>
  );
};
