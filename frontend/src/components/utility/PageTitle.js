import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const PageTitle = ({ title, description, textAlign = "center", variant = "h1", sx }) => {
  const theme = useTheme();

  const titleStyles = {
    fontWeight: theme.typography.fontWeightMedium, // Adjust the font weight as needed
    lineHeight: 1.2, // Adjust line height for better readability
    marginBottom: theme.spacing(1), // Spacing between title and description
    color: theme.palette.text.primary // Ensuring text color is according to theme
  };

  const descriptionStyles = {
    fontSize: '1rem', // Adjust the font size as needed
    color: theme.palette.text.secondary, // Description color
    lineHeight: 1.5 // Line height for better readability
  };

  return (
    <Box sx={{ textAlign, pb: theme.spacing(2), pt: theme.spacing(6), ...sx }}>
      <Typography variant={variant} sx={titleStyles}>
        {title}
      </Typography>
      {description && (
        <Typography variant="subtitle1" sx={descriptionStyles}>
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default PageTitle;
