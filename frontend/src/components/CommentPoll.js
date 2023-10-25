import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { createComments, fetchComments, postReply } from "./redux/pollSlice";
import { useDispatch } from "react-redux";
import RelativeTime from "./utility/RelativeTime";

const CommentPoll = ({ selectedPoll, comments }) => {
  const dispatch = useDispatch();

  const selectedComments = comments.filter(
    (comment) => comment.poll === selectedPoll?.id
  );
  console.log(selectedComments);
  const [name, setName] = useState("");
  const [name2, setName2] = useState("");
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState("");

  const [showReplyForm, setShowReplyForm] = useState(null);

  const handleReplyClick = (commentId) => {
    setShowReplyForm(commentId);
  };

  const handleCancelReply = () => {
    setShowReplyForm(null);
  };
  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleSubmit = (event) => {
    const newComment = {
      name: name2,
      comment_text: reply,
      commentId: showReplyForm,
    };

    dispatch(createComments(newComment));
    setName2("");
    setReply("");
    setShowReplyForm(null);
    dispatch(fetchComments());
  };

  const handleName2Change = (e) => {
    setName2(e.target.value);
  };

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
                {/* Main Comment */}

                {selectedComments.map((comment) => (
                  <>
                    <Box key={comment.id} sx={{ display: "flex", gap: 2 }}>
                      <Box>
                        <Avatar>N</Avatar>
                      </Box>
                      <Box>
                        <Typography variant="h3">{comment.name}</Typography>
                        <Typography variant="subtitle1">
                          {comment.comment_text}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyItems: "center",
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                          }}
                        >
                          <Typography variant="subtitle2">
                            <RelativeTime timestamp={comment.created_at} />
                          </Typography>
                          {showReplyForm !== comment.id && (
                            <Button
                              size="small"
                              onClick={() => handleReplyClick(comment.id)}
                            >
                              Reply
                            </Button>
                          )}
                        </Box>
                      </Box>
                    </Box>
                    {/* Comment Replies */}

                    <Box>
                      {comment.replies &&
                        comment.replies.length > 0 &&
                        selectedComments
                          .filter((c) => comment.replies.includes(c.id))
                          .map((reply) => (
                            <>
                              <Box
                                bgcolor="gray"
                                key={reply.id}
                                sx={{ display: "flex", gap: 2, my: 2, pl: 7 }}
                              >
                                <Box>
                                  <Avatar>N</Avatar>
                                </Box>
                                <Box>
                                  <Typography variant="h3">
                                    {reply.name}
                                  </Typography>
                                  <Typography variant="subtitle1">
                                    {reply?.comment_text}
                                  </Typography>
                                </Box>
                              </Box>
                            </>
                          ))}
                    </Box>
                    {showReplyForm === comment.id && (
                      <>
                        <Box sx={{ display: "flex", gap: 2, pl: 7 }}>
                          <Box>
                            <Avatar>N</Avatar>
                          </Box>
                          <Box
                            style={{ width: "100%" }}
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 1,
                            }}
                          >
                            <TextField
                              fullWidth
                              id="name"
                              label="name"
                              placeholder="Enter your name"
                              value={name2}
                              onChange={handleName2Change}
                            />
                            <TextField
                              id="reply"
                              label="reply"
                              multiline
                              rows={4}
                              placeholder="Add a reply"
                              value={reply}
                              onChange={handleReplyChange}
                            />
                          </Box>
                        </Box>
                        <Box
                          sx={{ display: "flex", flexDirection: "row-reverse" }}
                        >
                          <Button size="small" onClick={handleSubmit}>
                            Reply
                          </Button>
                          <Button size="small" onClick={handleCancelReply}>
                            Cancel
                          </Button>
                        </Box>
                      </>
                    )}
                  </>
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
