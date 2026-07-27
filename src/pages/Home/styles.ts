import styled from "styled-components";

export const InputContainer = styled.form`
  width: 100%;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2rem;
`;

export const InputLabel = styled.p`
  align-self: flex-start;
  font-size: 0.9em;
  color: ${(props) => props.theme["text"]};
`;

export const ButtonContainer = styled.div`
  width: 100%;
  margin-top: auto;
  gap: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 850px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ErrorMessage = styled.span`
  color: ${(props) => props.theme["danger"]};
  font-size: 0.75rem;
`;

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 12px;
  border: 2px solid ${(props) => props.theme["border"]};
  background-color: ${(props) => props.theme["surfaceAlt"]};
`;

export const StyledTableHeader = styled.th`
  min-width: auto;
  border: 1px solid ${(props) => props.theme["chartLines"]};
  color: ${(props) => props.theme["text"]};
  padding: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledTableCell = styled.td`
  width: max-content;
  max-width: 20rem;
  text-align: center;
  border: 1px solid ${(props) => props.theme["chartLines"]};
  color: ${(props) => props.theme["text"]};
  padding: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const EditCellButton = styled.button`
  background: none;
  outline: none;
  border: none;
  color: ${(props) => props.theme['primary']};
  transition: 0.3s;
  margin-right: 8px;

  &:hover {
    cursor: pointer;
    transform: translateY(-3px);
  }
`

export const RowCount = styled.div`
  width: 100%;
  color: ${(props) => props.theme["text"]};
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  margin-top: 2rem;

  @media (max-width: 850px) {
    align-items: center !important;
  }
`;
