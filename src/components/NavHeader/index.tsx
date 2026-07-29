import * as s from "./styles";

import { NotebookIcon, BookBookmarkIcon } from "@phosphor-icons/react";

export function NavHeader() {
  return (
    <s.NavbarContainer>
      <s.SideContainer>
        <s.CityLogo src="/src/assets/city-logo.svg" width={55} height={55} />

        <s.CityTextContainer>
          <s.CityTitle>PREFEITURA DE TAUBATÉ</s.CityTitle>
          <s.CitySubtitle><i>Nosso caminho é o progresso</i></s.CitySubtitle>
        </s.CityTextContainer>
      </s.SideContainer>

      <s.LinkContainer>
        <s.StyledLink to="/">
          <NotebookIcon size={22} weight="fill" />
          <s.Label>Novo Registro</s.Label>
        </s.StyledLink>
        <s.StyledLink to="/master">
          <BookBookmarkIcon size={22} weight="fill" />
          <s.Label>Unir Registros</s.Label>
        </s.StyledLink>
      </s.LinkContainer>
    </s.NavbarContainer>
  );
}
