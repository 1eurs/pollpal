import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Hidden,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import PageTitle from "./utility/PageTitle";

const PollOptionsVote = ({ notitle }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
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
              <FormLabel id="title" sx={{ mb: "2rem" }}>
                <Typography variant="h2">
                  How easy is it to embed a Pollpal?
                </Typography>
              </FormLabel>

              <Typography variant="h6" sx={{ mb: "0.2rem" }}>
                Make a choice:
              </Typography>

              <RadioGroup
                aria-labelledby="radio-buttons-group-label"
                defaultValue="Super easy"
                name="Super easy"
              >
                <FormControlLabel
                  value="Super easy"
                  control={<Radio />}
                  label="Super easy"
                />
                <FormControlLabel
                  value="Somewhat easy"
                  control={<Radio />}
                  label="Somewhat easy"
                />
                <FormControlLabel
                  value="Moderate"
                  control={<Radio />}
                  label="Moderate"
                />
                <FormControlLabel
                  value="
                Quite difficult"
                  control={<Radio />}
                  label="
                Quite difficult"
                />
                <FormControlLabel
                  value="Very difficult"
                  control={<Radio />}
                  label="Very difficult"
                />
              </RadioGroup>
            </FormControl>
            <Box sx={{ display: "flex", gap: "0.5rem", pt: "0.3rem" }}>
              <Button variant="contained">Vote</Button>
              <Button variant="contained">Results</Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default PollOptionsVote;
