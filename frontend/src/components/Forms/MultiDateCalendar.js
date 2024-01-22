import React, { useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Box, Button, Typography } from "@mui/material";
import { PickersDay } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import AddIcon from "@mui/icons-material/Add";

function CalendarForm({ datesWithTimeSlots, setDatesWithTimeSlots }) {
  const handleAddTime = (index) => {
    const newDatesWithTimeSlots = [...datesWithTimeSlots];
    newDatesWithTimeSlots[index].times.push({
      start_time: null,
      end_time: null,
    });
    setDatesWithTimeSlots(newDatesWithTimeSlots);
  };

  const handleDeleteTimeSlot = (index, timeSlotIndex) => {
    setDatesWithTimeSlots((prevDates) => {
      const newDatesWithTimeSlots = [...prevDates];
      newDatesWithTimeSlots[index].times.splice(timeSlotIndex, 1);
      return newDatesWithTimeSlots;
    });
  };

  const validateTimeSlot = (timeSlot) => {
    return timeSlot.start_time && timeSlot.end_time && timeSlot.start_time < timeSlot.end_time;
  };

  const handleDateSelect = (date) => {
    const dateExists = datesWithTimeSlots.some(
      (item) => item.date.toString() === date.toString()
    );

    if (dateExists) {
      const updatedDatesWithTimeSlots = datesWithTimeSlots.filter(
        (item) => item.date.toString() !== date.toString()
      );
      setDatesWithTimeSlots(updatedDatesWithTimeSlots);
    } else {
      const newDateObject = {
        date: date,
        times: [],
      };
      setDatesWithTimeSlots((prevDates) => [...prevDates, newDateObject]);
    }
  };

  const CustomDay = (props) => {
    const matchedStyles = datesWithTimeSlots?.reduce((a, v) => {
      const date = dayjs(props.day);
      return date.isSame(v.date, "day") ? { backgroundColor: "#004b95" } : a;
    }, {});

    return <PickersDay {...props} sx={{ ...matchedStyles }} />;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <Box>
          <DateCalendar
            value={null}
            onChange={(newDate) => handleDateSelect(newDate)}
            slots={{ day: CustomDay }}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {datesWithTimeSlots.map((item, index) => (
            <>
              <Box key={index} sx={{ display: "flex", gap: 2, p: 2 }}>
                <Box
                  bgcolor={"background.default"}
                  p={0.5}
                  borderRadius={1}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body1" sx={{ p: 1 }}>
                    {item.date?.format("MMM DD")}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  {item.times.length > 0 ? (
                    item.times.map((timeSlot, timeSlotIndex) => (
                      <Box key={timeSlotIndex}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <TimePicker
                            ampm={false}
                            value={timeSlot.start_time}
                            onChange={(newValue) => {
                              const newTimeSlots = [...datesWithTimeSlots];
                              newTimeSlots[index].times[timeSlotIndex].start_time = newValue;
                              setDatesWithTimeSlots(newTimeSlots);
                            }}
                          />
                          <TimePicker
                            ampm={false}
                            value={timeSlot.end_time}
                            onChange={(newValue) => {
                              const newTimeSlots = [...datesWithTimeSlots];
                              newTimeSlots[index].times[timeSlotIndex].end_time = newValue;
                              setDatesWithTimeSlots(newTimeSlots);
                            }}
                          />
                        </Box>
                        {validateTimeSlot(timeSlot) ? (
                          <Button
                            sx={{ width: '100%', mt: 1, backgroundColor: "info.main" }}
                            size="small"
                            variant="contained"
                            onClick={() =>
                              handleDeleteTimeSlot(index, timeSlotIndex)
                            }
                          >
                            Delete
                          </Button>
                        ) : (
                          <Typography variant="body2" color="error">
                            Invalid time slot
                          </Typography>
                        )}
                      </Box>
                    ))
                  ) : (
                    <Box
                      bgcolor={"background.default"}
                      p={0.5}
                      borderRadius={1}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="subtitle2">ALL TIME</Typography>
                    </Box>
                  )}
                  <Button
                    startIcon={<AddIcon />}
                    size="small"
                    variant="contained"
                    onClick={() => handleAddTime(index)}
                  >
                    Add times
                  </Button>
                </Box>
              </Box>
            </>
          ))}
        </Box>
      </Box>
    </LocalizationProvider>
  );
}

export default CalendarForm;
