import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "./components/Header/NavBar";
import Hero from "./components/Hero/Hero";
import ErrorPage from "./components/utility/ErrorPage";
import CreateForm from "./components/CreateForm";
import PollOptionsVote from "./components/PollOptionsVote";
import Footer from "./components/Footer/Footer";
import PollDatesVote from "./components/PollDatesVote";
import {
  fetchChoices,
  fetchComments,
  fetchDateVotes,
  fetchDates,
  fetchPolls,
  fetchVotes,
} from "./components/redux/pollSlice";
import OptionPollResults from "./components/OptionPollResutls";
import DatePollResults from "./components/DatePollResults";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPolls());
    dispatch(fetchChoices());
    dispatch(fetchDates());
    dispatch(fetchVotes());
    dispatch(fetchDateVotes());
    dispatch(fetchComments());
  }, [dispatch]);

  const polls = useSelector((state) => state.polls.polls);
  const dates = useSelector((state) => state.polls.dates);
  const datevotes = useSelector((state) => state.polls.dateVotes);
  const votes = useSelector((state) => state.polls.votes);
  const choices = useSelector((state) => state.polls.choices);
  const comments = useSelector((state) => state.polls.comments);

  console.log(comments);
  return (
    <>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/create" element={<CreateForm />} />
          <Route
            path="/optionsVote/:poll_id"
            element={
              <PollOptionsVote
                polls={polls}
                choices={choices}
                votes={votes}
                comments={comments}
              />
            }
          />
          <Route
            path="/datesVote/:poll_id"
            element={
              <PollDatesVote polls={polls} dates={dates} votes={datevotes} />
            }
          />
          <Route
            path="/results/:poll_id"
            element={
              <OptionPollResults
                polls={polls}
                choices={choices}
                votes={votes}
              />
            }
          />{" "}
          <Route
            path="/meetingresults/:poll_id"
            element={<DatePollResults polls={polls} dates={dates} />}
          />
          <Route element={<ErrorPage />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;
