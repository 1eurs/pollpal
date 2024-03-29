import {
  Card,
  CardContent,
  Container,
  Box,
  Typography,
  LinearProgress,
  Button,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { fetchChoices, fetchPolls } from "./redux/pollSlice";
import { useDispatch } from "react-redux";
import SharePoll from "./SharePoll";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import RelativeTime from "./utility/RelativeTime";
import PageTitle from "./utility/PageTitle";

const OptionsPollResutls = ({ polls, choices }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { poll_id } = useParams();

  const selectedPoll = polls.find((poll) => poll.id === poll_id);
  const selectedChoices = choices.filter((item) => item.poll_id === poll_id);

  const totalVoteCount = selectedChoices.reduce(
    (total, choice) => total + choice.vote_count,
    0
  );

  const handleRefresh = () => {
    dispatch(fetchChoices);
  };

  const handleBacktoPoll = () => {
    navigate(`/vote/options/${poll_id}`);
  };

  const colorPalette = [
    "#FF5733",
    "#33FF57",
    "#5733FF",
    "#FF33E8",
    "#33E8FF",
    "#33FFEA",
    "#FF33B1",
    "#33B1FF",
  ];

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const result = selectedChoices.map((item, index) => ({
    value: item.vote_count,
    label: item.choice_text,
    color: colorPalette[index],
  }));

  return (
    <Container maxWidth="sm">
      <PageTitle
        title="Poll Results"
        description="See the results of poll."
        textAlign="center"
        variant="h1"
      />
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

          <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {result.map((choice) => (
              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="subtitle1">{choice.label}</Typography>
                  <Typography variant="subtitle1">
                    {((choice.value / totalVoteCount) * 100).toFixed(2)}% (
                    {choice.value} votes)
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  sx={{
                    height: 20,
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: choice.color,
                    },
                  }}
                  value={((choice.value / totalVoteCount) * 100).toFixed(2)}
                />
              </Box>
            ))}
          </Box>
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
      <Box sx={{ pt: 4 }}>
        <Card>
          <CardContent>
            <Box>
              <PieChart
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fill: "white",
                  },
                }}
                series={[
                  {
                    data: result,
                  },
                ]}
                maxWidth="100%"
                height={200}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <SharePoll selectedPoll={selectedPoll} />
    </Container>
  );
};

export default OptionsPollResutls;
