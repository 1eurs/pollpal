import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Container maxWidth sx={{ backgroundColor: "#2b3544" }}>
      <Box
        sx={{
          p: 6,
        }}
        component="footer"
      >
        <Container>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://your-website.com/">
              PollPal
            </Link>
            &nbsp;
            {new Date().getFullYear()}
          </Typography>
        </Container>
      </Box>
    </Container>
  );
}
