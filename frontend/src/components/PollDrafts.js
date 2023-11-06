import {
  Typography,
  Box,
  Container,
  Card,
  CardContent,
  Button,
  Divider,
} from "@mui/material";
import React from "react";
import PageTitle from "./utility/PageTitle";
import { useNavigate } from "react-router-dom";

const PollDrafts = ({ polls }) => {
  const navigate = useNavigate();

  const handleButtonChoicesClick = (id) => {
    navigate(`/edit/options/${id}`);
  };
  const handleButtonDatesClick = (id) => {
    navigate(`/edit/dates/${id}`);
  };
  return (
    <Container maxWidth="sm" sx={{ pb: 3 }}>
      <PageTitle
        title="Poll Drafts"
        description="drafts of polls you have created"
        textAlign="center"
        variant="h1"
      />

      <Card sx={{ borderTop: 4, borderColor: "primary.main" }}>
        <CardContent>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {polls
                .filter((poll) => poll.poll_type === "choices")
                .map((poll) => (
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleButtonChoicesClick(poll.id);
                    }}
                  >
                    <Typography>{poll.question}</Typography>
                  </Button>
                ))}
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {polls
                .filter((poll) => poll.poll_type === "dates")
                .map((poll) => (
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleButtonDatesClick(poll.id);
                    }}
                  >
                    <Typography>{poll.question}</Typography>
                  </Button>
                ))}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PollDrafts;
