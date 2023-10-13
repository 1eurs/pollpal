import { Box, Button, Card, CardContent, Container } from "@mui/material";
import PageTitle from "./utility/PageTitle";

const PollMeetingVote = ({ notitle, data }) => {
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
            <Box sx={{ display: "flex", gap: "0.5rem" }}>
              <Button variant="contained">Vote</Button>
              <Button variant="contained">Results</Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default PollMeetingVote;
