import React from "react";
import { Container, Typography, Link, Box, useTheme } from "@mui/material";

export default function Footer() {
  const theme = useTheme();

  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        width: "100%",
        mt: theme.spacing(4),
        py: theme.spacing(3),
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.secondary,
        position: "relative", // Changed to relative for in-flow positioning
        bottom: 0,
      }}
      component="footer"
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          {"Copyright © "}
          <Link color="inherit" href="">
            PollPal
          </Link>
          &nbsp;{currentYear}
        </Typography>
      </Container>
    </Box>
  );
}
