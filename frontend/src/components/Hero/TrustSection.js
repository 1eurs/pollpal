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
        py: "8rem",
      }}
    >
      <Typography variant="subtitle2" align="center" sx={{ mb: "2rem" }}>
        TRUSTED BY OVER 2 USERS WORLDWIDE
      </Typography>
      <Grid
        container
        maxWidth="lg"
        sx={{
          alignItems: "center",
        }}
      >
        <Grid item xs>
          <Box>
            <Typography variant="h1" color={"info.main"} align="center">
              500k+
            </Typography>
            <Typography variant="h3" color={"text.secondary"} align="center">
              Users
            </Typography>
          </Box>
        </Grid>
        <Divider sx={{ minHeight: "10rem" }} orientation="vertical" flexItem />
        <Grid item xs>
          <Box>
            <Typography variant="h1" color={"info.main"} align="center">
              500k+
            </Typography>
            <Typography variant="h3" color={"text.secondary"} align="center">
              Users
            </Typography>
          </Box>
        </Grid>
        <Divider orientation="vertical" flexItem />

        <Grid item xs>
          <Box>
            <Typography variant="h1" color={"info.main"} align="center">
              500k+
            </Typography>
            <Typography variant="h3" color={"text.secondary"} align="center">
              Users
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TrustSection;
