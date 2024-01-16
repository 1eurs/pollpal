import React from "react";
import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import TrustSection from "./TrustSection";
import FeaturesSection from "./FeaturesSection";
import GetStartedSection from "./GetStartedSection";
import PollPal3DComponent from "./ThreeDFiberComponent";
const Hero = () => {
  const theme = useTheme();

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, overflow: 'hidden' }}>
      <Container sx={{ py: theme.spacing(10), display: "flex", flexDirection: ['column', 'row'], alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ maxWidth: "600px", mb: [5, 0], textAlign: 'left' }}>
          <Typography variant="h1" color="text.primary" gutterBottom style={{ fontWeight: 600, fontSize: '2.5rem', color: '#FF5A5F' }}>
            Effortless Poll Creation
          </Typography>
          <Typography variant="h1" color="text.secondary" paragraph style={{ fontWeight: 500, fontSize: '1.25rem', marginBottom: theme.spacing(2), color: '#484848' }}>
            Crafting polls made simple and engaging.
          </Typography>
          <Typography variant="h1" color="text.secondary" paragraph style={{ fontSize: '1rem', color: '#484848' }}>
            Discover an intuitive way to gather insights and connect with your audience. Start engaging more effectively today.
          </Typography>
          <Link to={`create/poll`} style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary" size="large">
              Create a Poll
            </Button>
          </Link>
        </Box>
        <Box sx={{ flexShrink: 0, maxWidth: '350px', maxHeight: '350px', alignSelf: 'center' }}>
          <PollPal3DComponent />
        </Box>
      </Container>
      <FeaturesSection />
      <GetStartedSection />
    </Box>
  );
};



export default Hero;
