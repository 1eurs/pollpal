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
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { voteInPoll, fetchChoices } from "./redux/pollSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SharePoll from "./SharePoll";
import CommentPoll from "./CommentPoll";
import RelativeTime from "./utility/RelativeTime";

const PollOptionsVote = ({ polls, choices, votes, comments, replies }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { poll_id } = useParams();
  const selectedPoll = polls.find((poll) => poll.id === poll_id);
  const selectedChoices = choices.filter((item) => item.poll_id === poll_id);
  const selectedVotes = votes.filter((item) => item.poll_id === poll_id);

  const [name, setName] = useState();

  const [voteData, setVoteData] = useState({
    poll_id: null,
    choice_id: null,
    voter_ip: null,
    created_by: null,
  });

  const handleVote = async () => {
    let res;
    if (selectedPoll.require_names && !name) {
      alert("Name is required in this poll");
    }

    if (!voteData.choice_id) {
      alert("Please select a choice before voting.");
      return;
    }

    res = await dispatch(
      voteInPoll({ ...voteData, poll_id: poll_id, name: name })
    );

    if (res.type == "polls/vote/fulfilled") {
      setVoteData({});
    } else {
      alert("you already voted ");
    }
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

  return (
    <Container maxWidth="sm">
      <Card sx={{ borderTop: 4, borderColor: "primary.main" }}>
        <CardContent>
          <FormControl>
            <Box sx={{ pb: 3 }}>
              <Typography variant="h2">{selectedPoll?.question}</Typography>
              <Typography variant="subtitle1">
                by {selectedPoll?.created_by || "a guest"}
                {" · "}
                <RelativeTime timestamp={selectedPoll?.created_at} />
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
          {selectedPoll?.require_names && (
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                size="small"
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Name (required)"
                placeholder="Enter your name"
              ></TextField>
            </Box>
          )}
          <Box
            sx={{
              pt: 3,
            }}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button fullWidth variant="contained" onClick={handleVote}>
                Vote
              </Button>
              <Button fullWidth variant="contained" onClick={handleResults}>
                Results
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <SharePoll selectedPoll={selectedPoll} />
      <CommentPoll
        selectedPoll={selectedPoll}
        comments={comments}
        replies={replies}
      />
    </Container>
  );
};

export default PollOptionsVote;
