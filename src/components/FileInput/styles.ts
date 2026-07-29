import styled from "styled-components";

export const FileImportContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 850px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const MultipleLabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const FileNameLabel = styled.p`
  width: 100%;
  text-align: center;
  padding: 1rem;
  border-radius: 12px;
  background-color: ${({ theme }) => theme["secondary"]};
`;
