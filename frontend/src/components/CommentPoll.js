import { Box, Card, CardContent, Typography } from "@mui/material";

const CommentPoll = () => {
  return (
    <Box sx={{ py: 1.5 }}>
      <Card>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h3">Comments</Typography>
            <Typography variant="subtitle1" align="center">
              Comments are disabled.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CommentPoll;
