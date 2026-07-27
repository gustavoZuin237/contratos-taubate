import * as s from "./styles";

import {
  NotebookIcon,
  BookBookmarkIcon,
  MoonIcon,
  SunIcon,
} from "@phosphor-icons/react";

import { useThemeContext } from "../../hooks/useThemeContext";

import { Button } from "@components/Button";

export function Navbar() {
  const { toggleTheme, themeMode } = useThemeContext();

  return (
    <s.NavbarContainer>
      <s.LinkContainer>
        <s.StyledLink to="/">
          <NotebookIcon size={22} weight="fill" />
          <s.Label>Registrar contrato</s.Label>
        </s.StyledLink>
        <s.StyledLink to="/master">
          <BookBookmarkIcon size={22} weight="fill" />
          <s.Label>Registro mestre</s.Label>
        </s.StyledLink>

        <s.ThemeButtonContainer onClick={toggleTheme}>
          <Button variant="ghost">
            {themeMode == "dark" ? (
              <MoonIcon size={22} weight="fill" />
            ) : (
              <SunIcon size={22} weight="fill" />
            )}
          </Button>
        </s.ThemeButtonContainer>
      </s.LinkContainer>
    </s.NavbarContainer>
  );
}
