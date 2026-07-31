import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/theme";

import { GlobalStyle } from "./styles/global";

import { Router } from "./router";
import { BrowserRouter } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import { SpreadsheetProvider } from "@contexts/SpreadsheetContext";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <SpreadsheetProvider>
        <BrowserRouter>
          <Toaster />

          <Router />
        </BrowserRouter>

        <GlobalStyle />
      </SpreadsheetProvider>
    </ThemeProvider>
  );
}
