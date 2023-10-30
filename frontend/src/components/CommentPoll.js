import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { createComments, fetchComments, postReply } from "./redux/pollSlice";
import { useDispatch } from "react-redux";
import RelativeTime from "./utility/RelativeTime";
import Comment from "./Comment";

const CommentPoll = ({ selectedPoll, comments, replies }) => {
  const dispatch = useDispatch();

  const selectedComments = comments.filter(
    (comment) => comment.poll === selectedPoll?.id
  );

  const selectedReplies = replies.filter(
    (reply) => reply.poll === selectedPoll?.id
  );

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
    <>
      {/* comments card  */}
      {selectedComments.length > 0 && (
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
                <Typography>Comments</Typography>
                <Comment
                  comments={selectedComments}
                  poll={selectedPoll}
                  replies={selectedReplies}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}
      {/* comment form */}
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
              {" "}
              <Typography>Add comment</Typography>
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
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default CommentPoll;
