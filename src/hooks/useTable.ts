import { useMemo, useState } from "react";

import type { NormalizedRow } from "../types/rowFormats";

import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { columns } from "../data/tableColumns";

export function useTable(importedSheet: NormalizedRow[]) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [fornecedorFilter, setFornecedorFilter] = useState("");
  const [secretariaFilter, setSecretariaFilter] = useState("");

  const memoData = useMemo(() => {
    return importedSheet.filter((row) => {
      const matchesGlobal =
        globalFilter === "" ||
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(globalFilter.toLowerCase())
        );

      const matchesSecretaria =
        secretariaFilter === "" ||
        row.secretaria.toLowerCase().includes(secretariaFilter.toLowerCase());

      const matchesFornecedor =
        fornecedorFilter === "" ||
        row.fornecedor.toLowerCase().includes(fornecedorFilter.toLowerCase());

      return matchesGlobal && matchesFornecedor && matchesSecretaria;
    });
  }, [importedSheet, globalFilter, secretariaFilter, fornecedorFilter]);

  const table = useReactTable({
    data: memoData,
    columns,
    state: {
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return {
    globalFilter,
    setGlobalFilter,
    fornecedorFilter,
    setFornecedorFilter,
    secretariaFilter,
    setSecretariaFilter,
    table,
  };
}
