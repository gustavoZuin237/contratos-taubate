import styled from "styled-components";

import { Link } from "react-router-dom";

export const NavbarContainer = styled.nav`
  width: 100%;
  height: 4.5rem;
  background-color: ${(props) => props.theme["surface"]};
  padding: 1rem 2rem;
  box-shadow: 6px 0 18px rgba(0, 0, 0, 0.35);
  border-bottom: 2px solid ${(props) => props.theme["primary"]};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SideContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`

export const CityLogo = styled.img``

export const CityTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const CityTitle = styled.p`
  color: ${(props) => props.theme["primary"]};
  font-weight: bold;
`

export const CitySubtitle = styled.p`
  color: #4e4e4e;
  font-size: 0.8rem;
`

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
  color: ${(props) => props.theme["primary"]};
  text-decoration: none;
  border-radius: 12px;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme["hover"]};
  }
`;

export const Label = styled.p`
  color: ${(props) => props.theme["primary"]};

  @media (max-width: 620px) {
    display: none;
  }
`;
