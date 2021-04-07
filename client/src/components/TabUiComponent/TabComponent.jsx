
// Imports
import React from "react";

// Material UI Imports
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import PublicIcon from '@material-ui/icons/Public';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        }
    }
}));

const theme = createMuiTheme({
    palette: {
        primary: {
            main: green[400],
        },
        secondary: {
            main: "#E0E0E0",
        },
    },
});


export default function Tabs(props) {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <ButtonGroup size="large" aria-label="large outlined button group">
                    <Button
                        onClick={() => { props.active_tab([true, false, false]) }}
                        color={props.selected === "public" ? "primary" : "secondary"}
                        variant="contained"
                        startIcon={<PublicIcon />}
                    >PUBLIC</Button>
                    <Button
                        onClick={() => { props.active_tab([false, true, false]) }}
                        color={props.selected === "friends" ? "primary" : "secondary"}
                        variant="contained"
                        startIcon={<PeopleOutlineIcon />}
                    >FRIENDS</Button>
                    <Button
                        onClick={() => { props.active_tab([false, false, true]) }}
                        color={props.selected === "profile" ? "primary" : "secondary"}
                        variant="contained"
                        startIcon={<AccountCircleIcon />}
                    >PROFILE</Button>
                </ButtonGroup>
            </ThemeProvider>
        </div>
    );
}