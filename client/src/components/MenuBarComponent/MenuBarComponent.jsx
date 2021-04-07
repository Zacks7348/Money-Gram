import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from "@material-ui/core/Grid";
import HomeIcon from "../HomeIconComponent/HomeIconComponent";
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        boxShadow: "none",
        backgroundColor: 'rgb(250,250,250)'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: "#61A98C",
        margin: theme.spacing(2),
        fontSize: "1.30rem",
        fontFamily: ["Pacifico", "cursive"],
        fontWight: 400,
        lineHeight: 1.6,
        letterSpacing: "0.0075em",
    },
    logo: {
        width: 135,
        height: 43.54,
        margin: -10
    }
}));

export default function ButtonAppBar({ children }) {
    const classes = useStyles();
    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Grid justify={"flex-start"} container>
                    <Grid xs={1} item>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <HomeIcon />
                        </IconButton>
                    </Grid>
                    <Grid xs={4} item>
                        <Typography className={classes.title}>MoneyGram</Typography>
                    </Grid>
                </Grid>
                <Grid justify={"flex-end"} container>
                    <Grid xs={1} item>
                        {children}
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}