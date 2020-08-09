export function validate(n?: number | null) {
  return (n != null) && isFinite(n) ? n : NaN;
}

export function n(n?: number | null, fixed = 0, unit = "") {
  unit = unit && ` ${unit.trim()}`;
  return (n != null) && isFinite(n) ? (fixed ? n.toFixed(fixed) : n) + unit : "N/A";
}

export function percentage(n: number) {
  return `${(n * 100).toFixed(2)}%`;
}
