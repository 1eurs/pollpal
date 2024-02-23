import React from "react";
import { Typography, Box, Divider, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const TrustSection = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        py: theme.spacing(8),
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
    >
      <Typography
        variant="subtitle2"
        align="center"
        sx={{ mb: theme.spacing(4), fontWeight: 500 }}
      >
        TRUSTED BY OVER 2 USERS WORLDWIDE
      </Typography>
      <Grid container maxWidth="lg" sx={{ alignItems: "center" }}>
        {Array.from({ length: 3 }).map((_, index) => (
          <>
            <Grid item xs>
              <Box>
                <Typography variant="h1" color="info.main" align="center">
                  500k+
                </Typography>
                <Typography variant="h3" color="text.secondary" align="center">
                  Users
                </Typography>
              </Box>
            </Grid>
            {index < 2 && (
              <Divider
                sx={{ mx: theme.spacing(3), minHeight: "10rem" }}
                orientation="vertical"
                flexItem
              />
            )}
          </>
        ))}
      </Grid>
    </Box>
  );
};

export default TrustSection;
