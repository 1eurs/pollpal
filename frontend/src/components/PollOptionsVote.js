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

const PollOptionsVote = ({ notitle, data }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleVote = () => {
    if (selectedOption) {
      // brackend
      console.log("Voted for: " + selectedOption);
    } else {
      console.log("Please select an option before voting.");
    }
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
                <Typography variant="h2">{data.title}</Typography>
              </FormLabel>

              <Typography variant="subtitle1">Make a choice:</Typography>
              <RadioGroup
                name="options"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                {data.options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </FormControl>
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

export default PollOptionsVote;
