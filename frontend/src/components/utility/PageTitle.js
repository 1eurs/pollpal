import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const PageTitle = ({ title, description, textAlign = "center", variant = "h1", sx }) => {
  const theme = useTheme();



  return (
    <Box sx={{ textAlign, pb: theme.spacing(2), pt: theme.spacing(6), ...sx }}>
      <Typography variant='h1' >
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" >
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default PageTitle;
