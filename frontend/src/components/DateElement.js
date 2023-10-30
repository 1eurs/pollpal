import React from "react";
import dayjs from "dayjs";
import { Box, Typography, Button } from "@mui/material";

const DateElement = ({
  element,
  selectedChoices,
  handleSelect,
  timeSlot,
  isVote,
  isResult,
}) => {
  return (
    <Box sx={{ py: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <Box
            bgcolor={"secondary.main"}
            p={2}
            borderRadius={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: 100,
            }}
          >
            <Typography variant="h3">
              {dayjs(element.date).format("MMM D, YY")}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {timeSlot ? (
              <Box
                bgcolor={"secondary.light"}
                sx={{ p: 2, borderRadius: 2, width: 100 }}
              >
                <Typography variant="subtitle2">
                  from {dayjs(timeSlot.start_time).format("HH:mm")}
                </Typography>
                <Typography variant="subtitle2">
                  to {dayjs(timeSlot.end_time).format("HH:mm")}
                </Typography>
              </Box>
            ) : (
              <Box
                bgcolor={"secondary.light"}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  width: 100,
                  textAlign: "center",
                }}
              >
                <Typography variant="subtitle2">ALL</Typography>
                <Typography variant="subtitle2">TIME</Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* result */}
        {isResult && (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Box
              bgcolor={"secondary.main"}
              p={2}
              borderRadius={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box textAlign={"center"}>
                <Typography variant="h3">AGREE</Typography>
                <Typography variant="h3">{element.vote_count_true}</Typography>
              </Box>
            </Box>
            <Box
              bgcolor={"secondary.main"}
              p={2}
              borderRadius={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box textAlign={"center"}>
                <Typography variant="h3">NOT AGREE</Typography>
                <Typography variant="h3">{element.vote_count_false}</Typography>
              </Box>
            </Box>
          </Box>
        )}

        {/* vote */}

        {isVote && (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant={
                selectedChoices[element.id] === true ? "contained" : "outlined"
              }
              onClick={() => handleSelect(element.id, true)}
            >
              Agree
            </Button>
            <Button
              variant={
                selectedChoices[element.id] === false ? "contained" : "outlined"
              }
              onClick={() => handleSelect(element.id, false)}
            >
              Not Agree
            </Button>
          </Box>
        )}
      </Box>
      <Box sx={{ py: 1 }}></Box>
    </Box>
  );
};

export default DateElement;
