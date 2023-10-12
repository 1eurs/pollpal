import { Box, Button, Container, Typography } from "@mui/material";

const GetStartedSection = () => {
  return (
    <Container maxWidth sx={{ py: "10rem", backgroundColor: "#111827" }}>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Typography variant="h1">Ready to get started?</Typography>
            <Typography variant="h1">It's free!</Typography>
          </div>
          <div>
            <Button>Create a poll</Button>
            <Button>Sign up</Button>
          </div>
        </Box>
      </Container>
    </Container>
  );
};

export default GetStartedSection;
