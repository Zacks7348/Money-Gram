// Imports
import React, { useEffect } from 'react';
import MuiPhoneNumber from "material-ui-phone-number";
import { Link as ReactLink, useHistory } from "react-router-dom";
import axios from "axios";

// Material UI Imports
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// Recoil State
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
    signupFirstNameState, signupLastNameState,
    signupMiddleNameState, signupDOBState, signupPhoneNumberState,
    signupUserNameState, signupEmailState, signupPasswordState, signupVerifyPasswordState, errorsState, authState, responseUserNameState
} from '../../Store/Atoms'

// Style Components
import { signupStyle } from './SignupComponentStyle';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © MoneyGram '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => (signupStyle(theme)));


export default function SignUp() {
    const classes = useStyles();

    const [signupFirstName, setSignupFirstName] = useRecoilState(signupFirstNameState);
    const [signupLastName, setSignupLastName] = useRecoilState(signupLastNameState);
    const [signupMiddleName, setSignupMiddleName] = useRecoilState(signupMiddleNameState);
    const [signupDOB, setSignupDOB] = useRecoilState(signupDOBState);
    const [signupPhoneNumber, setSignupPhoneNumber] = useRecoilState(signupPhoneNumberState);
    const [signupEmail, setSignupEmail] = useRecoilState(signupEmailState);
    const [signupUserName, setSignupUserName] = useRecoilState(signupUserNameState);
    const [signupPassword, setSignupPassword] = useRecoilState(signupPasswordState);
    const [signupVerifyPassword, setSignupVerifyPassword] = useRecoilState(signupVerifyPasswordState);
    const [errors, setErrors] = useRecoilState(errorsState);

    // Login State
    const [auth, setAuth] = useRecoilState(authState);
    const setResponseUserName = useSetRecoilState(responseUserNameState);

    // Redirect
    const history = useHistory();

    const handleSignUp = async (event) => {
        try {
            event.preventDefault();

            if (signupPassword !== signupVerifyPassword) {
                setErrors("Passwords do not match");
                return;
            }

            const { data } = await getUser();
            setAuth(data.auth);
            setErrors(data.error);
            setResponseUserName(data.username);
    
        } catch (error) {
            console.log(error);
        }
    }


    const getUser = async () => {
        try {
            return await axios.post(`http://localhost:4000/users`, {
                username: signupUserName,
                Fname: signupFirstName,
                Mname: signupMiddleName,
                Lname: signupLastName,
                DOB: signupDOB,
                phone: signupPhoneNumber,
                password: signupPassword,
                email: signupEmail
            }).catch(error => { setErrors(error.response.data.error); });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const storageAuth = window.localStorage.getItem("auth") === 'true' ? true : false;
        const storageUser = window.localStorage.getItem("user");

        if (storageAuth && storageUser !== '') {
            setAuth(storageAuth);
            setResponseUserName(storageUser);
            history.push("/home");
        } else if (errors) {
            setTimeout(() => {
                setErrors("");
            }, 3500);
        } else if (auth && responseUserNameState !== '') {
            history.push("/home");
        } else {
            history.push("/signup");
        }
    }, [auth,errors,history,setResponseUserName,setAuth,setErrors]);



    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <VpnKeyIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
        </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={signupFirstName}
                                onChange={(e) => setSignupFirstName(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                value={signupLastName}
                                onChange={(e) => setSignupLastName(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="middleInitial"
                                label="Middle Initial"
                                name="middleInitial"
                                autoComplete="mname"
                                value={signupMiddleName}
                                onChange={(e) => setSignupMiddleName(e.target.value.toString().slice(0, 1))}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="date"
                                label="DOB"
                                type="date"
                                value={signupDOB}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => setSignupDOB(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <MuiPhoneNumber
                                name="phone"
                                label="Phone Number"
                                data-cy="user-phone"
                                defaultCountry="us"
                                disableDropdown={true}
                                value={signupPhoneNumber}
                                onChange={(e) => { setSignupPhoneNumber(e) }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={signupEmail}
                                onChange={(e) => setSignupEmail(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                value={signupUserName}
                                onChange={(e) => setSignupUserName(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={signupPassword}
                                label={errors !== "" ? errors : "Password"}
                                error={errors !== ""}
                                onChange={(e) => setSignupPassword(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="verifyPassword"
                                type="password"
                                id="verifyPassword"
                                autoComplete="current-password"
                                value={signupVerifyPassword}
                                label={errors !== "" ? errors : "Verify Password"}
                                error={errors !== ""}
                                onChange={(e) => setSignupVerifyPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>

                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={e => handleSignUp(e)}>
                        Sign UP
                    </Button>

                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link component={ReactLink} to="/" variant="body2" style={{ textDecoration: 'none' }}>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>

            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}