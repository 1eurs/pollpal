import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Divider,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDateVotes, voteInDatesPoll } from "./redux/pollSlice";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import TimeDifference from "./utility/RelativeTime";
import SharePoll from "./SharePoll";
import CommentPoll from "./CommentPoll";
import DateElement from "./DateElement";

const PollDatesVote = ({ polls, dates, votes }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { poll_id } = useParams();
  const selectedPoll = polls.find((poll) => poll.id === poll_id);
  const selectedDates = dates.filter((item) => item.poll_id === poll_id);
  const selectedVotes = votes.filter((item) => item.poll_id === poll_id);

  const [voteData, setVoteData] = useState({
    voter_ip: "123.34.53.1",
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
        alert("You have already voted in this poll.");
      } else {
        alert("go to results");
      }
    });
  };

  const handleResults = () => {
    dispatch(fetchDateVotes());
    navigate(`/meetingresults/${poll_id}`);
  };

  if (!selectedPoll) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="sm">
      <Card sx={{ borderTop: 4, borderColor: "primary.main" }}>
        <CardContent>
          <Box sx={{ pb: 3 }}>
            <Typography variant="h2">{selectedPoll?.question}</Typography>
            <Typography variant="subtitle1">
              by {selectedPoll?.created_by || "a guest"}
              {" · "}
              <TimeDifference date={selectedPoll?.created_at} />
            </Typography>
          </Box>
          {selectedDates.map((element) =>
            element.times.length === 0 ? (
              <DateElement
                element={element}
                selectedChoices={selectedChoices}
                handleSelect={handleSelect}
              />
            ) : (
              element.times.map((timeSlot) => (
                <DateElement
                  timeSlot={timeSlot}
                  element={element}
                  selectedChoices={selectedChoices}
                  handleSelect={handleSelect}
                />
              ))
            )
          )}
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
          <Box sx={{ display: "flex", gap: "0.5rem" }}>
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
      {/* <CommentPoll allow_comments={selectedPoll.require_names} /> */}
    </Container>
  );
};

export default PollDatesVote;
