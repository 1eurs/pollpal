import React, { useState } from "react";

import { useDispatch } from "react-redux";
import {
  createPollWithDates,
  createPollWithChoices,
  fetchPolls,
  fetchDates,
} from "./redux/pollSlice";
import { useNavigate, useParams } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  Container,
  MenuItem,
  TextField,
} from "@mui/material";
import PageTitle from "./utility/PageTitle";
import SettingsPoll from "./SettingsPoll";
import CalendarForm from "./Forms/MultiDateCalendar";
import dayjs from "dayjs";

const EditMeetingPollForm = ({ polls, dates }) => {
  const [votingSecurityOption, setVotingSecurityOption] = useState("ip");
  const { poll_id } = useParams();
  const poll = polls.find((poll) => poll.id === poll_id);
  const selectedDates = dates.filter((date) => date.poll_id === poll_id);
  console.log(selectedDates);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [checked, setChecked] = useState({
    allow_comments: false,
    require_names: false,
    can_share: false,
    captcha: false,
  });

  const [title, setTitle] = useState(poll.question);

  const oldDatesFromData = selectedDates.map((item) => {
    let date = dayjs(item.date);
    let timeSlots = item.times.map((timeSlot) => {
      return {
        start_time: timeSlot.start_time,
        end_time: timeSlot.end_time,
      };
    });
    return {
      date: date,
      times: timeSlots,
    };
  });
  const [datesFormData, setDatesFormData] = useState(oldDatesFromData);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleCreatePoll = (e) => {
    e.preventDefault();
    let pollData = {};

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
    dispatch(createPollWithDates(pollData)).then((action) => {
      let pollID = action.payload.poll_id;
      dispatch(fetchDates());
      dispatch(fetchPolls());
      if (pollID) {
        navigate(`/vote/dates/${pollID}`);
      }
    });
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
          </Box>

          <CalendarForm
            datesWithTimeSlots={datesFormData}
            setDatesWithTimeSlots={setDatesFormData}
          />
        </CardContent>
      </Card>
      <SettingsPoll
        handleCreatePoll={handleCreatePoll}
        handleCreatePollDraftButton="Update Poll"
        checked={checked}
        setChecked={setChecked}
        votingSecurityOption={votingSecurityOption}
        setVotingSecurityOption={setVotingSecurityOption}
      />
    </Container>
  );
};

export default EditMeetingPollForm;
