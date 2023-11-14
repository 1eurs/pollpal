import React, { useState } from "react";

import { useDispatch } from "react-redux";
import {
  createPollWithDates,
  createPollWithChoices,
  fetchPolls,
  fetchChoices,
  fetchDates,
} from "./redux/pollSlice";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  Container,
  MenuItem,
  TextField,
} from "@mui/material";
import PageTitle from "./utility/PageTitle";
import OptionsForm from "./Forms/OptionsForm";
import SettingsPoll from "./SettingsPoll";
import CalendarForm from "./Forms/MultiDateCalendar";

const VotingType = [
  {
    value: "choices",
    label: "Multiple choice",
  },
  {
    value: "dates",
    label: "Meeting Poll",
  },
];

const CreateForm = ({ user }) => {
  const [votingSecurityOption, setVotingSecurityOption] = useState("ip");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [checked, setChecked] = useState({
    allow_comments: false,
    require_names: false,
    can_share: false,
    captcha: false,
  });

  const [isMeetingForm, setMeetingForm] = useState(false);

  const [title, setTitle] = useState("");

  const [optionsFormData, setOptionsFormData] = useState({
    votingType: "choices",
    options: ["", ""],
  });

  const [datesFormData, setDatesFormData] = useState([]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleVotingTypeChange = (e) => {
    const selectedVotingType = e.target.value;
    setOptionsFormData({ ...optionsFormData, votingType: selectedVotingType });
    setMeetingForm(selectedVotingType === "dates");
  };

  const handleCreatePoll = (e) => {
    e.preventDefault();
    let pollData = {};

    if (isMeetingForm) {
      pollData = {
        question: title,
        poll_type: "dates",
        dates: datesFormData,
        allow_comments: checked.allow_comments,
        require_names: checked.require_names,
        can_share: checked.can_share,
        captcha: checked.captcha,
        voting_security_option: votingSecurityOption,
      };
    } else {
      pollData = {
        question: title,
        poll_type: optionsFormData.votingType,
        choices: optionsFormData.options,
        allow_comments: checked.allow_comments,
        require_names: checked.require_names,
        can_share: checked.can_share,
        captcha: checked.captcha,
        voting_security_option: votingSecurityOption,
        created_by: user.user_id,
      };
    }
    try {
      if (isMeetingForm) {
        console.log(pollData);
        dispatch(createPollWithDates(pollData))
          .then((action) => {
            let pollID = action.payload.poll_id;
            dispatch(fetchDates());
            dispatch(fetchPolls());
            if (pollID) {
              navigate(`/vote/dates/${pollID}`);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        dispatch(createPollWithChoices(pollData))
          .then((action) => {
            let pollID = action.payload.poll_id;
            dispatch(fetchPolls());
            dispatch(fetchChoices());
            if (pollID) {
              navigate(`/vote/options/${pollID}`);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
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
            <CalendarForm
              datesWithTimeSlots={datesFormData}
              setDatesWithTimeSlots={setDatesFormData}
            />
          ) : (
            <OptionsForm
              optionsFormData={optionsFormData}
              setOptionsFormData={setOptionsFormData}
            />
          )}
        </CardContent>
      </Card>
      <SettingsPoll
        handleCreatePoll={handleCreatePoll}
        handleCreatePollDraftButton="Create Poll"
        saveAsDraftButton={true}
        checked={checked}
        setChecked={setChecked}
        votingSecurityOption={votingSecurityOption}
        setVotingSecurityOption={setVotingSecurityOption}
      />
    </Container>
  );
};

export default CreateForm;
