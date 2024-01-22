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
            bgcolor={"secondary.dark"}
            p={2}
            borderRadius={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: 100,
            }}
          >
            <Typography variant="body1" color='white'>
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
                bgcolor={"secondary.dark"}
                sx={{ p: 2, borderRadius: 2, width: 100 }}
              >
    <Typography variant="body1" color={'white'} >
      {dayjs(timeSlot.start_time).format("HH:mm")} <br />
      to {dayjs(timeSlot.end_time).format("HH:mm")}
    </Typography>


              </Box>
            ) : (
              <Box
                bgcolor={"secondary.dark"}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  width: 100,
                  textAlign: "center",
                }}
              >
                <Typography variant="body1" color='white'>ALL<br/> TIME</Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* result */}
        {isResult && (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Box
              bgcolor={"secondary.dark"}
              p={2}
              borderRadius={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box textAlign={"center"}>
                <Typography color='white' variant="body2">AGREE</Typography>
                <Typography color='white' variant="body2">{element.vote_count_true}</Typography>
              </Box>
            </Box>
            <Box
              bgcolor={"secondary.dark"}
              p={2}
              borderRadius={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box textAlign={"center"}>
                <Typography color='white' variant="body2">NOT AGREE</Typography>
                <Typography color='white' variant="body2">{element.vote_count_false}</Typography>
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
              <Typography variant="body2">Agree</Typography>
            </Button>
            <Button 
              variant={
                selectedChoices[element.id] === false ? "contained" : "outlined"
              }
              onClick={() => handleSelect(element.id, false)}
            >
              <Typography variant="body2">Not Agree</Typography>
            </Button>
          </Box>
        )}
      </Box>
      <Box sx={{ py: 1 }}></Box>
    </Box>
  );
};

export default DateElement;
