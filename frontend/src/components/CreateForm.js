import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { Calendar } from "react-multi-date-picker";

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
    value: "Multiple choice",
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
  const [isMeetingForm, setMeetingForm] = useState(false);

  const [optionsFormData, setOptionsFormData] = useState({
    title: "",
    votingType: "Multiple choice",
    options: ["", ""],
  });

  const [datesFormData, setDatesFormData] = useState({
    title: "",
    votingType: "Meeting Poll",
    dates: [],
  });

  const handleTitleChange = (e) => {
    setOptionsFormData({ ...optionsFormData, title: e.target.value });
  };

  const handleVotingTypeChange = (e) => {
    const selectedVotingType = e.target.value;
    setOptionsFormData({ ...optionsFormData, votingType: selectedVotingType });
    setMeetingForm(selectedVotingType === "Meeting Poll");
  };

  const handleCreatePoll = () => {
    if (optionsFormData.votingType === "Meeting Poll") {
      const pollData = {
        title: datesFormData.title,
        votingType: datesFormData.votingType,
        dates: datesFormData.dates,
      };

      console.log(pollData);
    } else {
      const pollData = {
        title: optionsFormData.title,
        votingType: optionsFormData.votingType,
        options: optionsFormData.options,
      };
      console.log(pollData);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
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
                value={optionsFormData.title}
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
