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
      main: "#E85A4F", 
    },
    secondary: {
      main: "#4E8098", 
      light: "#8FBDD3", 
    },
    background: {
      default: "#FFF0E0",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#3E3E3E", 
      secondary: "#6D6D6D", 
    },
    info: {
      main: "#31708E", 
    },
    divider: "#C8C8C8", 
  },
  typography: {
    fontFamily: "'Rubik', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    
    logo: { fontSize: "2rem" },
    
    Hero: {
      fontSize: "3.5rem",
      fontWeight: 700,
      lineHeight: 1.1,
      wordWrap: 'break-word', 
      whiteSpace: 'normal'
    },

    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
      lineHeight: 1.2,
    },

    h2: {
      fontSize: "2rem",
      fontWeight: 500,
      lineHeight: 1.3,
    },

    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },

    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },

    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },

    h6: {
      fontSize: "1.1rem", 
      fontWeight: 500,   
      lineHeight: 1.4,    
      wordWrap: 'break-word', 
      margin: '0.2rem 0',  
    },
    

    subtitle1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.75,
    },

    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.57,
    },

    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },

    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.43,
    },

    button: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.75,
      textTransform: "uppercase",
    },

    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 1.66,
    },

    overline: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 2.66,
      textTransform: "uppercase",
    },
  },
  shape: {
    borderRadius: 4,
  },
  spacing: 8,

};
