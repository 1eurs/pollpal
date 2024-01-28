import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import EmbeddedPoll from "./EmbeddedPoll";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import PageTitle from "./utility/PageTitle";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const polls = [
  {
    id: "76043bd5-ed5d-40bb-86c1-4ae60e4bfe77",
    title: "Anonymous Polls",
    description:
      "PollPal lets you vote secretly in big or small groups. Each person gets to vote only once from the same internet connection.",
  },
  {
    id: "30db4113-d175-4123-990c-71bae65857da",
    title: "PollPal with Named",
    description:
      "PollPal ensures a fair voting process. Each voter must provide their name when voting, adding a layer of accountability. Additionally, only one vote is allowed per internet connection (IP address), preventing multiple votes from the same location and ensuring each vote is unique and valid.",
  },
  {
    id: "c248bc5f-dcda-422e-92bb-7463cc988ca7",
    title: "PollPal with Named",
    description:
      "PollPal ensures a fair voting process. Each voter must provide their name when voting, adding a layer of accountability. Additionally, only one vote is allowed per internet connection (IP address), preventing multiple votes from the same location and ensuring each vote is unique and valid.",
  },
  {
    id: "4ea6ce0c-bbff-4bb6-825d-090af53ad0c6",
    title: "PollPal with Named",
    description:
      "PollPal ensures a fair voting process. Each voter must provide their name when voting, adding a layer of accountability. Additionally, only one vote is allowed per internet connection (IP address), preventing multiple votes from the same location and ensuring each vote is unique and valid.",
  },
];
function Demo() {
  return (
    <Container maxWidth="lg">
      <PageTitle
        title="Poll Demos"
        description="Examples of different polls"
        textAlign="center"
        variant="h1"
      />
      <Grid container spacing={2} sx={{ pt: 5 }}>
        {polls.map((poll) => (
          <React.Fragment key={poll.id}>
            <Grid item xs={12} md={8}>
              <Box>
                <EmbeddedPoll poll_id={poll.id} />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ borderTop: 4, borderColor: "primary.main", pt: 1 }}>
                <CardContent>
                  <Typography variant="h6">{poll.title}</Typography>
                  <Typography variant="body2">{poll.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </Container>
  );
}

export default Demo;
