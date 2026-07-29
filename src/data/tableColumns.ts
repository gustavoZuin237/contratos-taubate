import { formatTableCurrency } from "../utils/table/formatTableCurrency";

import type { ColumnDef } from "@tanstack/react-table";

import type { NormalizedRow } from "@shared/types/rowFormats";

export const columns: ColumnDef<NormalizedRow>[] = [
  {
    accessorKey: "secretaria",
    header: "Secretaria",
  },
  {
    accessorKey: "orgao",
    header: "Órgão",
  },
  {
    accessorKey: "numeroProcesso",
    header: "N° do Processo",
  },
  {
    accessorKey: "tipoContrato",
    header: "Tipo do contrato",
  },
  {
    accessorKey: "fornecedor",
    header: "Fornecedor",
  },
  {
    accessorKey: "objetoContrato",
    header: "Objeto do contrato",
  },
  {
    accessorKey: "ficha",
    header: "Ficha",
  },
  {
    accessorKey: "dotacaoOrcamentaria",
    header: "Dotação Orçamentária",
  },
  {
    accessorKey: "fonte",
    header: "Fonte",
  },
  {
    accessorKey: "codigoAplicacao",
    header: "Código de aplicação",
  },
  {
    accessorKey: "quantidadeProduto",
    header: "Quantidade/Produto",
  },
  {
    accessorKey: "dataInicio",
    header: "Data de Início",
    cell: ({ getValue }) => {
      const value = getValue<Date>();

      return value;
    },
  },
  {
    accessorKey: "dataVencimento",
    header: "Data de Término/Vencimento",
    cell: ({ getValue }) => {
      const value = getValue<Date>();

      return value;
    },
  },
  {
    accessorKey: "prazoMeses",
    header: "Prazo (em meses)",
  },
  {
    accessorKey: "valorTotalContrato",
    header: "Valor Total do Contrato",
    cell: ({ getValue }) => formatTableCurrency(getValue<number>()),
  },
  {
    accessorKey: "valorAnual",
    header: "Valor Anual",
    cell: ({ getValue }) => formatTableCurrency(getValue<number>()),
  },
  {
    accessorKey: "valorMensal",
    header: "Valor Mensal",
    cell: ({ getValue }) => formatTableCurrency(getValue<number>()),
  },
  {
    accessorKey: "valor2024",
    header: "Valor de 2024",
    cell: ({ getValue }) => formatTableCurrency(getValue<number>()),
  },
  {
    accessorKey: "valor2025",
    header: "Valor de 2025",
    cell: ({ getValue }) => formatTableCurrency(getValue<number>()),
  },
  {
    accessorKey: "valor2026",
    header: "Valor de 2026",
    cell: ({ getValue }) => formatTableCurrency(getValue<number>()),
  },
  {
    accessorKey: "valor2027",
    header: "Valor de 2027",
    cell: ({ getValue }) => formatTableCurrency(getValue<number>()),
  },
  {
    accessorKey: "valor2028",
    header: "Valor de 2028",
    cell: ({ getValue }) => formatTableCurrency(getValue<number>()),
  },
  {
    accessorKey: "valor2029",
    header: "Valor de 2029",
    cell: ({ getValue }) => formatTableCurrency(getValue<number>()),
  },
  {
    accessorKey: "reajusteAnual",
    header: "Reajuste Anual",
    cell: ({ getValue }) => formatTableCurrency(getValue<number>()),
  },
  {
    accessorKey: "aditivoAnual",
    header: "Aditivo Anual",
    cell: ({ getValue }) => formatTableCurrency(getValue<number>()),
  },
  {
    accessorKey: "supressaoAnual",
    header: "Supressão Anual",
    cell: ({ getValue }) => formatTableCurrency(getValue<number>()),
  },
  {
    accessorKey: "valorTotalAnual",
    header: "Valor Total Anual",
    cell: ({ getValue }) => formatTableCurrency(getValue<number>()),
  },
  {
    accessorKey: "diaPagamento",
    header: "Dia de pagamento",
    cell: ({ getValue }) => {
      const value = getValue<Date>();

      return value;
    },
  },
  {
    accessorKey: "gestorContrato",
    header: "Gestor do contrato",
  },
  {
    accessorKey: "alterador",
    header: "Responsável pelo Preenchimento",
  },
  {
    accessorKey: "dataExportacao",
    header: "Data de exportação",
    cell: ({ getValue }) => {
      const value = getValue<Date>();

      return value;
    },
  },
  {
    accessorKey: "observacao",
    header: "Observação",
  },
];
