import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Box } from "@mui/material";

const footerStyles = {
  bottom: 0,
  width: "100%",
  marginTop: "20px", // Adjust the top margin as needed
};

export default function Footer() {
  return (
    <Box
      sx={{
        ...footerStyles,
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
  );
}
