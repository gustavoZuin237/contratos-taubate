import { VITE_API_URL } from "./index";

export async function importSpreadsheet(file: File) {
  if (!file) {
    throw new Error("Nenhum arquivo para importar");
  }

  const formData = new FormData();

  formData.append("file", file);

  try {
    const response = await fetch(`${VITE_API_URL}/spreadsheets/import`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      return response.json();
    }
    else {
      throw new Error("Falha na importação");
    }
  } catch {
    throw new Error("Falha na importação");
  }
}

export async function importMultipleSpreadsheets(files: FileList) {
  if (!files) {
    throw new Error("Nenhum arquivo para importar");
  }

  const filesArray = Array.from(files);

  try {
    const results = await Promise.all(
      filesArray.map((file) => importSpreadsheet(file))
    );

    return results;
  } catch {
    throw new Error("Falha na importação");
  }
}
