import React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

const MyAlert = ({ severity, message }) => {
  return (
    <Box sx={{ pt: 1 }}>
      <Alert severity={severity}>{message}</Alert>
    </Box>
  );
};

export default MyAlert;
