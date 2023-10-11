import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";

import { Link } from "react-router-dom";
import TrustSection from "./TrustSection";
import PollVote from "../PollVote";

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
              <Typography variant="hero" noWrap>
                Create your poll
              </Typography>
              <Typography variant="subHero">in seconds</Typography>
            </Box>

            <Typography variant="heroText">
              Want to ask your friends where to go friday night or arrange a
              meeting with co-workers? Create a poll - and get answers in no
              time.{" "}
            </Typography>
            <Link to={`create`}>
              <Button variant="contained">Create a Poll</Button>
            </Link>
          </Box>
          <Box>
            <PollVote notitle={true} />
          </Box>
        </Box>

        <TrustSection />
      </Container>
    </Box>
  );
};

export default Hero;
