import { orange } from "@mui/material/colors";
import { createTheme, PaletteColorOptions } from "@mui/material/styles";

const primary: PaletteColorOptions = orange;
export const primaryTheme = createTheme({
  palette: {
    primary,
  },
});
