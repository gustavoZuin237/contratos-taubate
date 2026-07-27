import styled from "styled-components";

import { Link } from "react-router-dom";

export const NavbarContainer = styled.nav`
  width: 100%;
  height: 4.5rem;
  background-color: ${(props) => props.theme["surface"]};
  padding: 1rem 2rem;
  box-shadow: 6px 0 18px rgba(0, 0, 0, 0.35);
  border-bottom: 2px solid ${(props) => props.theme["primary"]};
`;

export const LinkContainer = styled.div`
  height: 100%;
  display: flex;
  gap: 1rem;
`;

export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 0.5rem;
  color: ${(props) => props.theme["text"]};
  text-decoration: none;
  border-radius: 12px;
  transition: 0.5s;

  &:hover {
    background-color: ${(props) => props.theme["hover"]};
  }
`;

export const Label = styled.p`
  @media (max-width: 620px) {
    display: none;
  }
`;

export const ThemeButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
`;
