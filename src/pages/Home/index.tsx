import { useState } from "react";

import * as s from "./styles";

import { FormFields } from "@components/FormFields/FormFields";
import { Button } from "@components/Button";
import { PageContainer } from "@components/PageContainer";
import { FilenameDialog } from "@components/FilenameDialog";

import { useContractForm } from "../../hooks/useContractForm";
import { useFileExport } from "../../hooks/useFileExport";

import { mockForm } from "../../utils/form/mockForm";

import { flexRender } from "@tanstack/react-table";

import { useTable } from "../../hooks/useTable";
import toast from "react-hot-toast";
import {
  PencilIcon,
  RowsPlusBottomIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import type { NormalizedRow } from "@shared/types/rowFormats";

import { v4 as uuidv4 } from 'uuid';

document.title = "Contratos | PMT";

export function Home() {
  const [debugIterator, setDebugIterator] = useState(1);

  const {
    rows,
    setRows,
    control,
    handleSubmit,
    errors,
    valorTotalAnualDisplay,
    allRequiredFilled,
    handleChange,
    onValidSubmit,
  } = useContractForm();

  const {
    fileInputRef,
    dialogRef,
    handleAppendFile,
    handleCreateNewFile,
    handleExport,
    save,
  } = useFileExport(rows, setRows);

  const { table } = useTable(rows);

  function debugForm() {
    setRows([...rows, mockForm(debugIterator)]);
    setDebugIterator(debugIterator + 1);
  }

  function editCell(cell: any, columnHeader?: string) {
    const currentValue = cell[columnHeader ?? ""];

    const editedValue = window.prompt(
      "Insira o novo valor para esse campo:",
      currentValue
    );

    if (!editedValue || editedValue.trim() == "") return currentValue;

    if (!columnHeader) {
      return;
    }

    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === cell.id
          ? {
              ...row,
              [columnHeader]: editedValue,
            }
          : row
      )
    );
  }

  function duplicateRow(row: NormalizedRow) {
    const duplicateIndex = rows.indexOf(row);

    const rowToDuplicate = {
      ...rows[duplicateIndex],
      id: uuidv4()
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
    <PageContainer title="Registrar contrato">
      <s.InputContainer onSubmit={handleSubmit(onValidSubmit)} noValidate>
        <FormFields
          control={control}
          errors={errors}
          valorTotalAnualDisplay={valorTotalAnualDisplay}
          onFieldChange={handleChange}
        />

        <s.ButtonContainer>
          <Button type="submit" variant="primary" disabled={!allRequiredFilled}>
            Adicionar linha
          </Button>
          <Button
            type="button"
            variant="secondary"
            disabled={rows.length === 0}
            onClick={handleCreateNewFile}
          >
            Novo arquivo
          </Button>
          <Button
            type="button"
            variant="secondary"
            disabled={rows.length === 0}
            onClick={save}
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

      <FilenameDialog
        ref={dialogRef}
        onConfirm={handleExport}
        onCancel={() => {}}
      />
    </PageContainer>
  );
}
