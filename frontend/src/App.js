import React from "react";
import NavBar from "./components/Header/NavBar";
import Hero from "./components/Hero/Hero";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/utility/ErrorPage";
import CreateForm from "./components/CreateForm";
import PollOptionsVote from "./components/PollOptionsVote";
import Footer from "./components/Footer/Footer";
import { Container } from "@mui/material";

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
