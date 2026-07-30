import { useRef, useState, forwardRef, useImperativeHandle } from "react";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import toast from "react-hot-toast";

import * as s from "./styles";
import type { FieldConfig } from "../../../types/fieldConfiguration";

export interface EditCellDialogHandle {
  showModal: (value: string, label: string, config?: FieldConfig) => void;
  close: () => void;
}

interface Props {
  onConfirm: (value: string) => void;
  onCancel: () => void;
  onChange?: (rawValue: string, setValue: (value: string) => void) => void;
}

export const EditCellDialog = forwardRef<EditCellDialogHandle, Props>(
  ({ onConfirm, onCancel, onChange }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [value, setValue] = useState("");
    const [label, setLabel] = useState("");
    const [config, setConfig] = useState<FieldConfig | null>(null);
    const [error, setError] = useState<string | null>(null);

    useImperativeHandle(ref, () => ({
      showModal: (initialValue, fieldLabel, fieldConfig) => {
        setValue(initialValue);
        setLabel(fieldLabel);
        setConfig(fieldConfig ?? null);
        setError(null);
        dialogRef.current?.showModal();
      },
      close: () => dialogRef.current?.close(),
    }));

    function validate(
      configArg: FieldConfig | null,
      rawValue: string,
      labelArg: string
    ): string | null {
      if (configArg?.schema) {
        const result = configArg.schema.safeParse(rawValue);
        return result.success
          ? null
          : result.error.issues[0]?.message ?? "Valor inválido";
      }

      if (configArg?.required && !rawValue.trim()) {
        return `${configArg.label ?? labelArg} é obrigatório`;
      }

      return null;
    }

    function handleInputChange(rawValue: string) {
      if (onChange) {
        // `onChange` may mask/sanitize rawValue before it's committed
        // (e.g. currency, date masks). Validate the value it settles
        // on, not the raw keystroke.
        onChange(rawValue, (maskedValue) => {
          setValue(maskedValue);
          setError(validate(config, maskedValue, label));
        });
      } else {
        setValue(rawValue);
        setError(validate(config, rawValue, label));
      }
    }

    function handleConfirm() {
      const validationError = validate(config, value, label);

      if (validationError) {
        setError(validationError);
        toast.error(validationError);
        return;
      }

      onConfirm(value);
      dialogRef.current?.close();
    }

    function handleCancel() {
      onCancel();
      dialogRef.current?.close();
    }

    return (
      <dialog
        ref={dialogRef}
        style={{
          width: "100%",
          height: "100%",
          padding: "10rem 0px 10rem 2.5rem",
          background: "transparent",
          border: 0,
        }}
      >
        <s.DialogContent>
          <h2>Editar campo</h2>

          <s.FieldWrapper>
            <s.LabelContainer>
              <s.InputLabel>{config?.label ?? label}</s.InputLabel>
              {config?.required && (
                <s.RequiredFieldIndicator>*</s.RequiredFieldIndicator>
              )}
            </s.LabelContainer>

            <Input
              value={value}
              placeholder={config?.placeholder}
              type={config?.type ?? "text"}
              inputMode={config?.inputMode ?? undefined}
              required={config?.required}
              aria-invalid={!!error}
              maxLength={config?.maxLength}
              onChange={(e) => handleInputChange(e.target.value)}
            />

            {error && <s.ErrorMessage>{error}</s.ErrorMessage>}
          </s.FieldWrapper>

          <s.ButtonContainer>
            <Button variant="primary" onClick={handleConfirm}>
              Confirmar
            </Button>

            <Button variant="danger" onClick={handleCancel}>
              Cancelar
            </Button>
          </s.ButtonContainer>
        </s.DialogContent>
      </dialog>
    );
  }
);