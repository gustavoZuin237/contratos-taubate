import React from "react";

import { createRoot } from "react-dom/client";

import { App } from "./App.tsx";

import { AppThemeProvider } from "@contexts/AppThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <AppThemeProvider>
        <App />
      </AppThemeProvider>
  </React.StrictMode>
);
