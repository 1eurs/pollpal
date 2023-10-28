import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createComments, fetchReplies, fetchReply } from "./redux/pollSlice";

const CommentForm = ({
  name,
  handleNameChange,
  commentText,
  handleCommentChange,
}) => {
  return (
    <Box>
      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={handleNameChange}
        fullWidth
      />
      <TextField
        label="Comment"
        variant="outlined"
        value={commentText}
        onChange={handleCommentChange}
        fullWidth
        multiline
        rows={2}
      />
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
        <Card variant="outlined" key={reply.id}>
          <CardContent>
            <Typography variant="body1">{reply.comment_text}</Typography>
            <Typography variant="caption">
              Created at: {reply.created_at}
            </Typography>
            <Typography variant="caption">Name: {reply.name}</Typography>
            {renderReplies(reply.id)}
            <Button size="small" onClick={() => setCommentID(reply.id)}>
              Reply
            </Button>
            {commentID === reply.id && (
              <>
                <CommentForm
                  name={name}
                  commentText={commentText}
                  handleNameChange={handleNameChange}
                  handleCommentChange={handleCommentChange}
                />
                <Button
                  size="small"
                  onClick={() => handleCreateComment(reply.id)}
                >
                  Post Reply
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      ));
    return replyComponents;
  };

  const renderComments = (parentCommentID = null) => {
    return comments
      .filter((comment) => comment.parent_comment === parentCommentID)
      .map((comment) => (
        <Card variant="outlined" key={comment.id}>
          <CardContent>
            <Typography variant="body1">{comment.comment_text}</Typography>
            <Typography variant="caption">
              Created at: {comment.created_at}
            </Typography>
            <Typography variant="caption">Name: {comment.name}</Typography>

            {renderReplies(comment.id)}

            <Button size="small" onClick={() => setCommentID(comment.id)}>
              Reply
            </Button>
            {commentID === comment.id && (
              <>
                <CommentForm
                  name={name}
                  commentText={commentText}
                  handleNameChange={handleNameChange}
                  handleCommentChange={handleCommentChange}
                />
                <Button
                  size="small"
                  onClick={() => handleCreateComment(comment.id)}
                >
                  Post Reply
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      ));
  };

  return <div>{renderComments()}</div>;
};

export default Comment;
