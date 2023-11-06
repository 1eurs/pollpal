import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "./components/Header/NavBar";
import Hero from "./components/Hero/Hero";
import ErrorPage from "./components/utility/ErrorPage";
import CreateForm from "./components/CreateForm";
import OptionsPollVote from "./components/OptionsPollVote";
import Footer from "./components/Footer/Footer";
import MeetingPollVote from "./components/MeetingPollVote";
import {
  fetchChoices,
  fetchComments,
  fetchDateVotes,
  fetchDates,
  fetchPolls,
  fetchReplies,
  fetchVotes,
} from "./components/redux/pollSlice";
import OptionsPollResutls from "./components/OptionsPollResutls";
import MeetingPolllResults from "./components/MeetingPolllResults";
import PollDrafts from "./components/PollDrafts";
import EditOptionsPollForm from "./components/EditOptionsPollForm";
import EditMeetingPollForm from "./components/EditMeetingPollForm";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPolls());
    dispatch(fetchChoices());
    dispatch(fetchDates());
    dispatch(fetchVotes());
    dispatch(fetchDateVotes());
    dispatch(fetchComments());
    dispatch(fetchReplies());
  }, [dispatch]);

  const { polls, dates, datevotes, votes, choices, comments, replies, pollID } =
    useSelector((state) => state.polls);

  return (
    <>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-poll" element={<CreateForm pollID={pollID} />} />
          <Route path="/poll-drafts" element={<PollDrafts polls={polls} />} />
          <Route
            path="/edit/options/:poll_id"
            element={<EditOptionsPollForm polls={polls} choices={choices} />}
          />
          <Route
            path="/edit/dates/:poll_id"
            element={<EditMeetingPollForm polls={polls} dates={dates} />}
          />
          <Route
            path="/vote/options/:poll_id"
            element={
              <>
                <OptionsPollVote
                  polls={polls}
                  choices={choices}
                  votes={votes}
                  comments={comments}
                  replies={replies}
                />
              </>
            }
          />
          <Route
            path="/vote/dates/:poll_id"
            element={
              <MeetingPollVote
                polls={polls}
                dates={dates}
                votes={datevotes}
                comments={comments}
                replies={replies}
              />
            }
          />
          <Route
            path="/results/options/:poll_id"
            element={
              <OptionsPollResutls
                polls={polls}
                choices={choices}
                votes={votes}
              />
            }
          />
          <Route
            path="/results/meeting/:poll_id"
            element={<MeetingPolllResults polls={polls} dates={dates} />}
          />{" "}
          <Route
            path="/results/meeting/:poll_id"
            element={<MeetingPolllResults polls={polls} dates={dates} />}
          />
          <Route element={<ErrorPage />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;
