import { Outlet } from "react-router-dom";

import * as s from "./styles";

import { Navbar } from "@components/Navbar";

export function RootLayout() {
return (
    <s.LayoutContainer>
      <Navbar />

      <s.Content>
        <Outlet />
      </s.Content>
    </s.LayoutContainer>
  );
}
