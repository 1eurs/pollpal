import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { createPollWithDates, createPollWithChoices } from "./redux/ pollSlice";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  MenuItem,
  TextField,
} from "@mui/material";
import PageTitle from "./utility/PageTitle";
import OptionsForm from "./Forms/OptionsForm";
import DateForm from "./Forms/DateForm";

const VotingType = [
  {
    value: "multiple_choice",
    label: "Multiple choice",
  },
  {
    value: "Meeting Poll",
    label: "Meeting Poll",
  },
  {
    value: "Ranking Poll",
    label: "Ranking Poll",
  },
];

const CreateForm = () => {
  const dispatch = useDispatch();

  const [isMeetingForm, setMeetingForm] = useState(false);

  const [title, setTitle] = useState("");

  const [optionsFormData, setOptionsFormData] = useState({
    votingType: "multiple_choice",
    options: ["", ""],
  });

  const [datesFormData, setDatesFormData] = useState({
    votingType: "meeting",
    data: [],
  });

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleVotingTypeChange = (e) => {
    const selectedVotingType = e.target.value;
    setOptionsFormData({ ...optionsFormData, votingType: selectedVotingType });
    setMeetingForm(selectedVotingType === "Meeting Poll");
  };

  const handleCreatePoll = async (e) => {
    e.preventDefault();
    let pollData = {};

    const dateFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    if (isMeetingForm) {
      pollData = {
        question: title,
        poll_type: "meeting",
        dates: datesFormData.data.map((date) => ({
          date: date.date.toLocaleString("en-US", dateFormatOptions),
          times: date.times.map((timeRange) => ({
            start_time: timeRange[0].toLocaleString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }),
            end_time: timeRange[1].toLocaleString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }),
          })),
        })),
      };
      console.log(pollData);
    } else {
      pollData = {
        question: title,
        poll_type: optionsFormData.votingType,
        choices: optionsFormData.options,
      };
      console.log(pollData);
    }

    try {
      if (isMeetingForm) {
        await dispatch(createPollWithDates(pollData));
      } else {
        await dispatch(createPollWithChoices(pollData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        pb: "2rem",
      }}
    >
      <Container maxWidth="sm">
        <PageTitle
          title="Create a Poll"
          description="Complete the below fields to create your poll."
          textAlign="center"
          variant="h1"
        />

        <Card sx={{ borderTop: 4, borderColor: "primary.main" }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                value={title}
                onChange={handleTitleChange}
                fullWidth
              />
              <TextField
                id="outlined-select"
                select
                label="Voting types"
                value={optionsFormData.votingType}
                onChange={handleVotingTypeChange}
                variant="outlined"
                fullWidth
              >
                {VotingType.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            {isMeetingForm ? (
              <DateForm
                datesFormData={datesFormData}
                setDatesFormData={setDatesFormData}
              />
            ) : (
              <OptionsForm
                optionsFormData={optionsFormData}
                setOptionsFormData={setOptionsFormData}
              />
            )}

            <Divider variant="middle" sx={{ my: "1rem" }} />
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Button
                variant="contained"
                sx={{ padding: "0.5rem 2rem" }}
                onClick={handleCreatePoll}
              >
                Create poll
              </Button>
              <Button variant="contained" sx={{ padding: "0.5rem 2rem" }}>
                Save as draft
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default CreateForm;
