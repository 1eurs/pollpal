import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";

import { Link } from "react-router-dom";
import TrustSection from "./TrustSection";
import FeaturesSection from "./FeaturesSection";
import GetStartedSection from "./GetStartedSection";

const Hero = () => {
  return (
    <Box>
      <Container sx={{ pt: "10rem" }}>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="Hero" noWrap>
                Poll Crafting
              </Typography>
              <Typography variant="Hero" color={"secondary"}>
                Made Quick
              </Typography>
            </Box>

            <Typography variant="subtitle1">
              Unlock the power of rapid poll creation with our user-friendly
              platform. Design, share, and gather insights in no time.
            </Typography>
            <Link to={`create/poll`}>
              <Button variant="contained">Create a Poll</Button>
            </Link>
          </Box>
          <Box></Box>
        </Box>
      </Container>
      <TrustSection />
      <FeaturesSection />
      <GetStartedSection />
    </Box>
  );
};

export default Hero;
