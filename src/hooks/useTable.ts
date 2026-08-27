import { useMemo } from "react";

import type { NormalizedRow } from "../interfaces/rowFormats";

import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { columns } from "@data/tableColumns";

export function useTable(importedSheet: NormalizedRow[]) {
  const memoData = useMemo(() => {
    return importedSheet;
  }, [importedSheet]);

  const table = useReactTable({
    data: memoData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return {
    table,
  };
}
