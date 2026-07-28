import type { NormalizedRow } from "./rowFormats.js";

export const COLUMN_LABELS: Record<keyof NormalizedRow, string> = {
  id: "ID",
  secretaria: "Secretaria",
  orgao: "Órgão",
  numeroProcesso: "N° do Processo",
  tipoContrato: "Tipo do contrato",
  fornecedor: "Fornecedor",
  objetoContrato: "Objeto do contrato",

  ficha: "Ficha",
  dotacaoOrcamentaria: "Dotação Orçamentária",
  fonte: "Fonte",
  codigoAplicacao: "Código de aplicação",

  quantidadeProduto: "Quantidade/Produto",

  dataInicio: "Data de Início",
  dataVencimento: "Data de Término/Vencimento",
  dataPagamento: "Data de Pagamento",

  prazoMeses: "Prazo (em meses)",

  valorTotalContrato: "Valor Total do Contrato",
  valorMensal: "Valor Mensal",

  valor2024: "Valor de 2024",
  valor2025: "Valor de 2025",
  valor2026: "Valor de 2026",
  valor2027: "Valor de 2027",
  valor2028: "Valor de 2028",
  valor2029: "Valor de 2029",

  valorAnual: "Valor Anual",

  reajusteAnual: "Reajuste Anual",
  aditivoAnual: "Aditivo Anual",
  supressaoAnual: "Supressão Anual",

  valorTotalAnual: "Valor Total Anual",

  gestorContrato: "Gestor do contrato",
  observacao: "Observação",

  alterador: "Responsável pelo Preenchimento",

  dataExportacao: "Data de Exportação",
};

export const REQUIRED_COLUMNS = Object.values(COLUMN_LABELS);
