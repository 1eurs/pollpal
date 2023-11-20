import {
  Typography,
  Box,
  Container,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Menu,
} from "@mui/material";
import React, { useState } from "react";
import PageTitle from "./utility/PageTitle";
import { useNavigate } from "react-router-dom";
import PollIcon from "@mui/icons-material/Poll";
import dayjs from "dayjs";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import MyAlert from "./utility/MyAlert";
import { useDispatch } from "react-redux";
import { DeletePoll } from "./redux/pollSlice";
const options = ["Duplicate", "Delete", "Share"];

const PollDrafts = ({ polls, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedPollId, setSelectedPollId] = useState(null);
  const handleButtonClick = (id, type, isActive) => {
    if (type === "choices" && isActive) {
      navigate(`/vote/options/${id}`);
    } else if (type === "choices") {
      navigate(`/edit/options/${id}`);
    } else if (type === "dates") {
      navigate(`/edit/dates/${id}`);
    } else if (type === "dates" && isActive) {
      navigate(`/vote/dates/${id}`);
    }
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (event, id) => {
    event.preventDefault();
    setSelectedPollId(id);
    handleClick(event);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedPollId(null);
  };

  const handleMenuOptionClick = (option) => {
    if (option === "Duplicate" && selectedPollId) {
      console.log("Duplicate");
    } else if (option === "Delete" && selectedPollId) {
      dispatch(DeletePoll(selectedPollId));
    } else if (option === "Share" && selectedPollId) {
      console.log("Share");
    }

    handleClose();
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
          <Grid container wrap="nowrap" sx={{ pb: 2 }}>
            <Grid item xs={6}>
              <Typography variant="subtitle2">Polls</Typography>
            </Grid>
            <Grid
              item
              xs={2.2}
              container
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="subtitle2">Participants</Typography>
            </Grid>
            <Grid
              item
              xs={2}
              container
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="subtitle2">Deadline</Typography>
            </Grid>
            <Grid
              item
              xs={2}
              container
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="subtitle2">Status</Typography>
            </Grid>
            <Grid
              item
              xs={2}
              container
              justifyContent="center"
              alignItems="center"
            ></Grid>
          </Grid>
          {polls
            .filter((p) => p.created_by === user.user_id)
            .map((poll) => (
              <Box
                sx={{
                  bgcolor: "primary.main",
                  mb: 2,
                  p: 1.2,
                  zIndex: 1,
                }}
              >
                <Grid container wrap="nowrap">
                  <Grid item xs={6}>
                    <Grid container spacing={1}>
                      <Grid item>
                        <PollIcon
                          fontSize="large"
                          sx={{
                            width: "2.75rem",
                            height: "2.75rem",
                            p: 0.7,
                            color: "white",
                            borderRadius: "20%",
                            bgcolor: "primary.main",
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs
                        onClick={() =>
                          handleButtonClick(
                            poll.id,
                            poll.poll_type,
                            poll.is_active
                          )
                        }
                        sx={{ cursor: "pointer" }}
                      >
                        <Typography>{poll.question}</Typography>
                        <Typography variant="subtitle2">
                          {dayjs(poll.created_at).format("MMM DD, YYYY")}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={2.2}
                    container
                    justifyContent="center"
                    alignItems="center"
                  >
                    0
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    container
                    justifyContent="center"
                    alignItems="center"
                  >
                    -
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    container
                    justifyContent="center"
                    alignItems="center"
                  >
                    {poll.is_active ? (
                      <Chip label="Live" size="small" variant="outlined" />
                    ) : (
                      <Chip label="draft" size="small" variant="outlined" />
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    container
                    justifyContent="center"
                    alignItems="center"
                  >
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      color="white"
                      aria-controls={open ? "long-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={(event) => handleMenuClick(event, poll.id)}
                    >
                      <MoreVertIcon sx={{ color: "white" }} />
                    </IconButton>
                    <Menu
                      id={`long-menu-${poll.id}`}
                      MenuListProps={{
                        "aria-labelledby": `long-button-${poll.id}`,
                      }}
                      anchorEl={anchorEl}
                      open={open && selectedPollId === poll.id}
                      onClose={handleClose}
                    >
                      {options.map((option) => (
                        <MenuItem
                          key={option}
                          selected={option === "Pyxis"}
                          onClick={() => handleMenuOptionClick(option)}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Grid>
                </Grid>
              </Box>
            ))}
          <Box sx={{ display: "flex" }}>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/create/poll");
              }}
            >
              Create poll
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PollDrafts;
