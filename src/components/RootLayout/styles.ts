import styled from "styled-components";

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${(props) => props.theme["background"]};
  overflow: hidden;
`;

export const Content = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: ${(props) => props.theme["background"]};

  overflow-y: auto;
  min-height: 0;
`;
