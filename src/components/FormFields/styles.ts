import styled from "styled-components";

export const InputLabel = styled.p`
  align-self: flex-start;
  font-size: 0.9em;
  color: ${(props) => props.theme["text"]};
`;
export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const RequiredFieldIndicator = styled.p`
  color: ${(props) => props.theme["danger"]};
  font-weight: bold;
`;

export const ErrorMessage = styled.span`
  color: red;
  font-size: 0.75rem;
`;

export const SectionHeader = styled.p`
  font-weight: bold;
  color: ${(props) => props.theme["primary"]};
  font-size: 1.2rem;
  text-transform: uppercase;
`;