import { REQUIRED_COLUMNS } from "../../interfaces/spreadsheetColumns";
import type { RawSpreadsheetRow } from "../../interfaces/rowFormats";

export function validateColumns(rows: RawSpreadsheetRow[]) {
  const firstRow = rows[0];

  const missingColumns = REQUIRED_COLUMNS.filter(
    (column) => !(column in firstRow)
  );

  if (!rows.length) {
    throw new Error("O arquivo está vazio.");
  } else if (missingColumns.length > 0) {
    throw new Error(
      "O arquivo não tem o formato esperado. Apenas arquivos .xslx exportados por meio da ferramenta podem ser importados e lidos"
    );
  }
}
