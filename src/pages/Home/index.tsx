import { useRef, useState } from "react";

import * as s from "./styles";

import { FormFields } from "@components/FormFields/FormFields";
import { Button } from "@components/Button";
import { PageContainer } from "@components/PageContainer";
import { FileNameDialog } from "@components/Dialogs/FileNameDialog";
import {
  EditCellDialog,
  type EditCellDialogHandle,
} from "@components/Dialogs/EditTableCellDialog";

import { useContractForm } from "../../hooks/useContractForm";
import { exportSpreadsheet } from "../../services/export";

import { mockForm } from "../../utils/form/mockForm";
import { FIELDS, type FormValues } from "../../data/fields";

import { flexRender } from "@tanstack/react-table";

import { useTable } from "../../hooks/useTable";
import toast from "react-hot-toast";
import {
  PencilIcon,
  RowsPlusBottomIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import type { NormalizedRow } from "../../types/rowFormats";

import { v4 as uuidv4 } from "uuid";
import { useFileExport } from "../../hooks/useFileExport";

document.title = "Contratos | PMT";

export function Home() {
  const [debugIterator, setDebugIterator] = useState(1);

  const editCellDialogRef = useRef<EditCellDialogHandle>(null);
  const [pendingEdit, setPendingEdit] = useState<{
    rowId: string;
    columnHeader: string;
  } | null>(null);

  const {
    rows,
    setRows,
    control,
    handleSubmit,
    errors,
    valorTotalAnualDisplay,
    requiredFieldsFilled,
    handleChange,
    onValidSubmit,
  } = useContractForm();

  const { fileInputRef, dialogRef, handleAppendFile, handleCreateNewFile } =
    useFileExport(rows, setRows);

  const { table } = useTable(rows);

  async function handleExport(fileName: string) {
    try {
      const buffer = await exportSpreadsheet(fileName, rows);

      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName}.xlsx`;

      link.click();

      URL.revokeObjectURL(url);
    } catch {
      toast.error("Falha na exportação dos arquivos");
      return;
    }

    setRows([]);

    toast.success("Planilha exportada com sucesso!");
  }

  function debugForm() {
    setRows([...rows, mockForm(debugIterator)]);
    setDebugIterator(debugIterator + 1);
  }

  function editCell(row: NormalizedRow, columnHeader?: string) {
    if (!columnHeader) {
      toast.error("Falha na edição!");
      return;
    }

    const currentValue = (row as any)[columnHeader] ?? "";
    const config = FIELDS[columnHeader as keyof FormValues];

    setPendingEdit({ rowId: row.id, columnHeader });
    editCellDialogRef.current?.showModal(
      String(currentValue),
      config?.label ?? columnHeader,
      config
    );
  }

  function handleEditConfirm(editedValue: string) {
    if (!pendingEdit) return;

    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === pendingEdit.rowId
          ? {
              ...row,
              [pendingEdit.columnHeader]: editedValue,
            }
          : row
      )
    );

    setPendingEdit(null);
  }

  function handleEditCancel() {
    setPendingEdit(null);
  }

  function duplicateRow(row: NormalizedRow) {
    const duplicateIndex = rows.indexOf(row);

    const rowToDuplicate = {
      ...rows[duplicateIndex],
      id: uuidv4(),
    };

    const newArray = [
      ...rows.slice(0, duplicateIndex + 1),
      rowToDuplicate,
      ...rows.slice(duplicateIndex + 1),
    ];

    setRows(newArray);
  }

  function deleteRow(rowId: string) {
    const deleteIndex = Number(rowId);

    setRows((prevRows) => prevRows.filter((_, index) => index !== deleteIndex));
  }

  return (
    <PageContainer>
      <s.InputContainer onSubmit={handleSubmit(onValidSubmit)} noValidate>
        <FormFields
          control={control}
          errors={errors}
          valorTotalAnualDisplay={valorTotalAnualDisplay}
          onFieldChange={handleChange}
        />

        <s.ButtonContainer>
          <Button
            type="submit"
            variant="primary"
            onClick={() => {
              !requiredFieldsFilled &&
                toast.error("Verifique os campos obrigatórios!");
            }}
          >
            Adicionar linha
          </Button>
          <Button
            type="button"
            variant="secondary"
            disabled={rows.length === 0}
            onClick={handleCreateNewFile}
          >
            Salvar arquivo
          </Button>
          <Button
            type="button"
            variant="secondary"
            disabled={rows.length === 0}
            onClick={() => {
              fileInputRef.current?.click();
            }}
          >
            Atualizar arquivo
          </Button>

          {import.meta.env.DEV && (
            <Button type="button" variant="ghost" onClick={() => debugForm()}>
              DEBUG
            </Button>
          )}
        </s.ButtonContainer>
      </s.InputContainer>

      {rows.length > 0 && (
        <s.RowCount>
          {rows.length}{" "}
          {rows.length === 1 ? "linha adicionada" : "linhas adicionadas"}
          <Button
            variant="danger"
            onClick={() => {
              setRows([]);
              setDebugIterator(1)
            }}
          >
            Limpar
          </Button>
        </s.RowCount>
      )}

      {rows.length > 0 && (
        <s.TableWrapper>
          <s.StyledTable>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) =>
                    header.isPlaceholder ||
                    header.column.columnDef.header ===
                      "Data de exportação" ? null : (
                      <s.StyledTableHeader key={header.id}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </s.StyledTableHeader>
                    )
                  )}
                  <s.StyledTableHeader>Duplicar linha</s.StyledTableHeader>

                  <s.StyledTableHeader>Excluir linha</s.StyledTableHeader>
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) =>
                    "accessorKey" in cell.column.columnDef &&
                    cell.column.columnDef.accessorKey ==
                      "dataExportacao" ? null : (
                      <s.StyledTableCell key={cell.id}>
                        <s.TableIconButton
                          onClick={() => {
                            if ("accessorKey" in cell.column.columnDef) {
                              editCell(
                                cell.row.original,
                                cell.column.columnDef.accessorKey
                              );
                            } else {
                              toast.error("Falha na edição!");
                            }
                          }}
                        >
                          <PencilIcon size={16} />
                        </s.TableIconButton>

                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </s.StyledTableCell>
                    )
                  )}

                  <s.StyledTableCell>
                    <s.DuplicateRowButton
                      onClick={() => {
                        duplicateRow(row.original);
                      }}
                    >
                      <RowsPlusBottomIcon size={28} />
                    </s.DuplicateRowButton>
                  </s.StyledTableCell>

                  <s.StyledTableCell>
                    <s.DeleteRowButton
                      onClick={() => {
                        deleteRow(row.id);
                      }}
                    >
                      <TrashIcon size={28} />
                    </s.DeleteRowButton>
                  </s.StyledTableCell>
                </tr>
              ))}
            </tbody>
          </s.StyledTable>
        </s.TableWrapper>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls"
        style={{ display: "none" }}
        onChange={handleAppendFile}
      />

      <FileNameDialog
        ref={dialogRef}
        onConfirm={handleExport}
        onCancel={() => {}}
      />

      <EditCellDialog
        ref={editCellDialogRef}
        onConfirm={handleEditConfirm}
        onCancel={handleEditCancel}
        onChange={(rawValue, setValue) => {
          if (!pendingEdit) return;
          handleChange(pendingEdit.columnHeader, rawValue, setValue);
        }}
      />
    </PageContainer>
  );
}
