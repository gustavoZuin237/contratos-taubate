import ExcelJS from "exceljs";

import type { NormalizedRow } from "../../interfaces/rowFormats";
import { formatRow } from "@utils/excel/formatRow";

import { formatDate } from "@utils/dates/formatDate";

export async function exportSpreadsheet(
  fileName: string,
  data: NormalizedRow[]
) {
  if (!data || !fileName) {
    throw new Error("Arquivo sem nome ou dados");
  }

  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet(fileName);

  const exportDate = new Date();

  const rowsWithTimestamp = data.map((row) => {
    return formatRow({
      ...row,
      dataExportacao: row.dataExportacao ?? formatDate(exportDate),
    });
  });

  if (!rowsWithTimestamp.length) {
    throw new Error("Falha na exportação");
  }

  const headers = Object.keys(rowsWithTimestamp[0]);

  const headerRows = worksheet.getRow(1);

  worksheet.columns = headers.map((header) => ({
    header,
    key: header,
    width:
      Math.max(
        header.length,
        ...rowsWithTimestamp.map(
          (row) => String(row[header as keyof typeof row] ?? "").length
        )
      ) + 2,
  }));

  worksheet.addRows(rowsWithTimestamp);

  // Bold headers
  headerRows.font = {
    bold: true,
  };

  // Freeze header row
  worksheet.views = [
    {
      state: "frozen",
      ySplit: 1,
    },
  ];

  headerRows.alignment = {
    vertical: "middle",
    horizontal: "center",
  };

  headerRows.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFBFBFBF" },
  };

  // Align data rows to the right
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;

    row.alignment = {
      vertical: "middle",
      horizontal: "right",
    };
  });

  // Enable autofilters
  worksheet.autoFilter = {
    from: "A1",
    to: `${String.fromCharCode(headers.length + 64)}1`,
  };

  // Generate file
  let buffer;

  try {
    buffer = await workbook.xlsx.writeBuffer();
  } catch {
    throw new Error("Falha na geração de arquivo");
  }

  return buffer;
}
