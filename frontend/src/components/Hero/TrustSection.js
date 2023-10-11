import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Divider, Grid } from "@mui/material";

const TrustSection = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        pt: "10rem",
      }}
    >
      <Typography variant="h3" align="center" sx={{ mb: "2rem" }}>
        TRUSTED BY OVER 2 USERS WORLDWIDE
      </Typography>
      <Grid container maxWidth={"50%"}>
        <Grid item xs>
          <Box>
            <Typography variant="h4" align="center">
              500k+
            </Typography>
            <Typography variant="h6" align="center">
              Users
            </Typography>
          </Box>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs>
          <Box>
            <Typography variant="h4" align="center">
              6.5M+
            </Typography>
            <Typography variant="h6" align="center">
              Polls
            </Typography>
          </Box>
        </Grid>
        <Divider orientation="vertical" flexItem />

        <Grid item xs>
          <Box>
            <Typography variant="h4" align="center">
              190M+
            </Typography>
            <Typography variant="h6" align="center">
              Votes
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TrustSection;
