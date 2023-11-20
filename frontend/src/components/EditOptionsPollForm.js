import React, { useState } from "react";

import { useDispatch } from "react-redux";
import {
  createPollWithChoices,
  fetchPolls,
  fetchChoices,
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
import OptionsForm from "./Forms/OptionsForm";
import SettingsPoll from "./SettingsPoll";
import MyAlert from "./utility/MyAlert";

const EditOptionsPollForm = ({ polls, choices }) => {
  const { poll_id } = useParams();

  const poll = polls.find((poll) => poll.id === poll_id);
  const choicesForPoll = choices.filter((item) => item.poll_id === poll_id);
  const [votingSecurityOption, setVotingSecurityOption] = useState("ip");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [checked, setChecked] = useState({
    allow_comments: poll.allow_comments,
    require_names: poll.require_names,
    can_share: poll.can_share,
    captcha: poll.captcha,
  });

  const [title, setTitle] = useState(poll.question);

  const [optionsFormData, setOptionsFormData] = useState({
    options: choicesForPoll.map((choice) => choice.choice_text),
  });

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCreatePoll = (e) => {
    e.preventDefault();
    let pollData = {
      question: title,
      poll_type: poll.poll_type,
      choices: optionsFormData.options,
      allow_comments: checked.allow_comments,
      require_names: checked.require_names,
      can_share: checked.can_share,
      captcha: checked.captcha,
      voting_security_option: votingSecurityOption,
    };

    dispatch(createPollWithChoices(pollData)).then((action) => {
      let pollID = action.payload.poll_id;
      dispatch(fetchPolls());
      dispatch(fetchChoices());
      if (pollID) {
        navigate(`/vote/options/${pollID}`);
      }
    });
  };

  return (
    <Container maxWidth="sm">
      <PageTitle
        title="Edit Poll"
        description="Edit your poll."
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
              value={poll.poll_type}
              variant="outlined"
              fullWidth
            >
              <MenuItem value={poll.poll_type}>{poll.poll_type}</MenuItem>
            </TextField>
          </Box>

          <OptionsForm
            optionsFormData={optionsFormData}
            setOptionsFormData={setOptionsFormData}
          />
        </CardContent>
      </Card>
      <SettingsPoll
        handleCreatePoll={handleCreatePoll}
        handleCreatePollButton="Update Poll"
        checked={checked}
        setChecked={setChecked}
        votingSecurityOption={votingSecurityOption}
        setVotingSecurityOption={setVotingSecurityOption}
      />
    </Container>
  );
};

export default EditOptionsPollForm;
