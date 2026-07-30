import styled from "styled-components";

export const DialogContent = styled.div`
  border-radius: 12px;
  max-width: 40rem;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 4rem;
  gap: 2rem;
  background-color: ${(props) => props.theme["surface"]};
  border: 1px solid ${({ theme }) => theme["primarySoft"]};
  text-align: center;

  @media (max-width: 480px) {
    font-size: 0.65rem;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  @media (max-width: 580px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const FieldWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  text-align: left;
`;

export const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const InputLabel = styled.label`
  font-weight: 600;
  color: ${({ theme }) => theme["text"]};
`;

export const RequiredFieldIndicator = styled.span`
  color: ${({ theme }) => theme["danger"]};
`;

export const ErrorMessage = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme["danger"]};
`;