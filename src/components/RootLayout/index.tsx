import { Outlet } from "react-router-dom";

import * as s from "./styles";

import { NavHeader } from "@components/NavHeader";

export function RootLayout() {
  return (
    <s.LayoutContainer>
      <NavHeader />

      <s.Content>
        <Outlet />
      </s.Content>
    </s.LayoutContainer>
  );
}
