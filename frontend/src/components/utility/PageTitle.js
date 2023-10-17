import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const PageTitle = ({ title, description, textAlign, variant, sx }) => {
  return (
    <Box
      sx={{ textAlign: textAlign || "center", pb: "1rem", pt: "3rem", ...sx }}
    >
      <Typography variant={variant || "h1"}>{title}</Typography>
      {description && (
        <Typography variant="subtitle1">{description}</Typography>
      )}
    </Box>
  );
};

export default PageTitle;
