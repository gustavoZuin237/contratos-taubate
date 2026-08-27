import { parseSpreadsheet } from "@utils/excel/parser";

export async function importSpreadsheet(files: FileList) {
  if (files.length === 0) {
    throw new Error("Nenhum arquivo para importar");
  }

  const results = await Promise.all(
    Array.from(files).map(async (file) => {
      const buffer = await file.arrayBuffer();
      return parseSpreadsheet(buffer);
    })
  );

  return results;
}
