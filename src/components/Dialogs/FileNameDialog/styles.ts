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
