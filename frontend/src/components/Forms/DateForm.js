import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { Calendar } from "react-multi-date-picker";

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

const DateForm = ({ datesFormData, setDatesFormData }) => {
  const handleDateChange = (selectedDates) => {
    setDatesFormData({ ...datesFormData, dates: selectedDates });
  };

  const deleteOption = (index) => {
    const newValues = datesFormData.dates.filter((_, i) => i !== index);
    setDatesFormData({ ...datesFormData, dates: newValues });
  };

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
        }}
      >
        <Box>
          <Calendar
            className="custom-calendar"
            inputClass="custom-input"
            multiple
            value={datesFormData.dates}
            onChange={handleDateChange}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          {datesFormData.dates.length === 0 ? (
            <Card sx={{ textAlign: "center", border: 1 }}>
              <CardContent
                sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              >
                <Typography variant="h2">Dates</Typography>
                <Typography variant="subtitle2">
                  Click on a date in the calendar to get started.
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
            >
              {datesFormData.dates.map((date, index) => (
                <Card sx={{ border: 1 }}>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "0.5rem",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <Typography variant="h4" key={index}>
                            {date.format("ddd, MMMM DD, YYYY")}
                          </Typography>
                        </Box>
                        <Box>
                          <ClearIcon
                            onClick={() => deleteOption(index)}
                            fontSize="m"
                          />
                        </Box>
                      </Box>
                      <Box>
                        <TextField
                          sx={{ "& input": { textAlign: "center" } }}
                          disabled
                          value="All-time"
                        ></TextField>
                      </Box>
                      <Box>
                        <Button
                          startIcon={<AddIcon />}
                          size="small"
                          variant="contained"
                        >
                          Add times
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default DateForm;
