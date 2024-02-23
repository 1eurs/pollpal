import React from "react";
import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import FeaturesSection from "./FeaturesSection";
import GetStartedSection from "./GetStartedSection";
import EmbeddedPoll from "../EmbeddedPoll";
const Hero = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        overflow: "hidden",
      }}
    >
      <Container
        sx={{
          py: theme.spacing(10),
          display: "flex",
          flexDirection: ["column", "row"],
          alignItems: "center",
          justifyContent: "space-between",
          height: "500px",
        }}
      >
        <Box sx={{ maxWidth: "600px", mb: [5, 0], textAlign: "left" }}>
          <Box sx={{ spacing: 2 }}>
            <Typography variant="Hero" gutterBottom>
              Polls Made Simple.
            </Typography>

            <Typography
              variant="subtitle1"
              color="text.secondary"
              gutterBottom
              pt={0.4}
            >
              Quick Polls, Immediate Results.
            </Typography>

            <Box sx={{ pt: 2 }}>
              <Link to={`create/poll`} style={{ textDecoration: "none" }}>
                <Button variant="contained" color="primary" size="large">
                  Create a Poll
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "75%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <EmbeddedPoll poll_id="9e89b90e-5a21-44a9-99b7-49d297ee62e5" />
        </Box>
      </Container>
      <FeaturesSection />
      <GetStartedSection />
    </Box>
  );
};

export default Hero;
