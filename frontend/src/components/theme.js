export const themeOptions = {
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl"],
    values: {
      xs: 0,
      sm: 800,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    type: "light",
    primary: {
      main: "#6366f1",
    },
    secondary: {
      main: "#818cf8",
    },
    background: {
      default: "#111827",
      paper: "#1f2937",
    },
    text: {
      primary: "#ffffff",
      secondary: "#94a3ac",
    },
    info: {
      main: "#818cf8",
    },
    divider: "#374151",
  },
  typography: {
    fontFamily: "Inter",
    logo: { fontSize: "2rem" },
    Hero: {
      fontSize: "3.5rem",
      fontWeight: 700,
      lineHeight: 1,
    },
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "1rem",
      fontWeight: 700,
    },
    h4: {
      fontSize: "0.9rem",
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 200,
    },
    subtitle2: {
      fontSize: "0.8rem",
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 4,
  },

  spacing: 8,
};
