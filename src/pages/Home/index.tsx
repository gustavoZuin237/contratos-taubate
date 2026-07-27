import { useState } from "react";

import * as s from "./styles";

import { FormFields } from "@components/FormFields/FormFields";
import { Button } from "@components/Button";
import { PageContainer } from "@components/PageContainer";
import { FileNameDialog } from "@components/FileNameDialog";

import { useContractForm } from "../../hooks/useContractForm";
import { useFileExport } from "../../hooks/useFileExport";

import { mockForm } from "../../utils/form/mockForm";

import { flexRender } from "@tanstack/react-table";

import { useTable } from "../../hooks/useTable";
import toast from "react-hot-toast";
import { PencilIcon } from "@phosphor-icons/react";

document.title = "Gen-Excel"

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
    const currentValue = cell[columnHeader ?? ""]

    const editedValue = window.prompt("Insira o novo valor para esse campo:", currentValue);

    if (!editedValue || editedValue.trim() == "") return currentValue;

    if (!columnHeader) {
      console.log("TESTE");
      return;
    }

    setRows((prevRows) =>
      prevRows.map((row) =>
        row.numeroProcesso === cell.numeroProcesso
          ? {
              ...row,
              [columnHeader]: editedValue,
            }
          : row
      )
    );
  }

  return (
    <PageContainer title="Registro de Contratos">
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
                  {headerGroup.headers.map((header) => (
                    <s.StyledTableHeader key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </s.StyledTableHeader>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <s.StyledTableCell key={cell.id}>
                      <s.EditCellButton
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
                      </s.EditCellButton>

                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </s.StyledTableCell>
                  ))}
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
    </PageContainer>
  );
}
