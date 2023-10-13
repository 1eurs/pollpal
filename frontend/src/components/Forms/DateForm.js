import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { Calendar } from "react-multi-date-picker";
import { DateRangePicker } from "rsuite";

import { Box, Button, Card, CardContent, Typography } from "@mui/material";

const DateForm = ({ datesFormData, setDatesFormData }) => {
  const [timeSlotCounts, setTimeSlotCounts] = useState([]);

  const addTimeSlot = (dateIndex) => {
    const newCounts = [...timeSlotCounts];
    newCounts[dateIndex] = (newCounts[dateIndex] || 0) + 1;
    setTimeSlotCounts(newCounts);
  };

  const handleDateChange = (newDates) => {
    const existingData = datesFormData.data;
    const newData = newDates.map((date) => ({
      date,
      times: [],
    }));

    existingData.forEach((existingDate, index) => {
      if (newData[index]) {
        newData[index].times = existingDate.times;
      } else {
        newData.push(existingDate);
      }
    });

    setDatesFormData({ ...datesFormData, data: newData });
  };

  const handleTimeChange = (dateIndex, newTime) => {
    const newData = [...datesFormData.data];
    newData[dateIndex].times.push(newTime);
    setDatesFormData({ ...datesFormData, data: newData });
  };

  const deleteOption = (index) => {
    const newData = [...datesFormData.data];
    newData.splice(index, 1);
    setDatesFormData({ ...datesFormData, data: newData });
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
            value={datesFormData.data.map((item) => item.date)}
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
          {datesFormData.data.length === 0 ? (
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
              {datesFormData.data.map((item, index) => (
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
                            {item.date.format("ddd, MMMM DD, YYYY")}
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
                        {timeSlotCounts.length === 0 ? (
                          <Typography>All times</Typography>
                        ) : (
                          Array.from(Array(timeSlotCounts[index] || 0)).map(
                            (_, slotIndex) => (
                              <Box sx={{ py: 0.5 }}>
                                <DateRangePicker
                                  key={slotIndex}
                                  appearance="default"
                                  format="HH:mm"
                                  ranges={[]}
                                  style={{ width: 200 }}
                                  onOk={(value) =>
                                    handleTimeChange(index, value)
                                  }
                                />
                              </Box>
                            )
                          )
                        )}
                      </Box>
                      <Box>
                        <Button
                          startIcon={<AddIcon />}
                          size="small"
                          variant="contained"
                          onClick={() => addTimeSlot(index)}
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
