import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import useStyles from "./style";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, getPostBySearch } from "../../redux/actions/posts";
import CommentSection from "./CommentSection";
const PostDetail = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);
  useEffect(() => {
    if (post) {
      dispatch(getPostBySearch({ search: "none", tags: post?.tags.join(",") }));
    }
  }, [post]);
  if (!post) return null;
  if (isLoading)
    return (
      <Paper className={classes.loadingPaper} elevation={6}>
        <CircularProgress size="7em" />
      </Paper>
    );
  const recommendedPost = posts.filter((item) => item._id !== post._id);
  
  const openPost = (id) => navigate(`/posts/${id}`);
  return (
    <Paper elevation={6} style={{ padding: "20px", borderRadius: "15px" }}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <CommentSection post={post}/>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
      </div>
      {recommendedPost.length && (
        <div className={classes.section}>
          <Typography variant="h5" gutterBottom>
            You might also like
          </Typography>
          <div className={classes.recommendedPosts}>
            {recommendedPost.map(
              ({ title, name, message, likes, selectedFile, _id }) => {
                return (
                  <div
                    style={{ margin: "20px", cursor: "pointer" }}
                    onClick={() => openPost(_id)}
                    key={_id}
                  >
                    <Typography gutterBottom variant="h6">{title}</Typography>
                    <Typography gutterBottom variant="subtitle2">{name}</Typography>
                    <Typography gutterBottom variant="subtitle2">{message.slice(0,75)}...<span style={{color:"blue"}}> See more.</span></Typography>
                    <Typography gutterBottom variant="subtitle1">Likes:{likes.length}</Typography>
                    <img src={selectedFile} alt="img" width="200px" />
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetail;
