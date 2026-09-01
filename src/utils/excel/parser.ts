import * as XLSX from "xlsx";

import type {
  NormalizedRow,
  RawSpreadsheetRow,
} from "../../interfaces/rowFormats";

import { validateColumns } from "@utils/excel/schemaValidator";

import { normalizeRow } from "@utils/excel/normalizer";

export async function parseSpreadsheet(
  buffer: ArrayBuffer
): Promise<NormalizedRow[]> {
  const workbook = XLSX.read(buffer, {
    type: "array",
  });

  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  const rawRows = XLSX.utils.sheet_to_json<RawSpreadsheetRow>(worksheet, {
    defval: "",
  });

  validateColumns(rawRows);

  return rawRows.map(normalizeRow);
}
