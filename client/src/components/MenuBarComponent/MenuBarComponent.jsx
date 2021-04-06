import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from "@material-ui/core/Grid";
import HomeIcon from "../HomeIconComponent/HomeIconComponent";
import { Typography } from '@material-ui/core';

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
                    <Grid xs={2} item>
                        <HomeIcon/> <Typography>Hello</Typography>
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