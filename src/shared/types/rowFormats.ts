import { Type, type Static } from "@sinclair/typebox";

export const NormalizedRowSchema = Type.Object({
  id: Type.String(),
  secretaria: Type.String(),
  orgao: Type.String(),
  numeroProcesso: Type.String(),
  tipoContrato: Type.String(),
  fornecedor: Type.String(),
  objetoContrato: Type.String(),
  ficha: Type.String(),
  dotacaoOrcamentaria: Type.String(),
  fonte: Type.String(),
  codigoAplicacao: Type.String(),
  quantidadeProduto: Type.String(),
  dataInicio: Type.String(),
  dataVencimento: Type.String(),
  prazoMeses: Type.Number(),
  dataPagamento: Type.Optional(Type.String()),
  valorTotalContrato: Type.Optional(Type.Number()),
  valorMensal: Type.Optional(Type.Number()),
  valorAnual: Type.Optional(Type.Number()),
  reajusteAnual: Type.Optional(Type.Number()),
  aditivoAnual: Type.Optional(Type.Number()),
  supressaoAnual: Type.Optional(Type.Number()),
  valorTotalAnual: Type.Optional(Type.Number()),
  observacao: Type.Optional(Type.String()),
  valor2024: Type.Optional(Type.Number()),
  valor2025: Type.Optional(Type.Number()),
  valor2026: Type.Number(),
  valor2027: Type.Number(),
  valor2028: Type.Optional(Type.Number()),
  valor2029: Type.Optional(Type.Number()),
  gestorContrato: Type.String(),
  alterador: Type.String(),
  dataExportacao: Type.String(),
});

export type NormalizedRow = Static<typeof NormalizedRowSchema>;

export type RawSpreadsheetRow = Record<string, unknown>;
