export type MaskType = "orgao" | "processo" | "dotacao" | "data" | "dinheiro";

type MaskFunction = (value: string) => string;

const onlyDigits = (value: string) => value.replace(/\D/g, "");

export const masks: Record<MaskType, MaskFunction> = {
  orgao: (value) => {
    const numbers = onlyDigits(value);

    return numbers
      .slice(0, 6)
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{2})(\d)/, "$1.$2");
  },

  processo: (value) => value.replace(/[^0-9/]/g, "").slice(0, 9),

  data: (value) => {
    const numbers = onlyDigits(value);

    const dd = numbers.slice(0, 2).padEnd(2, "0");
    const mm = numbers.slice(2, 4).padEnd(2, "0");
    const yy = numbers.slice(4, 6);

    const clampedDd =
      numbers.length >= 2
        ? String(Math.min(Math.max(parseInt(dd), 1), 31)).padStart(2, "0")
        : numbers.slice(0, 2);

    const clampedMm =
      numbers.length >= 4
        ? String(Math.min(Math.max(parseInt(mm), 1), 12)).padStart(2, "0")
        : numbers.slice(2, 4);

    const parts = [clampedDd, clampedMm, yy].filter(Boolean);
    return parts.join("/").slice(0, 8);
  },

  dinheiro: (value) => {
    const numbers = onlyDigits(value);

    const amount = Number(numbers) / 100;

    return amount.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  },

  dotacao: (value) => {
    const numbers = value.replace(/\D/g, "").slice(0, 25);

    const parts = [
      numbers.slice(0, 6), // Slices after 6 digits, xxxxxx - 6 digits
      numbers.slice(6, 10), // Slices after 10 digits, xxxx - 4 digits
      numbers.slice(10, 12), // Slices after 12 digits, xx - 2 digits
      numbers.slice(12, 14), // Slices after 14 digits, xx - 2 digits
      numbers.slice(14, 17), // Slices after 17 digits, xxx - 3 digits
      numbers.slice(17, 21), // Slices after 21 digits, xxxx - 4 digits
      numbers.slice(21, 25), // Slices after 25 digits, xxxx - 4 digits
    ].filter(Boolean);

    // After joining each part with a ".", the end result is xxxxxx.xxxx.xx.xx.xxx.xxxx.xxxx
    return parts.join(".");
  },
};
