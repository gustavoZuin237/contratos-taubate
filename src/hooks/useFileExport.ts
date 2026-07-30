import { useRef } from "react";

import { type FileNameDialogHandle } from "@components/Dialogs/FileNameDialog";

import { exportSpreadsheet } from "../services/api/exportFile";
import { importSpreadsheet } from "../services/api/importFile";

import type { NormalizedRow } from "@shared/types/rowFormats";

import toast from "react-hot-toast";

export function useFileExport(
  rows: NormalizedRow[],
  setRows: (rows: NormalizedRow[]) => void
) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<FileNameDialogHandle>(null);
  const pendingMergedRowsRef = useRef<NormalizedRow[] | null>(null);

  async function handleAppendFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const existingData = await importSpreadsheet(file);
      pendingMergedRowsRef.current = [...existingData.rows, ...rows];
      dialogRef.current?.showModal();
    } catch {
      toast.error("Falha na importação do arquivo");
    }

    event.target.value = "";
  }

  function handleCreateNewFile() {
    if (!rows.length) {
      toast.error("Nenhuma linha para exportar");
      return;
    }
    dialogRef.current?.showModal();
  }

  async function handleExport(fileName: string) {
    const targetRows = pendingMergedRowsRef.current ?? rows;

    try {
      await exportSpreadsheet(fileName, targetRows);
    } catch {
      toast.error("Falha na exportação do arquivo");
      return;
    }

    pendingMergedRowsRef.current = null;
    setRows([]);
  }

  function save() {
    if (!rows.length) {
      toast.error("Nenhuma linha para exportar");
      return;
    }
    fileInputRef.current?.click();
  }

  return {
    fileInputRef,
    dialogRef,
    handleAppendFile,
    handleCreateNewFile,
    handleExport,
    save,
  };
}
