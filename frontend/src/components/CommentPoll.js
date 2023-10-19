import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { createComments, fetchComments } from "./redux/pollSlice";
import { useDispatch } from "react-redux";

const CommentPoll = ({ selectedPoll, comments }) => {
  const dispatch = useDispatch();
  console.log(selectedPoll);
  const selectedComments = comments.filter(
    (comment) => comment.poll === selectedPoll?.id
  );

  console.log(selectedComments);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCreateComment = () => {
    const newComment = {
      name,
      comment_text: comment,
      poll: selectedPoll.id,
    };
    dispatch(createComments(newComment));
    dispatch(fetchComments());
    setComment("");
    setName("");
  };

  return (
    <Box sx={{ pb: 5 }}>
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
            {selectedPoll?.allow_comments ? (
              <>
                {selectedComments.map((comment) => (
                  <Box>
                    <Typography variant="h3">{comment.name}</Typography>
                    <Typography variant="subtitle1">
                      {comment.comment_text}
                    </Typography>
                    <Typography variant="subtitle2">
                      1 year ago · Reply
                    </Typography>
                  </Box>
                ))}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Box>
                    <TextField
                      label="Name"
                      variant="outlined"
                      value={name}
                      onChange={handleNameChange}
                      fullWidth
                    />
                  </Box>
                  <Box>
                    <TextField
                      label="Comment"
                      variant="outlined"
                      value={comment}
                      onChange={handleCommentChange}
                      fullWidth
                      multiline
                      rows={2}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box px={0.3}>
                        <Typography variant="subtitle2">
                          HTML and links are not allowed.
                        </Typography>
                      </Box>
                    </Box>
                    <Button variant="contained" onClick={handleCreateComment}>
                      Add Comment
                    </Button>
                  </Box>
                </Box>
              </>
            ) : (
              <Typography variant="subtitle1" align="center">
                Comments are disabled.
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CommentPoll;
