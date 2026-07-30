export function sanitizeString(value: unknown): string {
  return String(value ?? "").trim();
}
