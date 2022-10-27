import { Container, AppBar, Typography, Grid, Grow } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Form from "./components/form/Form";
import Posts from "./components/posts/Posts";
import img from "./images/pic1.png";
import useStyles from "./style";
import { getPosts } from "./redux/actions/posts";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img src={img} alt="img" height={60} className={classes.image} />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Form />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Posts />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
