import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Typography, TextField, Button } from "@material-ui/core";
import useStyles from "./style";
import { commentPost } from "../../redux/actions/posts";
const CommentSection = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [comment, setComment] = useState();
  const [comments, setComments] = useState(post?.comments);
  const user = JSON.parse(localStorage.getItem("profile"));
  const handleComment = () => {
    const finalComment = `${user?.result?.name}: ${comment}`;
    setComments([finalComment,...comments]);
    dispatch(commentPost(finalComment, post._id));
    setComment("");
  };
  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography variant="h6" gutterBottom>
            Comments
          </Typography>
          {comments.map((comm, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              {comm}
            </Typography>
          ))}
        </div>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a comment
            </Typography>
            <TextField
              fullWidth
              rows={4}
              value={comment}
              variant="outlined"
              multiline
              label="Comment"
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              variant="contained"
              color="primary"
              onClick={handleComment}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
