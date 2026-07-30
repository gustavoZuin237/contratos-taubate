export function parseDate(value: unknown): Date {
  if (!value) return new Date(0, 0, 0);

  const [d, m, y] = String(value).split("/");

  if (!d || !m || !y) return new Date(0, 0, 0);

  const parsedDate = new Date(Number(y), Number(m) - 1, Number(d));

  return parsedDate;
}
