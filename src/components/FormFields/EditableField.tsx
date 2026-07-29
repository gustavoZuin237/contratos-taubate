import * as s from "./styles";
import { type Control, type FieldErrors, Controller } from "react-hook-form";

import { Input } from "@components/Input";
import type { FieldConfig } from "../../types/fieldConfiguration";
import type { FormValues } from "../../data/fields";

interface Props {
  fieldName: keyof FormValues;
  config: FieldConfig;
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  onChange: (
    fieldName: string,
    value: string,
    rhfOnChange: (v: string) => void
  ) => void;
}

export function EditableField({
  fieldName,
  config,
  control,
  errors,
  onChange,
}: Props) {
  return (
    <s.FieldWrapper>
      <s.LabelContainer>
        <s.InputLabel>{config.label}</s.InputLabel>

        {config.required && <s.RequiredFieldIndicator>*</s.RequiredFieldIndicator>}
      </s.LabelContainer>

      <Controller
        name={fieldName}
        control={control}
        render={({ field: { onChange: rhfOnChange, value } }) => (
          <Input
            value={(value as string) ?? ""}
            placeholder={config.placeholder}
            type={config.type}
            inputMode={config.inputMode ?? undefined}
            required={config.required}
            aria-invalid={!!errors[fieldName]}
            onChange={(e) => onChange(fieldName, e.target.value, rhfOnChange)}
            maxLength={config.maxLength}
          />
        )}
      />
      {errors[fieldName] && (
        <s.ErrorMessage>{errors[fieldName]?.message as string}</s.ErrorMessage>
      )}
    </s.FieldWrapper>
  );
}
