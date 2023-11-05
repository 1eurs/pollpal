import React from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const MyBackdrop = ({ open, handleClose, poll_id, navigate, dates }) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={open}
    >
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
              <CloseIcon onClick={handleClose} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
              }}
            >
              <DoneIcon fontSize="large" color="success" />
              <Typography>Vote Successful</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                Thank you for participating in this poll. Your vote has been
                counted.
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
              <Button
                onClick={() => {
                  dates
                    ? navigate(`/results/meeting/${poll_id}`)
                    : navigate(`/results/options/${poll_id}`);
                }}
              >
                Results
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Backdrop>
  );
};

export default MyBackdrop;
