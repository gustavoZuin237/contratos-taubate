import type { ButtonHTMLAttributes } from "react";

import * as s from "./styles";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({
  children,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <s.ButtonContainer $variant={variant} {...props}>
      {children}
    </s.ButtonContainer>
  );
}
