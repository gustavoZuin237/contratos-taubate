import styled, { css } from "styled-components";

type InputVariant = "default" | "filled" | "ghost";

interface InputProps {
  $variant: InputVariant;
}

const inputVariants = {
  default: css`
    background: ${({ theme }) => theme["surface"]};
    border: 1px solid ${({ theme }) => theme["border"]};
    color: ${({ theme }) => theme["text"]};

    &:focus {
      border-color: ${({ theme }) => theme["primary"]};
      box-shadow: 0 0 0 3px rgba(33, 48, 180, 0.15);
    }
  `,

  filled: css`
    background: ${({ theme }) => theme["surfaceAlt"]};
    border: 1px solid transparent;
    color: ${({ theme }) => theme["text"]};

    &:focus {
      border-color: ${({ theme }) => theme["primary"]};
      box-shadow: 0 0 0 3px rgba(33, 48, 180, 0.15);
    }
  `,

  ghost: css`
    background: transparent;
    border: 1px solid ${({ theme }) => theme["border"]};
    color: ${({ theme }) => theme["textMuted"]};

    &:focus {
      color: ${({ theme }) => theme["text"]};
      border-color: ${({ theme }) => theme["primary"]};
      box-shadow: 0 0 0 3px rgba(33, 48, 180, 0.35);
    }
  `,
};

export const InputContainer = styled.input<InputProps>`
  width: 100%;
  padding: 0.85rem 1rem;
  border-radius: 8px;
  outline: none;
  font-size: 0.95rem;

  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease,
    color 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme["textMuted"]};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${({ $variant }) => inputVariants[$variant]}
`;
