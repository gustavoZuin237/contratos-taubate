import * as s from "./styles";

import { Input } from "@components/Input";
import type { FieldConfig } from "../../interfaces/fieldConfiguration";

interface Props {
  config: FieldConfig;
  value: string;
}

export function ReadOnlyField({ config, value }: Props) {
  return (
    <s.FieldWrapper>
      <s.InputLabel>{config.label}</s.InputLabel>
      <Input
        value={value}
        placeholder={config.placeholder}
        type={config.type}
        inputMode={config.inputMode ?? undefined}
        disabled
        readOnly
      />
    </s.FieldWrapper>
  );
}
