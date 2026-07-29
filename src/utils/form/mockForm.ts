import {v4 as uuidv4} from "uuid"

export function mockForm(iterator: number) {
  const MOCK_FORM = {
    id: uuidv4(),
    secretaria: `Secretaria de Teste ${iterator}`,
    orgao: "10.10.10",
    numeroProcesso: `${iterator}/${iterator < 10 ? `0${iterator}` : iterator}`,
    tipoContrato: `abc ${iterator < 10 ? iterator * 10 : iterator}/${iterator < 10 ? `0${iterator}` : iterator}`,
    fornecedor: `Fornecedor de Teste ${iterator}`,
    objetoContrato: `Objeto de Teste ${iterator}`,
    ficha: "1234",
    dotacaoOrcamentaria: "101010.1010.10.10.101.0101.0101",
    fonte: `${iterator < 10 ? iterator * 10 : iterator}`,
    codigoAplicacao: "1234567",
    quantidadeProduto: "1 Produto de Teste",
    dataInicio: "01/01/11",
    dataVencimento: "02/02/22",
    diaPagamento: "03/03/33",
    prazoMeses: 12,
    valorTotalContrato: 1000 * iterator,
    valorAnual: 1000 * iterator,
    valorMensal: 1000,
    reajusteAnual: 1000 * iterator,
    aditivoAnual: 1000 * iterator,
    supressaoAnual: 1000 * iterator,
    valorTotalAnual: 0,
    gestorContrato: `gestor de teste ${iterator}`,
    alterador: `responsável de teste ${iterator}`,
    observacao: `Observação de Teste ${iterator}`,
    valor2024: 1000,
    valor2025: 1000,
    valor2026: 1000,
    valor2027: 1000,
    valor2028: 1000,
    valor2029: 1000,
    dataExportacao: "04/04/44",
  };

  MOCK_FORM.valorTotalAnual =
    MOCK_FORM.valorAnual +
    MOCK_FORM.reajusteAnual +
    MOCK_FORM.aditivoAnual -
    MOCK_FORM.supressaoAnual;

  return MOCK_FORM;
}
