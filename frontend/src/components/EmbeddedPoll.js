import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography,
  } from "@mui/material";
  import { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { voteInPoll, fetchChoices, fetchPolls, fetchComments, fetchReplies, fetchVotes } from "./redux/pollSlice";
  import { useNavigate } from "react-router-dom";
  import SharePoll from "./SharePoll";
  import CommentPoll from "./CommentPoll";
  import RelativeTime from "./utility/RelativeTime";
  import MyAlert from "./utility/MyAlert";
  import MyBackdrop from "./utility/MyBackdrop";
  
  const EmbeddedPoll = ({poll_id}) => {

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchPolls());
      dispatch(fetchChoices());
      dispatch(fetchVotes());
      dispatch(fetchComments());
      dispatch(fetchReplies());
    }, [dispatch]);
  
    const { polls, votes, choices, comments, replies, pollID } =
      useSelector((state) => state.polls);
  
    const navigate = useNavigate();

    const selectedPoll = polls.find((poll) => poll.id === poll_id);
    const selectedChoices = choices.filter((item) => item.poll_id === poll_id);
    const selectedVotes = votes.filter((item) => item.poll_id === poll_id);
  
    const [name, setName] = useState();
    const [open, setOpen] = useState(false);
    const [isAlert1, setAlert1] = useState(false);
    const [isAlert2, setAlert2] = useState(false);
    const [isAlert3, setAlert3] = useState(false);
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleOpen = () => {
      dispatch(fetchChoices());
      setOpen(true);
    };
  
    const [voteData, setVoteData] = useState({
      poll_id: null,
      choice_id: null,
      voter_ip: null,
      created_by: null,
    });
  
    const handleVote = () => {
      setAlert1(false);
      setAlert2(false);
      dispatch(voteInPoll({ ...voteData, poll_id: poll_id, name: name })).then(
        (action) => {
          if (action.type === "polls/vote/rejected") {
            console.log(action.error);
            if (action.error.message === "No date choices provided") {
              setAlert2(true);
            } else if (
              action.error.message === "You have already voted in this poll."
            ) {
              setAlert1(true);
            }
          } else {
            setVoteData({});
            setAlert1(false);
            setAlert2(false);
            handleOpen();
          }
        }
      );
    };
  
    const handleResults = () => {
      dispatch(fetchChoices());
      const voteCounts = {};
      for (const vote of selectedVotes) {
        const choiceId = vote.choice_id;
        if (voteCounts[choiceId]) {
          voteCounts[choiceId]++;
        } else {
          voteCounts[choiceId] = 1;
        }
      }
      navigate(`/results/options/${poll_id}`);
    };
  
    return (
      <Container >
        <Card sx={{ borderTop: 4, borderColor: "primary.main", pt:1 }}>
          <CardContent>
            <FormControl>
              <Box sx={{ pb: 3 }}>
                <Typography variant="h6">{selectedPoll?.question}</Typography>
                <Typography variant="body2">
                  by {selectedPoll?.created_by || "a guest"}
                  {" · "}
                  <RelativeTime timestamp={selectedPoll?.created_at} />
                </Typography>
              </Box>
              <Box sx={{ pb: 1 }}>
                <Typography variant="body2">Make a choice:</Typography>
              </Box>
  
              <RadioGroup
                name="options"
                value={voteData.choice_id}
                onChange={(e) =>
                  setVoteData({
                    ...voteData,
                    choice_id: e.target.value,
                  })
                }
              >
                {selectedChoices.map((option, index) => (
                  <Box sx={{pt:0.5}}>
                    <FormControlLabel
                    key={index}
                    value={option.id}
                    control={<Radio />}
                    label={
                      <Typography variant="body1">
                        {option.choice_text}
                      </Typography>
                    }
                  />
                  </Box>
                ))}
              </RadioGroup>
            </FormControl>
  
            {/* Alerts  */}
            <Box >
            {isAlert1 && (
              <MyAlert
                severity="error"
                message="You (or someone on your Wi-Fi/network) have already participated in this poll."
              />
            )}
            {isAlert2 && (
              <MyAlert
                severity="error"
                message="Please choose at least 1 option(s)"
              />
            )}
            {isAlert3 && <MyAlert severity="error" message="Name is required" />}
          </Box>
  
            {/* Backdrop */}
            <MyBackdrop
              open={open}
              handleClose={handleClose}
              poll_id={poll_id}
              navigate={navigate}
            />
  
            {selectedPoll?.require_names && (
              <Box sx={{ pt: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label="Name (required)"
                  placeholder="Enter your name"
                ></TextField>
              </Box>
            )}
            <Box
              sx={{
                pt: 3,
              }}
            >
              {/* Buttons */}
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button fullWidth variant="contained" onClick={handleVote}>
                  Vote
                </Button>
                <Button fullWidth variant="contained" onClick={handleResults}>
                  Results
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
        </Container>
  
    );
  };
  
  export default EmbeddedPoll;
  