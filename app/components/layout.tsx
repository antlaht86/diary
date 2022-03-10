import { Breadcrumbs, Link as MuiLink, Container } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "remix";

type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
  const params = useParams();
  const [showBred, setShowBred] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setShowBred(false);
    }
  }, [location.pathname]);

  return (
    <Box>
      <Container maxWidth="sm" sx={{ marginTop: "50px", paddingTop: "50px" }}>
        {showBred && (
          <Breadcrumbs aria-label="breadcrumb">
            <MuiLink
              underline="hover"
              color="inherit"
              href={"/logs/" + params.year}
            >
              {params.year}
            </MuiLink>
            <MuiLink
              underline="hover"
              color="inherit"
              href={"/logs/" + params.year + "/" + params.month}
            >
              {params.month}
            </MuiLink>
          </Breadcrumbs>
        )}

        {children}
      </Container>
    </Box>
  );
}
