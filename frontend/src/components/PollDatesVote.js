import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Divider,
} from "@mui/material";
import PageTitle from "./utility/PageTitle";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDateVotes, voteInDatesPoll } from "./redux/pollSlice";
import { useParams } from "react-router-dom";

const PollDatesVote = ({ notitle, polls, dates, votes }) => {
  const dispatch = useDispatch();

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

  const renderChoiceButtons = (element) => {
    const date_id = element.id;
    const selectedChoice = selectedChoices[date_id];

    return (
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          variant={selectedChoice === true ? "contained" : "outlined"}
          onClick={() => handleSelect(date_id, true)}
        >
          Agree
        </Button>
        <Button
          variant={selectedChoice === false ? "contained" : "outlined"}
          onClick={() => handleSelect(date_id, false)}
        >
          Not Agree
        </Button>
      </Box>
    );
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
    setVoteData({ ...voteData, dateChoices });
  };

  useEffect(() => {
    dispatch(voteInDatesPoll(voteData));
  }, [voteData]);

  const handleResults = () => {
    dispatch(fetchDateVotes());
    const countsByDateId = {};

    selectedVotes.forEach((record) => {
      const dateId = record.date_id;
      const canAttend = record.can_attend;

      if (!countsByDateId[dateId]) {
        countsByDateId[dateId] = { true: 0, false: 0 };
      }

      if (canAttend === true) {
        countsByDateId[dateId].true++;
      } else if (canAttend === false) {
        countsByDateId[dateId].false++;
      }
    });
    console.log(countsByDateId);
  };

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
                        {element.times[0].start_time} -{" "}
                        {element.times[0].end_time}
                      </Typography>
                    </Box>
                    {renderChoiceButtons(element)}
                  </Box>
                  <Divider />
                </>
              ))
            )}

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

export default PollDatesVote;
