import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { green, grey, purple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fafafa",
    },
    secondary: {
      main: "#fafafa",
    },
    background: {
      default: "#292941",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Inter",
    hero: {
      lineHeight: 1,
      letterSpacing: -1,
      fontSize: "4rem",
    },
    subHero: {
      lineHeight: 1,
      letterSpacing: -1,
      fontSize: "4rem",
    },
    heroText: {
      width: "100%",
      fontSize: "1rem",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <App />
      </CssBaseline>
    </ThemeProvider>
  </React.StrictMode>
);
