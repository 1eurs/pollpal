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
import TimeDifference from "./utility/RelativeTime";
import dayjs from "dayjs";
import SharePoll from "./SharePoll";
import CommentPoll from "./CommentPoll";
import { fetchDates } from "./redux/pollSlice";
import { useEffect } from "react";

const DatePollResults = ({ polls, dates }) => {
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
              <TimeDifference date={selectedPoll?.created_at} />
            </Typography>
          </Box>

          {selectedDates.map((element) =>
            element.times.map((timeSlot) => (
              <Box sx={{ py: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Box
                      bgcolor={"secondary.main"}
                      p={2}
                      borderRadius={2}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h3">
                        {dayjs(element.date).format("MMM D, YY")}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        bgcolor={"secondary.light"}
                        sx={{ p: 2, borderRadius: 2 }}
                      >
                        <Typography variant="subtitle2">
                          from {dayjs(timeSlot.start_time).format("HH:mm")}
                        </Typography>
                        <Typography variant="subtitle2">
                          to {dayjs(timeSlot.end_time).format("HH:mm")}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Box
                      bgcolor={"secondary.main"}
                      p={2}
                      borderRadius={2}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Box textAlign={"center"}>
                        <Typography variant="h3">AGREE</Typography>
                        <Typography variant="h3">
                          {element.vote_count_true}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      bgcolor={"secondary.main"}
                      p={2}
                      borderRadius={2}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Box textAlign={"center"}>
                        <Typography variant="h3">NOT AGREE</Typography>
                        <Typography variant="h3">
                          {element.vote_count_false}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ py: 1 }}></Box>
              </Box>
            ))
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
      {/* <CommentPoll /> */}
    </Container>
  );
};

export default DatePollResults;
