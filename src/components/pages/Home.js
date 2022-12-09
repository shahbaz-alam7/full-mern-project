import React from "react";
import useStyles from "../../style";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "../../redux/actions/posts";
import { Container, Grid, Grow } from "@material-ui/core";

import Form from "../form/Form";
import Posts from "../posts/Posts";
const Home = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.mainContainer}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
