import { useRef, useState } from "react";

import * as s from "./styles";

import { importMultipleSpreadsheets } from "../../services/api/importFile";
import { exportSpreadsheet } from "../../services/api/exportFile";

import type { NormalizedRow } from "@shared/types/rowFormats";

import { Button } from "@components/Button";
import { PageContainer } from "@components/PageContainer";
import { FileInput } from "@components/FileInput";

import {
  FileNameDialog,
  type FileNameDialogHandle,
} from "@components/Dialogs/FileNameDialog";

import toast from "react-hot-toast";

export function Master() {
  const [mergedSheet, setMergedSheet] = useState<NormalizedRow[]>([]);

  const [inputResetKey, setInputResetKey] = useState(0);
  // * inputResetKey resets the labels in the input component when changed

  const dialogRef = useRef<FileNameDialogHandle>(null);

  async function handleMultipleFileUpload(files: FileList) {
    try {
      const results = await importMultipleSpreadsheets(files);

      const resultsRows = results.map((result) => {
        return result.rows;
      });

      setMergedSheet(resultsRows);
    } catch {
      toast.error("Falha na importação dos arquivos");
      setMergedSheet([]);
      return;
    }
  }

  async function handleExport(fileName: string) {
    try {
      await exportSpreadsheet(fileName, mergedSheet);
    } catch {
      toast.error("Falha na exportação dos arquivos");
      return;
    }

    setMergedSheet([]);

    toast.success("Planilha exportada com sucesso!");

    setInputResetKey((prev) => prev + 1);
  }

  function handleCancel() {
    setMergedSheet([]);

    setInputResetKey((prev) => prev + 1);

    toast.error("Operação cancelada");
  }

  return (
    <PageContainer title="Unir registros">
      <FileInput
        key={inputResetKey}
        onChange={handleMultipleFileUpload}
      />

      <s.ButtonContainer>
        <Button
          variant="primary"
          disabled={mergedSheet.length === 0}
          onClick={() => {
            dialogRef.current?.showModal();
          }}
        >
          Gerar planilha mestre
        </Button>

        <Button variant="danger" onClick={handleCancel}>
          Limpar
        </Button>
      </s.ButtonContainer>

      <FileNameDialog
        ref={dialogRef}
        onConfirm={handleExport}
        onCancel={() => {
          dialogRef.current?.close();
        }}
      />
    </PageContainer>
  );
}
