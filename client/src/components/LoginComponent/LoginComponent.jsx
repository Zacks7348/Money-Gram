// Imports
import React from "react";
import { Link as ReactLink} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { loginStyle } from './LoginComponentStyle';

// Recoil State
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userNameState, passwordState, errorsState, authState, responseUserNameState, responseUserIDState } from '../../Store/Atoms';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © MoneyGram '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => (loginStyle(theme)));


export default function Login() {
  const classes = useStyles();

  // Login State
  const [username, setUserName] = useRecoilState(userNameState);
  const [password, setPassword] = useRecoilState(passwordState);
  const [errors, setErrors] = useRecoilState(errorsState);
  const setAuth = useSetRecoilState(authState);
  const setResponseUserName = useSetRecoilState(responseUserNameState);
  const setResponseUserID = useSetRecoilState(responseUserIDState);



  // Handlers
  const handleLogin = async (event) => {
    event.preventDefault();
    const payload = await getUser();

    if (payload) {
      const { data } = payload;
      Cookies.set('auth', data.auth);
      Cookies.set('user_id', data.user.user_id);
      Cookies.set('user_name', data.user.username);
      setResponseUserID(data.user.user_id);
      setResponseUserName(data.user.username);
      setErrors(data.error);
      setAuth(data.auth);

    } else {
      setErrors("User not found");
    }

  };

  const getUser = async () => {
    try {
      return await axios.post(`http://localhost:4000/login`, {
        username,
        password
      }).catch(error => { setErrors(error.response.data.error); });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
          </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label={errors !== "" ? errors : "Username"}
            name="username"
            autoComplete="email"
            error={errors !== ""}
            value={username}
            autoFocus
            onChange={e => setUserName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={errors !== "" ? errors : "Password"}
            type="password"
            id="password"
            autoComplete="current-password"
            error={errors !== ""}
            value={password}
            onChange={e => { setPassword(e.target.value) }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
          >
            Sign In
            </Button>
          <Grid container>
            <Grid item xs>
              <Link component={ReactLink} to="forgot" style={{ textDecoration: 'none' }}>
                Forgot password?
                </Link>
            </Grid>
            <Grid item>
              <Link component={ReactLink} to="signup" style={{ textDecoration: 'none' }}>
                Don't have an account? Sign Up
                </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}