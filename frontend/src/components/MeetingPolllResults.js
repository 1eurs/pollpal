import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import SharePoll from "./SharePoll";
import CommentPoll from "./CommentPoll";
import { fetchDates } from "./redux/pollSlice";
import { useEffect } from "react";
import DateElement from "./DateElement";
import RelativeTime from "./utility/RelativeTime";

const MeetingPolllResults = ({ polls, dates }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { poll_id } = useParams();

  const selectedPoll = polls.find((poll) => poll.id === poll_id);
  const selectedDates = dates.filter((item) => item.poll_id === poll_id);

  const handleRefresh = () => {
    dispatch(fetchDates());
  };

  useEffect(() => {
    dispatch(fetchDates());
  }, []);

  const handleBacktoPoll = () => {
    navigate(`/datesVote/${poll_id}`);
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ borderTop: 4, borderColor: "primary.main" }}>
        <CardContent>
          <Box sx={{ pb: 3 }}>
            <Typography variant="h2">{selectedPoll?.question}</Typography>
            <Typography variant="subtitle1">
              by {selectedPoll?.created_by || "a guest"}
              {" · "}
              <RelativeTime timestamp={selectedPoll?.created_at} />
            </Typography>
          </Box>
          {selectedDates.map((element) =>
            element.times.length === 0 ? (
              <DateElement element={element} isResult={true} />
            ) : (
              element.times.map((timeSlot) => (
                <DateElement
                  timeSlot={timeSlot}
                  element={element}
                  isResult={true}
                />
              ))
            )
          )}
          <Box sx={{ pt: 4, display: "flex", gap: 1 }}>
            <Button variant="contained" fullWidth onClick={handleRefresh}>
              Refresh results
            </Button>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleBacktoPoll}
            >
              Back to poll
            </Button>
          </Box>
        </CardContent>
      </Card>
      <SharePoll />
    </Container>
  );
};

export default MeetingPolllResults;
