import { createContext, useMemo, useState, type ReactNode } from "react";

import { normalizeRow } from "../utils/excel/normalizer";

import type { NormalizedRow } from "../types/rowFormats";

type SpreadsheetContextType = {
  rawRows: RawSpreadsheetRow[];
  setRawRows: (rows: RawSpreadsheetRow[]) => void;
  normalizedRows: NormalizedRow[];
};

interface SpreadsheetProviderProps {
  children: ReactNode;
}

type RawSpreadsheetRow = Record<string, unknown>;

export function SpreadsheetProvider({ children }: SpreadsheetProviderProps) {
  const [rawRows, setRawRows] = useState<RawSpreadsheetRow[]>([]);

  const normalizedRows: NormalizedRow[] = useMemo(() => {
    return rawRows.map((row) => {
      return normalizeRow(row);
    });
  }, [rawRows]);

  return (
    <SpreadsheetContext.Provider
      value={{
        rawRows,
        setRawRows,
        normalizedRows,
      }}
    >
      {children}
    </SpreadsheetContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const SpreadsheetContext = createContext<SpreadsheetContextType | null>(
  null
);
