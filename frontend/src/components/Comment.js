import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createComments, fetchReplies, fetchReply } from "./redux/pollSlice";
import RelativeTime from "./utility/RelativeTime";

const CommentForm = ({
  name,
  handleNameChange,
  commentText,
  handleCommentChange,
  handleCreateComment,
  commentID,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <TextField
        label="Name"
        value={name}
        onChange={handleNameChange}
        fullWidth
      />
      <TextField
        label="Comment"
        value={commentText}
        onChange={handleCommentChange}
        fullWidth
        multiline
        rows={2}
      />
      <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <Button size="small" onClick={() => handleCreateComment(commentID)}>
          Post
        </Button>{" "}
        <Button size="small" onClick={() => handleCreateComment(null)}>
          Cancle
        </Button>
      </Box>
    </Box>
  );
};

const Comment = ({ comments, poll, replies }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [commentText, setComment] = useState("");
  const [commentID, setCommentID] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCreateComment = (parentCommentID) => {
    const newComment = {
      name,
      comment_text: commentText,
      poll: poll.id,
      parent_comment: parentCommentID,
    };
    dispatch(createComments(newComment));
    setComment("");
    setName("");
    dispatch(fetchReplies());
    setCommentID(null);
  };

  const renderReplies = (parentCommentID) => {
    const replyComponents = replies
      .filter((r) => r.parent_comment === parentCommentID)
      .map((reply) => (
        <Box sx={{ pt: 2 }}>
          <Box
            sx={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 1 }}
          >
            <Box>
              <Avatar>{reply.name.charAt(0).toUpperCase()}</Avatar>
            </Box>
            <Box>
              <Box>
                <Typography variant="subtitle2">{reply.name}</Typography>
                <Typography variant="subtitle1">
                  {reply.comment_text}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2">
                  <RelativeTime timestamp={reply.created_at} />
                  <Button size="small" onClick={() => setCommentID(reply.id)}>
                    <Typography variant="subtitle2">Reply</Typography>
                  </Button>
                </Typography>
              </Box>
            </Box>
          </Box>{" "}
          {/* form */}
          {commentID === reply.id && (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: 1,
                pt: 3,
                pl: 6,
              }}
            >
              <Box>
                <Avatar>{name.charAt(0).toUpperCase()}</Avatar>
              </Box>
              <Box>
                <CommentForm
                  name={name}
                  commentText={commentText}
                  handleNameChange={handleNameChange}
                  handleCommentChange={handleCommentChange}
                  handleCreateComment={handleCreateComment}
                  commentID={reply.id}
                />
              </Box>
            </Box>
          )}
          <Box>{renderReplies(reply.id)}</Box>
        </Box>
      ));
    return replyComponents;
  };

  const renderComments = (parentCommentID = null) => {
    return comments
      .filter((comment) => comment.parent_comment === parentCommentID)
      .map((comment) => (
        <Box sx={{ py: 2 }}>
          {/* comment */}
          <Box
            sx={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 1 }}
          >
            <Box>
              <Avatar>{comment.name.charAt(0).toUpperCase()}</Avatar>
            </Box>
            <Box>
              <Box>
                <Typography variant="subtitle2">{comment.name}</Typography>
                <Typography variant="subtitle1">
                  {comment.comment_text}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2">
                  <RelativeTime timestamp={comment.created_at} />
                  <Button size="small" onClick={() => setCommentID(comment.id)}>
                    <Typography variant="subtitle2">Reply</Typography>
                  </Button>
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* form */}
          {commentID === comment.id && (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: 1,
                pt: 3,
                pl: 6,
              }}
            >
              <Box>
                <Avatar>{name.charAt(0).toUpperCase()}</Avatar>
              </Box>
              <Box>
                <CommentForm
                  name={name}
                  commentText={commentText}
                  handleNameChange={handleNameChange}
                  handleCommentChange={handleCommentChange}
                  handleCreateComment={handleCreateComment}
                  commentID={comment.id}
                />
              </Box>
            </Box>
          )}
          {/* reply */}
          <Box sx={{ pl: 5 }}>{renderReplies(comment.id)}</Box>
        </Box>
      ));
  };

  return <div>{renderComments()}</div>;
};

export default Comment;
