import React from "react";
import NavBar from "./components/Header/NavBar";
import Hero from "./components/Hero/Hero";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/utility/ErrorPage";
import CreateForm from "./components/CreateForm";
import PollOptionsVote from "./components/PollOptionsVote";
import Footer from "./components/Footer/Footer";
import PollMeetingVote from "./components/PollMeetingVote";
import { MeetingDummyData } from "./components/utility/dummyData";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Hero />,
    errorElement: <ErrorPage />,
  },
  {
    path: "create",
    element: <CreateForm />,
  },
  {
    path: "vote",
    element: <PollOptionsVote />,
  },
  {
    path: "meet",
    element: <PollMeetingVote data={MeetingDummyData} />,
  },
]);

const App = () => {
  return (
    <>
      <NavBar />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
};

export default App;
