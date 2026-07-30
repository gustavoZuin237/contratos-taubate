export function formatCurrency(value: unknown): string {
  if (typeof value === "number") {
    return value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  if (typeof value !== "string") {
    return "0,00";
  }

  if (!value.trim()) {
    return "0,00";
  }

  return value.replace(/[R$\s]/g, "").replace(/[^\d.,]/g, "");
}
