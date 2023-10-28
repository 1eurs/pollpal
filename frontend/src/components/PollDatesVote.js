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

  const handleVote = async () => {
    let dateChoices = [];
    for (const date_id in selectedChoices) {
      const obj = {
        date_id: date_id,
        can_attend: selectedChoices[date_id],
      };
      dateChoices.push(obj);
    }

    let voteDataWithDateChoices = { ...voteData, dateChoices };
    let res = await dispatch(voteInDatesPoll(voteDataWithDateChoices));
    if (res.type == "polls/datesvote/rejected") {
      alert("you voted already");
    }
  };

  const handleResults = () => {
    dispatch(fetchDateVotes());
    navigate(`/meetingresults/${poll_id}`);
    console.log(selectedChoices);
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
            element.times.map((timeSlot) => (
              <Box sx={{ py: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Box
                      bgcolor={"secondary.main"}
                      p={2}
                      borderRadius={2}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h3">
                        {dayjs(element.date).format("MMM D, YY")}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        bgcolor={"secondary.light"}
                        sx={{ p: 2, borderRadius: 2 }}
                      >
                        <Typography variant="subtitle2">
                          from {dayjs(timeSlot.start_time).format("HH:mm")}
                        </Typography>
                        <Typography variant="subtitle2">
                          to {dayjs(timeSlot.end_time).format("HH:mm")}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant={
                        selectedChoices[element.id] === true
                          ? "contained"
                          : "outlined"
                      }
                      onClick={() => handleSelect(element.id, true)}
                    >
                      Agree
                    </Button>
                    <Button
                      variant={
                        selectedChoices[element.id] === false
                          ? "contained"
                          : "outlined"
                      }
                      onClick={() => handleSelect(element.id, false)}
                    >
                      Not Agree
                    </Button>
                  </Box>
                </Box>
                <Box sx={{ py: 1 }}></Box>
              </Box>
            ))
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
