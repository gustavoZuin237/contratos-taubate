import type { FormValues } from "../../data/fields";

import type { NormalizedRow } from "@shared/types/rowFormats";

import { parseCurrency } from "@shared/utils/currency/parseCurrency";

export function normalizeFormData(data: FormValues) {
  const normalizedRow: NormalizedRow = {
    ...data,
    id: data.id,
    secretaria: data.secretaria,
    orgao: data.orgao,
    numeroProcesso: data.numeroProcesso,
    tipoContrato: data.tipoContrato,
    fornecedor: data.fornecedor,
    objetoContrato: data.objetoContrato,
    ficha: data.ficha,
    dotacaoOrcamentaria: data.dotacaoOrcamentaria,
    fonte: data.fonte,
    codigoAplicacao: data.codigoAplicacao,
    quantidadeProduto: data.quantidadeProduto,
    dataInicio: data.dataInicio,
    dataVencimento: data.dataVencimento,
    diaPagamento: data.diaPagamento,
    dataExportacao: data.dataExportacao,
    prazoMeses: Number(data.prazoMeses),
    valorTotalContrato: parseCurrency(data.valorTotalContrato),
    valorAnual: parseCurrency(data.valorAnual),
    valorMensal: parseCurrency(data.valorMensal),
    valor2024: parseCurrency(data.valor2024),
    valor2025: parseCurrency(data.valor2025),
    valor2026: parseCurrency(data.valor2026),
    valor2027: parseCurrency(data.valor2027),
    valor2028: parseCurrency(data.valor2028),
    valor2029: parseCurrency(data.valor2029),
    reajusteAnual: parseCurrency(data.reajusteAnual),
    aditivoAnual: parseCurrency(data.aditivoAnual),
    supressaoAnual: parseCurrency(data.supressaoAnual),
    valorTotalAnual:
      parseCurrency(data.valorAnual) +
      parseCurrency(data.reajusteAnual) +
      parseCurrency(data.aditivoAnual) -
      parseCurrency(data.supressaoAnual),
    gestorContrato: data.gestorContrato,
    alterador: data.alterador,
    observacao: data.observacao,
  };

  return normalizedRow;
}
