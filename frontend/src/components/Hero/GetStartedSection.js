import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const GetStartedSection = () => {
  const theme = useTheme();

  return (
    <Container
      maxWidth
      sx={{
        py: theme.spacing(10),
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h2" color="text.primary" gutterBottom>
              Ready to Get Started?
            </Typography>
            <Typography variant="h5" color="text.secondary">
              It's free and easy to use!
            </Typography>
          </Box>
          <Box>
            <Link to="/create/poll">
              <Button
                variant="contained"
                color="primary"
                sx={{ mr: theme.spacing(2) }}
              >
                Create a Poll
              </Button>
            </Link>
            <Link to="/Signup">
              <Button variant="outlined" color="primary">
                Sign Up
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default GetStartedSection;
