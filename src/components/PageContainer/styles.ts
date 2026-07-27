import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 2rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme["surface"]};
`;

export const PageTitle = styled.h1`
  margin-bottom: 2rem;
`;
