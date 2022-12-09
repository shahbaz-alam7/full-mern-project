import React from "react";
import {
  Typography,
  Avatar,
  Container,
  Paper,
  Grid,
  TextField,
} from "@material-ui/core";
import useStyles from "./style";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
const Auth = () => {
  const classes = useStyles();
  const isSignup = true;
  const handleSubmit = (e) => {
    e.prevantDefault();
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <TextField
                  name="firstName"
                  label="First Name"
                  onChange={() => {}}
                  autoFocus
                  xs={6}
                ></TextField>
                <TextField
                  name="firstName"
                  label="First Name"
                  onChange={() => {}}
                  autoFocus
                  xs={6}
                ></TextField>
              </>
            )}
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
