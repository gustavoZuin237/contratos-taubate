import * as s from "./styles";

import logo from "../../assets/city-logo.svg"

export function NavHeader() {
  return (
    <s.NavbarContainer>
      <s.SideContainer>
        <s.CityLogo src={logo} width={55} height={55} />

        <s.CityTextContainer>
          <s.CityTitle>Prefeitura de Taubaté</s.CityTitle>
          <s.CitySubtitle><i>Nosso caminho é o progresso</i></s.CitySubtitle>
        </s.CityTextContainer>
      </s.SideContainer>

      <s.LinkContainer>
      </s.LinkContainer>
    </s.NavbarContainer>
  );
}
