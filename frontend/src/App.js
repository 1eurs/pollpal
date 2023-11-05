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
          <Route path="/create" element={<CreateForm pollID={pollID} />} />
          <Route
            path="/optionsVote/:poll_id"
            element={
              <OptionsPollVote
                polls={polls}
                choices={choices}
                votes={votes}
                comments={comments}
                replies={replies}
              />
            }
          />
          <Route
            path="/datesVote/:poll_id"
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
            path="/results/:poll_id"
            element={
              <OptionsPollResutls
                polls={polls}
                choices={choices}
                votes={votes}
              />
            }
          />
          <Route
            path="/meetingresults/:poll_id"
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
