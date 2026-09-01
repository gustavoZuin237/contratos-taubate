export interface Theme {
  primary: string;
  primarySoft: string;
  secondary: string;
  hover: string;
  border: string;
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textMuted: string;
  danger: string;
  white: string;
}

export const defaultTheme: Theme = {
  primary: "#1f3c88",
  primarySoft: "#3251a1",
  secondary: "#d4d4d4",
  hover: "#D4DCE8",
  border: "#313131",
  background: "#d3d3d3",
  surface: "#ffffff",
  surfaceAlt: "#dfdddd",
  text: "#1A202C",
  textMuted: "#5b6675",
  danger: "#f33d3d",

  white: "#fff",
};
