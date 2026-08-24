import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useMemo, useEffect } from "react";

import { FIELDS } from "@data/fields";
import { formSchema, type FormValues } from "@data/fields";

import { masks } from "@utils/masking/masks";
import { normalizeFormData } from "@utils/form/normalizeFormData";
import { parseCurrency } from "@utils/currency/parseCurrency";

import type { NormalizedRow } from "@interfaces/rowFormats";

type StoredRows = {
  rows: NormalizedRow[];
  savedAt: string;
};

const STORAGE_KEY = "contract_rows";

export function useContractForm() {
  const [rows, setRows] = useState<NormalizedRow[]>(() => loadRows());

  useEffect(() => {
    saveRows(rows);
  }, [rows]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(
      Object.keys(FIELDS)
        .filter((name) => !FIELDS[name].readOnly)
        .map((name) => [name, ""])
    ) as FormValues,
    mode: "onChange",
  });

  const watchedValues = useWatch({ control });

  const valorTotalAnual =
    parseCurrency(watchedValues.valorAnual ?? "") +
    parseCurrency(watchedValues.reajusteAnual ?? "") +
    parseCurrency(watchedValues.aditivoAnual ?? "") -
    parseCurrency(watchedValues.supressaoAnual ?? "");

  const valorTotalAnualDisplay =
    valorTotalAnual >= 0
      ? masks.dinheiro(valorTotalAnual.toFixed(2))
      : "Valor inválido";

  const requiredFieldsFilled = useMemo(
    () =>
      Object.entries(FIELDS)
        .filter(([, config]) => config.required && !config.readOnly)
        .every(([name]) => {
          const value = watchedValues[name as keyof FormValues];
          return typeof value === "string"
            ? value.trim().length > 0
            : value != null;
        }),
    [watchedValues]
  );

  function handleChange(
    fieldName: string,
    rawValue: string,
    rhfOnChange: (value: string) => void
  ) {
    const field = FIELDS[fieldName];
    let value = rawValue;

    if (field.sanitize) value = field.sanitize(value);
    if (field.mask) value = masks[field.mask](value);
    if (field.inputMode === "numeric" && !field.sanitize)
      value = value.replace(/\D/g, "");

    rhfOnChange(value);
  }

  function onValidSubmit(data: FormValues) {
    setRows((prev) => [...prev, normalizeFormData(data)]);
    reset();
  }

  // localStorage functions to persist tables temporarily
  function loadRows(): NormalizedRow[] {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return [];

    try {
      const data: StoredRows = JSON.parse(saved);

      return data.rows;
    } catch {
      return [];
    }
  }

  function saveRows(rows: NormalizedRow[]) {
    const data: StoredRows = {
      rows,
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function clearRows() {
    localStorage.removeItem(STORAGE_KEY);
  }

  return {
    rows,
    setRows,
    control,
    handleSubmit,
    reset,
    errors,
    valorTotalAnualDisplay,
    requiredFieldsFilled,
    handleChange,
    onValidSubmit,
    saveRows,
    loadRows,
    clearRows,
  };
}
