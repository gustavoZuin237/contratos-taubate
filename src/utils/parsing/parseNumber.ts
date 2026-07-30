export function parseNumber(value: unknown): number {
  if (typeof value === "string" && value.trim() === "") return 0;

  return Number(value) || 0;
}
