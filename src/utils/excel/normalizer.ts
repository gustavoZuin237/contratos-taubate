import {
  type NormalizedRow,
  type RawSpreadsheetRow,
} from "../../types/rowFormats";

import { parseCurrency } from "../currency/parseCurrency";
import { parseDate } from "../dates/parseDate";
import { parseNumber } from "../parsing/parseNumber";
import { sanitizeString } from "../strings/sanitizeString";
import { formatDate } from "../dates/formatDate";

import { v4 as uuidv4 } from 'uuid';

export function normalizeRow(row: RawSpreadsheetRow): NormalizedRow {
  return {
    id: uuidv4(),
    secretaria: sanitizeString(row["Secretaria"]),
    orgao: sanitizeString(row["Órgão"]),
    numeroProcesso: sanitizeString(row["N° do Processo"]),
    tipoContrato: sanitizeString(row["Tipo do contrato"]),
    fornecedor: sanitizeString(row["Fornecedor"]),
    objetoContrato: sanitizeString(row["Objeto do contrato"]),
    ficha: sanitizeString(row["Ficha"]),
    dotacaoOrcamentaria: sanitizeString(row["Dotação Orçamentária"]),
    fonte: sanitizeString(row["Fonte"]),
    codigoAplicacao: sanitizeString(row["Código de aplicação"]),
    quantidadeProduto: sanitizeString(row["Quantidade/Produto"]),
    dataInicio: formatDate(parseDate(row["Data de Início"])),
    dataVencimento: formatDate(parseDate(row["Data de Término/Vencimento"])),
    diaPagamento: formatDate(parseDate(row["Dia de pagamento"])),
    prazoMeses: parseNumber(row["Prazo (em meses)"]),
    valorTotalContrato: parseCurrency(row["Valor Total do Contrato"]),
    valorAnual: parseCurrency(row["Valor Anual do Início do Contrato"]),
    valorMensal: parseCurrency(row["Valor Mensal"]),
    valor2024: parseCurrency(row["Valor de 2024"]),
    valor2025: parseCurrency(row["Valor de 2025"]),
    valor2026: parseCurrency(row["Valor de 2026"]),
    valor2027: parseCurrency(row["Valor de 2027"]),
    valor2028: parseCurrency(row["Valor de 2028"]),
    valor2029: parseCurrency(row["Valor de 2029"]),
    reajusteAnual: parseCurrency(row["Reajuste Anual"]),
    aditivoAnual: parseCurrency(row["Aditivo Anual"]),
    supressaoAnual: parseCurrency(row["Supressão Anual"]),
    valorTotalAnual: parseCurrency(row["Valor Total Anual"]),
    gestorContrato: sanitizeString(row["Gestor do contrato"]),
    observacao: sanitizeString(row["Observação"]),
    alterador: sanitizeString(row["Responsável pelo Preenchimento"]),
    dataExportacao: formatDate(parseDate(row["Data de Exportação"])),
  };
}
