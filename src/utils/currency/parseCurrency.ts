export function parseCurrency(value: unknown): number {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value !== "string") {
    return 0;
  }

  if (!value.trim()) {
    return 0;
  }

  const sanitized = value
    .replace(/[R$\s]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  return Number(sanitized) || 0;
}
