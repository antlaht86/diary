import React from "react";
import {
  createTheme,
  CssBaseline,
  PaletteColorOptions,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { orange } from "@mui/material/colors";

const primary: PaletteColorOptions = orange;
export const primaryTheme = createTheme({
  palette: {
    primary,
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
