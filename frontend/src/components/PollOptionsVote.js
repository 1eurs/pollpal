import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import PageTitle from "./utility/PageTitle";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { voteInPoll, fetchChoices } from "./redux/pollSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SharePoll from "./SharePoll";
import CommentPoll from "./CommentPoll";
import TimeDifference from "./utility/TimeDifference";

const PollOptionsVote = ({ notitle, polls, choices, votes }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { poll_id } = useParams();

  const selectedPoll = polls.find((poll) => poll.id === poll_id);
  const selectedChoices = choices.filter((item) => item.poll_id === poll_id);
  const selectedVotes = votes.filter((item) => item.poll_id === poll_id);

  console.log(selectedPoll);
  const [voteData, setVoteData] = useState({
    choice_id: "",
    voter_ip: "123.34.53.1",
  });

  if (!selectedPoll) {
    return <div>Loading...</div>;
  }

  const handleVote = () => {
    if (!voteData.choice_id) {
      alert("Please select a choice before voting.");
      return;
    }
    dispatch(voteInPoll({ ...voteData, poll_id: poll_id })).then(() => {
      setVoteData({ ...voteData, choice_id: "" });
    });
  };

  const handleResults = () => {
    dispatch(fetchChoices());
    const voteCounts = {};
    for (const vote of selectedVotes) {
      const choiceId = vote.choice_id;
      if (voteCounts[choiceId]) {
        voteCounts[choiceId]++;
      } else {
        voteCounts[choiceId] = 1;
      }
    }
    navigate(`/results/${poll_id}`);
  };

  const handleShare = () => {
    console.log("share");
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        pb: "2rem",
      }}
    >
      <Container maxWidth="sm">
        <Card sx={{ borderTop: 4, borderColor: "primary.main" }}>
          <CardContent>
            <FormControl>
              <Box sx={{ pb: 3 }}>
                <Typography variant="h2">{selectedPoll.question}</Typography>
                <Typography variant="subtitle1">
                  by {selectedPoll.created_by || "a guest"}
                  {" · "}
                  <TimeDifference date={selectedPoll.created_at} />
                </Typography>
              </Box>
              <Box sx={{ pb: 1 }}>
                <Typography variant="subtitle1">Make a choice:</Typography>
              </Box>

              <RadioGroup
                name="options"
                value={voteData.choice_id}
                onChange={(e) =>
                  setVoteData({
                    ...voteData,
                    choice_id: e.target.value,
                  })
                }
              >
                {selectedChoices.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option.id}
                    control={<Radio />}
                    label={
                      <Typography variant="subtitle1">
                        {option.choice_text}
                      </Typography>
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                pt: 3,
              }}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button variant="contained" onClick={handleVote}>
                  Vote
                </Button>
                <Button variant="contained" onClick={handleResults}>
                  Results
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
        <SharePoll />
        <CommentPoll />
      </Container>
    </Box>
  );
};

export default PollOptionsVote;
