import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchDateVotes, voteInDatesPoll } from "./redux/pollSlice";
import { useNavigate, useParams } from "react-router-dom";
import SharePoll from "./SharePoll";
import CommentPoll from "./CommentPoll";
import DateElement from "./DateElement";
import RelativeTime from "./utility/RelativeTime";
import MyAlert from "./utility/MyAlert";
import MyBackdrop from "./utility/MyBackdrop";
import PageTitle from "./utility/PageTitle";

const MeetingPollVote = ({ polls, dates, comments, replies }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAlert1, setAlert1] = useState(false);
  const [isAlert2, setAlert2] = useState(false);

  const { poll_id } = useParams();
  const selectedPoll = polls.find((poll) => poll.id === poll_id);
  const selectedDates = dates.filter((item) => item.poll_id === poll_id);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const [voteData, setVoteData] = useState({
    voter_ip: "00.00.00.0",
    poll_id: poll_id,
  });

  const [selectedChoices, setSelectedChoices] = useState({});

  const handleSelect = (date_id, can_attend) => {
    setSelectedChoices((prevChoices) => ({
      ...prevChoices,
      [date_id]: can_attend,
    }));
  };

  const handleVote = () => {
    let dateChoices = [];
    setAlert1(false);
    setAlert2(false);
    for (const date_id in selectedChoices) {
      const obj = {
        date_id: date_id,
        can_attend: selectedChoices[date_id],
      };
      dateChoices.push(obj);
    }

    let voteDataWithDateChoices = { ...voteData, dateChoices };

    dispatch(voteInDatesPoll(voteDataWithDateChoices)).then((action) => {
      if (action.type === "polls/datesvote/rejected") {
        console.log(action);
        if (action.error.message === "No date choices provided") {
          setAlert2(true);
        } else if (
          action.error.message === "You have already voted in this poll."
        ) {
          setAlert1(true);
        }
      } else {
        handleOpen();
        setAlert1(false);
        setAlert2(false);
      }
    });
  };

  const handleResults = () => {
    dispatch(fetchDateVotes());
    navigate(`/results/meeting/${poll_id}`);
  };

  if (!selectedPoll) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="sm">

      <PageTitle
        title="Vote in the Poll"
        description="Express your opinion by voting in this poll. Make your choice and see the results!"
        textAlign="center"
      />
      <Card sx={{ borderTop: 4, borderColor: "primary.main" }}>
        <CardContent>
          <Box sx={{ pb: 3 }}>
            <Typography variant="h6">{selectedPoll?.question}</Typography>
            <Typography variant="body2">
              by {selectedPoll?.created_by || "a guest"}
              {" · "}
              <RelativeTime timestamp={selectedPoll?.created_at} />
            </Typography>
          </Box>
          {selectedDates.map((element) =>
            element.times.length === 0 ? (
              <DateElement
                element={element}
                selectedChoices={selectedChoices}
                handleSelect={handleSelect}
                isVote={true}
              />
            ) : (
              element.times.map((timeSlot) => (
                <DateElement
                  timeSlot={timeSlot}
                  element={element}
                  selectedChoices={selectedChoices}
                  handleSelect={handleSelect}
                  isVote={true}
                />
              ))
            )
          )}

          {isAlert1 && (
            <MyAlert
              severity="error"
              message="You (or someone on your Wi-Fi/network) have already participated in this poll."
            />
          )}
          {isAlert2 && (
            <MyAlert
              severity="error"
              message="Please choose at least 1 option(s)."
            />
          )}

          <MyBackdrop
            open={open}
            handleClose={handleClose}
            poll_id={poll_id}
            navigate={navigate}
            dates={true}
          />

          {selectedPoll.require_names && (
            <Box sx={{ pb: 3 }}>
              <TextField
                fullWidth
                size="small"
                label="Name (required)"
                placeholder="Enter your name"
              ></TextField>
            </Box>
          )}

          <Box sx={{ display: "flex", gap: "0.5rem", pt: 1 }}>
            <Button variant="contained" fullWidth onClick={handleVote}>
              Vote
            </Button>
            <Button variant="contained" fullWidth onClick={handleResults}>
              Results
            </Button>
          </Box>
        </CardContent>
      </Card>
      <SharePoll can_share={selectedPoll.can_share} />
      <CommentPoll
        selectedPoll={selectedPoll}
        comments={comments}
        replies={replies}
      />
    </Container>
  );
};

export default MeetingPollVote;
