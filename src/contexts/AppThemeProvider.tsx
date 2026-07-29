import { ThemeProvider } from "styled-components";
import { defaultTheme } from "@styles/themes";

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={defaultTheme}>
      {children}
    </ThemeProvider>
  );
}
