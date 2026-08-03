import { z } from "zod";

export const requiredString = (schema: z.ZodString) =>
  schema.min(1, "Campo obrigatório");

export const optionalString = (schema: z.ZodString) =>
  z
    .union([z.literal(""), schema])
    .optional()
    .transform((v) => (v === "" ? undefined : v));

export const REGEX = {
  orgao: /^[0-9]{2}\.[0-9]{2}\.[0-9]{2}$/,
  processo: /^[0-9]{1,6}\/[0-9]{2}$/,
  contrato: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+\s[0-9]+\/[0-9]{2}$/,
  dotacao:
    /^[0-9]{6}\.[0-9]{4}\.[0-9]{2}\.[0-9]{2}\.[0-9]{3}\.[0-9]{4}\.[0-9]{4}$/,
  data: /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{2}$/,
  dinheiro: /^(\d{1,3}(\.\d{3})*|\d+)(,\d{0,2})?$/,
  numeric: /^[0-9]+$/,
  ficha: /^[0-9]{1,4}$/,
  fonte: /^[0-9]{2}$/,
  codAplicacao: /^[0-9]{7}$/,
  qtdProduto: /^[a-zA-Z0-9 ]+$/,
  fullName: /^[\p{L}'-]+(?: [\p{L}'-]+)+$/u,
  diaMes: /^(0[1-9]|[12][0-9]|3[01])/,
  freeText: /^.+$/,
  anyOrEmpty: /^.*$/,
} as const;

export const sanitize = {
  trim: (v: string) => v.trim(),

  digitsOnly: (v: string) => v.replace(/\D/g, ""),

  maskedNumeric: (v: string) => v.replace(/[^0-9./]/g, ""),

  processoChars: (v: string) => v.replace(/[^0-9/]/g, ""),

  contratoChars: (v: string) => v.replace(/[^0-9A-Za-zÀ-ÿ\s/]/g, ""),

  alphanumeric: (v: string) => v.replace(/[^a-zA-Z0-9 ]/g, ""),

  currency: (v: string) => v.replace(/[^0-9.,]/g, ""),

  dateChars: (v: string) => v.replace(/[^0-9/]/g, ""),

  gestorName: (v: string) => v.replace(/[^\p{L}\s'-]/gu, ""),

  none: (v: string) => v,
};

type FieldType = "text" | "number" | "date" | "masked";

type MaskType = "orgao" | "processo" | "dotacao" | "data" | "dinheiro";

type SanitizeFunction = (v: string) => string;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyZodSchema = z.ZodType<any, any, any>;

export interface FieldConfig {
  label: string;
  type: FieldType;
  placeholder: string;
  required: boolean;
  readOnly?: boolean;
  inputMode?: "numeric" | "decimal";
  mask?: MaskType;
  regex?: RegExp;
  schema?: AnyZodSchema;
  sanitize: SanitizeFunction;
  maxLength?: number;
  sectionHeader?: boolean;
  sectionHeaderText?: string;
}
