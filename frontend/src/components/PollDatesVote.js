import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  TableRow,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import PageTitle from "./utility/PageTitle";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchDates,
  fetchPolls,
  fetchVotes,
  voteInDatesPoll,
} from "./redux/ pollSlice";
import { useParams } from "react-router-dom";
import { Divider } from "rsuite";

const PollDatesVote = ({ notitle }) => {
  const dispatch = useDispatch();

  const [voteData, setVoteData] = useState({ voter_ip: "123.34.53.1" }); // State to track user selections

  const handleSelect = (date_id, can_attend) => {
    setVoteData((prevSelections) => ({
      ...prevSelections,
      [date_id]: {
        ...(prevSelections[date_id] || {}),
        can_attend,
      },
    }));
  };

  const handleVote = () => {
    console.log(voteData);
    dispatch(voteInDatesPoll({ ...voteData, poll_id: poll_id }));
  };
  const polls = useSelector((state) => state.polls.polls);
  const votes = useSelector((state) => state.polls.votes);
  const dates = useSelector((state) => state.polls.dates);

  const { poll_id } = useParams();

  useEffect(() => {
    dispatch(fetchPolls());
    dispatch(fetchDates());
  }, []);

  const selectedPoll = polls.find((poll) => poll.id === poll_id);
  const selectedDates = dates.filter((item) => item.poll_id === poll_id);

  if (!selectedPoll) {
    return <div>Loading...</div>;
  }

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
            <Box>
              <Typography variant="h2">{selectedPoll.question}</Typography>
            </Box>

            <Divider />

            {selectedDates.map((element) =>
              element.times.map((timeSlot) => (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography variant="h3">{element.date}</Typography>
                      <Typography variant="subtitle2" color={"secondary"}>
                        {timeSlot.start_time} - {timeSlot.end_time}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        variant="contained"
                        onClick={() => handleSelect(element.id, true)}
                      >
                        Agree
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleSelect(element.id, false)}
                      >
                        Not Agree
                      </Button>
                    </Box>
                  </Box>
                  <Divider />
                </>
              ))
            )}

            <Box sx={{ display: "flex", gap: "0.5rem" }}>
              <Button variant="contained" onClick={handleVote}>
                Vote
              </Button>
              <Button variant="contained">Results</Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default PollDatesVote;
