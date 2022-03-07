import {
  Breadcrumbs,
  Typography,
  Link as MuiLink,
  Container,
} from "@mui/material";
import { Box } from "@mui/system";

type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
  return (
    <Box>
      <Container maxWidth="sm" sx={{ marginTop: "50px", paddingTop: "50px" }}>
        <Breadcrumbs aria-label="breadcrumb">
          <MuiLink underline="hover" color="inherit" href="/">
            MUI
          </MuiLink>
          <MuiLink
            underline="hover"
            color="inherit"
            href="/getting-started/installation/"
          >
            Core
          </MuiLink>
          <Typography color="text.primary">Breadcrumbs</Typography>
        </Breadcrumbs>
        {children}
      </Container>
    </Box>
  );
}
