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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchChoices,
  fetchDates,
  fetchPolls,
  fetchVotes,
  voteInPoll,
} from "./redux/ pollSlice";
import { useParams } from "react-router-dom";

const PollOptionsVote = ({ notitle }) => {
  const dispatch = useDispatch();
  const polls = useSelector((state) => state.polls.polls);
  const choices = useSelector((state) => state.polls.choices);
  const votes = useSelector((state) => state.polls.votes);
  const dates = useSelector((state) => state.polls.dates);

  const [voteData, setVoteData] = useState({
    choice_id: "",
    voter_ip: "123.34.53.1",
  });

  const { poll_id } = useParams();

  useEffect(() => {
    dispatch(fetchPolls());
    dispatch(fetchChoices());
    dispatch(fetchDates());
  }, []);

  useEffect(() => {
    if (voteData.choice_id) {
      const fetchData = async () => {
        await dispatch(fetchVotes());
      };

      fetchData();
    }
  }, [dispatch, voteData]);

  const selectedPoll = polls.find((poll) => poll.id === poll_id);
  const selectedChoices = choices.filter((item) => item.poll_id === poll_id);
  const selectedDates = dates.filter((item) => item.poll_id === poll_id);
  const selectedVotes = votes.filter((item) => item.poll_id === poll_id);

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
    const voteCounts = {};
    for (const vote of selectedVotes) {
      const choiceId = vote.choice_id;
      if (voteCounts[choiceId]) {
        voteCounts[choiceId]++;
      } else {
        voteCounts[choiceId] = 1;
      }
    }
    console.log(voteCounts);
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
        {!notitle && (
          <PageTitle
            title="Experience Live Voting"
            description="See how easy it is to conduct a poll with live results using StrawPoll."
          />
        )}
        <Card sx={{ borderTop: 4, borderColor: "primary.main" }}>
          <CardContent>
            <FormControl>
              <FormLabel id="title">
                <Typography variant="h2">{selectedPoll.question}</Typography>
              </FormLabel>

              <Typography variant="subtitle1">Make a choice:</Typography>
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
                    label={option.choice_text}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <Box sx={{ display: "flex", gap: "0.5rem" }}>
              <Button variant="contained" onClick={handleVote}>
                Vote
              </Button>
              <Button variant="contained" onClick={handleResults}>
                Results
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default PollOptionsVote;
