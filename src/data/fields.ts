import { z } from "zod";

import {
  type FieldConfig,
  REGEX,
  requiredString,
  optionalString,
  sanitize,
} from "../types/fieldConfiguration";

export const FIELDS: Record<string, FieldConfig> = {
  // * "Identificação" section header
  identificationSectionHeader: {
    label: "",
    type: "text",
    placeholder: "",
    required: false,
    sanitize: sanitize.none,
    sectionHeader: true,
    sectionHeaderText: "Identificação",
  },
  
  secretaria: {
    label: "Secretaria",
    placeholder: "Nome da secretaria",
    type: "text",
    required: true,
    regex: REGEX.freeText,
    schema: requiredString(
      z.string().regex(REGEX.freeText, "Preencha o nome da secretaria")
    ),
    sanitize: sanitize.none,
    isDropdown: true
  },

  orgao: {
    label: "Órgão",
    placeholder: "xx.xx.xx",
    type: "masked",
    mask: "orgao",
    required: true,
    regex: REGEX.orgao,
    schema: requiredString(
      z.string().regex(REGEX.orgao, "Formato esperado: xx.xx.xx")
    ),
    sanitize: sanitize.maskedNumeric,
  },

  numeroProcesso: {
    label: "Número do processo",
    placeholder: "xxxxxx/xx",
    type: "masked",
    mask: "processo",
    required: true,
    regex: REGEX.processo,
    schema: requiredString(
      z.string().regex(REGEX.processo, "Formato esperado: xxxxxx/xx")
    ),
    sanitize: sanitize.processoChars,
  },

  tipoContrato: {
    label: "Tipo do contrato",
    placeholder: "tipo número/ano",
    type: "masked",
    required: true,
    regex: REGEX.contrato,
    schema: requiredString(
      z.string().regex(REGEX.contrato, "Formato esperado: tipo xx/xx")
    ),
    sanitize: sanitize.contratoChars,
  },

  fornecedor: {
    label: "Fornecedor",
    placeholder: "Nome do fornecedor",
    type: "text",
    required: true,
    regex: REGEX.freeText,
    schema: requiredString(
      z.string().regex(REGEX.freeText, "Preencha o nome do fornecedor")
    ),
    sanitize: sanitize.none,
  },

  objetoContrato: {
    label: "Objeto do contrato",
    placeholder: "Descrição do objeto do contrato",
    type: "text",
    required: true,
    regex: REGEX.freeText,
    schema: requiredString(
      z.string().regex(REGEX.freeText, "Preencha o objeto do contrato")
    ),
    sanitize: sanitize.none,
  },

  ficha: {
    label: "Ficha",
    placeholder: "xxxx",
    type: "text",
    inputMode: "numeric",
    required: true,
    regex: REGEX.ficha,
    schema: requiredString(
      z.string().regex(REGEX.ficha, "Até 4 dígitos numéricos").max(4)
    ),
    sanitize: sanitize.digitsOnly,
    maxLength: 4,
  },

  dotacaoOrcamentaria: {
    label: "Dotação orçamentária",
    placeholder: "xxxxxx.xxxx.xx.xx.xxx.xxxx.xxxx",
    type: "masked",
    mask: "dotacao",
    required: true,
    regex: REGEX.dotacao,
    schema: requiredString(
      z
        .string()
        .regex(
          REGEX.dotacao,
          "Formato esperado: xxxxxx.xxxx.xx.xx.xxx.xxxx.xxxx"
        )
    ),
    sanitize: sanitize.maskedNumeric,
  },

  fonte: {
    label: "Fonte",
    placeholder: "xx",
    type: "text",
    inputMode: "numeric",
    required: true,
    regex: REGEX.fonte,
    schema: requiredString(
      z.string().regex(REGEX.fonte, "Exatamente 2 dígitos")
    ),
    sanitize: sanitize.digitsOnly,
    maxLength: 2,
  },

  codigoAplicacao: {
    label: "Código de aplicação",
    placeholder: "xxxxxxx",
    type: "text",
    inputMode: "numeric",
    required: true,
    regex: REGEX.codAplicacao,
    schema: requiredString(
      z.string().regex(REGEX.codAplicacao, "7 dígitos numéricos")
    ),
    sanitize: sanitize.digitsOnly,
    maxLength: 7,
  },

  gestorContrato: {
    label: "Gestor do contrato",
    placeholder: "Nome e sobrenome do gestor do contrato",
    type: "text",
    required: true,
    regex: REGEX.fullName,
    schema: optionalString(
      z
        .string()
        .regex(
          REGEX.fullName,
          "Formato incorreto. O formato esperado é: Nome Sobrenome"
        )
    ),
    sanitize: sanitize.none,
  },

  alterador: {
    label: "Responsável pelo preenchimento",
    placeholder: "Nome e sobrenome do responsável pelo preenchimento",
    type: "text",
    required: true,
    regex: REGEX.fullName,
    schema: optionalString(
      z
        .string()
        .regex(
          REGEX.fullName,
          "Formato incorreto. O formato esperado é: Nome Sobrenome"
        )
    ),
    sanitize: sanitize.none,
  },

  // * "Data e Prazo" section header
  datesSectionHeader: {
    label: "",
    type: "text",
    placeholder: "",
    required: false,
    sanitize: sanitize.none,
    sectionHeader: true,
    sectionHeaderText: "Datas e Prazo",
  },

  dataInicio: {
    label: "Data de início",
    placeholder: "dd/mm/aa",
    type: "text",
    mask: "data",
    required: true,
    regex: REGEX.data,
    schema: requiredString(
      z.string().regex(REGEX.data, "Formato esperado: dd/mm/aa")
    ),
    sanitize: sanitize.dateChars,
  },
  dataVencimento: {
    label: "Data de término/vencimento",
    placeholder: "dd/mm/aa",
    type: "text",
    mask: "data",
    required: true,
    regex: REGEX.data,
    schema: requiredString(
      z.string().regex(REGEX.data, "Formato esperado: dd/mm/aa")
    ),
    sanitize: sanitize.dateChars,
  },

  diaPagamento: {
    label: "Dia de pagamento (Previsão)",
    placeholder: "xx",
    type: "text",
    inputMode: "numeric",
    required: false,
    regex: REGEX.diaMes,
    schema: optionalString(z.string().regex(REGEX.diaMes, "Dia inválido!")),
    sanitize: sanitize.digitsOnly,
    maxLength: 2,
  },

  prazoMeses: {
    label: "Prazo (em meses)",
    placeholder: "xx",
    type: "text",
    inputMode: "numeric",
    required: true,
    regex: REGEX.numeric,
    schema: requiredString(z.string().regex(REGEX.numeric, "Apenas números")),
    sanitize: sanitize.digitsOnly,
    maxLength: 2,
  },

  // * "Valores" section header
  valuesSectionHeader: {
    label: "",
    type: "text",
    placeholder: "",
    required: false,
    sanitize: sanitize.none,
    sectionHeader: true,
    sectionHeaderText: "Valores",
  },

  valorTotalContrato: {
    label: "Valor total do contrato",
    placeholder: "xxxx,xx",
    type: "text",
    inputMode: "decimal",
    mask: "dinheiro",
    required: true,
    regex: REGEX.dinheiro,
    schema: requiredString(z.string().regex(REGEX.dinheiro, "Este campo é obrigatório!")),
    sanitize: sanitize.currency,
  },

  valorAnual: {
    label: "Valor anual no início do contrato",
    placeholder: "xxxx,xx",
    type: "text",
    inputMode: "decimal",
    mask: "dinheiro",
    required: true,
    regex: REGEX.dinheiro,
    schema: requiredString(z.string().regex(REGEX.dinheiro, "Este campo é obrigatório!")),
    sanitize: sanitize.currency,
  },

  valorMensal: {
    label: "Valor mensal",
    placeholder: "xxxx,xx",
    type: "text",
    inputMode: "decimal",
    mask: "dinheiro",
    required: false,
    regex: REGEX.dinheiro,
    schema: optionalString(
      z.string().regex(REGEX.dinheiro, "Formato esperado: xx.xxx,xx")
    ),
    sanitize: sanitize.currency,
  },

  valor2024: {
    label: "Valor de 2024",
    placeholder: "xxxx,xx",
    type: "text",
    inputMode: "decimal",
    mask: "dinheiro",
    required: false,
    regex: REGEX.dinheiro,
    schema: optionalString(
      z.string().regex(REGEX.dinheiro, "Formato esperado: xx.xxx,xx")
    ),
    sanitize: sanitize.currency,
  },

  valor2025: {
    label: "Valor de 2025",
    placeholder: "xxxx,xx",
    type: "text",
    inputMode: "decimal",
    mask: "dinheiro",
    required: false,
    regex: REGEX.dinheiro,
    schema: optionalString(
      z.string().regex(REGEX.dinheiro, "Formato esperado: xx.xxx,xx")
    ),
    sanitize: sanitize.currency,
  },

  valor2026: {
    label: "Valor de 2026",
    placeholder: "xxxx,xx",
    type: "text",
    inputMode: "decimal",
    mask: "dinheiro",
    required: true,
    regex: REGEX.dinheiro,
    schema: requiredString(z.string().regex(REGEX.dinheiro, "Este campo é obrigatório!")),
    sanitize: sanitize.currency,
  },

  valor2027: {
    label: "Valor de 2027",
    placeholder: "xxxx,xx",
    type: "text",
    inputMode: "decimal",
    mask: "dinheiro",
    required: false,
    regex: REGEX.dinheiro,
    schema: optionalString(
      z.string().regex(REGEX.dinheiro, "Formato esperado: xx.xxx,xx")
    ),
    sanitize: sanitize.currency,
  },

  valor2028: {
    label: "Valor de 2028",
    placeholder: "xxxx,xx",
    type: "text",
    inputMode: "decimal",
    mask: "dinheiro",
    required: false,
    regex: REGEX.dinheiro,
    schema: optionalString(
      z.string().regex(REGEX.dinheiro, "Formato esperado: xx.xxx,xx")
    ),
    sanitize: sanitize.currency,
  },

  valor2029: {
    label: "Valor de 2029",
    placeholder: "xxxx,xx",
    type: "text",
    inputMode: "decimal",
    mask: "dinheiro",
    required: false,
    regex: REGEX.dinheiro,
    schema: optionalString(
      z.string().regex(REGEX.dinheiro, "Formato esperado: xx.xxx,xx")
    ),
    sanitize: sanitize.currency,
  },

  reajusteAnual: {
    label: "Reajuste anual",
    placeholder: "xxxx,xx",
    type: "text",
    inputMode: "decimal",
    mask: "dinheiro",
    required: false,
    regex: REGEX.dinheiro,
    schema: optionalString(
      z.string().regex(REGEX.dinheiro, "Formato esperado: xx.xxx,xx")
    ),
    sanitize: sanitize.currency,
  },

  aditivoAnual: {
    label: "Aditivo anual",
    placeholder: "xxxx,xx",
    type: "text",
    inputMode: "decimal",
    mask: "dinheiro",
    required: false,
    regex: REGEX.dinheiro,
    schema: optionalString(
      z.string().regex(REGEX.dinheiro, "Formato esperado: xx.xxx,xx")
    ),
    sanitize: sanitize.currency,
  },

  supressaoAnual: {
    label: "Supressão anual",
    placeholder: "xxxx,xx",
    type: "text",
    inputMode: "decimal",
    mask: "dinheiro",
    required: false,
    regex: REGEX.dinheiro,
    schema: optionalString(
      z.string().regex(REGEX.dinheiro, "Formato esperado: xx.xxx,xx")
    ),
    sanitize: sanitize.currency,
  },

  valorTotalAnual: {
    label: "Valor total anual",
    placeholder: "",
    type: "text",
    inputMode: "decimal",
    mask: "dinheiro",
    readOnly: true,
    required: false,
    sanitize: sanitize.none,
  },

  // * "Informações Adicionais" section header
  additionalInformationSectionHeader: {
    label: "",
    type: "text",
    placeholder: "",
    required: false,
    sanitize: sanitize.none,
    sectionHeader: true,
    sectionHeaderText: "Informações Adicionais",
  },

  quantidadeProduto: {
    label: "Quantidade/Produto",
    placeholder: "Quantidade ou produto",
    type: "text",
    required: false,
    regex: REGEX.anyOrEmpty,
    schema: optionalString(z.string().regex(REGEX.anyOrEmpty, "")),
    sanitize: sanitize.alphanumeric,
  },

  observacao: {
    label: "Observação",
    placeholder: "Observação sobre o contrato",
    type: "text",
    required: false,
    regex: REGEX.anyOrEmpty,
    schema: optionalString(z.string().regex(REGEX.anyOrEmpty, "")),
    sanitize: sanitize.none,
  },
};

export const formSchema = z.object(
  Object.fromEntries(
    Object.entries(FIELDS)
      .filter(([, config]) => config.schema !== undefined)
      .map(([name, config]) => [name, config.schema!])
  )
);

export type FormValues = z.infer<typeof formSchema>;
