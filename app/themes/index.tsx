import React from "react";
import {
  createTheme,
  CssBaseline,
  PaletteColorOptions,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { green, red } from "@mui/material/colors";

const primary: PaletteColorOptions = green;
const secondary: PaletteColorOptions = red;
export const primaryTheme = createTheme({
  palette: {
    primary,
    secondary,
  },
});

type Props = {
  children: React.ReactElement;
};

const ThemeConfig = ({ children }: Props) => (
  <ThemeProvider theme={primaryTheme}>
    <StyledEngineProvider>
      <CssBaseline />
      {children}
    </StyledEngineProvider>
  </ThemeProvider>
);

export default ThemeConfig;
