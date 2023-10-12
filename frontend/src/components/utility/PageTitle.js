import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const PageTitle = ({ title, description, textAlign, variant, sx }) => {
  return (
    <Box
      sx={{ textAlign: textAlign || "center", pb: "3rem", pt: "5rem", ...sx }}
    >
      <Typography variant={variant || "h1"}>{title}</Typography>
      {description && (
        <Typography variant="subtitle1">{description}</Typography>
      )}
    </Box>
  );
};

export default PageTitle;
