export interface Theme {
  primary: string;
  secondary: string;
  border: string;
  primarySoft: string;
  secondarySoft: string;
  hover: string;
  accent: string;
  accentSoft: string;
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textMuted: string;
  textSubtle: string;
  success: string;
  danger: string;
  chartLines: string;
}

export const defaultTheme: Theme = {
  primary: "#217346",
  secondary: "#d3c8c6",
  border: "#979da3",
  primarySoft: "#2E9E5E",
  secondarySoft: "#dbd4d4",
  hover: "#D4DCE8",
  accent: "#20c1c7ee",
  accentSoft: "#189397ee",
  background: "#dddbdb",
  surface: "#F4F7FA",
  surfaceAlt: "#d8d9da",
  text: "#1A202C",
  textMuted: "#383c42",
  textSubtle: "#718096",
  success: "#1ea750",
  danger: "#f33d3d",
  chartLines: "#CBD5E1",
};

export const darkTheme: Theme = {
  primary: "#217346",
  secondary: "#2F3642",
  border: "#313844",
  primarySoft: "#1B5A38",
  secondarySoft: "#3A4352",
  hover: "#2A303A",
  accent: "#20c1c7ee",
  accentSoft: "#189397ee",
  background: "#16181D",
  surface: "#1E2229",
  surfaceAlt: "#252A33",
  text: "#E8ECF1",
  textMuted: "#AAB4C3",
  textSubtle: "#7D8794",
  success: "#1ea750",
  danger: "#f33d3d",
  chartLines: "#535353",
};
