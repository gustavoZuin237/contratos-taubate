import { useState } from "react";

import * as s from "./styles";
import { type Control, type FieldErrors, Controller } from "react-hook-form";

import { Input } from "@components/Input";
import { Dropdown } from "@components/Dropdown";

import type { FieldConfig } from "@interfaces/fieldConfiguration";
import type { FormValues } from "@data/fields";
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
  const [isComposing, setIsComposing] = useState(false);

  return (
    <s.FieldWrapper>
      <s.LabelContainer>
        <s.InputLabel>{config.label}</s.InputLabel>

        {config.required && (
          <s.RequiredFieldIndicator>*</s.RequiredFieldIndicator>
        )}
      </s.LabelContainer>

      <Controller
        name={fieldName}
        control={control}
        render={({ field: { onChange: rhfOnChange, value } }) =>
          config.isDropdown ? (
            <Dropdown
              options={config.options ?? [""]}
              value={(value as string) ?? ""}
              onChange={(selectedValue) => {
                onChange(fieldName, selectedValue, rhfOnChange);
              }}
            />
          ) : (
            <Input
              value={(value as string) ?? ""}
              placeholder={config.placeholder}
              type={config.type}
              inputMode={config.inputMode ?? undefined}
              required={config.required}
              aria-invalid={!!errors[fieldName]}
              maxLength={config.maxLength}
              onChange={(e) => {
                if (isComposing) {
                  rhfOnChange(e.target.value);
                  return;
                }

                onChange(fieldName, e.target.value, rhfOnChange);
              }}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={(e) => {
                setIsComposing(false);
                onChange(fieldName, e.currentTarget.value, rhfOnChange);
              }}
            />
          )
        }
      />
      {errors[fieldName] && (
        <s.ErrorMessage>{errors[fieldName]?.message as string}</s.ErrorMessage>
      )}
    </s.FieldWrapper>
  );
}
