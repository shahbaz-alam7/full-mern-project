import { signin, signup } from "../../redux/actions/auth";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";
import Icon from "./icon";
import { AUTH } from "../../constants/actionTypes.js";
import {
  Typography,
  Avatar,
  Container,
  Paper,
  Grid,
  Button,
} from "@material-ui/core";
import useStyles from "./style";

import Input from "./Input";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const initialValue = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialValue);

  useEffect(() => {
    const user = localStorage.getItem("profile");
    if (user !== null) navigate("/");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const switchMode = () => {
    setFormData(initialValue);
    setIsSignup(!isSignup);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = (err) =>
    console.log("Google Sign In was unsuccessful. Try again later", err);

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
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              type="email"
              label="Email"
              handleChange={handleChange}
            />
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              handleShowPassword={handleShowPassword}
              handleChange={handleChange}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                handleShowPassword={handleShowPassword}
                handleChange={handleChange}
              />
            )}
          </Grid>
          <Button
            type="submit"
            color="primary"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>

          <GoogleLogin
            // clientId="564033717568-bu2nr1l9h31bhk9bff4pqbenvvoju3oq.apps.googleusercontent.com"
            // clientId="897398335437-9827l1tae9nmevfqo8sf2hadd4afp2l2.apps.googleusercontent.com"
            clientId={CLIENT_ID}
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Create an account. Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
