import { FIELDS, type FormValues } from "@data/fields";
import type { Control, FieldErrors } from "react-hook-form";
import { ReadOnlyField } from "./ReadOnlyField";
import { EditableField } from "./EditableField";

import * as s from "./styles";

interface Props {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  valorTotalAnualDisplay: string;
  onFieldChange: (
    fieldName: string,
    value: string,
    rhfOnChange: (v: string) => void
  ) => void;
}

const fieldEntries = Object.entries(FIELDS) as [
  keyof FormValues,
  (typeof FIELDS)[keyof typeof FIELDS],
][];

export function FormFields({
  control,
  errors,
  valorTotalAnualDisplay,
  onFieldChange,
}: Props) {
  return fieldEntries.map(([fieldName, config]) =>
    config.sectionHeader ? (
      <s.SectionHeader key={fieldName}>{config.sectionHeaderText}</s.SectionHeader>
    ) : config.readOnly ? (
      <ReadOnlyField
        key={fieldName}
        config={config}
        value={valorTotalAnualDisplay}
      />
    ) : (
      <EditableField
        key={fieldName}
        fieldName={fieldName}
        config={config}
        control={control}
        errors={errors}
        onChange={onFieldChange}
      />
    )
  );
}
